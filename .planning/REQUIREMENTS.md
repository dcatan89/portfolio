# Requirements: DJ Catan Personal Portfolio

**Defined:** 2026-03-27
**Core Value:** A visitor should leave knowing exactly who DJ is, be impressed by his work, and have a clear way to reach out — all three, not one at the expense of the others.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Project is scaffolded with Next.js 15 App Router, TypeScript, Tailwind v4, and shadcn/ui
- [x] **FOUND-02**: Vercel deploy pipeline is configured from day one with a working production URL
- [x] **FOUND-03**: All project data is centralized in a single `lib/projects.ts` file as the source of truth
- [x] **FOUND-04**: Every section uses realistic placeholder content that is easy to swap for real content later

### Navigation

- [x] **NAV-01**: Visitor can see a top navbar with anchor links to all main sections
- [x] **NAV-02**: Clicking a navbar link smoothly scrolls to the corresponding section
- [x] **NAV-03**: Visitor on mobile can open and close a hamburger menu for navigation
- [x] **NAV-04**: Visitor can find social/contact links in a footer at the bottom of the page

### Hero

- [ ] **HERO-01**: Visitor sees DJ's name, a tagline describing what he does, and a primary CTA button on first load
- [ ] **HERO-02**: Visitor can see an availability badge near the CTA indicating DJ's openness to work or projects

### About

- [ ] **ABOUT-01**: Visitor can read an About section with DJ's bio, background, and personality
- [ ] **ABOUT-02**: About section includes a photo placeholder slot sized and styled for a real headshot

### Projects

- [ ] **PROJ-01**: Visitor can browse a card grid showing DJ's projects with title, description, and links
- [ ] **PROJ-02**: Visitor can navigate to a full case study page for each featured project showing problem, process, and outcome
- [ ] **PROJ-03**: Each project card displays tech stack tags showing what technologies were used
- [ ] **PROJ-04**: Each project card has links to the live site and/or GitHub source code

### Resume

- [ ] **RESUME-01**: Visitor can download DJ's resume as a PDF via a clearly labeled download button

### Contact

- [ ] **CONTACT-01**: Visitor can submit a contact form with name, email, and message fields, delivered via Resend Server Action
- [ ] **CONTACT-02**: Visitor can find links to DJ's social profiles (GitHub, LinkedIn) in the Contact section
- [ ] **CONTACT-03**: Visitor can see DJ's email address displayed directly in the Contact section
- [ ] **CONTACT-04**: Contact form has honeypot spam protection without CAPTCHA friction for real users

### Polish

- [ ] **POLISH-01**: Sections and interactive elements have subtle entrance animations and hover effects using Motion
- [ ] **POLISH-02**: Every page has accurate SEO metadata (title, description, Open Graph tags) for good sharing and search
- [ ] **POLISH-03**: All sections are fully responsive and visually tested on mobile and tablet viewports
- [ ] **POLISH-04**: Site meets accessibility basics: keyboard navigation, alt text on images, visible focus states

## v2 Requirements

### Content Management

- **CMS-01**: Site content (bio, projects, resume) is editable via a headless CMS without code changes

### Writing

- **WRITE-01**: Visitor can read blog posts or technical articles written by DJ
- **WRITE-02**: Posts have individual pages with proper SEO metadata

### Appearance

- **DARK-01**: Visitor can toggle between light and dark mode

## Out of Scope

| Feature | Reason |
|---------|--------|
| Blog / writing section | Not requested for v1 — adds significant scope with no immediate value |
| Dark mode toggle | Warm & personal vibe has a defined look; toggling would undermine the design intent |
| CMS integration | Content managed in code for v1 — simplicity over flexibility at this stage |
| Authentication / user accounts | Public portfolio — no login needed |
| Analytics dashboard | Not requested; can add a simple script tag later without roadmap changes |
| Skills logo wall | Research flags this as an anti-feature — looks busy, adds no real signal to recruiters |
| Auto-play media | Anti-feature — jarring and inaccessible |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 2 | Complete |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| ABOUT-02 | Phase 2 | Pending |
| PROJ-01 | Phase 2 | Pending |
| PROJ-03 | Phase 2 | Pending |
| PROJ-04 | Phase 2 | Pending |
| RESUME-01 | Phase 2 | Pending |
| CONTACT-01 | Phase 3 | Pending |
| CONTACT-02 | Phase 3 | Pending |
| CONTACT-03 | Phase 3 | Pending |
| CONTACT-04 | Phase 3 | Pending |
| PROJ-02 | Phase 4 | Pending |
| POLISH-01 | Phase 5 | Pending |
| POLISH-02 | Phase 5 | Pending |
| POLISH-03 | Phase 5 | Pending |
| POLISH-04 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-27*
*Last updated: 2026-03-27 after roadmap creation*
