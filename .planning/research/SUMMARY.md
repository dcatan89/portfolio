# Research Summary

**Project:** DJ Catan Personal Portfolio
**Synthesized:** 2026-03-27
**Based on:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md, PROJECT.md

---

## Executive Summary

This is a personal developer portfolio targeting recruiters, freelance clients, and the general public. The goal is warmth and credibility in equal measure: visitors should leave knowing who DJ is, feeling confident in his work, and having a clear path to reach out. Research confirms the planned approach — Next.js App Router, statically generated, deployed to Vercel — is the correct and well-documented pattern for this use case. There is no meaningful technical uncertainty here; the risk is almost entirely execution risk (perfectionism killing the launch, over-engineering the stack, or shipping weak case study content).

The single most important research finding is that the architecture should be as simple as possible: the entire site is static HTML served from CDN, with one interactive surface (the contact form, handled by a Server Action). All project data lives in a single TypeScript file. The contact form is the only `'use client'` component on the home page. This simplicity is not a compromise — it is the correct production architecture for this type of site, and it enables the placeholder-first content strategy that PROJECT.md calls for.

The biggest non-technical risk is content quality, specifically case study pages. Research confirms that recruiters spend 10 seconds on a homepage and up to 2 minutes on a strong case study. Weak case studies (screenshot + tech list + GitHub link) are the most common and most damaging portfolio mistake. The template for case studies must enforce narrative structure from the start so that filling in real content later is easy, not a structural rewrite.

---

## Key Decisions Confirmed

Research validates the following decisions from PROJECT.md:

| Decision | Validation |
|----------|------------|
| Next.js App Router | Correct. App Router is the current standard; Pages Router is legacy. SSG + Server Actions is the right rendering model for this site. |
| Vercel hosting | Correct. Native Next.js support, CDN edge serving, free tier, zero-config deploys. |
| Featured projects with case study pages | Strongly validated. Case studies are the highest-value real estate in a developer portfolio. |
| No blog at launch | Correct. Adds scope without v1 value. Easy to add later with the same routing pattern. |
| No CMS for v1 | Correct. A TypeScript data file in `lib/projects.ts` is the right abstraction. CMS can replace it later without touching components. |
| No dark mode toggle | Correct. The warm-and-personal identity is a deliberate choice; a toggle undermines it. |
| Placeholder-first content | Critical, not optional. Enables shipping. Every section must have realistic, swap-ready placeholder content from day one. |

---

## Stack Recommendations

| Technology | Version | Rationale |
|------------|---------|-----------|
| Next.js | 15.x | Framework, routing, SSG, Server Actions. App Router only. |
| React | 19.x | Ships with Next.js 15; no separate install. |
| TypeScript | 5.x | Default with Next.js scaffold; zero overhead for a project this size. |
| Tailwind CSS | 4.x | CSS-first config, 100x faster incremental builds, ideal for solo greenfield. No CSS Modules, no CSS-in-JS. |
| shadcn/ui | latest | Copy-paste component primitives built on Radix UI. No default aesthetic to fight. |
| Motion (Framer Motion) | 12.x (`motion` package) | Import path: `motion/react`. Wrap animated components in thin `'use client'` boundaries; never add `'use client'` to full page files. |
| React Hook Form + Zod | 7.x + 3.x | Contact form only. One Zod schema validates on both client and server. |
| Resend | — | Transactional email for contact form. Server-side API key in a Server Action — never exposed to browser. Free tier: 3,000 emails/month. |
| `next/font` | built-in | Self-hosted fonts at build time; zero FOUT. Recommended pairing: Playfair Display (headings) + Inter (body). |
| `next/image` | built-in | WebP conversion, lazy loading, CLS prevention. Use `priority` on hero images. |

**Bootstrap command:**
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir --import-alias "@/*"
npm install motion react-hook-form zod @hookform/resolvers resend react-email
npx shadcn@latest init
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Critical Constraints

These affect every phase and every decision:

1. **Placeholder-first is a hard requirement, not a nice-to-have.** Every section ships with realistic placeholder content. No phase waits on real copy, photos, or project details to be "ready." Real content is dropped in after the structure is built.

2. **Static by default, client-side only where necessary.** `app/page.tsx` and all section components are Server Components. `ContactForm.tsx` is the only `'use client'` component on the home page. Never add `'use client'` to a page file because a child component needs interactivity — extract the child instead.

3. **`lib/projects.ts` is the single source of truth for all project data.** No project data lives in components. This file is what makes the placeholder strategy and future CMS migration both possible.

4. **Mobile-first always.** Write Tailwind classes for mobile widths first, then add `md:` and `lg:` overrides. Test on a real device after each phase. Overflow hacks (`overflow-x: hidden` on body) are a red flag indicating a layout problem to fix, not hide.

5. **Ship to Vercel at the end of every phase.** Deploying must be cheap and habitual from day one. A portfolio on localhost is worth nothing.

6. **Lean dependency policy.** The stack is decided. Evaluate every additional dependency with: "what breaks for a visitor if I remove this?" If the answer is nothing, remove it.

---

## Top Pitfalls to Avoid

### 1. Perfectionism kills the launch (Critical)
The portfolio becomes an indefinite work-in-progress. The developer rewrites the hero three times, evaluates a fourth animation library, and ships nothing.

**Prevention:** Placeholder content is a first-class feature, not a compromise. Set a fixed deploy date per phase. "Good enough to show" ships; "what I'd eventually be proud of" iterates after launch.

### 2. Contact form that silently fails (Critical)
The form looks functional but submissions are never received. Emails go to spam. Production environment variables were never set in Vercel.

**Prevention:** Use Resend (not nodemailer + Gmail). Verify environment variables in the Vercel dashboard explicitly — `.env.local` does not carry over. Send a real test submission from a mobile device after every deploy. Include a direct email address as a fallback.

