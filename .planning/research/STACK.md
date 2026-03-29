# Technology Stack

**Project:** DJ Catan Personal Portfolio
**Researched:** 2026-03-27
**Research basis:** Next.js 15.x (latest stable), Tailwind CSS 4.x, Motion (formerly Framer Motion) v12

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (latest) | Full-stack React framework, routing, SSG, SSR | Non-negotiable per project spec. App Router is the current standard — Pages Router is legacy. 15.x ships Turbopack as the default dev server, typed routes, and stable Node.js middleware. |
| React | 19.x | UI rendering | Ships with Next.js 15; no separate install needed. React 19 brings `useActionState` which Next.js Server Actions integrate with cleanly. |
| TypeScript | 5.x | Type safety | Next.js scaffolds TypeScript by default. Portfolio codebases are small enough that TS overhead is near zero; benefits (autocomplete, refactor safety) are full-size. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first CSS | Released stable January 2025. CSS-first config (`@theme` directive, no tailwind.config.js needed), 3.5x faster full builds, 100x faster incremental builds. Portfolio sites are a textbook Tailwind use case: rapid iteration, no CSS file management, consistent spacing and typography scales. |
| `@tailwindcss/typography` | latest | Prose formatting for case study pages | Required if project later adds a blog or long-form case studies. Handles sensible defaults for rendered markdown/MDX prose. |

**Why not CSS Modules:** CSS Modules are appropriate for legacy codebases or teams with strong CSS preferences. For a greenfield solo portfolio using AI tooling, Tailwind wins on iteration speed and the fact that tools like Cursor/Copilot suggest Tailwind classes directly. The abstraction mismatch of context-switching between JSX and scoped CSS files slows velocity.

**Why not styled-components or Emotion:** CSS-in-JS runtime libraries add bundle weight and break with React Server Components (they require client-side rendering to inject styles). Tailwind v4 has zero runtime overhead.

### Component Library

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | latest (not versioned — copy-paste) | Accessible, unstyled component primitives | Not a dependency — components are copied into the project and owned. Built on Radix UI primitives (accessibility) and Tailwind (styling). Provides Dialog, Card, Button, Input, Label, Textarea, Badge, Separator out of the box. For a portfolio, this covers every UI primitive needed without locking in a design system that fights the custom "warm & personal" aesthetic. |

**Why not Chakra UI / MUI / Ant Design:** These impose a default visual design that requires significant override work to achieve a custom feel. shadcn/ui ships unstyled — the Tailwind classes you write are the design.

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion (formerly Framer Motion) | 12.x (`motion` package) | UI transitions, scroll reveals, page enter animations | The standard React animation library. v12 ships under the `motion` npm package with `import { motion } from 'motion/react'`. Rebranded from Framer Motion in mid-2025 but fully backward compatible. 32KB gzipped. GSAP is overkill for a portfolio — it's built for timeline-driven, frame-by-frame creative work. Motion gives 80% of the capability for 20% of the complexity. |

**Key constraint:** Motion components require `'use client'` directives. Wrap animated UI in thin client boundary components; keep Server Components as the default everywhere else. Do not sprinkle `'use client'` on entire page files.

**Why not GSAP:** GSAP is a professional animation toolkit requiring imperative, ref-based APIs. It fights React's declarative model. The learning overhead and client-boundary requirements are no different from Motion, but Motion integrates idiomatically with React state and props. Choose GSAP only if the design spec calls for scroll-scrubbed timelines or SVG path animation — this portfolio does not.

### Forms & Validation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Contact form state management | Industry standard for React forms. Uncontrolled inputs mean minimal re-renders. Works idiomatically with Next.js Server Actions via `handleSubmit`. |
| Zod | 3.x | Schema validation (client + server) | Write one schema, validate on both sides. Pairs with `zodResolver` from `@hookform/resolvers`. Type inference from schemas eliminates manual type duplication. |

### Email / Contact Form Delivery

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Resend | — (API, no npm version) | Transactional email from contact form | Resend's free tier: 3,000 emails/month, one custom domain. First-class Next.js integration — official `resend` npm SDK, clean Server Action pattern, no external redirect (unlike Formspree). Sends from a real domain email (`hello@djcatan.com` or similar). The `react-email` companion library lets you template emails as React components. |

**Why not EmailJS:** EmailJS exposes API keys client-side. Anyone who views source can extract the key and spam the endpoint. Resend uses a server-side API key inside a Server Action — never exposed to the browser.

