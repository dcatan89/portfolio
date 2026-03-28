# Phase 1: Foundation - Research

**Researched:** 2026-03-27
**Domain:** Next.js 15 project scaffolding, Tailwind CSS v4, shadcn/ui, Vercel deployment, data modeling
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use the full data shape from day one — do not defer fields to Phase 4. Every project entry must include: `id`, `slug`, `title`, `description`, `techStack: string[]`, `links: { live?: string; github?: string }`, `featured: boolean`, and case study content fields (`problem`, `role`, `keyDecisions`, `outcome`) as strings.
- **D-02:** Ship with exactly 3 placeholder projects: 2 featured (will get full case study pages in Phase 4) + 1 non-featured (card only). This covers all UI states without over-engineering.
- **D-03:** Case study content (problem, role, keyDecisions, outcome) lives in `lib/projects.ts` as strings — no MDX, no separate files. Keeps everything in one typed file; appropriate for a portfolio this size.
- **D-04:** All placeholder content uses DJ-flavored realistic text — real name ("DJ Catan"), a rough but real-sounding tagline, approximate bio. The deployed Vercel URL should feel like a real site, not a test fixture.
- **D-05:** Placeholder projects use real project names/titles that DJ actually plans to feature. Descriptions and case study content are placeholder text for now, but the project names are the real ones.

### Claude's Discretion

- Section stub structure (return null vs semantic shells) — Claude picks the most pragmatic approach
- Tailwind/shadcn/ui initial configuration details
- File organization conventions within app/ and components/
- metadataBase value (use a placeholder domain or localhost for now)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Project is scaffolded with Next.js 15 App Router, TypeScript, Tailwind v4, and shadcn/ui | Stack verified: create-next-app@15, Tailwind v4 PostCSS setup, shadcn init |
| FOUND-02 | Vercel deploy pipeline is configured from day one with a working production URL | Vercel CLI v50 available; GitHub-linked auto-deploy pattern documented |
| FOUND-03 | All project data is centralized in a single `lib/projects.ts` file as the source of truth | TypeScript interface pattern and full data shape documented from D-01 |
| FOUND-04 | Every section uses realistic placeholder content that is easy to swap for real content later | Section stub architecture pattern and placeholder strategy documented |
</phase_requirements>

---

## Summary

This phase is a pure scaffolding and infrastructure phase for a greenfield Next.js 15 portfolio site. The tech stack is fully locked in CLAUDE.md: Next.js 15 (App Router), TypeScript 5, Tailwind CSS v4, shadcn/ui, with deployment to Vercel. No UI beyond a working app shell is needed.

The most important finding from research is a version mismatch risk: `npm install next@latest` and `create-next-app@latest` as of March 2026 install **Next.js 16.2.1**, not 15.x. The planner must use `create-next-app@15` explicitly. The latest 15.x patch is `15.5.14`, which is the correct target.

Tailwind v4 is a significant departure from v3: configuration is CSS-first (`@theme` directive, no `tailwind.config.js`), and the PostCSS plugin is now a separate package (`@tailwindcss/postcss`). shadcn/ui added Tailwind v4 support in February 2025 and its init CLI handles the integration. The `lib/projects.ts` data layer is straightforward TypeScript — no library needed, just a well-typed interface with the full shape from D-01.

**Primary recommendation:** Scaffold with `npx create-next-app@15` (pinned), configure Tailwind v4 PostCSS, run `npx shadcn@latest init`, wire up Vercel deployment via GitHub integration, then create `lib/projects.ts` and section stubs. The Vercel deploy must happen before Phase 1 is called complete.

---

## Standard Stack

