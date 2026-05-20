# Glossary

Shared vocabulary for NUWAI. Use these terms consistently in copy, code, and decision records.

## Product

- **Member** — an authenticated user with an account. Default tier is **NUWAI**.
- **Tier** — membership level. Three tiers: **NUWAI**, **NUWAI Select**, **NUWAI Black**. Tiers gate which collections, perks, and concierge priority a member has access to.
- **NUWAI Approved** — editorial endorsement on a property. Set in the `Property` model, not derived from a supplier API.
- **Collection** — an editorial grouping of properties (e.g., "Beach Escapes", "Wellness Retreats", "City Weekends", "Remote Work Stays", "Romantic Getaways", "Members Favorites").
- **Property** / **Stay** — a curated hotel or resort in the catalog. Use "Stay" in member-facing copy; "Property" in code and admin.
- **Perk** — a member benefit attached to a property or tier (room upgrades, late checkout, complimentary breakfast, etc.).
- **Concierge** — the AI-backed chat interface that helps members refine plans. White-glove tone; human escalation behind the scenes when needed.
- **Booking intent** — a member's declaration of interest in a specific stay. Not a confirmed booking; the concierge follows up to lock it in.

## Surfaces

- **Marketing site** — public, unauthenticated pages: home, membership, destinations, journal, about, etc.
- **Member dashboard** — authenticated, personalized home: upcoming trips, saved stays, recommendations, concierge thread.
- **Member welcome / onboarding** — preference quiz after sign-up.
- **Atelier** — repurposed as the editorial "Curated by NUWAI" collections hub (was advisor-pitch page, retired).

## Stack

- **Amplify** — AWS Amplify Gen 2, our backend framework.
- **Amplify Data** — the GraphQL/DynamoDB layer where models live (`amplify/data/resource.ts`).
- **Lambda** — Amplify-defined serverless functions for external API calls and webhooks (`amplify/functions/*`).
- **Cognito** — AWS managed identity, our user pool.

## Anti-vocabulary

Do not use these in NUWAI copy:

- "Travel agent", "OTA", "aggregator", "deals", "search"
- "Submit a brief", "three plans", "advisors", "proposals", "comparison"
- "Booking.com", "Expedia", "Tripadvisor", "Kayak" (avoid even as references)
- "Cheap", "discount", "bargain" (member savings are framed as "member rates", "perks")
