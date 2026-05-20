# 0003 — Skip Booking.com Demand API for MVP

**Date:** 2026-05-19
**Status:** Accepted
**Decided by:** Jon (founder)

## Context

The Amplify Gen 2 prompt asked for a multi-supplier aggregator across Booking.com Demand, Amadeus Self-Service, and OpenTable. The luxury membership brief contradicts that — it explicitly rejects "real-time search engine" framing.

Beyond brand fit, the supplier APIs have practical issues for an MVP:

- **Booking.com Demand API** is gated. Partner application can take weeks to months. There is no self-service signup. Without it, we have no real-time hotel inventory.
- **Amadeus Self-Service** is accessible (sandbox + prod), but flights aren't core to a curated stays product at MVP — they're a v2 add-on.
- **OpenTable** does not offer a public booking API for non-partners. The "Directory API" is a directory + widget redirects only.

The membership model doesn't require any of these for v1 because the inventory is **curated, editorial content**, not search results.

## Decision

**MVP ships with hand-curated inventory only. No supplier APIs in Phase 1–5.**

- Properties live in the Amplify Data `Property` model, populated editorially.
- The "NUWAI Approved" badge is editorial endorsement, not API-sourced.
- Member rates and perks are negotiated/declared per property in the data model, not pulled from a supplier feed.
- Booking flow ends with a `BookingIntent` written to DynamoDB; the concierge follows up manually to complete the booking through editorial-side partner relationships.

**Booking.com Demand partner application** is filed in parallel as a slow-track. If approved during Phase 4-5, integration becomes a v2 feature for live inventory parity.

**Amadeus and OpenTable** stay parked. Revisit when the product has product-market fit and members are asking for flights or restaurant booking.

## Consequences

**Easier:**
- No blocker on shipping MVP — we don't wait for partner approval
- Editorial control over inventory quality (the moat)
- No client-side noise about price freshness, availability windows, or supplier outages
- One fewer external-API failure mode in the booking funnel

**Harder:**
- Inventory growth is limited by editorial bandwidth (initially Jon hand-picks 30-50 properties)
- "Member rate" claims need to be honored manually until live API integration
- Some Booking.com Demand application work happens anyway in case we want it in v2

**Reversibility:** High. The `Property` model can be extended later to include a `supplierIds` field for live-API hydration without disrupting curated entries.
