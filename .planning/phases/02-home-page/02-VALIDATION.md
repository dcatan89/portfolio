---
phase: 2
slug: home-page
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no Jest, Vitest, Playwright, or Cypress installed |
| **Config file** | None |
| **Quick run command** | `npx next build` (build must succeed) |
| **Full suite command** | Manual browser inspection at `localhost:3000` |
| **Estimated runtime** | ~30 seconds (build) + manual |

---

## Sampling Rate

- **After every task commit:** Run `npx next build` — zero TypeScript/build errors
- **After every plan wave:** Full manual browser pass at `localhost:3000`
- **Before `/gsd:verify-work`:** Vercel preview URL must render all sections correctly
- **Max feedback latency:** 30 seconds (build check)

---

## Per-Task Verification Map

All Phase 2 requirements are UI rendering and visual behavior. No test framework is installed.
Validation is manual visual inspection in the browser.

| Task ID | Req | Test Type | Command / Instructions | Status |
|---------|-----|-----------|------------------------|--------|
| NAV-01 | NAV-01 | Manual | Browser: navbar renders with "DJ Catan" brand + 4 nav links | ⬜ pending |
| NAV-02 | NAV-02 | Manual | Browser: click "About" → page smooth-scrolls to #about section | ⬜ pending |
| NAV-03 | NAV-03 | Manual | DevTools mobile: hamburger opens/closes menu | ⬜ pending |
| NAV-04 | NAV-04 | Manual | Browser: footer renders with GitHub, LinkedIn, Email icons | ⬜ pending |
| HERO-01 | HERO-01 | Manual | Browser: DJ's name, tagline, "View My Work" CTA visible above fold | ⬜ pending |
| HERO-02 | HERO-02 | Manual | Browser: pulsing green dot visible in availability badge | ⬜ pending |
| ABOUT-01 | ABOUT-01 | Manual | Browser: bio copy rendered in two-column layout (desktop) | ⬜ pending |
| ABOUT-02 | ABOUT-02 | Manual | Browser: photo placeholder visible at ~3:4 aspect ratio | ⬜ pending |
| PROJ-01 | PROJ-01 | Manual | Browser: card grid renders all projects from `allProjects` | ⬜ pending |
| PROJ-03 | PROJ-03 | Manual | Browser: tech stack pills visible on each project card | ⬜ pending |
| PROJ-04 | PROJ-04 | Manual | Browser: live/GitHub icon links visible on cards that have them | ⬜ pending |
| RESUME-01 | RESUME-01 | Manual | Browser: "Download Resume" button present, `href="/resume.pdf"` in DOM | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no test framework to install. Build success (`next build` exits 0) is the automated gate.

*Existing infrastructure covers all phase requirements via manual visual verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Smooth scroll | NAV-02 | CSS behavior — not automatable without browser | Click navbar link → page scrolls smoothly to section |
| Hamburger toggle | NAV-03 | Client interaction state | DevTools → mobile viewport → click ☰ → menu opens; click X → closes |
| Availability badge pulse | HERO-02 | CSS `animate-ping` visual | Open browser → verify green dot pulses |
| Card hover lift | PROJ-01 | CSS transform visual | Hover project card → translates up 4px, shadow deepens |
| Resume PDF download | RESUME-01 | File must exist | Click "Download Resume" → browser downloads `/resume.pdf` |

---

## Validation Sign-Off

- [ ] All tasks have manual verification steps documented above
- [ ] `npx next build` exits 0 after each wave
- [ ] No TypeScript errors in build output
- [ ] Manual browser pass completed at `localhost:3000`
- [ ] Vercel preview URL verified before marking phase complete
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
