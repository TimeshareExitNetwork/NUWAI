---
name: nuwai-security
description: Security audit of code changes -- checks user isolation, auth boundaries, input validation, injection risks, secret handling, and data exposure on the NUWAI stack (Next.js 16 + AWS Amplify Gen 2).
disable-model-invocation: true
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob, Bash(git diff *), Bash(git log *), Bash(git show *)
argument-hint: [scope -- e.g., "recent changes", specific file path, or feature name]
---

# Security Audit: Attacker Mindset Review

## Scope

Audit scope: $ARGUMENTS

### Changed files
!`git diff main --name-only 2>/dev/null || git diff HEAD~5 --name-only`

### Change summary
!`git diff main --stat 2>/dev/null || git diff HEAD~5 --stat`

### Current branch
!`git branch --show-current`

---

## System Context

You are auditing **NUWAI** — an AI-assisted travel aggregator built on Next.js 16 (App Router) + AWS Amplify Gen 2 (Cognito + Amplify Data on DynamoDB + Lambda functions). A security failure here means:
- **User data leakage**: One member sees another member's saved trips, chat history, or PII (names, DOB, passport info if collected)
- **API key exposure**: Booking.com Demand, Amadeus, OpenTable, OpenAI keys leaked → impersonation of NUWAI as a partner, runaway billing, account suspension by suppliers
- **Affiliate / financial integrity**: Tampered redirect URLs, prompt-injected affiliate links, fake supplier inventory
- **Cost overrun**: Unauthenticated abuse of OpenAI or Amadeus endpoints burning budget

## Attacker Profiles

Assume the attacker is one of:

1. **Malicious member** — Has a legitimate Cognito account, trying to access another user's data by manipulating IDs, owner fields, or Server Action payloads
2. **Anonymous external attacker** — No account, hitting public route handlers, Server Actions, and search endpoints
3. **Prompt injector** — Submits crafted input to the AI trip planner to override system prompts, exfiltrate data, or steer the model to attacker-controlled affiliate links
4. **Insider** — Has access to one tier of features, trying to escalate to admin-only operations (future)

---

## Audit Checklist

For every changed file, systematically check:

### 1. User Isolation (CRITICAL — #1 rule)

**How this system works:**
- Cognito issues JWTs containing the user `sub` (unique ID)
- Amplify Data models use `owner`-based authorization rules — reads/writes are filtered by the JWT sub server-side
- Server Actions and route handlers must derive the user identity from the request auth, NEVER from client-supplied fields

**What to check:**
- [ ] Every Amplify Data operation on user-owned models uses `owner` auth rules (or explicit identity check in a Lambda)
- [ ] User ID is derived from the Cognito JWT — NEVER from request body, query params, or client-controlled headers
- [ ] No `get` / `list` operations that bypass owner filtering (e.g., a Lambda using IAM auth to scan the whole table without a user filter)
- [ ] Server Actions re-validate the session at the top of the function, not trusting middleware alone
- [ ] No route handler accepts a `userId` from the body to "lookup" data — the ID comes from the session

**Dangerous patterns to flag:**
```ts
// SAFE: owner derived from auth context
const { userId } = await getCurrentUser();
const trips = await client.models.Trip.list({ filter: { owner: { eq: userId } } });

// DANGEROUS: userId from request body — attacker controls this
const { userId } = await req.json();
```

### 2. Authentication & Authorization

**How this system works:**
- Cognito user pool issues access + ID + refresh tokens
- Amplify auth helpers (`fetchAuthSession`, `getCurrentUser`) validate the session server-side
- Future: admin features will use Cognito groups; check group membership from the JWT

**What to check:**
- [ ] Every protected Server Action / route handler calls `getCurrentUser()` (or equivalent) BEFORE touching data
- [ ] 401 returned for unauthenticated requests — never 500 with a stack trace
- [ ] Token expiry is handled (silent refresh or redirect to sign-in) — no hard crash on expired sessions
- [ ] Admin-only operations check Cognito group membership in the JWT, not a client-side flag
- [ ] Federated identity (Google / Apple / etc.) — verify required claims (email, sub) are validated before account creation
- [ ] Sign-up doesn't auto-grant elevated roles; default group is `member`
- [ ] Password reset / email verification flows don't leak whether an email exists in the system (uniform response timing/text)

### 3. Secret Handling

**The most common failure mode in this stack.** Supplier API keys MUST stay server-side.

