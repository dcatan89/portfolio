# Phase 2: Home Page - Research

**Researched:** 2026-03-28
**Domain:** Next.js App Router UI components — Navbar, Hero, About, Projects grid, Resume, Footer
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Color Palette**
- D-01: Background is warm cream — `#FAF8F5` (HSL approx `36 33% 97%`). Not pure white. Update `globals.css` `--background`.
- D-02: Accent color is terracotta — `#C2603A` (HSL `18 55% 49%`). Update `--primary` in `globals.css`.
- D-03: Body text is deep warm charcoal — `#1C1917` (Tailwind `stone-950`). Update `--foreground`.
- D-04: Consistent cream background throughout all sections — no alternating section colors.
- D-05: Muted text is warm mid-tone — `#78716C` (Tailwind `stone-500`). Update `--muted-foreground`.

**Navbar**
- D-06: Sticky navbar — fixed to top, always visible.
- D-07: "DJ Catan" logo/name left, anchor links (About, Work, Resume, Contact) right.
- D-08: Solid cream background always, subtle `border-bottom`. No transparency effect.
- D-09: Mobile: hamburger menu opens full-width dropdown or slide-in with same nav links.

**Hero**
- D-10: Centered, full viewport height (`min-h-screen`). Name in Playfair Display, tagline, CTA + availability badge.
- D-11: CTA button "View My Work" smooth-scrolls to `#projects`.
- D-12: Availability badge: pulsing green dot + "Available for work" text in a pill.
- D-13: Animated bouncing chevron at bottom of hero — invites scrolling.

**About**
- D-14: Two-column: photo placeholder left, bio text right.
- D-15: Photo placeholder: rounded rectangle ~3:4 aspect ratio, warm gray fill (`#E8E4DF`) with placeholder icon.
- D-16: Mobile: stacks vertically (photo top, bio below).

**Projects**
- D-17: Card grid. Subtle border + soft shadow on cream/white card surface.
- D-18: Hover: card lifts (translateY -4px), shadow deepens. Smooth CSS transition.
- D-19: Each card: title (Playfair Display), description, tech stack pill tags, live + GitHub icon links. Featured badge for featured projects.
- D-20: Section must have `id="projects"` (already in stub).

**Resume**
- D-21: One brief intro line + prominent download button.
- D-22: Download button links to `/resume.pdf` at `public/resume.pdf`. Create placeholder PDF so link works from day one.

**Footer**
- D-23: "© 2026 DJ Catan" left, social icon links center/right.
- D-24: GitHub, LinkedIn, Email (mailto) icon-only links with hover color change to terracotta.

### Claude's Discretion
- Exact spacing/padding values between sections
- Specific font sizes for headings (within Playfair Display / Inter pairing)
- Card border radius and exact shadow values
- Tailwind class order and utility composition
- How nav links highlight the active section on scroll (or skip entirely for Phase 2)

### Deferred Ideas (OUT OF SCOPE)
None — all Contact section work deferred to Phase 3 as intended.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Top navbar with anchor links to all main sections | Sticky navbar pattern: `sticky top-0 z-50`, Server Component wrapper + `'use client'` toggle child |
| NAV-02 | Clicking a navbar link smoothly scrolls to the section | CSS `scroll-behavior: smooth` on `<html>` + `data-scroll-behavior="smooth"` attribute for Next.js compat |
| NAV-03 | Mobile hamburger menu: open and close | `'use client'` component with `useState(false)` toggle, `lucide-react` Menu/X icons |
| NAV-04 | Footer with social/contact links | Minimal footer component with lucide-react icons (Github, Linkedin, Mail) |
| HERO-01 | Name, tagline, and primary CTA on first load | Server Component: `min-h-screen flex items-center justify-center`, Playfair Display heading |
| HERO-02 | Availability badge near CTA | CSS `@keyframes pulse` for green dot, pill container with flexbox |
| ABOUT-01 | About section with bio, background, personality | Server Component: two-column grid, placeholder bio copy |
| ABOUT-02 | Photo placeholder sized and styled for headshot | `aspect-[3/4]` container, warm gray background, lucide-react User icon centered |
| PROJ-01 | Card grid with title, description, and links | Server Component consuming `allProjects` from `lib/projects.ts` |
| PROJ-03 | Tech stack tags on each project card | Badge pills using `cn()` + Tailwind, from `project.techStack[]` array |
| PROJ-04 | Live site and GitHub links on each card | `project.links.live` and `project.links.github` with lucide-react ExternalLink/Github icons |
| RESUME-01 | Download resume PDF via download button | `<a href="/resume.pdf" download>` inside Resume section, placeholder PDF in `public/` |
</phase_requirements>

