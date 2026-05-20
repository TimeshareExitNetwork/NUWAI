# Decision Records

Architecture decision records (ADRs) for NUWAI. Each ADR captures *why* a non-trivial choice was made so future contributors don't have to reverse-engineer the reasoning.

## Index (newest first)

- [0003 — Skip Booking.com Demand for MVP](./0003-skip-booking-demand-for-mvp.md)
- [0002 — Tech stack: Next.js 16 + AWS Amplify Gen 2](./0002-tech-stack.md)
- [0001 — Product model: membership-first](./0001-membership-model.md)

## Format

Each ADR follows the same shape:

```
# {number} — {short title}

**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded by NNNN | Deprecated
**Decided by:** {names}

## Context
What forced the decision. Constraints, prior state, alternatives considered.

## Decision
What we chose, stated as a clear sentence.

## Consequences
What this makes easier and harder going forward.
```

Don't edit accepted ADRs — supersede them with a new one and link back.
