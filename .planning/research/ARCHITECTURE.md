# Architecture Patterns

**Project:** DJ Catan — Personal Portfolio
**Domain:** Personal developer portfolio site
**Researched:** 2026-03-27
**Confidence:** HIGH (based on official Next.js docs + verified patterns)

---

## Recommended Architecture

A hybrid static site: the home page and all project case study pages are fully statically generated at build time and served as pre-rendered HTML from Vercel's edge. The contact form is the only interactive surface — it uses a Server Action for submission and is the only component that requires client-side React state.

### High-Level Structure

```
Visitor's browser
      |
      | (static HTML from Vercel CDN edge)
      v
app/layout.tsx          ← Root shell: <html>, <body>, fonts, global metadata
      |
      +-- app/page.tsx                 ← Home page (/)
      |       |
      |       +-- sections/Hero.tsx
      |       +-- sections/About.tsx
      |       +-- sections/Projects.tsx    ← reads from lib/projects.ts
      |       +-- sections/Resume.tsx
      |       +-- sections/Contact.tsx     ← contains ContactForm (client)
      |
      +-- app/projects/[slug]/page.tsx     ← Case study pages (/projects/slug)
              |
              +-- generateStaticParams()   ← reads from lib/projects.ts at build time
              +-- ProjectCaseStudy.tsx     ← renders full case study content
```

---

## Component Boundaries

### What Each Layer Owns

| Component / Layer | Responsibility | Communicates With |
|---|---|---|
| `app/layout.tsx` | `<html>` + `<body>`, font loading, global CSS, root metadata | All pages (wraps everything) |
| `app/page.tsx` | Home page assembly — imports and sequences sections | All section components |
| `sections/Hero.tsx` | Name, tagline, primary CTA button | Nothing (pure display) |
| `sections/About.tsx` | Bio, background, personality copy | Nothing (pure display) |
| `sections/Projects.tsx` | Featured project cards + link grid | `lib/projects.ts` (reads data) |
| `sections/Resume.tsx` | Inline resume or PDF download link | `public/` (file link) |
| `sections/Contact.tsx` | Contact section wrapper with social links | `ContactForm` component |
| `components/ContactForm.tsx` | Form UI + pending/error state | `actions/contact.ts` (Server Action) |
| `actions/contact.ts` | Server-side form handling + validation + email delivery | External email service (Resend / Nodemailer) |
| `app/projects/[slug]/page.tsx` | Case study page for a single project | `lib/projects.ts` (reads by slug) |
| `lib/projects.ts` | Single source of truth for all project data | Read by `Projects.tsx`, `generateStaticParams`, case study pages |
| `components/ui/` | Shared primitives (Button, Card, Badge, etc.) | Used by sections and pages |
| `components/layout/Navbar.tsx` | Site navigation | Nothing (pure display + `next/link`) |
| `components/layout/Footer.tsx` | Footer links, copyright | Nothing (pure display) |

### Boundary Rules

- Sections are Server Components. They fetch/import data directly and render HTML. Zero client JS unless specifically needed.
- `ContactForm` is the only `'use client'` component on the home page. It needs `useActionState` for pending/error state.
- `lib/projects.ts` is the only place project data lives. No project data in component files.
- `actions/` holds all Server Actions. They are never called from Server Components directly — only from Client Components via `useActionState` or `form action=`.

---

## Data Flow

### Projects Data Flow

```
lib/projects.ts
  (TypeScript array of project objects)
        |
        |-- imported by --> sections/Projects.tsx
        |                         |
        |                         v
        |                   renders project cards
        |                   with links to /projects/[slug]
        |
        |-- imported by --> app/projects/[slug]/page.tsx
        |                         |
        |                         v
        |                   generateStaticParams() returns slugs
        |                   page renders full case study by slug
        |
        v
  All reads happen at BUILD TIME. No runtime data fetching.
  Result: fully static HTML. Zero API calls at page load.
```

**Project data shape (in `lib/projects.ts`):**

```typescript
export type Project = {
  slug: string           // URL segment: /projects/[slug]
  title: string
  tagline: string
  description: string    // Short — used on cards
  body: string           // Long — used on case study page (or MDX file path)
  tech: string[]         // Technology badges
  liveUrl?: string
  repoUrl?: string
  featured: boolean      // Controls which appear in the featured section
  coverImage: string     // Path in /public/images/projects/
}

export const projects: Project[] = [ /* ... */ ]
```