---

## Summary

Phase 2 replaces five thin section stubs with fully styled, content-ready components. The phase is primarily a UI build: no new data layers, no external API calls, no form submissions. Every component exists in `components/sections/` already as a stub — Phase 2 replaces those stubs with complete implementations.

The most technically nuanced parts are: (1) the CSS variable migration in `globals.css` from the default shadcn blue/neutral palette to the warm cream/terracotta/charcoal palette decided in CONTEXT.md; (2) the Navbar, which requires splitting into a Server Component shell and a `'use client'` toggle child for the hamburger state; and (3) smooth scroll, which requires `scroll-behavior: smooth` on `<html>` plus the `data-scroll-behavior="smooth"` attribute to prevent Next.js router from triggering smooth scroll on hard navigations.

All animation in Phase 2 is CSS-only (bounce keyframe for scroll chevron, pulse keyframe for availability dot, CSS transition for card hover lift). Motion library integration is Phase 5 — do not introduce it here.

**Primary recommendation:** Build in section order (globals.css first, then Navbar, Hero, About, Projects, Resume, Footer) so the color palette is correct before any component renders. Keep all sections as Server Components except the Navbar hamburger toggle child.

---

## Standard Stack

### Core (already installed — no new installs needed for most of Phase 2)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.14 | App Router, Server Components, `<Link>`, `next/image` | Project foundation, locked |
| React | 19.1.0 | UI rendering | Ships with Next.js 15 |
| TypeScript | 5.x | Type safety | Already configured |
| Tailwind CSS | 4.x | Utility styling | Project standard |
| lucide-react | 1.7.0 (installed) | Icons: hamburger, chevron, GitHub, LinkedIn, Mail, ExternalLink, User | Already in `package.json`; no new install needed |
| `cn()` from `lib/utils.ts` | — | Conditional class composition | Already scaffolded via shadcn setup |

### What Needs Installing

| Library | Install Command | Purpose | When |
|---------|----------------|---------|------|
| No new runtime deps needed | — | Phase 2 is pure UI with existing stack | All deps already present |

**Version verification (from package.json):**
- `next`: 15.5.14 (confirmed)
- `lucide-react`: ^1.7.0 (confirmed — covers all icons needed: Menu, X, ChevronDown, Github, Linkedin, Mail, ExternalLink, User)
- `tailwindcss`: ^4 (confirmed)

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Pure CSS keyframe animations | Motion library | Motion is Phase 5 scope — CSS animations are correct for Phase 2 |
| lucide-react icons | SVG inline or react-icons | lucide-react already installed, consistent with shadcn/ui convention |
| CSS `scroll-behavior: smooth` | JS `scrollIntoView()` | CSS approach is simpler, no client component needed on each link; `data-scroll-behavior` attribute handles Next.js router edge case |

---

## Architecture Patterns

### Recommended Project Structure After Phase 2

```
app/
├── layout.tsx          # Add scroll-behavior; no structural changes
├── globals.css         # UPDATE: warm palette CSS variables (Wave 1)
├── page.tsx            # ADD: Navbar and Footer imports
public/
├── resume.pdf          # ADD: placeholder PDF file
components/
├── layout/
│   ├── Navbar.tsx      # NEW: Server Component shell (sticky header)
│   └── NavbarMobile.tsx # NEW: 'use client' hamburger toggle
├── sections/
│   ├── Hero.tsx        # REPLACE stub
│   ├── About.tsx       # REPLACE stub
│   ├── Projects.tsx    # REPLACE stub
│   ├── Resume.tsx      # REPLACE stub
│   ├── Contact.tsx     # DO NOT TOUCH (Phase 3)
│   └── Footer.tsx      # NEW section component
```

