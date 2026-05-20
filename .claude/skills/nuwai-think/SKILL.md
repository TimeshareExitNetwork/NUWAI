---
name: nuwai-think
description: Deep analysis before writing code -- maps the problem space, identifies tradeoffs, evaluates approaches, and produces an implementation plan. Use when facing a complex feature or non-obvious problem.
argument-hint: [problem or feature to analyze]
disable-model-invocation: true
---

# Think First, Code Never (In This Skill)

Do NOT write any code. You are in analysis mode only. For $ARGUMENTS, produce a structured analysis document.

Before analyzing, **read the relevant source code**. Don't reason from memory or assumptions — open the files, check the schema, trace the data flow. Every claim about "how it works today" should be backed by something you actually read.

**Read `node_modules/next/dist/docs/` for any Next.js feature you touch.** This project is on Next.js 16 — App Router conventions differ from Next.js 14/15.

---

## 1. Problem Definition

- **What exactly are we solving?** Restate the problem precisely. Strip away ambiguity.
- **Who is affected?** Which user types (anonymous visitor, authenticated customer, internal admin)? Which surface (marketing site, member dashboard, AI trip planner, booking flow)?
- **What does success look like?** Concrete, observable outcomes.
- **What does failure look like?** Not just "it breaks" — what specific bad outcome are we preventing?
- **Constraints:**
  - **Technical**: Next.js 16 App Router (RSC by default, Server Actions, route handlers). AWS Amplify Gen 2 backend — Cognito auth, Amplify Data (DynamoDB-backed GraphQL), Lambda functions for external API calls. No long-running server processes; Lambda timeouts (default 3s, max 15min).
  - **External APIs**: Booking.com Demand (hotels — partner-gated), Amadeus Self-Service (flights — sandbox + prod), OpenTable (directory + widget redirects, no booking API for non-partners), OpenAI (trip planning — rate limits + cost per call).
  - **Secrets**: All API keys live in Amplify environment/secrets — never the client bundle. `NEXT_PUBLIC_*` is shipped to the browser.
  - **Data model**: Amplify Data schema defines models. DynamoDB single-table mindset — design access patterns, not relational joins. Cognito user pool is the source of truth for identity.
  - **Booking surface**: We aggregate; many bookings redirect to supplier sites (affiliate links). Track conversions, not transactions, where we can't see the charge.
  - **Cost control**: Every OpenAI / Amadeus / Booking call costs money or quota. Cache aggressively where prices allow; never loop API calls without a hard cap.

## 2. Current State

Read the codebase to map what exists:

- **Related Amplify Data models**: Which models in `amplify/data/resource.ts` are involved? What are their authorization rules and access patterns?
- **Related Lambda functions**: What functions in `amplify/functions/` already exist for this domain? What APIs do they wrap?
- **Related routes**: What pages/route handlers exist? Check `src/app/` for the relevant paths.
- **Related UI components**: Check `src/components/` — many routes share `site-chrome`, `effects`, `brand`, `ios-frame`, etc.
- **Adjacent systems**: What external APIs will this touch? (Booking.com Demand, Amadeus, OpenTable, OpenAI). What auth/data dependencies?
- **Existing patterns**: Does the codebase already have a pattern for this type of thing? (e.g., a Lambda wrapping a supplier API, a Server Action calling Amplify Data, a shared brand/chrome component). Don't invent new patterns when existing ones apply.
- **Assumptions at risk**: What does the current system assume that this change might violate?

## 3. Approach Mapping

Identify **2-3 fundamentally different approaches**. Not variations of the same idea — genuinely different mechanisms or architectures.

For each approach:

| Dimension | Analysis |
|-----------|----------|
| **How it works** | The core mechanism in 2-3 sentences |
| **What it assumes** | Hidden assumptions and dependencies that must be true |
| **Data model changes** | New Amplify Data models, fields, or auth rules required |
| **Where logic lives** | Server Component / Server Action / route handler / Lambda — and why |
| **Implementation effort** | Low / Medium / High — with a rough breakdown (frontend, Amplify schema, Lambda, integration) |
| **Operational complexity** | How hard to run, monitor, debug under Amplify hosting + Lambda |
| **External-API impact** | Which third-party APIs does this hit? Rate limits, costs, sandbox-vs-prod parity, affiliate accounting |
| **Scaling behavior** | What happens at 10x users, 100x trip-plan requests? Any unbounded loops, missing pagination, runaway OpenAI usage? |
| **Blast radius** | If this breaks: one user? one booking? all trip plans? all auth? |
| **What it makes easy later** | Doors this opens for future work |
| **What it makes hard later** | Doors this closes, migration burden it creates |
| **Risk** | Worst-case scenario and likelihood |

## 4. Recommendation

- **Which approach and why** — take a position, don't hedge
- **What we're explicitly choosing NOT to do** and why that's acceptable
- **Implementation sequence** — what order to build things in, optimized for:
  1. Validating the riskiest assumption first (especially: do we have working API access?)
  2. Having something testable as early as possible
  3. Keeping each step independently deployable (no half-finished states in production)
- **Schema changes first**: If Amplify Data schema changes are needed, call them out explicitly — they require redeploy and may need data migration.
- **Sandbox vs prod**: Which supplier APIs must be tested against sandbox first? Note any prod-only behavior.
- **What "done" looks like**: First iteration (MVP) vs. full vision. Be explicit about what's deferred and why that's okay.

## 5. Open Questions

Things that can't be answered from the codebase alone. These need Jon's input before implementation.

For each question:
- **The question** — stated clearly
- **Why it matters** — what decision it blocks or what assumption it validates
- **Default if no answer** — what you'd assume if forced to proceed without input
- **Impact of getting it wrong** — what we'd have to redo

---

## Rules

- **Don't hedge everything.** Take positions and defend them. "It depends" is not an analysis.
- **If two approaches are genuinely equivalent**, say so and recommend the simpler one.
- **Name the tradeoffs honestly** — don't minimize the downsides of your recommendation to make it look better.
- **Keep it practical.** This is a real product that will ship to real travelers. No architecture astronaut exercises.
- **Reference specific files and models.** "The data model might need changes" is useless. "We'd need to add a `savedAt` field to the `Package` model in `amplify/data/resource.ts` and update the `owner` auth rule" is useful.
- **Consider migration path.** Existing users and saved data don't disappear. If the recommendation changes a model, explain what happens to existing records.