### Core (verified against npm registry, 2026-03-27)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.5.14 (latest 15.x) | App Router framework | Locked per CLAUDE.md; `latest` tag is now 16.x — must pin 15.x |
| react | 19.x (ships with Next.js 15) | UI rendering | Bundled by create-next-app — no separate install |
| react-dom | 19.x (ships with Next.js 15) | DOM rendering | Bundled by create-next-app |
| typescript | 6.0.2 (latest) | Type safety | create-next-app scaffolds TypeScript automatically |
| tailwindcss | 4.2.2 | Utility CSS | Locked per CLAUDE.md; v4 has CSS-first config |
| @tailwindcss/postcss | 4.2.2 | PostCSS plugin for Tailwind v4 | Required for v4; replaces v3's built-in PostCSS integration |
| postcss | latest peer | CSS processor | Peer dependency of @tailwindcss/postcss |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui | not versioned (copy-paste) | Accessible component primitives | Install via CLI on demand; no npm package |
| prettier | 3.x | Code formatting | Add with prettier-plugin-tailwindcss |
| prettier-plugin-tailwindcss | 0.7.2 | Auto-sort Tailwind class order | Required alongside Prettier |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| create-next-app@15 | create-next-app@latest | latest installs Next.js 16.2.1 — wrong major version |
| @tailwindcss/postcss (v4) | tailwindcss/postcss (v3 pattern) | v3 pattern does not work with Tailwind v4 |

### Installation

```bash
# Bootstrap — pin to 15.x explicitly
npx create-next-app@15 portfolio --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

# Tailwind v4 PostCSS (if not already installed by create-next-app@15)
npm install tailwindcss@latest @tailwindcss/postcss postcss

# shadcn/ui init (run after Next.js is scaffolded)
npx shadcn@latest init

# Dev tooling
npm install --save-dev prettier prettier-plugin-tailwindcss
```

### Version Verification

Verified against npm registry on 2026-03-27:

| Package | Registry Version | Notes |
|---------|-----------------|-------|
| next@latest | 16.2.1 | **CRITICAL: use `next@15` or `create-next-app@15`** |
| next@15 (latest patch) | 15.5.14 | Correct target |
| tailwindcss | 4.2.2 | Confirmed — v4 stable |
| @tailwindcss/postcss | 4.2.2 | Required for v4 |
| typescript | 6.0.2 | Installed by create-next-app |
| motion | 12.38.0 | Not needed in Phase 1 |
| shadcn | 4.1.1 | CLI package — not a runtime dep |
| prettier-plugin-tailwindcss | 0.7.2 | Confirmed current |

---

## Architecture Patterns

### Recommended Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadataBase, global CSS
│   ├── page.tsx            # Home page: assembles all section stubs
│   ├── globals.css         # @import "tailwindcss" + @theme overrides
│   └── favicon.ico         # Placeholder favicon
├── components/
│   ├── sections/           # One file per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   └── Contact.tsx
│   └── ui/                 # shadcn/ui components (copied by CLI)
├── lib/
│   └── projects.ts         # SINGLE SOURCE OF TRUTH for all project data
├── public/
│   └── (static assets — empty for now)
├── postcss.config.mjs      # @tailwindcss/postcss plugin
├── next.config.ts          # Minimal Next.js config
├── tsconfig.json           # TypeScript config (scaffolded)
├── eslint.config.mjs       # ESLint config (scaffolded)
└── prettier.config.js      # Prettier + tailwindcss plugin
```

### Pattern 1: Tailwind v4 CSS-First Configuration

**What:** Tailwind v4 replaces `tailwind.config.js` with CSS `@theme` directive. Design tokens live in `globals.css`.
**When to use:** Always with Tailwind v4 — no JS config file needed.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --font-display: var(--font-playfair-display);
  --font-body: var(--font-inter);
  --color-warm-50: oklch(0.98 0.01 80);
  --color-warm-100: oklch(0.95 0.02 80);
  /* Add custom design tokens here */
}
```

```javascript
/* postcss.config.mjs */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Pattern 2: Font Loading with next/font + Tailwind v4 CSS Variables

**What:** Load variable fonts via `next/font/google`, expose as CSS variables, reference in `@theme`.
**When to use:** Required for FOUND-01 — fonts must load with no FOUT in `app/layout.tsx`.

```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts
import { Playfair_Display, Inter } from 'next/font/google'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

### Pattern 3: metadataBase for Pre-Domain Vercel Deployments