**Note on Navbar split:** The Navbar must be a Server Component at the outer level (for RSC benefits, metadata access) but the hamburger toggle is interactive state. The standard pattern is a Server Component `Navbar.tsx` that renders a `'use client'` child `NavbarMobile.tsx` solely for the open/close toggle. The nav links themselves remain in the Server Component.

**Alternative:** A single `'use client'` Navbar component is simpler and fully acceptable given this is a portfolio with no SSR-sensitive data in the nav. The planner may choose either approach at discretion.

### Pattern 1: CSS Variable Update for Warm Palette

**What:** Replace the default shadcn/ui neutral blue palette in `globals.css` with the project's warm cream/terracotta/charcoal values.

**Tailwind v4 + shadcn/ui variable format:** The existing `globals.css` uses HSL values as space-separated numbers inside `hsl()` calls at the Tailwind utility layer. The current format is `--background: 0 0% 100%` with `hsl(var(--background))` in `@layer base`. This pattern must be preserved — changing the format would break the `bg-background`, `text-foreground` etc. utility classes.

**HSL values for locked decisions:**

| Decision | Hex | HSL (space-separated, no hsl wrapper) |
|----------|-----|---------------------------------------|
| D-01 background | `#FAF8F5` | `36 33% 97%` |
| D-02 primary/accent | `#C2603A` | `18 55% 49%` |
| D-03 foreground | `#1C1917` | `20 8% 10%` |
| D-05 muted-foreground | `#78716C` | `25 6% 44%` |

**Border color (warm, not cool):** Replace the default `240 5.9% 90%` with a warm equivalent: `36 15% 88%` — slightly warm gray that does not fight the cream background.

**Card background:** Keep card slightly warm white — same as background or `0 0% 100%` for subtle lift.

**Example (globals.css `@layer base` `:root` changes):**
```css
/* Warm palette overrides */
--background: 36 33% 97%;       /* #FAF8F5 warm cream */
--foreground: 20 8% 10%;        /* #1C1917 warm charcoal */
--card: 0 0% 100%;              /* pure white card surface */
--card-foreground: 20 8% 10%;
--primary: 18 55% 49%;          /* #C2603A terracotta */
--primary-foreground: 36 33% 97%; /* cream on terracotta button */
--muted: 36 20% 94%;            /* warm light muted surface */
--muted-foreground: 25 6% 44%;  /* #78716C warm mid-tone */
--border: 36 15% 88%;           /* warm gray border */
--input: 36 15% 88%;
--ring: 18 55% 49%;             /* terracotta focus ring */
```

### Pattern 2: Sticky Navbar

**What:** `sticky top-0 z-50` on the `<header>` element, cream background, bottom border.

**Tailwind classes:**
```tsx
<header className="sticky top-0 z-50 w-full border-b bg-background">
  <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
    {/* logo left */}
    {/* nav links right (hidden on mobile) */}
    {/* hamburger right (visible on mobile, hidden on desktop) */}
  </div>
</header>
```

**z-index:** `z-50` ensures the navbar overlaps all section content as it scrolls beneath it.

### Pattern 3: Hamburger Menu (Client Component)

**What:** `useState` toggle; lucide-react `Menu` and `X` icons; mobile dropdown that overlays page content.

**Split:** `Navbar.tsx` stays a Server Component; extract a `NavbarMobile.tsx` client component for the toggle state. Or make the entire Navbar `'use client'` — both are valid, the simpler single-file approach is fine for a portfolio.

```tsx
// NavbarMobile.tsx
'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function NavbarMobile({ links }: { links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle menu">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div className="absolute left-0 top-16 w-full border-b bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="text-sm font-medium text-foreground hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
```

### Pattern 4: Smooth Scroll

**What:** CSS `scroll-behavior: smooth` on the `<html>` element + `data-scroll-behavior="smooth"` attribute.

