---
phase: 03-contact-form
plan: "02"
subsystem: ui
tags: [contact-form, react-hook-form, zod, resend, server-actions, useActionState, shadcn-ui, tailwind, honeypot]

# Dependency graph
requires:
  - phase: 03-01
    provides: "contactSchema, ContactFormValues type, sendContactEmail Server Action, shadcn/ui Input/Textarea/Label/Button primitives"
provides:
  - ContactForm client component with RHF + useActionState — all states (idle, loading, success, error)
  - Contact Server Component shell — two-column grid layout with form and direct contact info
  - Honeypot spam protection (sr-only website field)
  - Inline Zod validation errors with aria-describedby accessibility
  - Success state with "Send another" reset
  - Error fallback with mailto link
  - GitHub and LinkedIn icon links in the contact section
  - Email as clickable mailto link visible without form submission
affects: [04-case-studies, 05-polish-deploy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "useActionState + startTransition + useTransition pattern for Server Actions in React 19 (avoids async-outside-action context error)"
    - "useEffect to detect state.success change and set local showSuccess flag for 'Send another' reset"
    - "noValidate on form — RHF + Zod own all validation, no browser defaults"
    - "Honeypot field via plain uncontrolled input with sr-only class + aria-hidden + tabIndex=-1 — invisible to users, visible to bots; Server Action reads via formData.get('website')"

key-files:
  created:
    - components/sections/ContactForm.tsx
  modified:
    - components/sections/Contact.tsx

key-decisions:
  - "register('website' as any) replaced with plain uncontrolled input — Next.js build treats ESLint no-explicit-any as build failure; plain input still captured by new FormData(formRef.current!)"
  - "ContactForm uses startTransition to wrap formAction — required in React 19 to avoid 'async function dispatched outside action context' error"
  - "showSuccess local state flag used for 'Send another' reset rather than relying solely on state.success — prevents re-trigger on re-render"
  - "GitHubIcon and LinkedInIcon SVGs copied inline into Contact.tsx rather than shared file — simpler for two icons, avoids premature abstraction"
  - "onBlur validation mode chosen for RHF — validates on field blur, not on every keystroke"

patterns-established:
  - "Client form components use 'use client' directive + useActionState + useTransition — ContactForm is the reference implementation"
  - "Server Component shells import and render Client Components without any client-side concerns"

requirements-completed: [CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04]

# Metrics
duration: 20min
completed: 2026-03-28
---

# Phase 3 Plan 02: Contact Form UI and Section Layout Summary

**Full contact form UI with RHF + Zod validation, useActionState + startTransition wiring, honeypot spam protection, success/error states, and two-column contact section with direct email and social links.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-03-28T22:50:33Z
- **Completed:** 2026-03-28
- **Tasks:** 2 of 2 complete (1 auto + 1 checkpoint:human-verify — approved)
- **Files modified:** 2

## Accomplishments
- Built ContactForm client component with full RHF + Zod client-side validation wired to the sendContactEmail Server Action via useActionState + startTransition
- Replaced Contact.tsx stub with two-column Server Component shell — form left (3fr), contact info right (2fr) — responsive down to mobile stacked layout
- Implemented all form states: idle, loading (Sending... button), success (Message sent! + Send another reset), error fallback with mailto link
- Added honeypot spam protection field (sr-only, aria-hidden, tabIndex=-1) read by Server Action via formData.get('website')
- Direct contact info column with clickable mailto email and GitHub/LinkedIn icon links with hover color transition

## Task Commits

Each task was committed atomically:

1. **Task 1: Build ContactForm client component and replace Contact section** - `97d06a3` (feat)
2. **Task 2: Verify contact form and section visually** - checkpoint:human-verify — approved by user (no code changes)

**Plan metadata:** docs commit (this SUMMARY)

## Files Created/Modified
- `components/sections/ContactForm.tsx` — 'use client' form component; RHF + zodResolver, useActionState + startTransition, all form states (idle/loading/success/error), honeypot, inline validation errors with aria-describedby
- `components/sections/Contact.tsx` — Server Component shell; two-column grid [3fr_2fr], heading, ContactForm left, direct contact info right with Mail icon + email link + GitHub/LinkedIn SVG icons

## Decisions Made
- `startTransition` wraps `formAction(new FormData(...))` — mandatory in React 19 to avoid "async function dispatched outside of action context" error
- `showSuccess` local flag (set via `useEffect` watching `state.success`) enables the "Send another" reset path
- GitHubIcon and LinkedInIcon SVGs copied inline rather than extracted to a shared file — two icons, one file, no abstraction needed at this scale
- `onBlur` mode for RHF — validates on field blur, balancing immediacy and noise

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Replaced `register('website' as any)` with plain uncontrolled input**
- **Found during:** Task 1 (build step)
- **Issue:** Plan specified `{...register('website' as any)}` but Next.js build pipeline treats ESLint `@typescript-eslint/no-explicit-any` as a build failure
- **Fix:** Honeypot is now a plain `<input name="website" ...>` without RHF registration. Server Action already reads it via `formData.get('website')` which works correctly since `new FormData(formRef.current!)` captures all DOM inputs including unregistered ones.
- **Files modified:** `components/sections/ContactForm.tsx`
- **Commit:** 97d06a3

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Auto-fix was necessary to pass the Next.js ESLint build gate. Functionally equivalent — honeypot still works correctly.

## Issues Encountered
None beyond the deviation documented above.

## User Setup Required
**External services require manual configuration.** The contact form is wired to Resend via `app/actions/contact.ts` (built in Plan 01). To enable live email delivery:
- Add `RESEND_API_KEY` to `.env.local` and Vercel environment variables
- Verify SPF/DKIM DNS records for the sending domain
- Without the API key the form returns the error state with the mailto fallback link — this is expected behavior

## Known Stubs

None — all data flows are wired. Email address (`hello@djcatan.com`) and social links (GitHub, LinkedIn) use placeholder URLs matching the rest of the site, which is intentional at this stage.

## Next Phase Readiness
- Contact section is fully functional and human-verified
- Phase 3 is complete — contact form, Server Action, and UI all ship together
- Phase 4 (case studies) can begin; no blockers from Phase 3
- Resend DNS setup remains a production readiness item (pre-existing concern documented in STATE.md, not introduced by this plan)

## Self-Check: PASSED

- `components/sections/ContactForm.tsx` exists and exports `ContactForm` (worktree: 97d06a3)
- `components/sections/Contact.tsx` exports `Contact` (named export, unchanged API)
- Build exits 0 with no TypeScript or ESLint errors
- Commit 97d06a3 exists in worktree git log
- Honeypot field present in DOM as `name="website"` with `aria-hidden="true"`
- Form fields: name, email, message — all wired with inline validation
- Success state renders when `state.success` is true
- Error state renders when `state.error` is set
- Two-column grid with `md:grid-cols-[3fr_2fr]`
- Human verification: approved

---
*Phase: 03-contact-form*
*Completed: 2026-03-28*