This is the ONLY place project data lives. Change it here; everything updates.

### Contact Form Data Flow

```
User fills out ContactForm (client component)
        |
        | form submit triggers Server Action
        v
actions/contact.ts
  - receives FormData on server
  - validates with zod (name, email, message)
  - on error: returns { errors } → ContactForm displays inline errors
  - on success: sends email via Resend (or mailto fallback)
              → returns { success: true } → ContactForm shows success state
```

The Server Action runs on Vercel's serverless runtime. No API route needed. The home page itself remains statically rendered — only the form submission is dynamic.

**Form state pattern (`useActionState`):**

```typescript
// components/ContactForm.tsx
'use client'
import { useActionState } from 'react'
import { sendContact } from '@/actions/contact'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, null)
  return (
    <form action={formAction}>
      {/* fields */}
      <button disabled={pending}>Send</button>
      {state?.errors && /* render errors */}
      {state?.success && /* render success message */}
    </form>
  )
}
```

### Resume Data Flow

The resume PDF lives in `/public/resume.pdf`. The Resume section renders a direct `<a href="/resume.pdf" download>` link. No data fetching — pure static asset.

---

## File Structure

```
portfolio/
├── app/
│   ├── layout.tsx                    # Root layout: <html>, <body>, fonts, metadata
│   ├── page.tsx                      # Home page — assembles all sections
│   ├── not-found.tsx                 # 404 page
│   ├── globals.css                   # Global styles
│   └── projects/
│       └── [slug]/
│           └── page.tsx              # Case study page (statically generated)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/                     # One file per home-page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   └── Contact.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx           # Card used in Projects section
│   │   └── ProjectCaseStudy.tsx      # Full case study layout
│   ├── ContactForm.tsx               # 'use client' — the only interactive form
│   └── ui/                           # Shared primitives (Button, Badge, etc.)
│
├── actions/
│   └── contact.ts                    # 'use server' — contact form Server Action
│
├── lib/
│   └── projects.ts                   # Project data + TypeScript types
│
└── public/
    ├── resume.pdf
    └── images/
        └── projects/                 # Cover images for case studies
```

### Special File Conventions

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root shell. Sets `<html lang="en">`, imports fonts, applies body class. This is built first — everything else nests inside it. |
| `app/page.tsx` | Home page. Server Component. Imports sections sequentially. |
| `app/projects/[slug]/page.tsx` | Dynamic route. Must export `generateStaticParams()` to pre-generate at build time. |
| `app/not-found.tsx` | 404 page shown when a slug doesn't match any project. |

---

## Static vs Dynamic Rendering Decisions

| Route | Rendering | Rationale |
|---|---|---|
| `/` (home) | **Static** | No per-request data. Pre-rendered at build time. Served from CDN. |
| `/projects/[slug]` | **Static** (via `generateStaticParams`) | Projects don't change between deploys. Pre-generated for all slugs. 404s for unknown slugs. |
| Contact form submission | **Server Action** (serverless) | Needs server-side processing (validation, email send). Page itself stays static; only the action is dynamic. |

This means the entire site is static HTML served from Vercel's edge CDN with near-instant load times, except when the contact form is submitted (which POSTs to a serverless function).

**Setting `dynamicParams = false` on the case study route** prevents unknown slugs from triggering a runtime render and returning a 404 explicitly:

```typescript
// app/projects/[slug]/page.tsx
export const dynamicParams = false

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}
```

---

## Build Order Implications

Build this in dependency order — later pieces depend on earlier ones being stable.

### Phase 1: Foundation (everything depends on this)

1. `app/layout.tsx` — root shell, fonts, global CSS
2. `lib/projects.ts` — data structure and placeholder project objects
3. `components/ui/` — Button, Card, Badge primitives

**Why first:** Every section imports from `lib/projects.ts`. Every component uses UI primitives. The root layout wraps everything. These cannot be deferred.

### Phase 2: Home Page Sections (parallel, but layout must exist)