**Why the attribute matters:** Next.js 15 detects `scroll-behavior: smooth` on `<html>` and uses `data-scroll-behavior="smooth"` to apply it correctly, preventing smooth scroll from triggering during router-level hard navigations (back/forward).

**Implementation in `app/layout.tsx`:**
```tsx
<html lang="en"
  data-scroll-behavior="smooth"
  className={`scroll-smooth ${playfairDisplay.variable} ${inter.variable}`}>
```

`scroll-smooth` is the Tailwind utility for `scroll-behavior: smooth`. This covers all `<a href="#section-id">` anchor links in the Navbar — no JavaScript needed.

### Pattern 5: Pulsing Availability Badge

**What:** Green dot with CSS `animate-ping` (Tailwind built-in) + "Available for work" text in a pill.

```tsx
<div className="flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5">
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
  </span>
  <span className="text-sm text-muted-foreground">Available for work</span>
</div>
```

`animate-ping` is a Tailwind built-in keyframe — no custom CSS needed.

### Pattern 6: Bouncing Scroll Chevron

**What:** `ChevronDown` from lucide-react with `animate-bounce` (Tailwind built-in) at bottom of hero.

```tsx
<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
  <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
</div>
```

Requires the hero `<section>` to be `relative` positioned so `absolute bottom-8` works correctly.

### Pattern 7: Project Card with Hover Lift

**What:** CSS transition on `translateY` and `box-shadow`. No Motion library in Phase 2.

```tsx
<article
  className="group rounded-xl border bg-card p-6 shadow-sm transition-all duration-200
             hover:-translate-y-1 hover:shadow-md"
>
```

`group` class enables future `group-hover:` utilities on children if needed. `hover:-translate-y-1` is Tailwind's `-4px` translateY. `hover:shadow-md` deepens the shadow on hover.

### Pattern 8: Photo Placeholder

**What:** `aspect-[3/4]` container with warm gray fill and centered lucide `User` icon.

```tsx
<div className="aspect-[3/4] w-full max-w-xs rounded-2xl bg-[#E8E4DF] flex items-center justify-center">
  <User className="h-16 w-16 text-[#C4B8AE]" />
</div>
```

### Anti-Patterns to Avoid

- **Importing Motion in Phase 2:** CONTEXT.md explicitly defers Motion to Phase 5. CSS-only animations (`animate-bounce`, `animate-ping`, `transition-all`) cover all Phase 2 animation needs.
- **Making section components `'use client'`:** Sections (Hero, About, Projects, Resume, Footer) have no interactive state. Keep them Server Components. Only the Navbar hamburger toggle needs `'use client'`.
- **Using `<Link>` from `next/link` for same-page anchor scrolling:** `<Link href="#projects">` works but carries Next.js router overhead for same-page scrolling. Plain `<a href="#projects">` is correct for in-page anchor links and triggers smooth scroll via the CSS property.
- **Hardcoding project data in JSX:** The Projects section MUST import from `lib/projects.ts` (`allProjects`). Never inline project data.
- **Forgetting `public/resume.pdf`:** The download button links to `/resume.pdf`. Without the file in `public/`, the link 404s. Create a minimal placeholder PDF before or alongside the Resume component.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Pulsing dot animation | Custom CSS keyframes | Tailwind `animate-ping` | Built-in, well-tested, correct behavior |
| Bounce animation | Custom `@keyframes bounce` | Tailwind `animate-bounce` | Built-in |
| Card hover lift | JS mouseover handlers | Tailwind `hover:-translate-y-1 transition-all` | Pure CSS, no JS, better performance |
| Conditional classes | Template literals / ternary clutter | `cn()` from `lib/utils.ts` | Already scaffolded, handles edge cases |
| Icon components | Inline SVG | lucide-react (already installed) | Consistent sizing API, accessible defaults |
| Smooth scroll | `scrollIntoView()` JS | CSS `scroll-behavior: smooth` | Zero JS, works with plain anchor links |

**Key insight:** Phase 2 is almost entirely solvable with Tailwind utility classes and lucide-react icons. Custom CSS should be limited to the palette variable overrides in `globals.css`. Custom JavaScript beyond the hamburger toggle is not needed.

