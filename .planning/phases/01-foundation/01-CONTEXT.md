# Phase 1: Foundation - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js 15 project with the locked tech stack, wire up Vercel deployment so a production URL exists from day one, create `lib/projects.ts` as the single typed data layer, and add placeholder stubs for every future section. This phase delivers infrastructure — no visible UI beyond a working app shell.

</domain>

<decisions>
## Implementation Decisions

### Project Data Model (lib/projects.ts)
- **D-01:** Use the full data shape from day one — do not defer fields to Phase 4. Every project entry must include: `id`, `slug`, `title`, `description`, `techStack: string[]`, `links: { live?: string; github?: string }`, `featured: boolean`, and case study content fields (`problem`, `role`, `keyDecisions`, `outcome`) as strings.
- **D-02:** Ship with exactly 3 placeholder projects: 2 featured (will get full case study pages in Phase 4) + 1 non-featured (card only). This covers all UI states without over-engineering.
- **D-03:** Case study content (problem, role, keyDecisions, outcome) lives in `lib/projects.ts` as strings — no MDX, no separate files. Keeps everything in one typed file; appropriate for a portfolio this size.

### Placeholder Content
- **D-04:** All placeholder content uses DJ-flavored realistic text — real name ("DJ Catan"), a rough but real-sounding tagline, approximate bio. The deployed Vercel URL should feel like a real site, not a test fixture.
- **D-05:** Placeholder projects use real project names/titles that DJ actually plans to feature. Descriptions and case study content are placeholder text for now, but the project names are the real ones.

### Claude's Discretion
- Section stub structure (return null vs semantic shells) — Claude picks the most pragmatic approach
- Tailwind/shadcn/ui initial configuration details
- File organization conventions within app/ and components/
- metadataBase value (use a placeholder domain or localhost for now)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Spec
- `.planning/REQUIREMENTS.md` — FOUND-01 through FOUND-04 are the acceptance criteria for this phase
- `.planning/PROJECT.md` — Core constraints: Next.js (App Router), Vercel, placeholder-first content, warm & personal design intent

### Tech Stack Reference
- `CLAUDE.md` — Full recommended stack with versions, rationale, and alternatives considered. Authoritative for all package choices, import paths (e.g., `motion/react` not `framer-motion`), and configuration conventions.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — greenfield project

### Established Patterns
- None yet — this phase establishes the patterns

### Integration Points
- `lib/projects.ts` → consumed by Phase 2 project card components and Phase 4 case study pages
- `app/layout.tsx` → global font loading, metadataBase, shared layout shell
- Section stub files → directly replaced/filled in by Phase 2 work

</code_context>

<specifics>
## Specific Ideas

- DJ has real projects in mind for the 2 featured slots — the planner should leave `title` and `slug` as obvious `TODO` placeholders so DJ can fill them in before Phase 2, rather than inventing names
- The deployed Vercel URL should work immediately after Phase 1 — not a 404 or build error

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-28*
