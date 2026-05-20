# 0001 — Product model: membership-first

**Date:** 2026-05-19
**Status:** Accepted
**Decided by:** Jon (founder)

## Context

The product brief describes NUWAI as a luxury members-only travel access platform — curated stays, member rates, perks, concierge — modeled on Soho House + Amex Platinum, explicitly *not* like Booking.com or Expedia.

The initial scaffold (16 marketing pages, components, sample data) had been built around a different concept: an **advisor marketplace** where members submit a brief and three advisors compete with proposals. Copy throughout the site reflected this — "One brief in. Three private plans out", `/compare`, `/atelier`, `/advisors`, and `PROPOSALS` data shaped for advisor-authored trips.

A second prompt later asked for an AWS Amplify Gen 2 build framed as "an AI-powered travel aggregator similar to Booking.com." This contradicted the membership brief.

Three options were considered (see `/nuwai-think` analysis 2026-05-19):

- **A. Membership-first** — paid tiers unlock curated inventory, perks, AI concierge
- **B. Marketplace-first** — two-sided (members + advisors), advisors craft proposals
- **C. Hybrid** — membership wrapper over a lightweight advisor handoff for premium tier

## Decision

**Membership-first (Approach A).**

NUWAI is a paid membership platform. Members get:
- Access to a curated catalog of "NUWAI Approved" properties (editorial inventory, hand-selected)
- Member rates and perks at those properties
- An AI-backed concierge that helps refine plans (with human escalation as needed)
- Tiered benefits: NUWAI / NUWAI Select / NUWAI Black
- Saved stays, booking intent, personalized recommendations

NUWAI is not:
- A travel agent marketplace
- A real-time multi-supplier aggregator with a search bar (the explicit anti-pattern in the brief)
- A timeshare or OTA

## Consequences

**Easier:**
- Faster path to revenue (subscription monetization once Stripe ships in Phase 4)
- No two-sided cold-start problem (we don't need to recruit advisors and members in parallel)
- Editorial brand control — curated inventory is the moat
- Lower near-term dependency on gated supplier APIs (Booking.com Demand partner status is nice-to-have, not blocking)
- Existing brand tokens, fonts, and most marketing pages already align — limited rework

**Harder:**
- Curated inventory requires ongoing editorial work; stale curation = churn
- Members expect concierge to feel white-glove — AI quality bar is high
- Tiers require Stripe + webhook reliability before paid features unlock
- If we ever pivot to true marketplace dynamics, the data model has to grow

**Retired from the prior scaffold:**
- `/advisor`, `/advisors`, `/compare` — to be removed in Phase 0
- `/atelier` — repurposed as the editorial "Curated by NUWAI" collections hub
- `PROPOSALS` and `ADVISORS_INBOX` data structures — replaced with `COLLECTIONS`, `PROPERTIES`, `PERKS`, `TIERS`
- "One brief in. Three private plans out." metadata copy

**Premium custom-plan handoff (Approach C)** is not in MVP scope, but the architecture should not foreclose adding it for Black-tier members in v2.
