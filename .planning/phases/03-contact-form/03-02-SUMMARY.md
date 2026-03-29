---
plan: 03-02
phase: 03-contact-form
status: checkpoint
completed: 2026-03-28
subsystem: contact-form
tags: [contact, form, rhf, zod, resend, server-action, honeypot]
dependency_graph:
  requires: [03-01]
  provides: [CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04]
  affects: [app/page.tsx]
tech_stack:
  added: []
  patterns: [useActionState + startTransition, RHF + zodResolver, honeypot spam protection, two-column grid layout]
key_files:
  created:
    - components/sections/ContactForm.tsx
  modified:
    - components/sections/Contact.tsx
decisions:
  - "Honeypot implemented as plain uncontrolled input (name=website) rather than register() to avoid ESLint no-explicit-any violation from type cast"
  - "sr-only honeypot is not registered with RHF — Server Action reads it directly from FormData, which is correct behavior"
metrics:
  duration: ~15 min
  completed_date: 2026-03-28
  tasks_completed: 1
  tasks_total: 2
  files_changed: 2
---

# Phase 3 Plan 02: Contact Form UI and Section Layout Summary

## One-liner

Full contact form UI with RHF + Zod validation, useActionState + startTransition wiring, honeypot spam protection, success/error states, and two-column contact section with direct email and social links.

## What Was Built

**ContactForm.tsx** (`'use client'` component):
- React Hook Form with `zodResolver(contactSchema)` and `mode: 'onBlur'` validation
- `useActionState(sendContactEmail, { success: false })` wired via `startTransition` (avoids React 19 "async action outside context" error)
- Three form fields: name, email, message — each with `Label`, shadcn/ui `Input`/`Textarea`, and inline error messages
- `aria-describedby` on each input for accessibility
- Honeypot field: `name="website"`, `tabIndex={-1}`, `aria-hidden="true"`, `className="sr-only"` — visible in DOM, invisible to sighted users and screen readers
- Success state: replaces form with "Message sent!" heading, "Thanks — I'll get back to you soon." body, and "Send another" link that calls `reset()` and clears `showSuccess`
- Error state: banner above form with mailto fallback link styled as `text-primary underline`
- Submit button: `disabled={isPending}` with "Sending..." / "Send Message" text toggle

**Contact.tsx** (Server Component):
- Full two-column section: `grid-cols-1 md:grid-cols-[3fr_2fr]` — form on left, contact info on right
- Stacks vertically on mobile (form first, info below)
- "Get in Touch" heading + "Drop me a message or reach out directly." subtext
- Right column: "Reach Out Directly" heading, email mailto link with Mail icon, GitHub + LinkedIn icon links
- All icon links use `text-muted-foreground hover:text-primary transition-colors` (matches Footer style)
- `GitHubIcon` and `LinkedInIcon` SVG components copied from Footer.tsx

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Replaced `register('website' as any)` with plain uncontrolled input**
- **Found during:** Task 1 — build failed with ESLint `@typescript-eslint/no-explicit-any` error
- **Issue:** Plan specified `{...register('website' as any)}` but Next.js build pipeline treats ESLint errors as build failures
- **Fix:** Honeypot is now a plain `<input name="website" ...>` without RHF registration. Server Action already reads it via `formData.get('website')` which still works correctly since `new FormData(formRef.current!)` captures all DOM inputs including unregistered ones.
- **Files modified:** `components/sections/ContactForm.tsx`
- **Commit:** 97d06a3

## Known Stubs

None — all data flows are wired. Email address (`hello@djcatan.com`) and social links (GitHub, LinkedIn) are placeholder URLs matching the rest of the site.

## Checkpoint Status

Plan paused at Task 2 (checkpoint:human-verify). Task 1 (build) is complete and committed. Human visual verification of the contact section is required to mark this plan complete.

## Self-Check: PASSED

- `components/sections/ContactForm.tsx` exists and exports `ContactForm` ✓
- `components/sections/Contact.tsx` exports `Contact` (named export, unchanged API) ✓
- Build exits 0 with no TypeScript or ESLint errors ✓
- Commit 97d06a3 exists in git log ✓
- Honeypot field present in DOM as `name="website"` with `aria-hidden="true"` ✓
- Form fields: name, email, message — all wired ✓
- Success state renders when `state.success` is true ✓
- Error state renders when `state.error` is set ✓
- Two-column grid with `md:grid-cols-[3fr_2fr]` ✓