**Why not Formspree:** Formspree works but redirects form state through a third-party server and requires a separate dashboard for submissions. Resend keeps the implementation self-contained in the codebase and integrates with the Zod + RHF validation layer already in place.

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font` (Google Fonts) | built-in | Web font loading | Next.js font optimization: self-hosts fonts at build time, zero FOUT (flash of unstyled text), no third-party font request. Use variable fonts for full weight range in a single file. |

**Recommended font pairing for "warm & personal" aesthetic:**
- **Display / headings:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — editorial, warm, personality-forward. Alternatively Lora for a softer serif.
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) — readable at all sizes, neutral, pairs well with editorial serifs.

**Why not system fonts only:** A portfolio is a branding artifact. Font choices communicate personality. System fonts are appropriate for products where neutrality is valued; here, warmth and identity are explicit goals.

### SEO & Metadata

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | built-in | `<head>` tags, Open Graph, Twitter cards | App Router's `metadata` export (static) and `generateMetadata` (dynamic) cover all SEO needs natively. No `next-seo` package needed — that library targets Pages Router. |
| `sitemap.ts` + `robots.ts` | built-in | Search engine crawlability | Next.js App Router generates these via special route files — zero config, no package. |

**Pattern to follow:** Set `metadataBase` in `app/layout.tsx`. Use `title.template` for consistent `Page Title | DJ Catan` formatting across all pages. Add JSON-LD structured data as a `<script type="application/ld+json">` in the root layout for `Person` schema.

### Image Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/image` | built-in | Responsive images, WebP conversion, lazy loading | Handles format conversion (WebP/AVIF), responsive `srcset`, lazy loading, and CLS prevention automatically. Use `priority` prop on hero images. Use `fill` with a sized parent container for project thumbnails in grid layouts. |

### Developer Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| ESLint | 9.x | Linting | Next.js ships with `eslint-config-next`. Do not override — it includes App Router–specific rules. |
| Prettier | 3.x | Code formatting | Add `prettier-plugin-tailwindcss` to auto-sort Tailwind class order. Prevents class-order drift that confuses both humans and AI tools. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Styling | Tailwind CSS 4 | CSS Modules | Slower iteration for solo projects, no AI tooling advantage, requires context switching between JSX and CSS files |
| Styling | Tailwind CSS 4 | styled-components | Runtime overhead, incompatible with Server Components, adds client-side bundle |
| Components | shadcn/ui | Chakra UI | Imposed default aesthetic fights the custom warm design; heavy override tax |
| Components | shadcn/ui | MUI | Same problem as Chakra, plus Google Material design language is wrong for a personal brand |
| Animation | Motion v12 | GSAP | Overkill complexity, imperative API fights React model, no meaningful quality advantage for portfolio-level animation |
| Animation | Motion v12 | React Spring | Smaller ecosystem, physics-based model harder to reason about for standard UI transitions |
| Email | Resend | EmailJS | Exposes API keys client-side; insecure |
| Email | Resend | Formspree | Third-party redirect, separate dashboard, doesn't compose with the existing validation layer |
| Email | Resend | Nodemailer | Requires a standalone SMTP server/credentials setup; Resend is purpose-built and simpler |

---

## Installation

```bash
# Bootstrap
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir --import-alias "@/*"

# Animation
npm install motion

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Email
npm install resend react-email

# shadcn/ui (CLI installs components on demand)
npx shadcn@latest init

# Fonts are loaded via next/font — no npm install needed

# Dev tooling
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Version Confidence Notes

| Package | Confidence | Notes |
|---------|------------|-------|
| Next.js 15.x | HIGH | Official blog confirms 15.5 as of August 2025; latest stable as of research date |
| Tailwind CSS 4.x | HIGH | Released stable January 22, 2025; confirmed by official tailwindcss.com blog |
| Motion v12 | HIGH | Rebranding confirmed by official motion.dev announcement; `motion/react` is the current import path |
| React Hook Form 7.x | HIGH | Long-standing major version; confirmed compatible with React 19 + Next.js 15 in multiple 2025 guides |
| Zod 3.x | HIGH | Stable, widely adopted; no breaking changes expected |
| Resend | MEDIUM | Free tier details (3,000/month) confirmed via resend.com; pricing tiers subject to change |
| shadcn/ui | HIGH | Active project, copy-paste model means no version lock; official docs at ui.shadcn.com |

---

## Sources

- [Next.js 15.5 release blog](https://nextjs.org/blog/next-15-5)
- [Next.js App Router guides](https://nextjs.org/docs/app/guides)
- [Next.js Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Tailwind CSS v4.0 release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Motion (Framer Motion) rebranding announcement](https://motion.dev/blog/framer-motion-is-now-independent-introducing-motion)
- [Motion for React docs](https://motion.dev/docs/react)
- [GSAP vs Motion comparison](https://motion.dev/docs/gsap-vs-motion)
- [shadcn/ui official docs](https://ui.shadcn.com)
- [Resend Next.js integration](https://resend.com/nextjs)
- [React Hook Form + Zod + Next.js 15 Server Actions pattern](https://www.abstractapi.com/guides/email-validation/type-safe-form-validation-in-next-js-15-with-zod-and-react-hook-form)
- [Styling strategies in Next.js 2025](https://medium.com/@sureshdotariya/styling-strategies-in-next-js-2025-css-modules-vs-tailwind-css-4-vs-css-in-js-c63107ba533c)
- [Framer Motion with Next.js Server Components](https://www.hemantasundaray.com/blog/use-framer-motion-with-nextjs-server-components)