**What:** Set `metadataBase` to the Vercel production URL. Before a custom domain exists, use the Vercel-assigned `.vercel.app` URL. Next.js docs confirm `metadataBase` is required to avoid build errors on relative OG image paths.
**When to use:** Must be set in root `app/layout.tsx` from day one.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    default: 'DJ Catan — Developer',
    template: '%s | DJ Catan',
  },
  description: 'Full-stack developer building thoughtful digital products.',
}
```

**Note:** `VERCEL_PROJECT_PRODUCTION_URL` is injected by Vercel at build time and is always set — even on preview deployments. It resolves to the shortest production custom domain, or the `.vercel.app` domain if no custom domain is configured. This is the recommended pattern for pre-domain deployments.

### Pattern 4: lib/projects.ts Data Layer

**What:** Single typed file containing the Project interface and all project data. Consumed by any component — Server Component or Client Component.
**When to use:** Locked per D-01 through D-03. The full shape must be present from day one.

```typescript
// lib/projects.ts

export interface Project {
  id: string
  slug: string
  title: string
  description: string
  techStack: string[]
  links: {
    live?: string
    github?: string
  }
  featured: boolean
  // Case study fields — strings per D-03 (no MDX)
  problem: string
  role: string
  keyDecisions: string
  outcome: string
}

