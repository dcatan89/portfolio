# Phase 4: Case Studies — Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Build static case study pages at `app/projects/[slug]/page.tsx` for every featured project. Visitors navigate from the project card grid on the home page into a full narrative — Problem, My Role, Key Decisions, Outcome. Pages are statically generated at build time via `generateStaticParams`. Non-featured projects do NOT get case study pages (404 on direct load is acceptable for those slugs).

The data layer (`lib/projects.ts`) already has all four content fields on the `Project` interface. The planner's job is to wire the routing, build the page component, and update the project cards — not design the data shape.

</domain>

<decisions>
## Implementation Decisions

### Page Layout
- **D-01:** Single-column prose layout — full-width content, no sidebar. Editorial feel, lets the writing breathe. Consistent with the warm & personal tone.
- **D-02:** Generous section spacing — each of the four sections (Problem, My Role, Key Decisions, Outcome) separated with `pt-12` or `pt-16` vertical gap and a Playfair Display heading (`text-2xl md:text-3xl font-bold`).
- **D-03:** Max content width constrained to `max-w-2xl` or `max-w-3xl` centered — prevents line lengths getting too long on wide screens. Same pattern as CLAUDE.md's "warm & personal" principle.

### Hero Image Slot
- **D-04:** Hero image placeholder at the top of the page, before the case study content. Styled like the About section photo placeholder — `aspect-video` (16:9 for project screenshots), `bg-muted` fill, centered icon or "Project screenshot" label. DJ swaps in a real screenshot before launch.
- **D-05:** Hero slot is full-width of the content column (not edge-to-edge). Rounded corners matching the project card style (`rounded-xl`).

### Page Structure (top to bottom)
- **D-06:** Back link at the very top — `← All projects` as a small `text-sm text-muted-foreground hover:text-primary` link back to `/#projects`. Navbar is already present but a back link improves case study UX — visitor arrived from the card and expects a clear way back.
- **D-07:** Page heading: project `title` in Playfair Display, large (`text-4xl md:text-5xl font-bold`). `description` as a subheading below in `text-lg text-muted-foreground`.
- **D-08:** Hero image placeholder below the heading.
- **D-09:** Four content sections in this order: **Problem**, **My Role**, **Key Decisions**, **Outcome**. Each with a Playfair heading and prose paragraph from the data field.
- **D-10:** Tech stack tags displayed below Outcome — reuse the same pill style as the project cards (`bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground`).
- **D-11:** External links (live site + GitHub) displayed at the bottom as CTA buttons — same styling as the Resume download button (terracotta primary for live, outlined for GitHub).

### Card → Case Study Navigation
- **D-12:** Featured project cards become fully clickable links — wrap `<article>` in `<Link href={/projects/${project.slug}}>` for featured projects only.
- **D-13:** Non-featured project cards stay as-is (no link wrapping, no case study page).
- **D-14:** Add `cursor-pointer` to the card hover state when it is a link. Existing `hover:-translate-y-1 hover:shadow-md` transition stays.
- **D-15:** No separate "Read case study →" text link needed — the whole card is the entry point.

### Routing & Static Generation
- **D-16:** Route: `app/projects/[slug]/page.tsx` — Next.js App Router dynamic segment.
- **D-17:** `generateStaticParams` exports slugs from `featuredProjects` only — non-featured slugs return 404 (`dynamicParams = false`).
- **D-18:** Page is a Server Component — no `'use client'` needed (static content, no interactivity).
- **D-19:** Metadata: `generateMetadata` exports per-page title (`{project.title} — DJ Catan`) and description (project `description` field). Covers PROJ-02's implicit requirement for navigable pages.

### Claude's Discretion
- Exact `pt-*` spacing values within the page
- Whether to add a thin horizontal rule (`<hr>`) between sections or rely on spacing alone
- Whether the back link appears inside the main content column or above it at page margin
- `next/image` placeholder dimensions for the hero slot

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Spec
- `.planning/REQUIREMENTS.md` — PROJ-02 is the acceptance criteria for this phase
- `.planning/PROJECT.md` — Core value, warm & personal principle, placeholder-first content

### Tech Stack
- `CLAUDE.md` — Authoritative for Next.js App Router patterns (`generateStaticParams`, `generateMetadata`), `next/image` usage

### Existing Implementation
- `lib/projects.ts` — Project interface and data array (already has `problem`, `role`, `keyDecisions`, `outcome` fields, `slug`, `featured` flag)
- `components/sections/Projects.tsx` — Existing project card component and hover/link styles to match
- `components/sections/About.tsx` — Reference for photo placeholder pattern (adapt for hero image slot)
- `components/sections/Resume.tsx` — Reference for terracotta CTA button style (reuse for case study links)
- `app/globals.css` — CSS variable tokens in use
- `app/layout.tsx` — Root layout (Navbar already injected globally — no need to add per-page)

</canonical_refs>

<specifics>
## Specific Notes

- The `slug` field on placeholder projects is `TODO-real-slug-1` etc — the planner should note this as a content swap that DJ needs to do before launch, but it should NOT block the build (static generation skips slugs with `TODO` prefix or generates them as-is — either approach is fine, planner decides)
- `featuredProjects` is already exported from `lib/projects.ts` — use it for `generateStaticParams`
- The case study page is entirely Server Component — data comes from `lib/projects.ts` at build time, no API calls
- Navbar is already present globally via `app/layout.tsx` — do not add it again inside the page

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. The following were not raised:
- Comments / reactions on case studies — future phase
- MDX / CMS-driven case study content — future phase
- Search or filtering of case studies — future phase

</deferred>

---
*Phase: 04-case-studies*
*Context gathered: 2026-03-28 — layout (single-column prose + hero slot + whole-card link) chosen by user; navigation, section order, and routing at Claude's discretion*