4. `components/layout/Navbar.tsx` + `Footer.tsx`
5. `sections/Hero.tsx`
6. `sections/About.tsx`
7. `sections/Projects.tsx` (depends on `lib/projects.ts`)
8. `sections/Resume.tsx`
9. `sections/Contact.tsx` (shell only — ContactForm separate)

**Why second:** These are all Server Components with no cross-dependencies. They can be built in any order once the foundation exists.

### Phase 3: Interactive Contact Form (depends on sections existing)

10. `actions/contact.ts` — Server Action with zod validation
11. `components/ContactForm.tsx` — Client Component using `useActionState`

**Why third:** The Server Action needs a delivery mechanism decided (Resend vs. mailto fallback). ContactForm depends on the action's type signature.

### Phase 4: Project Case Studies (depends on `lib/projects.ts` being populated)

12. `components/projects/ProjectCard.tsx`
13. `components/projects/ProjectCaseStudy.tsx`
14. `app/projects/[slug]/page.tsx` with `generateStaticParams`

**Why fourth:** Case study pages depend on the project data shape being finalized. Changing `Project` type after case study pages exist requires touching multiple files.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Putting Project Data in Components

**What:** Hardcoding project arrays inside `Projects.tsx` or the case study page.

**Why bad:** Data lives in two places. Adding a project means editing both files. `generateStaticParams` can't import from a component without circular dependencies.

**Instead:** Keep all project data in `lib/projects.ts`. Components import from there.

### Anti-Pattern 2: Making the Home Page a Client Component

**What:** Adding `'use client'` to `app/page.tsx` because a section needs interactivity.

**Why bad:** Converts the entire home page to client-rendered JS. Destroys static generation. Hurts performance and SEO.

**Instead:** Keep `app/page.tsx` as a Server Component. Extract only the interactive part (ContactForm) into its own `'use client'` component. Import that client component inside the server-rendered Contact section.

### Anti-Pattern 3: API Routes for the Contact Form

**What:** Creating `app/api/contact/route.ts` and fetching it from the client.

**Why bad:** Adds a network round-trip, requires CORS handling, and is unnecessary complexity now that Server Actions exist.

**Instead:** Use a Server Action in `actions/contact.ts`. Same server-side execution, simpler code, progressive enhancement included.

### Anti-Pattern 4: Skipping `generateStaticParams` on Case Study Pages

**What:** Leaving `app/projects/[slug]/page.tsx` without `generateStaticParams`.

**Why bad:** Without it, Next.js defaults to dynamic server-side rendering for case study pages. They lose static pre-generation and Vercel CDN caching.

**Instead:** Always export `generateStaticParams` that maps over `projects` from `lib/projects.ts`. Pair it with `dynamicParams = false` to 404 unknown slugs rather than attempting runtime render.

---

## Scalability Considerations

This site is intentionally small. These notes are about future additions, not current scope.

| Concern | Current (v1) | If Adding Blog Later | If Adding CMS Later |
|---|---|---|---|
| Content management | TypeScript files in `lib/` | MDX files in `content/posts/` | Migrate `lib/projects.ts` reads to CMS API calls (data shape stays same) |
| Routing | `/` and `/projects/[slug]` | Add `/posts/[slug]` with same pattern | Same |
| Build time | Instant (few static projects) | Grows with post count (still fast) | Same, plus external API call in build |
| Contact form | Server Action + Resend | No change | No change |

The `lib/projects.ts` abstraction is specifically designed so a CMS can be dropped in later without touching components — just change what `lib/projects.ts` exports.

---

## Sources

- [Next.js App Router Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — official docs, current as of 2026-03-25
- [Next.js Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) — official docs
- [Next.js Forms with Server Actions](https://nextjs.org/docs/app/guides/forms) — official docs, current as of 2026-03-25
- [generateStaticParams API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — official docs, current as of 2026-03-25
- [Next.js Architecture Patterns 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) — community article
- [Next.js App Router Complete Guide 2026](https://dev.to/ottoaria/nextjs-app-router-in-2026-the-complete-guide-for-full-stack-developers-5bjl) — DEV Community
- [How to Build a Developer Portfolio with Next.js](https://kinsta.com/blog/next-js-portfolio/) — Kinsta tutorial (MEDIUM confidence — community source)