export const projects: Project[] = [
  {
    id: 'project-1',
    slug: 'TODO-real-slug-1',       // DJ fills in before Phase 2
    title: 'TODO — Real Project Name',
    description: 'Placeholder description for featured project one.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: { live: undefined, github: undefined },
    featured: true,
    problem: 'Placeholder: what problem did this project solve?',
    role: 'Placeholder: what was your role?',
    keyDecisions: 'Placeholder: what key technical decisions were made?',
    outcome: 'Placeholder: what was the outcome or impact?',
  },
  {
    id: 'project-2',
    slug: 'TODO-real-slug-2',
    title: 'TODO — Real Project Name',
    description: 'Placeholder description for featured project two.',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    links: { live: undefined, github: undefined },
    featured: true,
    problem: 'Placeholder: what problem did this project solve?',
    role: 'Placeholder: what was your role?',
    keyDecisions: 'Placeholder: what key technical decisions were made?',
    outcome: 'Placeholder: what was the outcome or impact?',
  },
  {
    id: 'project-3',
    slug: 'project-3',
    title: 'TODO — Non-Featured Project',
    description: 'Placeholder description for card-only project.',
    techStack: ['Python', 'FastAPI'],
    links: { live: undefined, github: undefined },
    featured: false,
    problem: '',
    role: '',
    keyDecisions: '',
    outcome: '',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const allProjects = projects
```

### Pattern 5: Section Stubs

**What:** Each future section is a Server Component stub that renders a semantically correct but visually minimal placeholder. Return a `<section>` with an `id` attribute — not `null` — so anchor links from the nav (Phase 2) work from day one.
**When to use:** Needed for FOUND-04 — the home page must render without errors before real content exists.

```typescript
// components/sections/Hero.tsx
export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-5xl font-bold">DJ Catan</h1>
        <p className="mt-4 text-lg text-gray-600">
          Full-stack developer. Building thoughtful digital products.
        </p>
      </div>
    </section>
  )
}
```

### Anti-Patterns to Avoid

- **Using `create-next-app@latest`:** As of March 2026, this installs Next.js 16.2.1, not 15.x. Always use `create-next-app@15`.
- **Using `tailwind.config.js` for v4:** Tailwind v4 dropped the JS config file. Use the `@theme` CSS directive in `globals.css`.
- **Using `v3` PostCSS pattern (`plugins: { tailwindcss: {} }`):** This will fail silently with v4. The plugin must be `@tailwindcss/postcss`.
- **Using `framer-motion` as the import package:** CLAUDE.md mandates `motion/react` (the new package name). `framer-motion` still works but creates inconsistency.
- **Returning `null` from section stubs:** Returning null means the section has no `id` in the DOM, which breaks anchor navigation wired up in Phase 2.
- **Omitting `display: 'swap'` on fonts:** Without it, Next.js defaults to `font-display: optional`, which can cause fonts to never load on slow connections.
- **Hardcoding a domain in `metadataBase`:** Use `VERCEL_PROJECT_PRODUCTION_URL` env var so the value is correct across local, preview, and production environments from day one.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading without FOUT | Custom font CSS | `next/font/google` | Handles self-hosting, `font-display`, preloading, and CLS prevention automatically |
| Utility CSS class sorting | Manual class order rules | `prettier-plugin-tailwindcss` | Class order drift is silent and confusing for AI tools and diffs |
| Accessible component primitives | Custom Dialog, Tooltip, etc. | shadcn/ui (Radix UI) | Focus trap, keyboard nav, ARIA roles — impossible to get right without significant effort |
| Metadata/OG tags | Custom `<Head>` components | Next.js Metadata API | Pages Router pattern; App Router uses `metadata` export — no package needed |

---

## Common Pitfalls

### Pitfall 1: Wrong Next.js Version from `@latest`

**What goes wrong:** `npx create-next-app@latest` as of March 2026 scaffolds Next.js 16.2.1. All CLAUDE.md docs reference 15.x APIs, App Router behavior, and package versions validated against 15.x.
**Why it happens:** npm `latest` tag moved to 16.x at some point in early 2026.
**How to avoid:** Always use `create-next-app@15` explicitly. Pin `next@15` in `package.json` to prevent accidental upgrades.
**Warning signs:** `package.json` shows `"next": "^16.x.x"` after scaffolding.

### Pitfall 2: Tailwind v4 PostCSS Misconfiguration

**What goes wrong:** Using the v3 PostCSS config (`plugins: { tailwindcss: {} }`) with Tailwind v4 produces no errors but generates no styles — silent failure.
**Why it happens:** v3 and v4 use different PostCSS plugin packages. v4 requires `@tailwindcss/postcss` as a separately installed package.
**How to avoid:** Install `@tailwindcss/postcss` and configure `postcss.config.mjs` with `"@tailwindcss/postcss": {}`.
**Warning signs:** Tailwind classes compile without error but no styles appear in the browser.

### Pitfall 3: metadataBase Omission Causes Build Errors

**What goes wrong:** Relative paths in OG image metadata (e.g., `openGraph: { images: '/og.png' }`) cause a Next.js build error: "metadataBase property in metadata export is not set."
**Why it happens:** Next.js requires an absolute base URL to resolve relative OG image paths.
**How to avoid:** Set `metadataBase` in root `app/layout.tsx` using `VERCEL_PROJECT_PRODUCTION_URL` env var with a localhost fallback.
**Warning signs:** `next build` fails with a metadataBase error even when the site works in dev.

### Pitfall 4: Section Stubs Returning null Break Phase 2 Anchor Links

**What goes wrong:** If a section stub returns `null`, there is no DOM element with the section's `id`. When Phase 2 wires up navbar anchor links (`href="#projects"`), clicks scroll to nothing.
**Why it happens:** `null` renders nothing to the DOM, so the anchor target doesn't exist.
**How to avoid:** Every section stub must return a `<section id="...">` element, even if it contains only placeholder content.
**Warning signs:** Smooth scroll anchor links in Phase 2 silently don't scroll anywhere.

### Pitfall 5: Font Variable Not Applied to body

**What goes wrong:** Font CSS variables are declared on `<html>` but not applied as the default body font. Components using `font-body` produce no effect.
**Why it happens:** Applying `playfairDisplay.variable` and `inter.variable` to `<html>` only registers the CSS variable — it doesn't set the body's `font-family`. A Tailwind class like `font-body` must also be applied.
**How to avoid:** Add `font-body` (or the appropriate Tailwind utility referencing `--font-inter`) to `<body>`.

---

## Code Examples

### Tailwind v4 PostCSS Configuration

```javascript
// Source: https://tailwindcss.com/docs/installation/framework-guides/nextjs
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Tailwind v4 CSS Import

