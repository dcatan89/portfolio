# Portfolio Improvement Plan — Launch Readiness & Post-Launch
**Agent:** Megumi (Planner)
**Date:** 2026-04-21
**Task:** Audit launch blockers, produce prioritized improvement plan, and define post-launch phases
**Confidence:** High
**Status:** Complete

## Key Findings

- The site is structurally complete and technically polished — all 5 phases of v1.0 are done at the code level. The only thing separating the portfolio from being useful to recruiters is real content.
- ALL 3 projects in `lib/projects.ts` contain placeholder data (titles, descriptions, tech stacks, slugs, case study copy). This is the single biggest launch blocker — the site is built around showcasing work, and there is no work shown.
- The About section has no headshot. A real photo dramatically increases recruiter engagement vs. a placeholder icon.
- The contact form will silently fail in production until `RESEND_API_KEY` is configured in Vercel. There is no UI fallback beyond the raw email address.
- The Footer mailto points to `hello@djcatan.com`; the Contact section and server action use `danieljcatan@gmail.com`. This inconsistency signals incompleteness to careful reviewers.
- Phase 5 Plan 3 (responsive visual verification) has never been executed — the site has not received a human sign-off pass before sharing with recruiters.

---

## Launch Blockers (Must Fix Before Sharing)

These block the site from being useful. Fix them in this order.

### BLOCKER 1 — Real project data in `lib/projects.ts` [CRITICAL]
**File:** `/lib/projects.ts`
**Problem:** All 3 entries have `TODO` titles, placeholder descriptions, placeholder slugs, and all case study fields are filler text. The Projects grid and all case study pages render placeholder copy verbatim.
**Fix:** Replace all 3 project entries with real project data:
- Real title, one-line description, accurate tech stack array
- Real slug (e.g. `'project-name'` not `'TODO-real-slug-1'`)
- Real GitHub and/or live URLs if available (set to `undefined` if not public)
- For the 2 featured projects: write real Problem, Role, Key Decisions, and Outcome paragraphs
**Effort:** 1–3 hours (writing/gathering, not coding)
**Verify:** Visit `/` — project cards show real titles. Visit `/projects/[slug]` — case study copy is real.

### BLOCKER 2 — RESEND_API_KEY not set in Vercel [CRITICAL]
**Problem:** `app/actions/contact.ts` guards on `process.env.RESEND_API_KEY` and returns `{ success: false, error: 'Configuration error' }` if missing. A recruiter submitting the contact form sees an error. DJ receives nothing.
**Fix:**
1. Create a Resend account at resend.com if not done.
2. Generate an API key in the Resend dashboard.
3. Add it to Vercel: `Settings → Environment Variables → RESEND_API_KEY`.
4. Redeploy (env var changes require a new deployment).
5. Send a real test submission from a mobile device; confirm the email arrives.

**Additional note on the `from` address:** The server action currently sends `from: 'Portfolio Contact <onboarding@resend.dev>'`. This is Resend's sandbox address which only delivers to verified emails. In production, change this to a verified domain address (e.g., `hello@djcatan.com`) after verifying a domain in Resend. Until then, emails only deliver to `danieljcatan@gmail.com` (your verified address), which is fine for v1 launch.
**Effort:** 30 minutes (account setup + env var)
**Verify:** Submit the contact form on the live site and confirm email arrives in Gmail.

### BLOCKER 3 — Footer email inconsistency [MINOR but visible]
**File:** `/components/sections/Footer.tsx`, line 56
**Problem:** `href="mailto:hello@djcatan.com"` — but `hello@djcatan.com` may not be set up yet. The Contact section shows `danieljcatan@gmail.com`. A recruiter clicking the footer email icon gets a different address than the contact section.
**Fix option A (recommended):** Change the footer mailto to `danieljcatan@gmail.com` to match until `hello@djcatan.com` is live.
**Fix option B:** Set up email forwarding on `hello@djcatan.com` and keep it — more professional in the long run.
**Effort:** 5 minutes for option A

### BLOCKER 4 — Responsive visual verification (Phase 5 Plan 3) never run [MODERATE]
**Problem:** Phase 5 Plan 3 exists but was never executed — no human has verified the animated, SEO-complete site across 375px, 768px, and 1280px before sharing it.
**Fix:** Execute the checklist in `.planning/phases/05-polish-launch/05-03-PLAN.md`. This is a manual pass, not a coding task. Takes ~30 minutes.
**Effort:** 30 minutes (human verification, no code changes expected)

---

## Content Gaps (Ship Soon After Launch)

These don't block launch but visibly weaken the portfolio's impact.

### GAP 1 — No real headshot in About section
**File:** `/components/sections/About.tsx`
**Problem:** The About section renders a `<User />` lucide icon in a rounded rectangle. Profiles without photos get 14× fewer profile views on LinkedIn (same principle applies to portfolios). A real photo makes DJ a person, not a template.
**Fix:** 
1. Add a high-quality headshot to `/public/headshot.jpg` (or `.webp`).
2. Replace the placeholder `<div>` in `About.tsx` with a `next/image` `Image` component.
3. Use `aspect-[3/4]`, `fill`, and an appropriate `sizes` prop.
**Effort:** 30 minutes (once photo is chosen)
**Priority:** Extremely high. Do this immediately after launch.

