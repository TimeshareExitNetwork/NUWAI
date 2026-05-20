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
- (in progress) docs/ set up with roadmap + ADRs.
