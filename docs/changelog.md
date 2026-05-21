# Changelog

Running log of NUWAI build progress. Newest at the top. Update at the end of every working session.

---

## 2026-05-19

### Foundations
- Repo wired to `github.com/TimeshareExitNetwork/NUWAI` (force-pushed over placeholder initial commit). Cleaned up an accidental `jonmohon/nuwai` repo.
- Initial Create Next App scaffold + 16 marketing routes + components committed (`e683010`).

### Skills
- Ported and adapted 6 Claude Code skills from `pulse-frontend` to `.claude/skills/nuwai-*`: `nuwai-think`, `nuwai-adversary`, `nuwai-debate`, `nuwai-qa`, `nuwai-security`, `nuwai-postmortem`. Bodies rewritten for the NUWAI stack (Next.js 16 + AWS Amplify Gen 2 + travel domain) — original pulse-* skills were too WebJoint/cannabis-specific to use as-is.

### Decisions
- **Product model:** Membership-first (ADR 0001). Retiring the advisor-marketplace framing the scaffold was built around.
- **Tech stack:** Next.js 16 + AWS Amplify Gen 2 (Cognito + Amplify Data + Lambda) locked in (ADR 0002). Keeping the existing inline-styled component pattern — no shadcn retrofit.
- **MVP inventory:** Hand-curated, no supplier APIs in Phase 1-5 (ADR 0003). Booking.com Demand partner application filed in parallel as slow-track.

### Phase 0 — Brand & Copy Pivot
- docs/ set up with roadmap + ADRs (commit `8025b8c`).
- nuwai-* Claude skills ported (commit `8025b8c`).
- Homepage hero, manifesto, how-it-works, sample-trip section, and membership tiers repointed to the membership model. Nav, footer, root metadata, and primary CTA updated (commit `20dec2e`).

## 2026-05-20

### Phase 0 — Brand & Copy Pivot (continued)
- Data layer rewrite: `PROPOSALS` and `ADVISORS_INBOX` removed from `src/lib/data.ts`; replaced with `COLLECTIONS`, `FEATURED_STAYS`, `PERKS`, and `TIERS`. Types and content reshaped around curated stays and member perks. `DESTINATIONS`, `VIBES`, `MESSAGES`, `TESTIMONIALS` kept; `MESSAGES` and `TESTIMONIALS` content rewritten for the membership voice.
- Homepage updated to consume `FEATURED_STAYS` (`StayPreview` replaces `ProposalPreview`).
- Retired pages and components: `/advisor`, `/advisors`, `/compare`, `/trip-request` (and their components). Routes now 404 — intentional, per ADR 0001.
- `/atelier` rewritten as the Collections hub — 6 cards from `COLLECTIONS`, editorial note on the NUWAI Approved mark.
- Smoke-tested 13 live routes (all 200) and 4 retired routes (all 404).
