---
name: nuwai-adversary
description: Red-team a feature -- find what breaks, what's exploitable, what fails under load, and what the worst-case scenarios look like. Adversarial thinking applied to code.
argument-hint: [feature, system, or file to stress test]
disable-model-invocation: true
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob
---

# Adversarial Analysis: Break It Before Production Does

You are trying to BREAK $ARGUMENTS. Not maliciously — constructively. Find every way this can fail BEFORE it fails in production.

Before starting, **read the actual source code** for the feature. Don't theorize about code you haven't seen — open the files, trace the data flow, check the error handling.

---

## System Context

NUWAI runs on:
- **Next.js 16 App Router** on Amplify Hosting — RSC by default, Server Actions, route handlers. No persistent in-memory state between requests.
- **AWS Lambda** for backend functions — cold starts (~100ms-1s for Node.js), default 3s timeout (configurable to 15min), 512MB memory default. Network egress costs.
- **Amplify Data on DynamoDB** — single-table-style access patterns, eventual consistency on GSIs, no relational joins, item size limit 400KB.
- **Cognito user pool** — session via JWT (access + ID + refresh tokens). No server-side session store.
- **External suppliers**: Booking.com Demand (hotel search, partner-gated), Amadeus Self-Service (flights, sandbox + prod environments), OpenTable (directory + widget redirects only, no real-time API booking for non-partners), OpenAI (trip-plan generation — rate limits + per-call cost).

---

## Attack Vectors

### The Chaos Monkey (Infrastructure Failures)

