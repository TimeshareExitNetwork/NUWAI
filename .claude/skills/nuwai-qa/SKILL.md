---
name: nuwai-qa
description: Generate test cases and edge cases from a QA perspective. Produces structured test plans covering happy paths, boundaries, failures, and integration points. Use before writing tests or when reviewing a feature for coverage gaps.
argument-hint: [feature, function, or file to generate test cases for]
disable-model-invocation: true
---

# QA Test Case Generation

## QA Engineer Mindset

You're not writing test code. You're thinking systematically about what SHOULD be tested and how. For $ARGUMENTS, generate a comprehensive test plan organized by category.

**Important context**: This project does not yet have an automated test framework. Test cases you generate serve two purposes:
1. **Manual QA checklist** — what to verify by hand before merging
2. **Future automation blueprint** — structured enough to translate directly into test code when a framework is added (likely Vitest + Playwright)

Before generating cases, read the relevant source code to understand the actual implementation. Don't generate tests for behavior you're guessing about — base every case on real code paths.

---

## Test Categories

### 1. Happy Path Tests
The expected workflow works correctly with valid inputs and normal conditions.

- Confirm the primary use case works end-to-end
- Verify the correct API/Server Action response shape (status, body, returned data)
- Check that DynamoDB records are created/updated/deleted as expected via Amplify Data
- Verify side effects fire (analytics events, OpenAI logging, supplier-API calls with correct params)

### 2. Boundary & Edge Case Tests
Test the edges of valid input:

- **Empty/null/undefined**: Missing fields, empty strings, `null` values in optional fields
- **Limits**: Trip with 1 traveler vs. 9 travelers, 1-day trip vs. 30-day trip, search radius 1km vs. global
- **Numeric precision**: Prices (store as integer cents to avoid float errors), currency conversion edge cases
- **String edge cases**: Unicode in trip names, very long descriptions, HTML/script in user-supplied notes
- **Date edge cases**: Same-day departure/return, trips crossing the date line, leap-year February dates, daylight-savings boundaries
- **ID formats**: Cognito user sub vs. legacy IDs, supplier IDs (numeric vs. opaque strings), invalid UUIDs in URL params

### 3. Failure Mode Tests
What happens when things go wrong:

- **Supplier API failures**:
  - Booking.com Demand returns 5xx or empty results
  - Amadeus token endpoint fails (expired client credentials)
  - Amadeus sandbox returns flights that don't exist in prod
  - OpenTable directory data is stale or returns unexpected fields
  - OpenAI returns malformed JSON despite structured-output schema
  - OpenAI 429 (rate limit) or 529 (overloaded)
- **DynamoDB failures**: Throttling, conditional-check failures (e.g., on optimistic version field), eventual consistency on GSI reads
- **Cognito failures**: Token expired, refresh token invalid, MFA challenge, regional outage
- **Lambda failures**: Timeout mid-fetch, OOM on large response, cold start exceeding gateway timeout
- **Concurrent modifications**: Two clients updating the same saved package (last-write-wins on DynamoDB without optimistic locking)
- **Partial multi-step failures**: Trip plan with flights + hotels — flights succeed, hotels fail. Do we return partial, or roll back?

### 4. User Isolation Tests (HIGHEST PRIORITY)

The most critical category. Every feature touching user-owned data must be tested for cross-user leakage.

- **Cross-user read**: User A cannot see User B's saved packages, trip history, or chat conversations
  - List endpoints filter by `owner` derived from the Cognito JWT — not from client input
  - Detail endpoints return 404 (not 403) for another user's records — don't confirm existence
  - Search/filter results are scoped to the current user
- **Cross-user write**: User A cannot modify User B's saved packages
  - Update/delete operations verify ownership via Amplify Data auth rules, not just ID existence
  - Bulk operations can't include IDs owned by other users
- **Auth boundary**: Amplify Data `owner` rule enforced — verify a forged `owner` field on create is rejected, and `owner` is server-derived from the auth context
- **Server Action trust boundary**: Server Actions are publicly callable HTTP endpoints. Every action must re-check auth, not assume the caller is who the client-side state thinks they are.

### 5. Authorization & Role Tests