**What to check:**
- [ ] No `NEXT_PUBLIC_*` environment variable contains a supplier key, OpenAI key, or any other secret — these are bundled into client JS
- [ ] All external API calls (Booking.com, Amadeus, OpenTable, OpenAI) happen in Lambda functions or Server Actions, never in client components or `use client` boundaries
- [ ] API responses don't echo internal headers, env values, or stack traces
- [ ] Logs (CloudWatch, console) don't include API keys, tokens, or full request URLs with embedded credentials
- [ ] Amplify secrets are referenced via `process.env` in Lambda, NOT hardcoded
- [ ] No `.env` or `.env.local` is committed to git (check `.gitignore`)

### 4. Input Validation

**What to check:**
- [ ] All user inputs (Server Action args, route handler body, query params) validated with Zod (or equivalent) before use
- [ ] URL params expected to be specific formats (UUIDs, Cognito subs, ISO dates) are validated, not passed raw to Amplify Data or external APIs
- [ ] File uploads validated for MIME type and size before S3 put
- [ ] No user input directly concatenated into prompts to OpenAI without clear delimiters and explicit "treat as data" framing
- [ ] Array inputs have reasonable length limits (search results requested, batch operations, chat history depth)
- [ ] Date inputs validated as plausible ranges (not 200 years in the future, not pre-1900)
- [ ] Numeric inputs (price, traveler count, radius) bounded to sensible ranges

### 5. Data Exposure

**What to check:**
- [ ] API / Server Action error responses don't include stack traces, query details, or file paths in production
- [ ] Amplify Data list/get operations use explicit `selectionSet` — not returning every field including sensitive ones
- [ ] No `console.log` of PII (names, DOB, passport, email beyond hashed forms, payment tokens)
- [ ] PII is encrypted at rest where applicable; DynamoDB encryption-at-rest is on but field-level encryption for highly sensitive data (passport, DOB) should be considered
- [ ] Error boundaries and catch blocks don't expose internal state to the client
- [ ] Source maps are not deployed to production (or are auth-gated)

### 6. AI / Prompt Injection

**Specific to the trip-planner and chat features:**
- [ ] System prompt is clearly separated from user input — use explicit role markers, not string concatenation that lets user content masquerade as system instructions
- [ ] User input is treated as data, not instructions — the model is told to ignore embedded "instructions" in user text
- [ ] Function-calling outputs (e.g., "book this hotel") are validated against real supplier inventory before being shown as bookable
- [ ] Affiliate URLs in AI output are server-constructed from a known template + supplier ID, not pasted in by the model
- [ ] Cost guards: per-user rate limit on trip-plan generation, max tokens per request, daily budget cap
- [ ] Chat history sent back to the model is truncated/summarized to avoid unbounded token growth (cost + context-window exhaustion)
- [ ] User-supplied URLs (e.g., a "make a trip like this travel blog post") are NOT fetched server-side without explicit SSRF protections (deny internal/private IPs, no AWS metadata endpoint)

### 7. Affiliate & Booking Redirect Integrity

**What to check:**
- [ ] Redirect URLs to supplier sites are constructed server-side from validated supplier IDs + our affiliate/partner IDs
- [ ] Affiliate / campaign / click-ID parameters are server-set, not user-controlled — a user can't strip or swap them
- [ ] Open-redirect protection: the redirect destination domain is checked against an allowlist of known supplier domains
- [ ] Price shown to the user matches the price passed to the redirect (no client-side tampering to display a fake "deal")

### 8. Cost / Quota Abuse

**What to check:**
- [ ] Anonymous endpoints (sample search, sample trip plan) have IP-based or session-based rate limits
- [ ] Authenticated members have per-user rate limits on expensive operations (OpenAI calls, full multi-supplier searches)
- [ ] Lambda concurrency limits are configured to prevent a single user fan-out from saturating account quotas
- [ ] Logging / alerting on unusual external-API spend per user per day

---

## Output Format

Organize all findings by severity:

### CRITICAL — Must fix before merge
Cross-user data leaks, auth bypass, secret exposure, open redirect, SSRF, runaway-cost paths.
Format: `file:line` — what's wrong — how an attacker exploits it — how to fix it.

### WARNING — Should fix soon
Input validation gaps, overly broad API responses, missing rate limits on non-destructive operations, prompt-injection surface, error message information leakage.
Format: `file:line` — what's wrong — risk level — how to fix it.

### INFO — Defense-in-depth improvements
Hardening opportunities, additional validation that would add safety margins, logging/observability improvements.
Format: `file:line` — suggestion — benefit.

### Summary

End with:
- **Total findings**: X critical, Y warning, Z info
- **Highest risk area**: Which part of the change has the most security exposure
- **Recommended priority**: What to fix first and why
- **Clean bill**: If no issues found, explicitly state "No security issues identified" — don't manufacture findings to look thorough