### GAP 2 — Hero tagline is generic
**File:** `/components/sections/Hero.tsx`, line 19
**Current copy:** `"Full-stack developer building thoughtful digital products."`
**Problem:** This describes approximately 200,000 developers. It doesn't convey what makes DJ different — his economics background, lab experience, AI tooling fluency.
**Suggested direction:** Something that surfaces the unconventional path: `"Full-stack developer. Former lab tech. Serious about AI-native workflows."` — then let the About section fill in the story.
**Effort:** 15 minutes (copy only)

### GAP 3 — No custom domain
**Current URL:** `https://portfolio-alpha-eight-40.vercel.app/`
**Problem:** Sharing a Vercel subdomain in job applications signals "not quite launched yet." A custom domain (e.g., `djcatan.com`) is expected, cheap (~$12/yr), and takes 15 minutes on Vercel.
**Fix:**
1. Purchase domain if not owned (Namecheap, Cloudflare Registrar, etc.)
2. In Vercel: `Project Settings → Domains → Add Domain`
3. Update DNS records per Vercel's instructions
4. Update `metadataBase` in `app/layout.tsx` to the new domain
5. Regenerate OG image reference if needed
**Effort:** 30 minutes + DNS propagation time

### GAP 4 — OG image is generic
**File:** `/public/og.png`
**Problem:** The OG image was generated at build time (using `sharp`) and serves as the social preview for all pages. It works, but a more distinctive image — with a real photo or custom typography — stands out when shared on LinkedIn or via Slack.
**Defer to post-launch.** This is a polish task, not a launch blocker.

---

## Post-Launch Roadmap (v1.1 Priorities)

These items should be completed within 2 weeks of launch, in this order.

### v1.1 Phase A: Content Polish (~2 hours)
**Goal:** The portfolio shows a real person with a real story and real work.
1. Add real headshot to About section (`next/image`)
2. Sharpen Hero tagline to something specific to DJ
3. Audit all page copy (OG descriptions, case study prose) for authenticity
**Verify:** Share the live URL with one trusted person and ask "Does this feel like a real developer?"

### v1.1 Phase B: Domain & Email Setup (~1 hour)
**Goal:** Professional URLs and a working domain email.
1. Purchase and connect `djcatan.com` (or equivalent) to Vercel
2. Set up `hello@djcatan.com` forwarding or mailbox
3. Update footer mailto to `hello@djcatan.com`
4. Update Resend `from` address to `hello@djcatan.com` after domain verification in Resend
5. Update `metadataBase` in layout.tsx to the custom domain
**Verify:** `https://djcatan.com` loads the site; contact form email arrives from the custom domain.

### v1.1 Phase C: GitHub Activity Signal (~1 hour)
**Goal:** Visitors who check GitHub see a developer who actually ships code.
- If repos for the projects shown are public, make sure they are clean, have README files, and pinned to the profile.
- If repos are private, make the portfolio repo itself public — it demonstrates Next.js skills, real workflow (phases, plans, commits), and AI integration.
**Verify:** `https://github.com/dcatan89` looks like an active developer, not a ghost account.

---

## Scope Explicitly Out (for v1.x)

Per `PROJECT.md` prior decisions — these remain out of scope and the reasoning still holds:

| Feature | Reason Still Valid |
|---|---|
| Blog / writing section | Adds weeks of scope; no real drafts ready; adds zero value until DJ has something to say |
| Dark mode toggle | Warm palette is the brand; a toggle creates a second design system to maintain |
| CMS integration | Content fits in code at this scale; premature abstraction |
| Auth / user accounts | No use case for v1 |

---

## Prioritized Action Checklist

### Before sharing with anyone:
- [ ] Fill in real project data in `lib/projects.ts` (BLOCKER 1)
- [ ] Set `RESEND_API_KEY` in Vercel and test contact form (BLOCKER 2)
- [ ] Fix footer email inconsistency (BLOCKER 3)
- [ ] Run the Phase 5 Plan 3 responsive verification checklist (BLOCKER 4)

### Within 48 hours of sharing:
- [ ] Add real headshot to About section (GAP 1)
- [ ] Sharpen Hero tagline (GAP 2)

### Within first 2 weeks:
- [ ] Purchase custom domain and connect to Vercel (GAP 3)
- [ ] Set up `hello@djcatan.com` forwarding or mailbox
- [ ] Update footer mailto and Resend `from` address to custom domain
- [ ] Make portfolio GitHub repo public (optional but high signal)

---

## What Makes Portfolios Convert: Research Notes

Based on what hiring managers and recruiters consistently report:

**What they actually look at:**
1. **Projects first** — they want to see real work, with real links (live site or GitHub). Placeholders destroy trust instantly.
2. **The About section** — they want to know who you are, not just what you can do. A real photo + 2 sentences of genuine personality outperforms 500 words of buzzwords.
3. **Contact clarity** — they should be able to reach you in under 10 seconds. Email visible, form that works.
4. **GitHub activity** — they open it. A green contribution graph signals consistent work. Pinned repos matter.

**Common mistakes this portfolio avoids (already):**
- Skills laundry list without proof (this site shows projects, not just a badge list) — GOOD
- No case studies (the `/projects/[slug]` pages exist) — GOOD
- No available/open to work signal (the badge in Hero) — GOOD
- Generic corporate tone (the About bio is personal) — GOOD

**Common mistakes this portfolio still has:**
- Placeholder projects (the big one)
- No photo
- Generic tagline

**On blog / writing:** Research is consistent — a blog helps SEO and signals long-term thinking, but empty or stale blogs hurt more than help. Don't add one until there are 3+ real posts ready to ship simultaneously.

**On dark mode:** No evidence it affects recruiter conversion. Skip it.