---

## Common Pitfalls

### Pitfall 1: CSS Variable Format Mismatch After globals.css Update

**What goes wrong:** The existing `globals.css` uses space-separated HSL numbers without the `hsl()` wrapper in the variable definition (e.g., `--background: 0 0% 100%`) and then wraps them in `hsl()` at point of use in `@layer base` (`background-color: hsl(var(--background))`). If you accidentally put `hsl(...)` inside the variable definition AND in the usage, colors render as `hsl(hsl(...))` and break.

**Why it happens:** shadcn/ui docs show both the old format (HSL wrapped) and new format (OKLCH bare). The existing codebase uses the old HSL-as-space-separated-numbers format and that must be preserved consistently.

**How to avoid:** Only change the numeric HSL values — keep the format exactly as-is. Do not introduce `oklch()` values unless migrating the entire variable system, which is out of Phase 2 scope.

**Warning signs:** If `bg-background` renders as transparent or garbled color, check for double-wrapped `hsl(hsl(...))`.

### Pitfall 2: Navbar z-index Overlap with Hero Content

**What goes wrong:** With `min-h-screen` on the Hero and `sticky top-0` on the Navbar, absolutely positioned hero elements (scroll chevron, availability badge) can overlap or underlap the navbar incorrectly if z-index stacking context is wrong.

**Why it happens:** `position: absolute` elements in the Hero establish their own stacking context. The Navbar's `z-50` (z-index: 50) will correctly sit above hero content as long as the Hero `<section>` does not set a z-index higher than 50.

**How to avoid:** Keep hero section `position: relative` with no explicit z-index. Only the Navbar gets `z-50`.

### Pitfall 3: Smooth Scroll Triggers on Next.js Router Navigations

**What goes wrong:** Without `data-scroll-behavior="smooth"` on `<html>`, Next.js doesn't know about the CSS smooth scroll setting and may attempt its own scroll restoration logic during back/forward navigation, causing jarring double-scroll.

**Why it happens:** Next.js 15 introduced explicit detection of this attribute to coordinate its scroll restoration with CSS smooth scroll.

**How to avoid:** Add both `className="scroll-smooth"` AND `data-scroll-behavior="smooth"` to the `<html>` tag in `app/layout.tsx`.

### Pitfall 4: Mobile Hamburger Menu Stays Open After Link Click

**What goes wrong:** User taps a nav link in the open hamburger menu, section scrolls correctly, but the menu stays open covering the page.

**Why it happens:** The anchor link navigates to `#section-id` but doesn't trigger any state change in the React component unless explicitly handled.

**How to avoid:** Add `onClick={() => setOpen(false)}` to each nav link inside the mobile menu (shown in Pattern 3 above).

### Pitfall 5: Missing `public/resume.pdf` Causes Download Link 404

**What goes wrong:** Resume section renders a download button pointing to `/resume.pdf`, but the file doesn't exist in `public/`, so clicking it returns a 404.

**Why it happens:** Easy to forget when implementing the UI component.

**How to avoid:** Create a minimal placeholder PDF (`public/resume.pdf`) in the same task or wave as the Resume component. Even a 1KB blank PDF satisfies the requirement.

### Pitfall 6: Projects Section Shows Nothing If `allProjects` Is Empty

**What goes wrong:** If the import or data filtering has a bug, the card grid renders empty with no feedback to the developer.

**Why it happens:** `lib/projects.ts` exports `allProjects` (3 placeholder items). If the import path is wrong or the array filtering has an error, the grid silently renders with zero cards.

**How to avoid:** Add a fallback empty state in the Projects component — "No projects yet." renders instead of a blank section. Also use TypeScript type annotations on the import to catch shape mismatches at compile time.

---

## Code Examples

### globals.css — Warm Palette Variable Overrides

