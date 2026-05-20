# 0002 — Tech stack: Next.js 16 + AWS Amplify Gen 2

**Date:** 2026-05-19
**Status:** Accepted
**Decided by:** Jon (founder)

## Context

The initial scaffold was created with Create Next App on Next.js 16. The backend was unspecified. A later prompt proposed AWS Amplify Gen 2 (Cognito + Amplify Data + Lambda) as the backend stack.

We also considered (briefly):
- Clerk + Supabase (Postgres) — simpler auth + relational DB, but more vendors to manage
- NextAuth + Postgres on Vercel — less infra ceremony but loses the integrated auth/data story
- Pure Next.js Server Actions + a hosted Postgres — minimal but no managed auth surface

## Decision

**Stack:**

- **Frontend:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4. Components currently use inline styles via CSS variables defined in `globals.css` — keep this pattern; do not introduce shadcn/ui (would force re-skinning the existing brand surfaces).
- **Backend:** AWS Amplify Gen 2 — backend defined in TypeScript under `amplify/`.
  - **Auth:** Cognito user pool (email + Google federated sign-in)
  - **Data:** Amplify Data (GraphQL over DynamoDB), owner-based authorization rules
  - **Functions:** Lambda (Node.js) for external API calls and webhooks
  - **Storage:** Amplify Storage (S3) for trip photos and member uploads
- **Payments (Phase 4):** Stripe — subscription products for NUWAI / NUWAI Select / NUWAI Black, webhook-driven tier sync.
- **AI:** OpenAI SDK in a dedicated Lambda function for the concierge.

**Anti-patterns (do not adopt):**
- No supplier API keys in `NEXT_PUBLIC_*` or client bundles — everything via Lambda.
- No `shadcn/ui` retrofit. Existing components use inline styles + brand tokens; adding shadcn now means re-skinning every page.
- No relational-style joins shoehorned into DynamoDB — design DynamoDB access patterns explicitly.
- No long-running background processes (Lambda timeouts cap at 15min, default 3s).
- No real-time supplier search bar (contradicts the membership brief — see ADR 0001).

## Consequences

**Easier:**
- Single-vendor backend (AWS) — fewer auth/data integration seams
- Cognito gives us federated identity (Google/Apple) out of the box
- Amplify's TypeScript-defined backend means infra-as-code lives next to product code
- Lambda-per-supplier keeps API keys server-side and isolates failure domains

**Harder:**
- DynamoDB requires designing access patterns upfront; relational habits don't transfer
- Cold starts on Lambdas serving concierge + auth flows; mitigate with provisioned concurrency on hot paths later
- Vendor lock-in to AWS Amplify (acceptable; replatforming is a known cost)
- Next.js 16 is recent — conventions differ from 14/15. Always read `node_modules/next/dist/docs/` before using a framework feature (called out in `AGENTS.md`).

**Open:**
- Whether to use Amplify Auth's hosted UI vs. building custom sign-in on top of the Amplify Auth APIs. **Default: custom UI** — the brand is too distinct for the hosted UI to fit.
- Reserved concurrency / provisioned concurrency tuning is a Phase 3+ concern.
