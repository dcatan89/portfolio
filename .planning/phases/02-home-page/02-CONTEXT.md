# Phase 2: Home Page - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Build every visible section of the portfolio home page: Navbar, Hero, About, Projects grid, Resume, and Footer. This phase replaces the Phase 1 section stubs with fully styled, content-ready components. Contact section is Phase 3 — its stub remains in place but is not styled here.

</domain>

<decisions>
## Implementation Decisions

### Color Palette
- **D-01:** Background is warm cream/off-white — use `#FAF8F5` or equivalent (HSL approximately `36 33% 97%`). Not pure white. Update `globals.css` `--background` CSS variable to this warm value.
- **D-02:** Accent color is terracotta/burnt orange — use approximately `#C2603A` (HSL `18 55% 49%`) for CTA buttons, links, interactive highlights. Update `--primary` in `globals.css`.
- **D-03:** Body text is deep warm charcoal — use `#1C1917` (Tailwind `stone-950`) for primary text. Update `--foreground` in `globals.css`.
- **D-04:** Consistent cream background throughout all sections — no alternating section colors. Sections separated by spacing and typography only.
- **D-05:** Muted text (secondary, captions, labels) should be a warm mid-tone — approximately `#78716C` (Tailwind `stone-500`). Update `--muted-foreground`.

### Navbar
- **D-06:** Sticky navbar — fixed to top, always visible as user scrolls.
- **D-07:** Layout: "DJ Catan" logo/name on the left, anchor nav links (About, Work, Resume, Contact) on the right.
- **D-08:** Solid cream background always (same as page background `#FAF8F5`). Separated from content below with a subtle `border-bottom` using the border color variable. No transparency effect.
- **D-09:** Mobile: hamburger menu (NAV-03). Hamburger icon opens a full-width dropdown or slide-in menu with the same nav links.

### Hero Section
- **D-10:** Centered layout, full viewport height (`min-h-screen`). Name in large Playfair Display, tagline below, CTA button + availability badge below that.
- **D-11:** Primary CTA button says "View My Work" and smooth-scrolls to `#projects`.
- **D-12:** Availability badge: small pulsing green dot + "Available for work" text in a pill/chip style. Positioned near/below the CTA button.
- **D-13:** Subtle scroll indicator at the bottom of the hero — animated bouncing chevron/arrow pointing down. Invites scrolling.

### About Section
- **D-14:** Two-column layout: photo placeholder on the left, bio text on the right.
- **D-15:** Photo placeholder is a rounded rectangle portrait crop (~3:4 aspect ratio), rounded corners, warm background fill with a placeholder person/camera icon. Clear visual slot for a real headshot.
- **D-16:** On mobile, the layout stacks vertically (photo on top, bio below).

### Projects Section
- **D-17:** Card grid layout. Clean cards with subtle border + soft shadow on cream/white card surface.
- **D-18:** Hover effect: card lifts slightly (translateY -4px) and shadow deepens. Smooth CSS transition.
- **D-19:** Each card shows: project title (Playfair Display), description, tech stack tags (small pills in muted style), and links (live site icon + GitHub icon). Featured projects get a subtle "Featured" badge.
- **D-20:** The "View My Work" CTA in Hero scrolls to this section — it must have `id="projects"` (already set in stub).

### Resume Section
- **D-21:** Minimal layout — one brief intro line (placeholder: "Want the full picture? Grab my resume.") + a prominent download button.
- **D-22:** Download button links to `/resume.pdf` — file lives at `public/resume.pdf`. A placeholder PDF file should be created so the link works from day one (even if it's just a blank PDF). DJ replaces with real resume before launch.

### Footer
- **D-23:** Minimal footer: "DJ Catan" or "© 2026 DJ Catan" on the left, social icon links in the center/right.
- **D-24:** Social links: GitHub, LinkedIn, and Email (mailto). Icon-only links with hover color change to terracotta accent.

### Claude's Discretion
- Exact spacing/padding values between sections
- Specific font sizes for headings (within the Playfair Display / Inter pairing)
- Card border radius and exact shadow values
- Tailwind class order and utility composition
- How nav links highlight the active section on scroll (or skip entirely for Phase 2)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Spec
- `.planning/REQUIREMENTS.md` — NAV-01 through NAV-04, HERO-01, HERO-02, ABOUT-01, ABOUT-02, PROJ-01, PROJ-03, PROJ-04, RESUME-01 are the acceptance criteria
- `.planning/PROJECT.md` — Core value and constraints (warm & personal, placeholder-first, Next.js App Router)

### Tech Stack
- `CLAUDE.md` — Authoritative for all package versions, import paths, and conventions

### Existing Implementation
- `app/layout.tsx` — Font variables already loaded: `--font-playfair-display`, `--font-inter`
- `app/globals.css` — CSS custom properties to update (--background, --primary, --foreground, --muted-foreground)
- `lib/projects.ts` — Project data interface and placeholder data — the Projects section consumes this directly
- `components/sections/Hero.tsx` — Existing stub to replace
- `components/sections/About.tsx` — Existing stub to replace
- `components/sections/Projects.tsx` — Existing stub to replace
- `components/sections/Resume.tsx` — Existing stub to replace
- `components/sections/Contact.tsx` — DO NOT modify in Phase 2 (Phase 3 scope)
- `app/page.tsx` — Wires all sections — may need Navbar and Footer added

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/utils.ts` — `cn()` helper for conditional Tailwind classes (from shadcn/ui setup)
- Font CSS variables: `var(--font-playfair-display)` mapped to `font-display`, `var(--font-inter)` mapped to `font-body` in globals.css `@theme`

### Established Patterns
- Server Components: all existing section components are Server Components (no `'use client'`) — maintain this pattern for all Phase 2 sections EXCEPT any component needing client interactivity (hamburger menu toggle, smooth scroll)
- Import alias: `@/` maps to project root (from tsconfig.json paths)

### Integration Points
- `lib/projects.ts` exports `allProjects` and `featuredProjects` — Projects section imports directly
- `app/page.tsx` renders all sections — Navbar and Footer will be added here (or in layout.tsx if globally needed)
- Section IDs (`#hero`, `#about`, `#projects`, `#resume`, `#contact`) already set in stubs — navbar anchor links use these

</code_context>

<specifics>
## Specific Ideas

- Warm cream: `#FAF8F5` — feels like good paper, not stark white
- Terracotta accent: approximately `#C2603A` — earthy, pairs well with Playfair Display
- Charcoal text: `#1C1917` — Tailwind stone-950, warm undertone
- The animated scroll indicator in the hero should use a CSS animation (bounce) — no Motion library needed for Phase 2 (Phase 5 is where Motion animations get added)
- Photo placeholder: warm gray fill (like `#E8E4DF`) with a centered icon — signals "your photo here" clearly
- Tech stack tags on project cards: small pill badges with muted background, small font size — should not compete visually with the title/description

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. All Contact section work deferred to Phase 3 as intended.

</deferred>

---

*Phase: 02-home-page*
*Context gathered: 2026-03-28*