- What happens when a Lambda hits its timeout while waiting on Amadeus or Booking.com? Is the user shown a generic 504, or do we stream partial results?
- What happens during a cold start on the trip-planner Lambda when OpenAI is also slow? Total request time can blow past the API gateway timeout.
- What happens when DynamoDB throttles (provisioned throughput exceeded, on-demand burst limits)? Does the Server Action surface a useful error, or a stack trace?
- What happens during Amplify deployment? Stale Lambda versions briefly coexist with new schema. If the data shape changed, old code may crash on new records.
- What happens when Cognito is regionally degraded? Sign-in flows fail — does the app degrade gracefully (show a banner) or 500?
- What happens when OpenAI returns a 429 (rate limit) or 529 (overloaded)? Do we retry with backoff, fall back to a cached plan, or fail the user-facing request?
- What happens when Booking.com Demand API returns a partial result set with `Content-Range` truncation? Do we paginate, or display incomplete inventory?
- What happens when Amadeus sandbox data drifts from production (sandbox flights don't exist in prod)? Are we testing against sandbox and shipping against prod without parity checks?

### The Confused User (UX Failures)

- **Double-click on "Search"**: Triggers two parallel Lambda invocations. Do we deduplicate, or burn 2x the external API quota?
- **Back button after booking redirect**: User goes to supplier site, comes back, clicks "Book" again — duplicate affiliate click, potentially duplicate booking on the supplier side.
- **Two tabs, same trip**: Tab A modifies the package, Tab B saves the old version. Last-write-wins on DynamoDB — what did the user actually mean? No optimistic locking.
- **Stale search results**: User loads results, walks away 30 minutes, clicks "Book". The price has changed. Do we re-fetch and confirm, or send them through with stale pricing?
- **Paste attack**: User pastes 10MB into the AI chat prompt. What happens to the OpenAI request? Token-limit error? Truncated silently? Cost spike?
- **Mobile spotty WiFi**: Booking confirmation request times out client-side but succeeds server-side. User retries — duplicate saved package, possibly duplicate redirect.
- **Currency / locale**: User in EU sees USD prices, books, gets charged a different amount by supplier. Do we localize, or show the raw supplier currency with a disclaimer?

### The Malicious User (Security Exploits)

- **ID enumeration**: Can a user iterate through saved-package IDs or trip IDs to discover other users' data? Do 404s vs 403s leak existence information?
- **Owner spoofing**: Amplify Data `owner` auth rules — can a malicious client pass a forged owner field on create/update, or is the owner derived from the Cognito JWT server-side?
- **API key extraction**: Are any supplier API keys ever exposed to the client (in route handlers that echo headers, in error messages, in `NEXT_PUBLIC_*` vars)?
- **Prompt injection**: User input is passed to OpenAI. Can they inject instructions that exfiltrate prior conversation, override system prompts, or get the model to produce affiliate links to attacker-controlled domains?
- **Affiliate link tampering**: Can the user modify the booking URL params (campaign ID, click ID) before redirect to attribute their own booking to a competitor or scrape commission data?
- **Trip-plan abuse**: Can an unauthenticated or low-cost-tier user spam the trip-plan endpoint to burn our OpenAI budget? Is there per-user / per-IP rate limiting?
- **Saved package bulk fetch**: Can a user request all saved packages without pagination and get other users' records mixed in? Verify auth rules cover list operations, not just gets.
- **SSRF via search**: If a user supplies a hotel image URL or external link, does any server-side code fetch it (e.g., for thumbnailing)? Could that be pointed at internal AWS metadata?

### The Scale Demon (Performance Failures)

- **Hot destinations**: A surge of users all searching "Cancun, this weekend" hits Booking.com simultaneously. Are responses cached server-side, or does every search re-hit the supplier?
- **Trip-plan fan-out**: One trip plan triggers N calls (flights + hotels + restaurants). Are these parallelized? What if one provider is slow — do we block the whole plan, or stream partial results?
- **DynamoDB hot partitions**: If saved packages are keyed by `userId#timestamp`, a burst of saves from one user hits one partition. Any hot keys in the access patterns?
- **List pagination**: Saved trips list — is there a hard limit? Can a user with 10,000 saved trips break the UI or the Lambda response size limit (6MB)?
- **OpenAI token blowup**: A multi-turn chat that includes the full prior conversation balloons tokens linearly. Do we summarize / truncate, or send the whole transcript every turn?
- **Image storage**: User uploads trip photos to S3 — any size limits enforced? Are we paying egress on every page view of the gallery?

### The Data Gremlin (Data Integrity Failures)

- **Null in required context**: Legacy or partial records may have `null` where newer code assumes a value. What happens when `package.totalPrice` is null and the UI does `totalPrice.toFixed(2)`?
- **Currency arithmetic**: Prices in floating point cause penny discrepancies. Are we using cents (integer) internally, or USD floats?
- **Date / timezone**: Flight times in UTC vs hotel check-in in local time. Does the itinerary show consistent zones? What if a flight crosses the date line?
- **Stale supplier data**: A hotel was on the list yesterday, now delisted. Saved package still references the supplier ID. Does "Book Now" 404 silently, or surface a "no longer available" state?
- **Schema drift**: Amplify Data schema evolves — old saved packages have a different shape than new ones. Do queries handle missing fields, or crash on `record.newField`?
- **OpenAI hallucinated data**: The model invents a hotel that doesn't exist on Booking.com. Do we validate against supplier responses before saving, or let fake inventory into the database?
- **Orphan references**: A user deletes their account (Cognito) — their saved packages remain in DynamoDB, referencing a non-existent owner. Are deletions cascaded, or do orphans accumulate?

---

## Output Format

For each failure mode found:

| Field | Description |
|-------|-------------|
| **Scenario** | What happens, in concrete terms |
| **Vector** | Which attacker persona triggers this (Chaos/Confused/Malicious/Scale/Data) |
| **Likelihood** | How often this could occur: **Daily** / **Weekly** / **Monthly** / **Rare but catastrophic** |
| **Impact** | Blast radius: **One user** / **One trip** / **One supplier integration** / **All users** / **Data corruption** / **Cost overrun** |
| **Current protection** | Does the code handle this already? Quote the specific file/line if so. |
| **Recommendation** | How to make it resilient — concrete fix, not vague advice |

### Prioritization

Rank all findings by **Likelihood x Impact** score. Focus the report on:
1. **Top 5 critical findings** — detailed analysis with file references
2. **Additional findings** — brief description, grouped by vector
3. **What's already well-protected** — give credit where the code handles failure modes correctly. Don't only report bad news.

### Summary
- **Weakest point**: The single most dangerous failure mode
- **Strongest point**: What's already well-defended
- **Quick wins**: Fixes that are low-effort but high-value
- **Systemic issues**: Patterns that indicate a class of problems, not just one-off bugs
