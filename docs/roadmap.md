# NUWAI Roadmap

**Last updated:** 2026-05-19
**Status:** Phase 0 in progress

NUWAI is a members-only luxury travel platform. The phased plan below comes from the `/nuwai-think` analysis on 2026-05-19. Each phase is independently deployable.

---

## Phase 0 — Brand & Copy Pivot (in progress)

**Goal:** The marketing site commits to the membership model, end to end. No "submit a brief, get three plans" copy left anywhere.

- [ ] Rewrite homepage hero + sub-copy
- [ ] Update root metadata in `src/app/layout.tsx`
- [ ] Update nav + footer in `src/components/site-chrome.tsx`
- [ ] Repurpose or retire advisor-marketplace pages (`/advisor`, `/advisors`, `/compare`, `/atelier`)
- [ ] Refactor `src/lib/data.ts`: replace `PROPOSALS` / `ADVISORS_INBOX` with `COLLECTIONS`, `PROPERTIES`, `PERKS`, `TIERS`
- [ ] Audit all 16 marketing pages for advisor-model leftovers

**Backend touched:** None. Pure frontend pivot.

---

## Phase 1 — Amplify Gen 2 Foundation + Auth

**Goal:** A stranger can sign up, sign in, and reach a personalized member dashboard. Validates the riskiest assumption: will people sign up?

- [ ] `npm create amplify@latest` — scaffold `amplify/` directory
- [ ] `amplify/auth/resource.ts` — Cognito user pool, email + Google federated sign-in
- [ ] `amplify/data/resource.ts` — initial schema: `User`, `UserPreferences`, `SavedProperty`
- [ ] Replace static `/sign-in` with real Amplify Auth flow (custom UI on top of Amplify Auth APIs — not the default UI kit)
- [ ] New route group `(member)/` with auth-gated `dashboard/` shell
- [ ] Deploy Amplify sandbox; ship to a private preview URL

**Hand-off needed from Jon:** AWS account access, `amplify configure` run locally.

---

## Phase 2 — Onboarding + Curated Discovery

**Goal:** Members complete a preference quiz and browse curated "NUWAI Approved" properties.

- [ ] Multi-step `/welcome` onboarding (destinations, vibes, budget band, travel style, party size)
- [ ] `Property`, `Collection` Amplify Data models (curator-only mutations)
- [ ] Dynamic property detail at `/stays/[slug]` (RSC, SEO-friendly, hero photography)
- [ ] `/destinations` and `/dashboard` pull from `Collection` model
- [ ] "Save stay" action wired to `SavedProperty`
- [ ] Curate first 30-50 properties (editorial work, parallel track)

---

## Phase 3 — Concierge (AI-Backed)

**Goal:** Members chat with a white-glove concierge that helps refine trips. Brand-critical surface.

- [ ] `amplify/functions/concierge/` — Lambda calling OpenAI with strict system prompt
- [ ] Per-user daily rate limit on concierge calls (cost guard)
- [ ] Conversation summary instead of full history sent to OpenAI (token cost)
- [ ] `ConciergeThread`, `ConciergeMessage` Amplify Data models, owner-scoped
- [ ] `/concierge` page wired to the chat backend; streaming responses if supported
- [ ] Tone, response cadence, error states tuned for brand

---

## Phase 4 — Membership Tiers + Stripe

**Goal:** Members can pay. Tier gates kick in.

- [ ] Stripe products: NUWAI / NUWAI Select / NUWAI Black
- [ ] `amplify/functions/stripe-webhook/` — handle `customer.subscription.*` events
- [ ] `Subscription` Amplify Data model
- [ ] `/membership` becomes the upgrade surface (pricing, tier comparison, CTAs)
- [ ] Tier gates: which perks, which collections, concierge response priority

---

## Phase 5 — Booking Intent + Concierge Handoff

**Goal:** Members declare interest in a stay; concierge follows up to lock it in.

- [ ] `BookingIntent` model
- [ ] Concierge-side notification on new booking intents (manual by Jon initially)
- [ ] In-thread "lock in" affordance
- [ ] Hand-off doc for how concierge fulfills a booking (curated inventory partner network)

**v2:** wire Booking.com Demand API for live inventory if partner approval comes through.

---

## Deferred to v2+

- Live supplier inventory (Booking.com Demand, Amadeus, OpenTable)
- Native mobile app (PWA-quality web is the v1 target)
- Premium custom-plan advisor handoff (Approach C from analysis)
- Travel credits / wallet
- Admin CMS for curation (direct DynamoDB or minimal admin UI through v1)
- Group trips, multi-traveler shared accounts
- Internationalization, multi-currency

---

## Open questions tracked

See `decisions/` for resolved questions. Open ones below — these gate decisions in the relevant phase:

- **Q1** (Phase 0, resolved): Membership-first vs marketplace vs hybrid. **Decided:** Membership-first.
- **Q2** (Phase 3, open): Concierge — human, AI, or hybrid?
- **Q3** (Phase 4, open): Free sign-up with paid tiers, or paid from day 1?
- **Q4** (Phase 5, open): Booking.com Demand partner status — apply now or skip?
- **Q5** (Phase 2, open): Editorial pipeline for curated inventory — who picks, how often?
- **Q6** (v2, open): Native mobile app timeline.
- **Q7** (Phase 0, partial): Fate of advisor-marketplace pages (default: delete `/advisors`, `/advisor`, `/compare`; repurpose `/atelier` as editorial collections).
