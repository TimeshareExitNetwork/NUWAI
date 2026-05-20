---
name: nuwai-debate
description: Analyze a decision from multiple expert viewpoints — architect, QA engineer, security engineer, end user, and ops/SRE. Use before making significant architecture or implementation decisions.
argument-hint: [decision or question to debate]
disable-model-invocation: true
---

# Multi-Perspective Decision Analysis

For the topic in $ARGUMENTS, conduct a structured debate between five expert perspectives. Each perspective is grounded in NUWAI's realities — Next.js 16 frontend, AWS Amplify Gen 2 backend (Cognito + Amplify Data on DynamoDB + Lambda), AI-assisted travel aggregator pulling from Booking.com Demand, Amadeus, OpenTable, and OpenAI.

---

## The Panel

### 1. Platform Architect

Thinks about: system design, scalability, maintainability, tech debt, pattern consistency, future extensibility.

**NUWAI-specific concerns:**
- Does this fit the App Router conventions of Next.js 16, or fight them? (RSC by default, Server Actions for mutations, route handlers for webhooks/integrations)
- Should this run as a Server Action, a route handler, or a separate Lambda function in `amplify/functions/`? What's the latency vs. observability tradeoff?
- Does the Amplify Data schema model this cleanly, or are we wedging a relational pattern into DynamoDB?
- How does this interact with supplier-API caching strategy? (Hotel prices stale fast; airport metadata stale slow.)
- Does it follow existing patterns (Lambda wrappers per supplier, shared site chrome, brand tokens)?

Asks: "Does this fit the system we're building? What does this look like at 10x traffic? Does it create a new pattern or follow an existing one?"

### 2. QA Engineer

Thinks about: edge cases, failure modes, testability, regression risk, data integrity.

**NUWAI-specific concerns:**
- What happens when one supplier API is down — does the trip plan still produce results, or does it fail entirely?
- How do we test against supplier sandboxes vs. prod? Are sandbox responses representative?
- Does this handle Amplify Data eventual consistency correctly (a write followed immediately by a read on a GSI may not see the new record)?
- What happens when OpenAI returns malformed JSON despite a structured-output schema?
- Are Lambda timeouts respected — does the function fail fast, or hang and time out at the gateway?
- Does the auth flow handle expired Cognito tokens, refresh failures, and cross-tab session changes?

Asks: "How do I break this? What happens when one of four external APIs misbehaves? What if the AI lies?"

### 3. Security Engineer

Thinks about: attack surface, data exposure, user isolation, input validation, auth boundaries.

**NUWAI-specific concerns:**
- Does every Amplify Data operation rely on `owner`-based auth rules (or equivalent), not client-supplied user IDs?
- Are all supplier API keys server-side only (Lambda env / Amplify secrets) — never bundled into `NEXT_PUBLIC_*` or echoed in responses?
- Is the OpenAI prompt construction safe from injection — does user input ever override the system prompt or get the model to produce attacker-controlled affiliate links?
- Are Server Actions guarded against unauthenticated invocation? (They're publicly callable HTTP endpoints.)
- Does input validation happen at the boundary with Zod or equivalent, before any DB write or external call?
- Is PII (passenger names, DOB, payment info if we ever take it) handled per privacy commitments?

Asks: "How would I exploit this? What data leaks if this goes wrong? Can one user see another user's saved trips?"

### 4. End User

The persona shifts based on context:
- **Anonymous visitor**: Browsing the marketing site, doing a sample search, considering signing up
- **Authenticated member**: Logged in via Cognito, saving packages, refining trips with the AI planner, booking through supplier redirects
- **Internal admin** (future): Reviewing aggregated activity, moderating AI outputs, managing curated destinations

Thinks about: usability, perceived speed, error recovery, trust.

**NUWAI-specific concerns:**
- Does this add friction to the search-to-book funnel? Every extra step costs conversion.
- Is the UI consistent with existing brand tokens (`brand.tsx`, `site-chrome.tsx`, `effects.tsx`)?
- What happens when the AI plan is wrong — can the user correct it, or do they start over?
- Are prices clearly attributed to the supplier (and any caveats — taxes, fees, FX) so we maintain trust?
- Is loading state handled when supplier APIs are slow (skeleton states, progressive results, streaming)?
- Does the affiliate redirect feel intentional, not jarring? Does the user know they're leaving NUWAI?

Asks: "Is this confusing? Do I trust the result? What happens if I made a mistake — can I undo?"

### 5. Ops / SRE

Thinks about: deployment risk, monitoring, rollback, schema migrations, cost, blast radius.

**NUWAI-specific concerns:**
- Does this require an Amplify Data schema change? What's the migration story for existing records?
- Does this add a new Lambda function or modify cold-start behavior on an existing one?
- Are external API failures observable (CloudWatch logs, metrics, alarms)? Or do they fail silently?
- What's the cost impact? OpenAI per-token, Amadeus per-search, Booking.com per-request — each new code path can change the bill.
- Are we caching aggressively where it's safe (airport metadata: yes; live prices: no)?
- What's the blast radius? Does a bug here break one user, one supplier integration, or the whole search experience?
- Can this be feature-flagged or canary-released, or is it a big-bang deploy?

Asks: "Can I deploy this safely? What breaks at 2am? How do I know something is wrong? What does it cost?"

---

## Debate Format

For each perspective:

1. **Position** -- Their stance on the decision (support, oppose, or conditional)
2. **Key concern** -- The one thing that matters most to them
3. **Challenge to others** -- Where they disagree with another perspective
4. **Non-negotiable** -- What they refuse to compromise on

---

## Synthesis

After all perspectives are heard:

- **Points of agreement** -- Where all perspectives align
- **Unresolved tensions** -- Real tradeoffs that can't be eliminated, specific to NUWAI's architecture
- **Recommended approach** -- What to do, acknowledging the tradeoffs
- **Risk register** -- What could go wrong and how to mitigate (include blast radius: single user / single supplier / global)
- **Implementation checklist** -- Concrete next steps based on the recommendation

---

## Ground Rules

- No perspective gets to "win" by default. The architect doesn't outrank the QA engineer.
- If perspectives agree too easily, push harder — real decisions have real tradeoffs.
- The synthesis must acknowledge what we're giving up, not just what we're gaining.
- If the decision is actually simple and all perspectives agree, say so briefly and don't manufacture fake conflict.
- Ground every argument in NUWAI's actual architecture — no hypothetical "what if we were Expedia" scenarios.
- Reference specific files, models, or systems from the codebase when relevant to make arguments concrete.