```css
/* Source: Decisions D-01 through D-05 from 02-CONTEXT.md */
/* Format: matches existing space-separated HSL without hsl() wrapper */
@layer base {
  :root {
    --background: 36 33% 97%;       /* #FAF8F5 warm cream */
    --foreground: 20 8% 10%;        /* #1C1917 warm charcoal */
    --card: 0 0% 100%;              /* pure white card surface */
    --card-foreground: 20 8% 10%;
    --primary: 18 55% 49%;          /* #C2603A terracotta */
    --primary-foreground: 36 33% 97%;
    --muted: 36 20% 94%;            /* warm light muted surface */
    --muted-foreground: 25 6% 44%;  /* #78716C warm mid-tone */
    --border: 36 15% 88%;           /* warm gray border */
    --input: 36 15% 88%;
    --ring: 18 55% 49%;             /* terracotta focus ring */
    /* keep --radius, --secondary, --popover, --destructive as-is */
  }
}
```

### app/layout.tsx — Add Smooth Scroll Attributes

```tsx
// Source: Next.js docs (data-scroll-behavior); Tailwind docs (scroll-smooth)
<html
  lang="en"
  data-scroll-behavior="smooth"
  className={`scroll-smooth ${playfairDisplay.variable} ${inter.variable}`}
>
```

### app/page.tsx — Add Navbar and Footer

```tsx
// Source: Phase 2 architecture pattern — Navbar and Footer wrap all sections
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

### Projects.tsx — Consuming lib/projects.ts

```tsx
// Source: lib/projects.ts exports
import { allProjects } from '@/lib/projects'

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-bold text-foreground">Work</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package, `import { motion } from 'motion/react'` | Mid-2025 rebranding | Phase 2 uses NO Motion — CSS only; Phase 5 will use `motion` package |
| Tailwind config in `tailwind.config.js` | CSS-first config in `globals.css` with `@theme` | Tailwind v4 (Jan 2025) | No `tailwind.config.js` in this project — all theme in `globals.css` |
| `next-seo` package | Next.js built-in `metadata` export | App Router introduction | Project already uses built-in `metadata` in `layout.tsx` |
| Pages Router `_document.tsx` for HTML attrs | `app/layout.tsx` `<html>` element | App Router | Smooth scroll `data-scroll-behavior` goes on `<html>` in `layout.tsx` |

**Deprecated/outdated:**
- `framer-motion` npm package: replaced by `motion` npm package — but both import as `motion/react`; the rename is the only breaking change. Irrelevant to Phase 2 since Motion is Phase 5 scope.
- `next-seo`: Pages Router era package, not needed with App Router's native metadata API.

---

## Open Questions

1. **Navbar placement: `app/layout.tsx` vs `app/page.tsx`**
   - What we know: Navbar and Footer are only on the home page for v1 (no other pages exist yet). Phase 4 adds project case study pages.
   - What's unclear: Should Navbar go in layout (global, consistent across all pages) or page (home-only for now)?
   - Recommendation: Put Navbar and Footer in `app/page.tsx` for Phase 2 since they are home-page specific right now. Phase 4 can move them to layout if case study pages also need the nav.

2. **Footer as section vs layout component**
   - What we know: CONTEXT.md calls Footer "D-23/D-24" which are section-level decisions; the existing `app/page.tsx` renders a `<main>` wrapping all sections.
   - What's unclear: Should Footer live in `components/sections/Footer.tsx` (consistent with existing pattern) or a new `components/layout/` folder?
   - Recommendation: `components/sections/Footer.tsx` maintains the existing file organization for Phase 2. The planner may move it to `components/layout/` at discretion — both are equally correct.

3. **Active section highlighting in Navbar (NAV-01 discretion item)**
   - What we know: CONTEXT.md marks this as Claude's Discretion ("or skip entirely for Phase 2").
   - What's unclear: `useIntersectionObserver` for active section tracking adds meaningful complexity and requires a `'use client'` wrapper on the full Navbar.
   - Recommendation: Skip active section highlighting in Phase 2. Plain anchor links with hover state are sufficient. Phase 5 (polish) is the right place for scroll-spy.

---

## Environment Availability

Phase 2 is purely UI — no external databases, services, or CLI tools beyond the already-configured Next.js + Vercel stack. No environment audit required beyond confirming the dev server works.

