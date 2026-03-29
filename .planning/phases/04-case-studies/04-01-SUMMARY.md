---
phase: 04-case-studies
plan: "01"
subsystem: case-study-pages
tags: [next.js, static-generation, routing, components]
dependency_graph:
  requires: [lib/projects.ts, components/layout/Navbar.tsx]
  provides: [app/projects/[slug]/page.tsx, components/sections/Projects.tsx]
  affects: [home page project cards, /projects/* routes]
tech_stack:
  added: [components/layout/Navbar.tsx]
  patterns: [generateStaticParams, dynamicParams=false, conditional Link wrapper]
key_files:
  created:
    - app/projects/[slug]/page.tsx
    - components/layout/Navbar.tsx
  modified:
    - components/sections/Projects.tsx
decisions:
  - "Navbar created as new component since no layout/Navbar existed — case study page needs site navigation"
  - "Featured card icon links (ExternalLink, GitBranch) omitted for featured cards to avoid nested anchor issue — case study page has full CTAs"
  - "Projects section upgraded from stub to full card grid as part of wiring task"
metrics:
  duration_minutes: 5
  completed_date: "2026-03-28"
  tasks_completed: 2
  files_changed: 3
---

# Phase 4 Plan 1: Case Study Pages Summary

Case study page with static generation and featured project card navigation wired via Next.js Link.

## What Was Built

**Task 1 — Case study page with static generation**

Created `app/projects/[slug]/page.tsx` as a Server Component:
- `generateStaticParams` returns slugs from `featuredProjects` only
- `export const dynamicParams = false` — non-featured slugs return 404
- `generateMetadata` returns `{ title, description }` using the layout `%s | DJ Catan` template
- Page renders: back link (`← All projects` → `/#projects`), title, description, 16:9 hero image placeholder, Problem, My Role, Key Decisions, Outcome sections, tech stack pills, conditional external link CTAs
- Both featured project slugs (`TODO-real-slug-1`, `TODO-real-slug-2`) are statically generated at build time

**Task 2 — Wire featured project cards**

Updated `components/sections/Projects.tsx` from stub to full implementation:
- `ProjectCard` component conditionally wraps `<article>` in `<Link href=/projects/${slug}>` when featured
- Non-featured cards render as plain `<article>` with optional icon links
- Featured cards omit icon links to avoid nested `<a>` issues (case study page has full CTAs)
- Section heading changed to "Work" per UI-SPEC copywriting contract

Also created `components/layout/Navbar.tsx` as a blocking deviation (Rule 3) — case study page required a Navbar import that didn't exist.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Created missing Navbar component**
- **Found during:** Task 1
- **Issue:** Plan referenced `import { Navbar } from '@/components/layout/Navbar'` but `components/layout/` directory did not exist
- **Fix:** Created `components/layout/Navbar.tsx` with site logo link and nav links (About, Work, Contact)
- **Files modified:** `components/layout/Navbar.tsx` (new)
- **Commit:** 4e63452

**2. [Rule 3 - Blocking] Upgraded Projects stub**
- **Found during:** Task 2
- **Issue:** `components/sections/Projects.tsx` was a 7-line stub with no ProjectCard component and no project data being rendered
- **Fix:** Built full Projects section with ProjectCard, all project data from `allProjects`, and conditional Link wrapping
- **Files modified:** `components/sections/Projects.tsx`
- **Commit:** 8e43a31

## Build Verification

```
Route (app)                                 Size  First Load JS
┌ ○ /                                      172 B         106 kB
├ ○ /_not-found                            992 B         103 kB
└ ● /projects/[slug]                       171 B         106 kB
    ├ /projects/TODO-real-slug-1
    └ /projects/TODO-real-slug-2
```

Build exits 0. Both featured slugs generated statically.

## Known Stubs

The following placeholder content exists in `lib/projects.ts` (intentional — per project spec "Placeholder-first"):
- `project.title`: "TODO — Real Project Name" (both featured projects)
- `project.slug`: "TODO-real-slug-1", "TODO-real-slug-2"
- `project.problem`, `project.role`, `project.keyDecisions`, `project.outcome`: placeholder text
- `project.links.live`, `project.links.github`: `undefined` (no CTAs rendered for now)

These are intentional placeholders per the Content Placeholder-First constraint. The page structure and routing are fully wired — real content drop-in will complete the case studies.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | 4e63452 | feat(04-01): create case study page with static generation |
| Task 2 | 8e43a31 | feat(04-01): wire featured project cards as links to case study pages |