```css
/* Source: https://tailwindcss.com/docs/installation/framework-guides/nextjs */
/* app/globals.css */
@import "tailwindcss";

@theme {
  --font-display: var(--font-playfair-display);
  --font-body: var(--font-inter);
}
```

### Root Layout with Fonts and Metadata

```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts
// app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    default: 'DJ Catan — Developer',
    template: '%s | DJ Catan',
  },
  description: 'Full-stack developer building thoughtful digital products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` + `tailwind.config.ts` | `@theme` directive in CSS | Tailwind v4 (Jan 2025) | No JS config file — design tokens live in CSS |
| `tailwindcss` as PostCSS plugin directly | `@tailwindcss/postcss` (separate package) | Tailwind v4 (Jan 2025) | Must install and configure separately |
| `framer-motion` npm package | `motion` npm package, `import { motion } from 'motion/react'` | Motion v12 (mid-2025) | Old package still works but new import path is canonical |
| `next-seo` package | Next.js Metadata API (`metadata` export) | Next.js 13+ App Router | No external package needed for SEO |
| `create-next-app@latest` → Next.js 15 | `create-next-app@latest` → Next.js 16 | Early 2026 | Must pin to `@15` to get correct major version |

**Deprecated/outdated:**
- `tailwind.config.js`: Deprecated in Tailwind v4. Still works for migration but not the canonical pattern.
- `next-seo`: Targets Pages Router. Not compatible with App Router `metadata` export pattern.
- `viewport` and `themeColor` in `metadata` object: Deprecated since Next.js 14 — use `generateViewport` instead.

---

## Open Questions

1. **Does `create-next-app@15` install Tailwind v4 automatically, or does it install v3?**
   - What we know: `create-next-app@latest` (which installs Next.js 16) installs Tailwind and configures it. The 15.x scaffolder behavior for Tailwind version is unconfirmed.
   - What's unclear: Whether `create-next-app@15` pins Tailwind to v3 (which was current when 15.x released) or installs v4.
   - Recommendation: After scaffolding with `create-next-app@15`, explicitly run `npm install tailwindcss@latest @tailwindcss/postcss` to guarantee v4, and update `postcss.config.mjs` to use the v4 plugin.

2. **Does shadcn/ui's init handle Tailwind v4 config automatically?**
   - What we know: shadcn added Tailwind v4 support in February 2025 per their changelog.
   - What's unclear: Whether `npx shadcn@latest init` detects the v4 setup and uses CSS `@theme` variables rather than writing to a `tailwind.config.js`.
   - Recommendation: Run `shadcn init` after Tailwind v4 is configured, and verify no `tailwind.config.js` is created by the CLI.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js 15 (requires >=20.0.0) | Yes | 20.4.0 | — |
| npm | Package management | Yes | 9.7.2 | — |
| git | Version control, Vercel integration | Yes | 2.47.1 | — |
| Vercel CLI | Deployment (optional — GitHub integration is primary path) | Yes | 50.37.1 | Use Vercel dashboard UI |
| npx | create-next-app, shadcn CLI | Yes | 9.7.2 | — |

**Missing dependencies with no fallback:** None — all required tools are present.

**Notes:**
- Node 20.4.0 satisfies Next.js 15's engine requirement of `^18.18.0 || ^19.8.0 || >= 20.0.0`.
- Vercel CLI is available but not the primary deployment mechanism. The standard path is: create GitHub repo → connect to Vercel dashboard → auto-deploy on push to `main`.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — greenfield project |
| Config file | None — Wave 0 must scaffold |
| Quick run command | `npm run build` (build validation as proxy for unit tests in Phase 1) |
| Full suite command | `npm run build && npm run lint` |

