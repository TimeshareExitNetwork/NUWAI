---
name: nuwai-postmortem
description: Blameless postmortem analysis -- trace a bug or incident to root cause, identify systemic patterns, and propose preventive measures. Use after fixing a bug to learn from it.
argument-hint: [bug description, error message, or incident summary]
disable-model-invocation: true
---

# Blameless Postmortem

## Recent Context

!`git log --oneline -20`
!`git diff HEAD~5 --stat`

---

Analyze $ARGUMENTS without blame. The goal is to make the system better, not to assign fault. Read the relevant source code and git history to reconstruct what happened.

---

## 1. Timeline

Reconstruct what happened:

- **Intended behavior**: What was the feature/code supposed to do?
- **Actual behavior**: What did it actually do? Be specific — error messages, wrong data, missing data, crash, runaway cost.
- **When it started**: Was this introduced by a specific commit? Use `git log` and `git blame` to trace it.
- **When it was detected**: How long was this broken before someone noticed?
- **Impact scope**: Who was affected?
  - One user / one cohort (e.g., users searching a specific region) / all members / all anonymous visitors
  - Was data corrupted, behavior incorrect, or PII exposed?
  - Were external systems affected (supplier API calls misattributed, affiliate clicks wasted, OpenAI budget spiked, Cognito sessions invalidated)?

## 2. Root Cause Analysis (5 Whys)

Start with the symptom and ask "why?" at least 5 times. Dig until you hit a **systemic** cause, not a surface-level one.

Example of going deep enough:
- Why did the saved-package list return another user's record? → The Amplify Data query didn't filter by owner
- Why wasn't owner filtering enforced? → The model lacked an `owner`-based auth rule and the Lambda used IAM auth, scanning the table
- Why was that pattern chosen? → Copied from an admin-only Lambda that legitimately scans across users
- Why was it easy to copy the wrong pattern? → No lint rule or type enforcement separates user-scoped from admin-scoped data access
- **Root cause**: User isolation relies on developer discipline and pattern matching, not automated enforcement at the schema or type level

Stop when you reach something **structural** — a missing guardrail, a misleading abstraction, an unvalidated assumption, or a gap in the system design.

## 3. Contributing Factors

What made this bug possible beyond the direct cause? Check each category:

- **Missing test**: Would a specific test have caught this? (Note: this project currently has no automated test framework — was this a case where even a manual QA step was skipped?)
- **Missing validation**: Was input accepted that should have been rejected? Did Zod validation exist for this route/action, or was it bypassed?
- **Skipped convention**: Did a coding convention from CLAUDE.md / AGENTS.md get bypassed? Which one? Why was it easy to skip?
  - Owner-based auth on every Amplify Data model touching user data?
  - `getCurrentUser()` re-check inside every Server Action?
  - Server-side construction of affiliate redirect URLs?
  - Reading `node_modules/next/dist/docs/` before using a Next.js 16 feature?
- **Silent failure**: Did a Lambda swallow an error, or a `catch` block log without rethrowing? Did a missing `await` cause a fire-and-forget that nobody saw fail?
- **Assumption mismatch**: Did the code assume something about the data shape, supplier response, or AI output that wasn't true?
- **External API behavior change**: Did Booking.com, Amadeus, OpenTable, or OpenAI change response format, rate limit, or auth flow without notice?
- **Concurrency gap**: Was this a race condition that DynamoDB didn't protect against? (No optimistic locking unless you add a version field with a conditional update.)
- **Data type surprise**: Price stored as float instead of integer cents? Date string instead of ISO? AI output that parsed as JSON but contained `null` where a number was expected?
- **Caching mistake**: Stale price served because cache TTL was wrong, or cache key didn't include a relevant axis (currency, locale, date)?
- **Cost / quota miss**: A path that calls OpenAI in a loop, or fans out to suppliers without batching?

## 4. Detection Gap

How long was this broken before we knew? Analyze why:

- **No automated tests**: Could a unit test, integration test, or E2E test have caught this at build time?
- **No monitoring**: What metric or log pattern would have flagged this in production? (Current monitoring: CloudWatch Lambda logs — no dedicated alerting yet.)
- **No type safety**: Would a stricter TypeScript type have prevented the bad code from compiling? (e.g., a `OwnerScoped<T>` type that requires a derived owner field)
- **No lint rule**: Could an ESLint rule have caught the pattern (e.g., flag `process.env.NEXT_PUBLIC_*` references in server-side files when the value looks like a secret)?
- **Manual QA gap**: Was there a manual testing step that would have caught this? Was it skipped or not defined?
- **No cost alarm**: Did an OpenAI / Amadeus bill spike before anyone noticed?

## 5. Preventive Measures

For each proposed measure, classify its strength:

### Guardrails (strongest — makes the mistake impossible)
- Type system changes that won't compile if wrong
- Amplify Data auth rules that enforce owner filtering at the schema level
- DynamoDB conditional writes (e.g., optimistic locking via version field)
- Zod validation that rejects bad input at the boundary
- Server-only modules / `import 'server-only'` to prevent accidental client bundling of secrets
- Lambda concurrency / reserved-concurrency limits to cap cost blast radius

### Safety Nets (medium — catches the mistake before production)
- Automated test that reproduces this exact failure
- CI check or pre-commit hook
- Code review checklist item
- TypeScript strict mode catching a new class of errors
- Canary deploy / feature flag gating

### Alarms (weakest — detects the mistake in production quickly)
- CloudWatch log pattern to watch for
- Daily cost-anomaly check on OpenAI / Amadeus / Booking spend
- Synthetic monitor that exercises the booking funnel
- Error tracking integration (when added)
- Manual spot-check procedure

**Prefer guardrails > safety nets > alarms.** An alarm means the bug already hit production.

For each measure, also note:
- **Effort**: How hard is this to implement? (trivial / moderate / significant)
- **Scope**: Does this prevent just this bug, or an entire class of bugs?
- **Tradeoff**: What does this cost? (build time, developer friction, runtime performance, $/month)

## 6. Pattern Recognition

Zoom out from this specific bug:

- **Is this a one-off, or part of a pattern?** Search the codebase for similar code that might have the same vulnerability. Use Grep to find analogous patterns.
- **Has this class of bug happened before?** Check git history for similar fixes.
- **What category does this fall into?**
  - User isolation failure
  - Auth / authorization gap
  - Input validation miss
  - Race condition / concurrency bug
  - External API assumption (response shape, rate limit, auth flow)
  - Secret leakage (client bundle, logs, error responses)
  - Stale data / cache invalidation
  - Silent background failure
  - Type coercion surprise (float prices, date strings, AI output)
  - Cost / quota runaway

## 7. Skill & Documentation Updates

Should any of our existing tools be updated based on this incident?

- **nuwai-security**: Should a new check be added to the audit checklist?
- **nuwai-qa**: Should a new test case category or specific test case be added?
- **nuwai-adversary**: Should a new attack vector be added?
- **nuwai-think**: Should a new constraint or consideration be added to the analysis template?
- **CLAUDE.md / AGENTS.md**: Should a new "Don't" or critical rule be added?
- **docs/**: Should any architecture / decision doc be updated with a new gotcha or pattern?

For each update, write the specific text to add — not just "update the security skill." Provide the exact checklist item, test case, or documentation paragraph.

---

## Summary

End with:
- **Root cause** (one sentence)
- **Fix applied** (one sentence — what was changed)
- **Systemic lesson** (one sentence — the generalizable takeaway)
- **Top preventive measure** (the single highest-value action to prevent recurrence)
- **Confidence**: How confident are you that the root cause is correct and the fix is complete? (High / Medium / Low — and why)