For the feature under test:
- Unauthenticated request to a protected route/action returns 401, not 500
- Anonymous users CAN access public marketing pages, search, and sample trip plans
- Anonymous users CANNOT save packages, view history, or invoke any user-scoped Amplify Data operation
- Expired Cognito session is handled cleanly (silent refresh, or redirect to sign-in)
- Admin-only routes/actions (future) check group membership in the Cognito JWT, not a client flag

### 6. State Machine & Lifecycle Tests

If the feature involves status transitions, test the full lifecycle:

**Saved package lifecycle** (illustrative — adjust to actual schema):
- `DRAFT` → `SAVED` → `BOOKED` (or `EXPIRED` if prices stale beyond TTL)
- Cannot transition `BOOKED` back to `DRAFT`
- `EXPIRED` packages prompt a re-quote before booking redirect

**Trip-plan generation lifecycle**:
- `REQUESTED` → `PLANNING` → `READY` (or `FAILED` with reason)
- Partial failures (one supplier down) → `READY_WITH_GAPS` with explicit missing components
- User retry on `FAILED` does not duplicate spend if a transient was the cause

**Auth session lifecycle**:
- Sign-up → email verification → sign-in → token refresh → sign-out
- MFA enrollment / challenge flows
- Password reset

### 7. Integration Boundary Tests

Where this feature touches external systems:

- **Booking.com Demand**: API key rotation, partner-account suspension, response schema changes, geographic-restriction errors
- **Amadeus**: OAuth token expiry mid-request, sandbox-vs-prod parity, ancillary services (seats, bags) missing in some markets
- **OpenTable**: Widget redirect URL malformed, restaurant slug removed from directory between search and redirect
- **OpenAI**: Token budget exceeded mid-stream, function-calling output that references nonexistent supplier inventory, prompt-injection attempts in user input
- **S3 / Amplify Storage**: Upload size limits, content-type sniffing, presigned URL expiry
- **Cognito**: Federated identity provider (Google/Apple) returns unexpected claims
- **Email** (SES or equivalent): Send failure — does the primary action complete, or block on email?

### 8. Data Integrity Tests

Verify data consistency after operations:

- **Currency**: Prices stored consistently as integer cents in a single currency, with conversion applied at display only
- **Date/time**: All timestamps stored in UTC; itinerary display converts to traveler's local zone
- **Idempotency**: Repeated submission of the same "save package" call doesn't create duplicates (use a client-generated request ID)
- **Cascading deletes**: Deleting a user (Cognito) — what happens to their saved packages, chat history, uploads? No orphans, no PII left behind beyond legal retention.
- **AI-output validation**: Anything OpenAI produces that references real-world inventory (flights, hotels, restaurants) is cross-checked against the supplier response before persisting
- **Schema drift tolerance**: Old saved records missing newer fields don't crash reads

---

## Output Format

For each test case:

| Field | Description |
|-------|-------------|
| **ID** | TC-001, TC-002, etc. |
| **Category** | Which category from above |
| **Description** | What we're testing, in plain English |
| **Preconditions** | What state/data must exist before the test |
| **Steps** | What the test does (API call, UI action, or sequence) |
| **Expected Result** | What should happen — be specific about response codes, DB state, side effects |
| **Priority** | **P0** (blocks release), **P1** (should fix), **P2** (nice to have) |

### Prioritization Guide
- **P0**: Cross-user data leakage, auth bypass, financial display errors, payment-redirect tampering, runaway external-API cost
- **P1**: Missing validation, incorrect error codes, missing observability, edge cases in core booking funnel
- **P2**: UX edge cases, graceful degradation, performance under unusual load, cosmetic issues

Generate **15-25 test cases minimum**. Aim for cases that catch real bugs — not trivial checks like "page renders without crashing." Weight heavily toward P0 (user isolation, auth, data integrity, cost control) since those are the highest-risk areas in this codebase.

### Summary Section
End with:
- **Coverage map**: Which code paths are covered vs. gaps remaining
- **Highest risk area**: Where bugs are most likely based on complexity
- **Manual QA steps**: Key scenarios to test by hand in the browser before merging
- **Automation candidates**: Which test cases would benefit most from automation (highest value / lowest effort)
