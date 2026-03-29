---
phase: 4
slug: case-studies
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no Jest, Vitest, or Playwright installed |
| **Config file** | None |
| **Quick run command** | `npx next build` (build must succeed, TypeScript errors surface here) |
| **Full suite command** | Manual browser inspection at `localhost:3000` + navigate to `/projects/[slug]` |
| **Estimated runtime** | ~30 seconds (build) + manual |

---

## Sampling Rate

- **After every task commit:** Run `npx next build` — zero TypeScript/build errors
- **After every plan wave:** Full manual browser pass at `localhost:3000`
- **Before `/gsd:verify-work`:** Visit `/projects/[slug]` on deployed Vercel preview + check 404 for non-featured slugs
- **Max feedback latency:** 30 seconds (build check)

---

## Per-Task Verification Map

| Task | Requirement | Test Type | Automated Command | Status |
|------|-------------|-----------|-------------------|--------|
| Create `app/projects/[slug]/page.tsx` + `generateStaticParams` | PROJ-02 | Build | `npx next build exits 0` | ⬜ pending |
| Update project cards to link to case study pages | PROJ-02 | Build + grep | `npx next build` + `grep "href.*projects" components/sections/Projects.tsx` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no test framework to install. Build success (`next build` exits 0) is the automated gate. All Phase 4 work is Wave 1+.

*Existing infrastructure covers all phase requirements via build gate + manual verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Case study page renders all 4 sections | PROJ-02 | Visual rendering | Navigate to `/projects/TODO-real-slug-1` → Problem, My Role, Key Decisions, Outcome visible |
| Hero image placeholder displays | PROJ-02 | Visual rendering | Page load → `aspect-video bg-muted` placeholder visible below heading |
| Back link navigates to home #projects | PROJ-02 | Navigation behavior | Click `← All projects` → lands at `/#projects` |
| Featured card is fully clickable | PROJ-02 | Interactive behavior | Click anywhere on featured project card → navigates to `/projects/[slug]` |
| Non-featured cards are NOT links | PROJ-02 | Interactive behavior | Click non-featured card → no navigation |
| Non-featured slug returns 404 | PROJ-02 | Static routing | Navigate to `/projects/project-3` → 404 page |
| Tech stack tags display on case study | PROJ-02 | Visual rendering | Case study page → tech pills visible below Outcome section |
| External links appear at bottom | PROJ-02 | Visual rendering | Case study page bottom → live/GitHub CTAs visible (or hidden if no links set) |
| Mobile layout correct | PROJ-02 | Responsive visual | DevTools mobile viewport → single column, content readable |

---

## Validation Sign-Off

- [ ] All tasks have build-gate automated verify
- [ ] Sampling continuity: `npx next build` after every task commit
- [ ] Wave 0: N/A (no missing test infrastructure — build gate suffices)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s (build gate)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
