# Roadmap: DJ Catan Personal Portfolio

## Overview

Five phases take this project from a blank repo to a launched, polished portfolio. Phase 1 builds the foundation and gets a production URL on day one. Phase 2 builds every home page section as static Server Components. Phase 3 wires up the contact form — the site's only interactive surface. Phase 4 adds full case study pages for featured projects. Phase 5 polishes animations, accessibility, and SEO before the final push to launch.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js scaffold, Vercel deploy, lib/projects.ts, placeholder content system (completed 2026-03-28)
- [x] **Phase 2: Home Page** - Navbar, footer, hero, about, projects grid, and resume download (completed 2026-03-28)
- [x] **Phase 3: Contact Form** - Server Action, Resend integration, spam protection, and contact links (completed 2026-03-29)
- [ ] **Phase 4: Case Studies** - Full narrative case study pages for featured projects
- [ ] **Phase 5: Polish & Launch** - Animations, SEO, accessibility, cross-device testing

## Phase Details

### Phase 1: Foundation
**Goal**: The project is scaffolded, deployed to Vercel, and has a stable data layer ready for all sections to build on
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04
**Success Criteria** (what must be TRUE):
  1. Visitor can load a live URL on Vercel and see a working Next.js app (not a localhost-only project)
  2. lib/projects.ts exists with typed placeholder project data that any component can import
  3. app/layout.tsx has metadataBase set and fonts loaded with no FOUT
  4. Every future section has a placeholder stub — the home page renders without errors even before real content exists
**Plans:** 2/2 plans complete
Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 15, configure Tailwind v4, shadcn/ui, fonts, Prettier
- [x] 01-02-PLAN.md — Create lib/projects.ts data layer, section stubs, wire home page, deploy to Vercel

### Phase 2: Home Page
**Goal**: A visitor can see every main section of the portfolio on a single scrollable page with full navigation
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, ABOUT-01, ABOUT-02, PROJ-01, PROJ-03, PROJ-04, RESUME-01
**Success Criteria** (what must be TRUE):
  1. Visitor can click any navbar link and smoothly scroll to that section (desktop and mobile hamburger both work)
  2. Visitor sees DJ's name, tagline, availability badge, and a CTA button on first load
  3. Visitor can read an About section with bio and a styled photo placeholder slot
  4. Visitor can browse a project card grid showing titles, descriptions, tech stack tags, and live/GitHub links
  5. Visitor can download a resume PDF via a clearly labeled button
**Plans:** 3/3 plans complete
Plans:
- [x] 02-01-PLAN.md — Warm color palette, smooth scroll, Navbar with hamburger, Footer with social links
- [x] 02-02-PLAN.md — Hero section (name, CTA, availability badge, scroll chevron) and About section (photo placeholder, bio)
- [x] 02-03-PLAN.md — Projects card grid consuming lib/projects.ts and Resume download with placeholder PDF
**UI hint**: yes

### Phase 3: Contact Form
**Goal**: A visitor can reach DJ through the contact form or find his direct contact details, and DJ actually receives those messages
**Depends on**: Phase 2
**Requirements**: CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04
**Success Criteria** (what must be TRUE):
  1. Visitor can submit a contact form with name, email, and message and receive visible confirmation
  2. DJ receives the submission as an email via Resend (verified with a real test submission from a mobile device)
  3. Visitor can find DJ's email address and social profile links (GitHub, LinkedIn) without submitting the form
  4. A bot submitting the honeypot field does not trigger an email send
**Plans:** 2/2 plans complete
Plans:
- [x] 03-01-PLAN.md — Install deps (RHF, Zod, Resend), add shadcn/ui form primitives, create Zod schema and Server Action
- [x] 03-02-PLAN.md — Build ContactForm client component, replace Contact section stub with two-column layout + social links
**UI hint**: yes

### Phase 4: Case Studies
**Goal**: A visitor can click into any featured project and read a full narrative case study — not just a screenshot and a tech list
**Depends on**: Phase 1
**Requirements**: PROJ-02
**Success Criteria** (what must be TRUE):
  1. Each featured project has a dedicated page at /projects/[slug] with Problem, My Role, Key Decisions, and Outcome sections
  2. Pages are statically generated at build time (generateStaticParams + dynamicParams = false) — no 404 on direct load
  3. A visitor navigating from the project card lands on the correct case study page
**Plans:** 1/2 plans executed
Plans:
- [x] 04-01-PLAN.md — Case study page with static generation and featured card linking
- [x] 04-02-PLAN.md — Deploy to Vercel and visual verification checkpoint
**UI hint**: yes

### Phase 5: Polish & Launch
**Goal**: The site is accessible, discoverable, visually polished, and ready to share with recruiters and clients
**Depends on**: Phase 4
**Requirements**: POLISH-01, POLISH-02, POLISH-03, POLISH-04
**Success Criteria** (what must be TRUE):
  1. Key elements animate in on scroll and interactive elements have hover effects (Motion, no janky layout shifts)
  2. Production HTML does not contain a noindex meta tag, and sharing a URL on Slack/LinkedIn shows a correct Open Graph preview
  3. Every page is fully usable with keyboard navigation only, all images have alt text, and focus states are visible
  4. Home page and case study pages are visually correct on a real mobile device (375px) and tablet (768px)
**Plans:** 1/3 plans executed
Plans:
- [ ] 05-01-PLAN.md — Motion scroll-reveal animations, Hero stagger, project card cascade, skip-to-content link, focus rings, ARIA verification
- [x] 05-02-PLAN.md — SEO metadata (OG, Twitter, robots), static OG image, sitemap.ts, robots.ts
- [ ] 05-03-PLAN.md — Deploy to Vercel and responsive visual verification checkpoint
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete    | 2026-03-28 |
| 2. Home Page | 3/3 | Complete   | 2026-03-28 |
| 3. Contact Form | 2/2 | Complete   | 2026-03-29 |
| 4. Case Studies | 1/2 | In Progress|  |
| 5. Polish & Launch | 1/3 | In Progress|  |
