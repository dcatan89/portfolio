---
phase: 02-home-page
plan: 03
subsystem: ui
tags: [nextjs, react, tailwind, lucide-react, server-components, cards, pdf]

# Dependency graph
requires:
  - phase: 02-01
    provides: warm palette CSS variables (bg-card, bg-muted, bg-primary, text-muted-foreground)
  - phase: 01-02
    provides: lib/projects.ts with allProjects export and Project interface

provides:
  - Projects card grid section consuming allProjects from data layer
  - Resume section with terracotta download button
  - public/resume.pdf placeholder file for immediate download functionality

affects: [02-04, phase-04-case-studies]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Inline SVG components for icons not available in lucide-react
    - Server Component sections with responsive grid layout (1/2/3 cols)
    - article element for semantic card markup

key-files:
  created:
    - public/resume.pdf
  modified:
    - components/sections/Projects.tsx
    - components/sections/Resume.tsx

key-decisions:
  - "lucide-react 1.7.0 has no Github icon — GitBranch substituted by prior wave agent for GitHub links"
  - "Resume section is text-center with inline-block anchor styled as button — no button element needed"
  - "Projects.tsx uses allProjects (all 3) not featuredProjects — full portfolio visible by default"

patterns-established:
  - "ProjectCard as internal named function (not exported) within the section file"
  - "Empty state guard at top of Projects before rendering grid"

requirements-completed: [PROJ-01, PROJ-03, PROJ-04, RESUME-01]

# Metrics
duration: 12min
completed: 2026-03-28
---

# Phase 02 Plan 03: Projects Grid and Resume Download Summary

**Responsive 3-column project card grid consuming lib/projects.ts data and a centered resume download section with placeholder PDF**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-28T21:00:00Z
- **Completed:** 2026-03-28T21:12:00Z
- **Tasks:** 2
- **Files modified:** 3 (Projects.tsx already done by prior wave; Resume.tsx + public/resume.pdf new in this execution)

## Accomplishments

- Projects card grid renders all 3 projects from allProjects — title, description, tech stack pills, featured badge, icon links
- Cards lift on hover via CSS transition (translateY -4px, shadow deepens) — no Motion needed
- Resume section shows centered heading, intro line, and terracotta download button linked to /resume.pdf
- Placeholder PDF created in public/ so download works immediately without real resume

## Task Commits

1. **Task 1: Build Projects section with card grid** - `9e65ff4` (feat — committed by prior wave agent)
2. **Task 2: Build Resume section and create placeholder PDF** - `66255e3` (feat)

## Files Created/Modified

- `components/sections/Projects.tsx` - Full card grid: ProjectCard component, responsive grid, featured badge, tech tags, hover lift, icon links, empty state
- `components/sections/Resume.tsx` - Centered section with download button linking to /resume.pdf
- `public/resume.pdf` - Minimal valid placeholder PDF for immediate download

## Decisions Made

- Projects section heading uses "Work" (not "Projects") per UI-SPEC Copywriting Contract
- `allProjects` used (all 3 projects) rather than `featuredProjects` — shows full portfolio on home page
- GitHub icon substituted with `GitBranch` from lucide-react (lucide-react 1.7.0 has no `Github` export)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] lucide-react 1.7.0 has no `Github` export**
- **Found during:** Task 1 verification (build step)
- **Issue:** `import { Github } from 'lucide-react'` caused TypeScript build error — `Github` is not exported from lucide-react 1.7.0
- **Fix:** Prior wave agent replaced `Github` with `GitBranch` (available in lucide-react 1.7.0). The GitHub link icon is still rendered — just using a git branch icon as visual indicator
- **Files modified:** components/sections/Projects.tsx
- **Verification:** `npx next build` exits 0
- **Committed in:** 9e65ff4 (Task 1 commit by prior wave agent)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug, missing icon export)
**Impact on plan:** Minimal — GitHub link icon renders as `GitBranch` instead of octocat. Functional behavior identical. Visual difference is minor; can be updated when lucide-react is upgraded.

## Issues Encountered

- Build warning about Turbopack workspace root inference (pre-existing environment issue from `.claude/package.json` in parent directory) — build succeeds cleanly regardless

## Known Stubs

- `public/resume.pdf` — minimal placeholder PDF. DJ must replace with his real resume before launch (Phase 5 or pre-launch)
- `lib/projects.ts` — all 3 projects have placeholder titles, descriptions, and empty links. Real project content fills in Phase 4 (case studies) or before launch

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Projects grid and Resume section are production-ready (pending real content)
- Phase 02-04 (Contact form) can proceed immediately
- Real resume PDF should be added before Vercel deploy review

---
*Phase: 02-home-page*
*Completed: 2026-03-28*