### 3. Case study pages with no story (Critical)
Case study pages are a screenshot, a tech list, and a GitHub link. They answer "what was built" but not "why it mattered" or "what role DJ played."

**Prevention:** The case study page template must enforce narrative structure with placeholder headings: Problem, My Role, Key Decisions, Outcome. Filling in real content later is easy; restructuring a page that went live with a weak format is not. Aim for 2-3 featured projects with strong case studies rather than 6 with weak ones.

### 4. Over-engineering the stack (Moderate)
State management libraries, headless CMS, complex animation systems, or monorepo tooling get added to a site that needs to display text, images, and a contact form.

**Prevention:** The stack is already decided. Resist additions. If a proposed dependency does not affect what a visitor sees, remove it.

### 5. SEO invisible + noindex leak in production (Moderate)
Pages have generic titles, no Open Graph tags, and no sitemap. Worse: Next.js has a known issue where `useSearchParams` triggers a `noindex` meta tag in production builds — verify the production HTML does not contain `<meta name="robots" content="noindex">`.

**Prevention:** Set `metadataBase` in `app/layout.tsx` on day one. Use `title.template` for consistent `Page Title | DJ Catan` formatting. Generate `sitemap.ts` and `robots.ts` as Next.js App Router route files. Verify production HTML after first Vercel deploy.

---

## Suggested Phase Order

Based on the architecture's dependency graph and pitfall risk profile:

### Phase 1: Foundation + Deploy Pipeline
**What:** Next.js scaffold, Tailwind + shadcn/ui setup, font loading, `app/layout.tsx`, `lib/projects.ts` with placeholder project data, `components/ui/` primitives, Vercel deploy with custom domain configured.

**Why first:** Everything else depends on this. `lib/projects.ts` must exist before any section can render projects. The root layout wraps all pages. Deploying here makes shipping habitual and surfaces environment configuration issues early (custom domain, noindex check).

**Pitfalls to address here:** Over-engineering, perfectionism, SEO/noindex setup, custom domain before first public launch.

---

### Phase 2: Home Page Sections
**What:** Navbar, Footer, Hero, About, Projects grid (reads from `lib/projects.ts`), Resume (PDF download link).

**Why second:** All Server Components, no cross-dependencies between sections. Can be built in any order once the foundation exists. Placeholder content throughout.

**Pitfalls to address here:** Generic hero copy (placeholder should model specificity), mobile-first build for every section, skills-as-logo-wall anti-feature.

---

### Phase 3: Contact Form
**What:** `actions/contact.ts` Server Action with Zod validation, `ContactForm.tsx` client component, Resend integration, honeypot bot protection.

**Why third:** Depends on Resend account and DNS setup (SPF/DKIM). The delivery mechanism must be decided and tested in production before this phase is "done."

**Pitfalls to address here:** Silent form failures, missing Vercel environment variables, no fallback email address, spam without bot protection.

---

### Phase 4: Case Study Pages
**What:** `ProjectCard.tsx`, `ProjectCaseStudy.tsx`, `app/projects/[slug]/page.tsx` with `generateStaticParams` and `dynamicParams = false`, narrative placeholder structure for each featured project.

**Why fourth:** Depends on `lib/projects.ts` data shape being finalized. Changing the `Project` type after case study pages exist requires touching multiple files. The narrative template must be built in from the start — headings enforce the right story arc.

**Pitfalls to address here:** Case study pages with no story, dead demo links (link to stable GitHub repos first), too many projects (feature 2-3 maximum with full case studies).

---

### Phase 5: Polish + Pre-Launch
**What:** Micro-interactions with Motion, SEO verification (Open Graph, sitemap, production noindex check, canonical URL), accessibility audit (alt text, tap targets, heading hierarchy), cross-device testing, content review (no broken links, no typos, no stale tech stack claims).

**Why last:** Polish is safe to defer because it does not block functionality. SEO and accessibility checks require the site to be in a near-final state to be meaningful.

**Pitfalls to address here:** noindex leak verification, Vercel duplicate content from `vercel.app` subdomain, resume PDF on mobile Safari, animation performance on mobile.

---

## Open Questions

These are unresolved at research time and need answering before or during the relevant phase:

| Question | Relevant Phase | Notes |
|----------|---------------|-------|
| Which 2-3 projects will be featured with full case studies? | Phase 4 | Determines how much case study content needs to be written and what placeholder structures to create |
| What is DJ's availability status at launch? (open to freelance / full-time / unavailable) | Phase 2 (Contact) | One line of text, but affects the contact section CTA copy |
| Does DJ have a professional photo for the About section? | Phase 2 (About) | Placeholder slot must exist; real photo dramatically improves approachability — even a single well-cropped image |
| What is the primary CTA in the hero? (View my work / Get in touch / Download resume) | Phase 2 (Hero) | FEATURES.md notes one CTA only; the choice signals what the site is optimizing for |
| Resend account and custom domain DNS records configured? | Phase 3 (Contact) | SPF/DKIM setup cannot be done during the build phase; needs to happen before contact form testing |
| Is there a real resume PDF ready, or will it be a placeholder link at launch? | Phase 2 (Resume) | Placeholder is fine; just needs a file in `/public/resume.pdf` |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All major packages confirmed at current stable versions; official sources throughout |
| Features | HIGH | Recruiter-validated patterns, multiple sources, consistent findings |
| Architecture | HIGH | Based on official Next.js docs; patterns are well-documented and stable |
| Pitfalls | HIGH | Most pitfalls are well-documented; Vercel-specific noindex issue confirmed via GitHub issue + Vercel KB |
| Timeline | LOW | Research does not estimate effort; phase sizing will depend on content readiness and design iteration speed |
