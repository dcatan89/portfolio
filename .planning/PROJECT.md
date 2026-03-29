# DJ Catan — Personal Portfolio

## What This Is

A personal developer portfolio site built with Next.js, designed to give recruiters, freelance clients, and the general public a full picture of who DJ is and what he builds. The site balances professional credibility with genuine personality — warm, approachable, and human over polished and corporate.

## Core Value

A visitor should leave knowing exactly who DJ is, be impressed by his work, and have a clear way to reach out — all three, not one at the expense of the others.

## Requirements

### Validated

- [x] Content placeholder system — placeholders everywhere so real content can be dropped in later *(Validated in Phase 1: Foundation)*
- [x] Deployed to Vercel with custom domain support *(Validated in Phase 1: Foundation — live at https://portfolio-alpha-eight-40.vercel.app/)*
- [x] Hero section — name, tagline, CTA, availability badge *(Validated in Phase 2: Home Page)*
- [x] About section — bio, photo placeholder, two-column layout *(Validated in Phase 2: Home Page)*
- [x] Projects showcase — responsive card grid from data layer *(Validated in Phase 2: Home Page)*
- [x] Resume — downloadable PDF with placeholder *(Validated in Phase 2: Home Page)*
- [x] Responsive design — mobile hamburger nav, single-column stacking *(Validated in Phase 2: Home Page)*
- [x] Warm & personal visual design — cream palette, terracotta accent, Playfair Display headings *(Validated in Phase 2: Home Page)*

### Active

- [x] Contact section — Resend Server Action form + email/social links *(Validated in Phase 3: Contact Form)*
- [x] Project case study pages — static `/projects/[slug]` pages with full narrative *(Validated in Phase 4: Case Studies)*

### Out of Scope

- Blog / writing section — not requested, can be added in a future milestone
- Dark mode toggle — warm & personal vibe has a defined look; toggling would undermine it
- CMS integration — content will be managed in code for v1; add CMS later if needed
- Authentication or user accounts — public portfolio, no login required

## Context

- Tech stack decided: Next.js (App Router preferred), deployed to Vercel
- Content is not ready — all sections should use realistic placeholder content that's easy to swap out
- No existing codebase — greenfield project
- The "warm & personal" vibe should guide all design decisions: think human typography, soft colors, real photography placeholder slots, and writing that sounds like a person not a brand

## Constraints

- **Tech Stack**: Next.js — already decided, non-negotiable for v1
- **Hosting**: Vercel — native Next.js support, free tier, easiest deploy path
- **Content**: Placeholder-first — real content will be filled in later; don't block build on copy
- **Design**: Warm & personal — all UI decisions should serve approachability, not impress with complexity

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js for framework | User specified; Vercel-native, strong ecosystem for portfolio sites | — Pending |
| Vercel for hosting | Native Next.js support, zero-config deploys, free tier | — Pending |
| Featured projects get case study pages | Deeper storytelling for hero projects; cards for breadth | — Pending |
| No blog at launch | Not requested; adds scope without clear v1 value | — Pending |
| Placeholder-first content | User will add real content later; unblocks build | — Pending |

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-29 after Phase 4: Case Studies complete*
