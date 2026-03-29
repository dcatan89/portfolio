# Phase 5: Polish & Launch — Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Final polish pass before the site goes live: Motion scroll-reveal animations, static OG image for social sharing, SEO metadata completion, focus ring / skip-to-content accessibility, and a responsive verification checkpoint. No new sections or features — this phase makes what exists feel finished.

Requirements: POLISH-01 (animations), POLISH-02 (SEO/OG), POLISH-03 (responsive), POLISH-04 (accessibility basics).

</domain>

<decisions>
## Implementation Decisions

### Animations (POLISH-01)
- **D-01:** Install `motion` npm package (v12, `motion/react` import path per CLAUDE.md). This is the only new dependency.
- **D-02:** Scope — subtle scroll reveals on 5 sections: Hero (load animation), About, Projects, Resume, Contact. Footer stays static. Case study page sections also get fade-up.
- **D-03:** Animation pattern — `whileInView` with `viewport={{ once: true }}` so each section animates once as it enters the viewport. Prevents re-triggering on scroll back up.
- **D-04:** Values — `initial={{ opacity: 0, y: 20 }}`, `animate/whileInView={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5, ease: 'easeOut' }}`. Subtle lift, not a dramatic slide.
- **D-05:** Hero is the exception — animates on mount (not `whileInView`) since it's the first thing visible. Stagger the name, tagline, and CTA button with `transition={{ delay: 0.1 }}` increments.
- **D-06:** Project cards — stagger within the grid: each card gets `transition={{ delay: index * 0.08 }}` so they cascade in rather than all appearing at once.
- **D-07:** Sections are Server Components. Motion wrappers must be extracted into `'use client'` wrapper components (e.g., `AnimatedSection`) or inline with `motion.div` — since Motion's `motion` elements require client context. Pattern: thin `'use client'` wrapper that wraps the section content.
- **D-08:** No page transition animations — just element-level reveals. Keep it focused.

### SEO & Open Graph (POLISH-02)
- **D-09:** `app/layout.tsx` already has `metadataBase`, `title.template`, and `description`. Extend it with: `openGraph` object (type: website, title, description, url, images pointing to `/og.png`), `twitter` card (summary_large_image), `robots` (index, follow).
- **D-10:** Static OG image at `public/og.png` — 1200×630px. Content: warm cream background (`#FAF8F5`), terracotta accent bar or border, "DJ Catan" in large serif type, "Full-Stack Developer" subtitle below. Executor's discretion on exact layout — must use warm palette colors.
- **D-11:** Home page (`app/page.tsx`) gets its own `export const metadata` with page-specific title ("DJ Catan — Full-Stack Developer") and description.
- **D-12:** Case study `generateMetadata` already returns `{ title, description }` — extend it to also return `openGraph` with the project title/description.
- **D-13:** `app/sitemap.ts` — Next.js App Router built-in, auto-generates sitemap from routes. Add home + featured project slugs.
- **D-14:** `app/robots.ts` — Next.js App Router built-in, allow all crawlers.

### Accessibility (POLISH-04)
- **D-15:** Skip-to-content link — visually hidden `<a href="#main-content">` at the very top of the layout (before Navbar), revealed on `:focus`. Target: `<main id="main-content">` on `app/page.tsx`. Styled: `sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md`.
- **D-16:** Focus rings — audit all interactive elements and ensure `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2` (or equivalent) is present. Key targets: Navbar links, hamburger button, Footer links/icons, Resume download button, Contact form inputs/button, "Send another" link, case study back link and external CTAs.
- **D-17:** NavbarMobile ARIA — already has `aria-label="Toggle menu"` and `aria-expanded={open}`. Verify these are present and the mobile menu items have appropriate role/tabIndex when the menu is closed (not reachable by keyboard when menu is collapsed).
- **D-18:** No full WCAG audit, no color contrast tooling, no alt text audit — that's v2 scope. Keep to what's listed above.

### Responsive Verification (POLISH-03)
- **D-19:** Manual checkpoint only — no code changes expected. Breakpoints to check: 375px (iPhone SE), 768px (iPad), 1280px (desktop). Pages to check: home page (all sections) and one case study page. Executor starts dev server, presents checklist for human sign-off.
- **D-20:** If obvious issues surface during the responsive check (e.g., text overflow, broken grid), fix them inline — minor Tailwind class adjustments only. Major layout rework is out of scope.

### Claude's Discretion
- Exact OG image visual design (layout, font size, decorative elements — must use warm palette)
- Whether to create a reusable `<AnimatedSection>` wrapper or use `motion.div` inline per section
- Ordering of focus ring additions within the accessibility task
- Whether `sitemap.ts` includes only featured project slugs or all slugs

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Spec
- `.planning/REQUIREMENTS.md` — POLISH-01 through POLISH-04 acceptance criteria
- `.planning/PROJECT.md` — Warm & personal principle (animations must be subtle)

### Tech Stack
- `CLAUDE.md` — Motion v12 (`motion/react` import), `next/font` already loaded, metadata API patterns, sitemap/robots built-ins

### Existing Implementation
- `app/layout.tsx` — Current metadata setup to extend (metadataBase, title template, description already there)
- `app/page.tsx` — Add `id="main-content"` to `<main>`, add skip-link target, add page-level metadata export
- `app/projects/[slug]/page.tsx` — Extend `generateMetadata` to include OG fields
- `components/layout/Navbar.tsx` — Focus ring audit target; add skip-link above it in layout
- `components/layout/NavbarMobile.tsx` — ARIA verification target
- `components/sections/Hero.tsx` — First Motion animation target (load animation, not scroll)
- `app/globals.css` — CSS variables for warm palette (--primary, --primary-foreground for skip-link)

</canonical_refs>

<specifics>
## Specific Notes

- `motion` package uses `import { motion } from 'motion/react'` — NOT `framer-motion` (rebranded in 2025)
- `whileInView` requires the element to be in a client component — wrap Server Component sections in a thin `'use client'` `AnimatedSection` div, or convert section components to client components. Researcher should confirm the lightest approach.
- The OG image (`public/og.png`) must be created as an actual image file — the executor can generate it programmatically using a Node script or canvas, or create a simple SVG exported as PNG. Must be 1200×630px minimum.
- Skip-to-content link must be added to `app/layout.tsx` (before the `{children}` render), not inside individual page components.
- `VERCEL_PROJECT_PRODUCTION_URL` is already used in `metadataBase` — `og.png` URL will resolve correctly once deployed.

</specifics>

<deferred>
## Deferred Ideas

- Alt text audit — v2 scope (POLISH-04 explicitly says "basics")
- Color contrast WCAG tooling — v2 scope
- Page transition animations (route changes) — nice to have, adds complexity
- Dynamic per-project OG images via `opengraph-image.tsx` — user explicitly chose static PNG
- Dark mode — explicitly out of scope in PROJECT.md

</deferred>

---
*Phase: 05-polish-launch*
*Context gathered: 2026-03-29 — animations (subtle scroll reveals), OG (static PNG), a11y (focus rings + skip-link + nav ARIA), responsive (manual checkpoint)*
