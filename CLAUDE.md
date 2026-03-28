<!-- GSD:project-start source:PROJECT.md -->
## Project

**DJ Catan — Personal Portfolio**

A personal developer portfolio site built with Next.js, designed to give recruiters, freelance clients, and the general public a full picture of who DJ is and what he builds. The site balances professional credibility with genuine personality — warm, approachable, and human over polished and corporate.

**Core Value:** A visitor should leave knowing exactly who DJ is, be impressed by his work, and have a clear way to reach out — all three, not one at the expense of the others.

### Constraints

- **Tech Stack**: Next.js — already decided, non-negotiable for v1
- **Hosting**: Vercel — native Next.js support, free tier, easiest deploy path
- **Content**: Placeholder-first — real content will be filled in later; don't block build on copy
- **Design**: Warm & personal — all UI decisions should serve approachability, not impress with complexity
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

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
### Component Library
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | latest (not versioned — copy-paste) | Accessible, unstyled component primitives | Not a dependency — components are copied into the project and owned. Built on Radix UI primitives (accessibility) and Tailwind (styling). Provides Dialog, Card, Button, Input, Label, Textarea, Badge, Separator out of the box. For a portfolio, this covers every UI primitive needed without locking in a design system that fights the custom "warm & personal" aesthetic. |
### Animation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion (formerly Framer Motion) | 12.x (`motion` package) | UI transitions, scroll reveals, page enter animations | The standard React animation library. v12 ships under the `motion` npm package with `import { motion } from 'motion/react'`. Rebranded from Framer Motion in mid-2025 but fully backward compatible. 32KB gzipped. GSAP is overkill for a portfolio — it's built for timeline-driven, frame-by-frame creative work. Motion gives 80% of the capability for 20% of the complexity. |
### Forms & Validation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Contact form state management | Industry standard for React forms. Uncontrolled inputs mean minimal re-renders. Works idiomatically with Next.js Server Actions via `handleSubmit`. |
| Zod | 3.x | Schema validation (client + server) | Write one schema, validate on both sides. Pairs with `zodResolver` from `@hookform/resolvers`. Type inference from schemas eliminates manual type duplication. |
### Email / Contact Form Delivery
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Resend | — (API, no npm version) | Transactional email from contact form | Resend's free tier: 3,000 emails/month, one custom domain. First-class Next.js integration — official `resend` npm SDK, clean Server Action pattern, no external redirect (unlike Formspree). Sends from a real domain email (`hello@djcatan.com` or similar). The `react-email` companion library lets you template emails as React components. |
### Fonts
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font` (Google Fonts) | built-in | Web font loading | Next.js font optimization: self-hosts fonts at build time, zero FOUT (flash of unstyled text), no third-party font request. Use variable fonts for full weight range in a single file. |
- **Display / headings:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — editorial, warm, personality-forward. Alternatively Lora for a softer serif.
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) — readable at all sizes, neutral, pairs well with editorial serifs.
### SEO & Metadata
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | built-in | `<head>` tags, Open Graph, Twitter cards | App Router's `metadata` export (static) and `generateMetadata` (dynamic) cover all SEO needs natively. No `next-seo` package needed — that library targets Pages Router. |
| `sitemap.ts` + `robots.ts` | built-in | Search engine crawlability | Next.js App Router generates these via special route files — zero config, no package. |
### Image Handling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/image` | built-in | Responsive images, WebP conversion, lazy loading | Handles format conversion (WebP/AVIF), responsive `srcset`, lazy loading, and CLS prevention automatically. Use `priority` prop on hero images. Use `fill` with a sized parent container for project thumbnails in grid layouts. |
### Developer Tooling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| ESLint | 9.x | Linting | Next.js ships with `eslint-config-next`. Do not override — it includes App Router–specific rules. |
| Prettier | 3.x | Code formatting | Add `prettier-plugin-tailwindcss` to auto-sort Tailwind class order. Prevents class-order drift that confuses both humans and AI tools. |
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
## Installation
# Bootstrap
# Animation
# Forms & Validation
# Email
# shadcn/ui (CLI installs components on demand)
# Fonts are loaded via next/font — no npm install needed
# Dev tooling
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
