---
phase: 05-polish-launch
plan: 01
subsystem: animations-accessibility
tags: [motion, scroll-reveal, animations, accessibility, focus-rings, skip-to-content]
dependency_graph:
  requires: []
  provides: [AnimatedSection, AnimatedHeroItem, AnimatedCard, skip-to-content, focus-rings]
  affects: [Hero, About, Projects, Resume, Contact, Footer, Navbar, NavbarMobile, CaseStudyPage]
tech_stack:
  added: [motion@12.x]
  patterns: [whileInView scroll-reveal, staggered mount animation, client wrapper components]
key_files:
  created:
    - components/ui/AnimatedSection.tsx
    - components/ui/AnimatedHero.tsx
    - components/ui/AnimatedCard.tsx
    - app/projects/[slug]/page.tsx
  modified:
    - components/sections/Hero.tsx
    - components/sections/About.tsx
    - components/sections/Projects.tsx
    - components/sections/Resume.tsx
    - components/sections/Contact.tsx
    - components/sections/Footer.tsx
    - components/sections/ContactForm.tsx
    - components/layout/Navbar.tsx
    - components/layout/NavbarMobile.tsx
    - app/layout.tsx
    - app/page.tsx
    - package.json
decisions:
  - Motion client wrapper components (AnimatedSection/AnimatedHeroItem/AnimatedCard) isolate 'use client' boundary so section Server Components remain unchanged
  - Hero uses animate (mount) not whileInView so animation fires on load without scroll
  - Footer intentionally excluded from animations per plan spec (D-02)
  - Case study page created in worktree from Phase 4 (pr/phase-4) since master branch predates Phase 4 merge
metrics:
  duration: ~15 minutes
  completed: 2026-03-29
  tasks_completed: 2
  files_changed: 12
---

# Phase 05 Plan 01: Animations and Accessibility Summary

Motion scroll-reveal animations for all sections (whileInView), staggered Hero mount animation (animate), index-based project card cascade, skip-to-content link, and focus-visible:ring-2 across all interactive elements.

## What Was Built

### Task 1: Install Motion and Add Animations

Installed the `motion` npm package (v12, `motion/react` import path) and created three client wrapper components:

- **AnimatedSection** (`components/ui/AnimatedSection.tsx`): Reusable `whileInView` scroll-reveal wrapper. `viewport={{ once: true }}` prevents re-animation on scroll up.
- **AnimatedHeroItem** (`components/ui/AnimatedHero.tsx`): Mount-triggered (`animate`) wrapper for Hero elements. Uses `animate` not `whileInView` so animation plays on page load, not on scroll.
- **AnimatedCard** (`components/ui/AnimatedCard.tsx`): Card wrapper with `index * 0.08` stagger delay for the project grid cascade effect.

Applied animations:
- Hero: h1, tagline p, and CTA+badge div wrapped in AnimatedHeroItem with delays 0, 0.1, 0.2. Scroll chevron left as-is (already has animate-bounce).
- About: Inner grid div wrapped in AnimatedSection.
- Projects: Heading wrapped in AnimatedSection. Each project card wrapped in AnimatedCard with map index.
- Resume: Inner content div wrapped in AnimatedSection.
- Contact: Inner content div wrapped in AnimatedSection.
- Case study page: Page heading area, Problem, My Role, Key Decisions, Outcome, tech tags, and CTA links each wrapped in AnimatedSection.
- Footer: No animations applied (per plan spec D-02/D-08).

Also created `app/projects/[slug]/page.tsx` in the worktree since master branch predates Phase 4 merge. Content matches Phase 4 (pr/phase-4) with animations added.

### Task 2: Skip-to-Content and Focus Rings

- **Skip-to-content**: Added as first child of `<body>` in `app/layout.tsx`. Uses `sr-only focus:not-sr-only` Tailwind pattern. Links to `#main-content`.
- **`id="main-content"`**: Added to `<main>` in `app/page.tsx` and to `<main>` in case study page.
- **Focus rings** (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`) added to:
  - Navbar: brand link, desktop nav links
  - NavbarMobile: hamburger button, mobile menu links; ARIA verified (aria-label="Toggle menu", aria-expanded={open} already present)
  - Hero: CTA "View My Work" link
  - Resume: Download Resume link
  - Contact: email link, GitHub and LinkedIn social icon links
  - ContactForm: "Send another" button (shadcn Input/Textarea/Button already have focus styles from component library)
  - Footer: GitHub, LinkedIn, Mail icon links
  - Case study: Back link, View Live Site, View on GitHub

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Functionality] Created case study page in worktree**
- **Found during:** Task 1
- **Issue:** `app/projects/[slug]/page.tsx` does not exist in worktree (master branch predates Phase 4 merge). Plan requires animating case study sections.
- **Fix:** Created the file using Phase 4 content from `pr/phase-4` branch, with AnimatedSection wrappers and Task 2 focus rings added inline.
- **Files modified:** `app/projects/[slug]/page.tsx` (created)
- **Commit:** 7db2769

**2. [Rule 2 - Missing Functionality] Used Phase 4 Projects.tsx with Link navigation**
- **Found during:** Task 1
- **Issue:** Worktree Projects.tsx (from Phase 3) lacked Link-based navigation to case study pages. Phase 4 version was required for correctness.
- **Fix:** Used Phase 4 Projects.tsx content as base (with Link for featured projects) before adding AnimatedSection/AnimatedCard.
- **Files modified:** `components/sections/Projects.tsx`
- **Commit:** 7db2769

## Known Stubs

None that affect plan goal. Project data contains TODO slugs/titles (`TODO-real-slug-1`) inherited from lib/projects.ts placeholder data — these are pre-existing and tracked elsewhere.

## Self-Check: PASSED