**Note:** Phase 1 is infrastructure scaffolding. The most meaningful validation is a successful `next build` (TypeScript compilation, no import errors, no missing required fields) and a live Vercel URL. Formal unit test infrastructure (Jest/Vitest) is not required for this phase — the "test" for FOUND-01 through FOUND-04 is that the Vercel deployment exists and the app renders without errors.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Project scaffolds with correct stack | build | `npm run build` | Wave 0 — project doesn't exist yet |
| FOUND-02 | Vercel URL returns 200 | smoke (manual) | `curl -s -o /dev/null -w "%{http_code}" <vercel-url>` | Manual — requires Vercel account |
| FOUND-03 | `lib/projects.ts` exports typed data consumable by components | build | `npm run build` | Wave 0 — file created in this phase |
| FOUND-04 | Home page renders without errors, all section stubs present | build + visual | `npm run build` | Wave 0 — created in this phase |

### Sampling Rate

- **Per task commit:** `npm run build` — catches TypeScript errors immediately
- **Per wave merge:** `npm run build && npm run lint`
- **Phase gate:** Live Vercel URL loads without error before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] Entire project does not exist yet — `create-next-app@15` is the Wave 0 action
- [ ] `lib/projects.ts` — created in this phase
- [ ] `components/sections/*.tsx` stubs — created in this phase
- [ ] `postcss.config.mjs` with Tailwind v4 plugin — created in this phase

---

## Project Constraints (from CLAUDE.md)

These directives are authoritative and override any research recommendation that contradicts them:

| Directive | Value |
|-----------|-------|
| Framework | Next.js — non-negotiable for v1 |
| Router | App Router (Pages Router is legacy) |
| Hosting | Vercel — free tier, zero-config deploys |
| Styling | Tailwind CSS v4 — CSS-first config, `@theme` directive |
| Components | shadcn/ui — copy-paste model, not a runtime dependency |
| Animation | Motion v12 — import path is `motion/react`, not `framer-motion` |
| Forms | React Hook Form 7.x + Zod 3.x |
| Email | Resend — no EmailJS (exposes keys client-side) |
| Fonts | `next/font` (Google Fonts) — Playfair Display + Inter |
| SEO | Next.js Metadata API — no `next-seo` package |
| Linting | ESLint with `eslint-config-next` — do not override |
| Formatting | Prettier 3.x with `prettier-plugin-tailwindcss` |
| Content strategy | Placeholder-first — do not block build on real copy |
| Design intent | Warm & personal — approachability over complexity |

---

## Sources

### Primary (HIGH confidence)

- [Next.js Installation docs (v16.2.1 docs, last updated 2026-03-25)](https://nextjs.org/docs/app/getting-started/installation) — scaffolding commands, prompts, defaults
- [Next.js Font Optimization docs](https://nextjs.org/docs/app/getting-started/fonts) — `next/font/google` patterns, variable font setup
- [Next.js generateMetadata reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — `metadataBase`, `VERCEL_PROJECT_PRODUCTION_URL` pattern
- [Tailwind CSS v4 + Next.js installation guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs) — PostCSS config, `@import "tailwindcss"`, v4 setup
- npm registry — `npm view next`, `npm view tailwindcss`, `npm view shadcn`, etc. (direct registry queries, 2026-03-27)

### Secondary (MEDIUM confidence)

- [shadcn/ui changelog](https://ui.shadcn.com/docs/changelog) — Tailwind v4 support confirmed February 2025
- [shadcn/ui Next.js installation](https://ui.shadcn.com/docs/installation/next) — `npx shadcn@latest init -t next` command
- [Vercel for GitHub docs](https://vercel.com/docs/git/vercel-for-github) — `VERCEL_PROJECT_PRODUCTION_URL` env var, auto-deploy on push

### Tertiary (LOW confidence)

- None — all critical claims verified against official docs or npm registry.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry on 2026-03-27
- Architecture: HIGH — patterns sourced from official Next.js and Tailwind docs
- Pitfalls: HIGH — version mismatch (Next.js 16 vs 15) confirmed by direct npm query; Tailwind v4 config changes confirmed by official docs

**Research date:** 2026-03-27
**Valid until:** 2026-04-27 (30 days — stack is relatively stable, but Tailwind v4 and shadcn/ui are actively developed)