| Dependency | Required By | Available | Notes |
|------------|------------|-----------|-------|
| Node.js | Next.js dev server | Confirmed (Phase 1 ran successfully) | — |
| Vercel CLI / project | Deployment | Confirmed (live at portfolio-alpha-eight-40.vercel.app) | — |
| lucide-react | Icons throughout | Confirmed (^1.7.0 in package.json) | — |
| `public/resume.pdf` | RESUME-01 | NOT YET — must be created | Placeholder PDF task required |

**Missing dependencies with no fallback:**
- `public/resume.pdf` — must be created before or alongside the Resume component or the download button 404s.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — no Jest, Vitest, Playwright, or Cypress detected |
| Config file | None — Wave 0 must install if automated testing is required |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Navbar renders with anchor links | Visual / manual | n/a | N/A |
| NAV-02 | Clicking link smooth-scrolls to section | Manual (browser) | n/a | N/A |
| NAV-03 | Hamburger opens/closes on mobile | Manual (DevTools resize) | n/a | N/A |
| NAV-04 | Footer renders with icon links | Visual / manual | n/a | N/A |
| HERO-01 | Name, tagline, CTA visible on first load | Visual | n/a | N/A |
| HERO-02 | Availability badge shows pulsing dot | Visual | n/a | N/A |
| ABOUT-01 | Bio copy and two-column layout rendered | Visual | n/a | N/A |
| ABOUT-02 | Photo placeholder slot visible at ~3:4 ratio | Visual | n/a | N/A |
| PROJ-01 | Card grid renders all projects from data layer | Visual | n/a | N/A |
| PROJ-03 | Tech stack pills visible on cards | Visual | n/a | N/A |
| PROJ-04 | Live/GitHub icon links render on cards | Visual | n/a | N/A |
| RESUME-01 | Download button present, links to /resume.pdf | Manual click test | n/a | N/A |

**Assessment:** Phase 2 requirements are all UI rendering and visual behavior — they are effectively impossible to meaningfully automate without a browser testing framework (Playwright/Cypress) or snapshot testing. Given no test framework is installed and no test files exist, the validation strategy for Phase 2 is manual visual verification in the browser (localhost:3000 + Vercel preview URL).

### Wave 0 Gaps

- No test framework detected. Installing one is out of Phase 2 scope (UI build phase).
- Recommend deferring automated test infrastructure to Phase 5 (Polish) where POLISH-03 (responsive testing) and POLISH-04 (accessibility) provide a natural hook for Playwright installation.

*(Phase 2 relies on manual visual verification only — this is acceptable given the UI-only nature of the phase.)*

---

## Sources

### Primary (HIGH confidence)
- `components.json`, `lib/utils.ts`, `app/layout.tsx`, `app/globals.css`, `lib/projects.ts`, `components/sections/*.tsx` — direct codebase inspection
- `package.json` — confirmed installed dependency versions
- CONTEXT.md — locked design decisions (canonical for this phase)
- REQUIREMENTS.md — acceptance criteria (canonical)

### Secondary (MEDIUM confidence)
- [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) — CSS variable format, `@theme inline` pattern
- [shadcn/ui Theming docs](https://ui.shadcn.com/docs/theming) — OKLCH vs HSL format confirmation, full variable list
- [Next.js smooth scroll docs](https://nextjs.org/docs/messages/missing-data-scroll-behavior) — `data-scroll-behavior="smooth"` attribute requirement

### Tertiary (LOW confidence — verified by cross-reference)
- WebSearch: sticky navbar `'use client'` pattern — cross-verified with Next.js App Router Server/Client component rules
- WebSearch: Tailwind v4 `animate-ping` / `animate-bounce` availability — these are Tailwind v3+ built-ins, confirmed stable in v4

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed in package.json, no new installs needed
- Architecture patterns: HIGH — verified against actual codebase files and official docs
- CSS variable update: HIGH — format verified against current globals.css and shadcn docs
- Smooth scroll: HIGH — data-scroll-behavior attribute confirmed in Next.js official docs
- Pitfalls: HIGH — based on direct code inspection (the globals.css double-wrap pitfall is visible in the current file)

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (30 days — stable stack, no fast-moving dependencies)
