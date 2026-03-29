---
phase: 05-polish-launch
plan: 02
subsystem: seo-metadata
tags: [seo, open-graph, twitter-cards, sitemap, robots, og-image]
dependency_graph:
  requires: []
  provides: [open-graph-metadata, twitter-cards, sitemap, robots-txt, og-image]
  affects: [app/layout.tsx, app/page.tsx, app/projects/[slug]/page.tsx]
tech_stack:
  added: []
  patterns: [Next.js Metadata API, generateMetadata, MetadataRoute.Sitemap, MetadataRoute.Robots]
key_files:
  created:
    - app/projects/[slug]/page.tsx
    - app/sitemap.ts
    - app/robots.ts
    - public/og.png
  modified:
    - app/layout.tsx
    - app/page.tsx
decisions:
  - "OG image generated with Node sharp (inline script, no canvas dep) — sharp was already available as a Next.js transitive dep, no install needed"
  - "Case study page created from scratch in worktree since Phase 4 work was on master branch not yet in this worktree branch"
metrics:
  duration_minutes: 8
  completed_date: "2026-03-29"
  tasks_completed: 2
  files_changed: 6
---

# Phase 05 Plan 02: SEO Metadata, Open Graph, Sitemap, and Robots Summary

**One-liner:** Complete SEO metadata layer with OG/Twitter cards using Next.js Metadata API, static 1200x630 warm-palette OG image generated via sharp, sitemap with all routes, and robots.txt for full crawlability.

## What Was Built

### Task 1: Metadata, Sitemap, Robots (commit b81fb4a)

Extended `app/layout.tsx` global metadata with:
- `openGraph`: type website, title, description, URL, og.png image (1200x630)
- `twitter`: summary_large_image card with og.png
- `robots`: index=true, follow=true

Added page-level `export const metadata` to `app/page.tsx` with home-specific title "DJ Catan — Full-Stack Developer" that overrides the layout default via the `%s | DJ Catan` template.

Created `app/projects/[slug]/page.tsx` (full case study page with generateMetadata) returning project-specific openGraph metadata with `type: 'article'` and project title/description.

Created `app/sitemap.ts` — returns MetadataRoute.Sitemap with:
- Home page (priority 1, changeFrequency monthly)
- All featured project slugs from lib/projects.ts (priority 0.8)

Created `app/robots.ts` — returns MetadataRoute.Robots with:
- userAgent '*' allow '/'
- sitemap pointer to /sitemap.xml

### Task 2: Static OG Image (commit ae1c3a6)

Created `public/og.png` at 1200x630 pixels:
- Background: warm cream #FAF8F5 (matches site background)
- Left accent bar: 8px wide, full height, terracotta #C4704B
- "DJ Catan" bold serif title at 84px, dark #1C1917
- Terracotta underline accent below title
- "Full-Stack Developer" subtitle at 32px, muted #78716C

Generated inline using Node.js + sharp (available as Next.js transitive dep) via an SVG-to-PNG conversion — no leftover script, no canvas dependency added.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Missing file] Created case study page from scratch in worktree**
- **Found during:** Task 1
- **Issue:** The worktree branch `worktree-agent-aa6a4570` branched from Phase 3 (master). Phase 4 case study page `app/projects/[slug]/page.tsx` only existed on the master branch, not in this worktree branch.
- **Fix:** Created the complete case study page in the worktree with all Phase 4 content plus the new OG metadata required by this plan.
- **Files modified:** app/projects/[slug]/page.tsx (created)
- **Commit:** b81fb4a

**2. [Rule 2 - Alternative method] Used sharp instead of canvas for OG image**
- **Found during:** Task 2
- **Issue:** Plan suggested canvas as primary method, noting sharp as alternative. sharp was already available as a Next.js transitive dependency — no install required.
- **Fix:** Used sharp with SVG-to-PNG conversion inline in a shell script (no file saved to project).
- **Impact:** Cleaner — no install/uninstall cycle, no leftover script.

## Known Stubs

None. The OG image uses placeholder content ("DJ Catan" / "Full-Stack Developer") which is the intended final content. All metadata descriptions are production-ready placeholders consistent with the portfolio content strategy.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | b81fb4a | feat(05-02): add SEO metadata, OG/Twitter tags, sitemap, robots, and case study page |
| 2 | ae1c3a6 | feat(05-02): add static OG image 1200x630 with warm cream palette |

## Self-Check: PASSED

- [x] app/layout.tsx contains openGraph, twitter, robots metadata
- [x] app/page.tsx contains export const metadata
- [x] app/projects/[slug]/page.tsx contains generateMetadata with openGraph type: 'article'
- [x] app/sitemap.ts exists with MetadataRoute.Sitemap and featuredProjects
- [x] app/robots.ts exists with MetadataRoute.Robots and allow: '/'
- [x] public/og.png exists as valid 1200x630 PNG
- [x] package.json has no canvas dependency
- [x] No generation scripts left in project
- [x] Commits b81fb4a and ae1c3a6 exist
