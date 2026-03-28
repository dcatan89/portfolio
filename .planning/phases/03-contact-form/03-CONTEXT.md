# Phase 3: Contact Form - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the Contact section — replace the existing `components/sections/Contact.tsx` stub with a fully working contact form (name, email, message) delivered to DJ via Resend Server Action, plus direct contact details (email address + social links). DJ must actually receive messages from a real visitor by the end of this phase.

Contact section already has `id="contact"` and is wired into `app/page.tsx` — do not add a new section, replace the existing stub.

</domain>

<decisions>
## Implementation Decisions

### Section Layout
- **D-01:** Two-column layout on desktop: form on the left (~60% width), direct contact info on the right (~40% width). On mobile, stacks vertically (form first, contact info below). Mirrors the About section's `grid-cols-1 md:grid-cols-2` pattern.
- **D-02:** Direct contact info column contains: DJ's email address displayed as a `mailto:` link, and icon links for GitHub and LinkedIn. Same icon/hover style as Footer (`text-muted-foreground hover:text-primary transition-colors`).
- **D-03:** Section heading "Get in Touch" — already in the stub, keep it. Playfair Display, same size as other section headings (`text-3xl md:text-4xl font-bold`). A short sub-line below: "Drop me a message or reach out directly." (placeholder — DJ swaps for real copy).

### Form Fields & Validation
- **D-04:** Three fields: Name (text, required), Email (email, required + valid email format), Message (textarea, required, min 10 chars). No subject field — keeps it simple.
- **D-05:** Validation: React Hook Form 7.x + Zod 3.x. Schema validates on both client (immediate feedback) and server (Server Action re-validates before sending).
- **D-06:** Honeypot field: hidden `<input name="website" tabIndex={-1} autoComplete="off">` — not visible to real users. Server Action checks: if `website` field has any value, silently return success without sending email (CONTACT-04).
- **D-07:** Field labels are visible (not placeholder-only) — accessibility. Placeholders are supplementary hints, not the only label. Example: label "Your name", placeholder "e.g. Alex Chen".

### Form Feedback States
- **D-08:** Validation errors: inline per-field, appearing below each input on blur or submit attempt. Red text, small (`text-sm`), using the `--destructive` color token.
- **D-09:** Submit success: replace form fields with a confirmation block — heading "Message sent!" + "Thanks — I'll get back to you soon." in warm body text. A "Send another" link resets back to the empty form.
- **D-10:** Submit error (Resend failure / env var missing): show an error message above the form — "Something went wrong. Please try emailing directly at [email]." — with the direct email as a `mailto:` fallback link. Do not expose technical details.
- **D-11:** Loading state: submit button shows "Sending…" and is disabled while the Server Action is in flight. Prevents double-submit.

### Resend Integration
- **D-12:** Full Resend integration — real emails, not mocked. Uses the `resend` npm SDK. Server Action in `app/actions/contact.ts` (or `lib/actions.ts`).
- **D-13:** Environment variable: `RESEND_API_KEY`. If missing at runtime, Server Action returns an error response (D-10) — no crash, graceful degradation.
- **D-14:** Email sent TO: `hello@djcatan.com` (placeholder — DJ updates before launch). FROM: `onboarding@resend.dev` for development (Resend's default sandbox domain, works without custom domain verification). DJ updates to a verified domain address before launch.
- **D-15:** Email format: plain text or simple HTML — title "New portfolio contact from [name]", body includes name, email, and message. No fancy react-email template needed for Phase 3.
- **D-16:** Resend's free tier is 3,000 emails/month — more than sufficient for a portfolio contact form.

### Component Architecture
- **D-17:** `Contact.tsx` becomes a Server Component shell (section, heading, layout grid). Form logic lives in a separate `ContactForm.tsx` with `'use client'` — same Server/Client split pattern as Navbar/NavbarMobile.
- **D-18:** Server Action uses `'use server'` directive. Lives in `app/actions/contact.ts`. Returns a typed result: `{ success: boolean; error?: string }`.
- **D-19:** `useActionState` (React 19, available in Next.js 15) to wire the Server Action to the form — idiomatic pattern, no `useState` + `fetch` needed.

### Copy (Placeholder-First)
- **D-20:** Section heading: "Get in Touch"
- **D-21:** Section sub-line: "Drop me a message or reach out directly."
- **D-22:** Submit button: "Send Message" (loading state: "Sending…")
- **D-23:** Success heading: "Message sent!" / body: "Thanks — I'll get back to you soon."
- **D-24:** Error fallback: "Something went wrong. Please try emailing directly at [email]."
- **D-25:** Direct email displayed: `hello@djcatan.com` (placeholder — DJ replaces before launch)

### Claude's Discretion
- Exact spacing/padding within the form and section
- Input border/focus ring styling (use shadcn-style `border-input focus:ring-ring` tokens)
- Whether to use shadcn `<Input>`, `<Textarea>`, `<Label>`, `<Button>` primitives (preferred — consistent with project) or Tailwind utilities directly
- Textarea minimum height
- Whether to add a small "Powered by Resend" or no attribution

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Spec
- `.planning/REQUIREMENTS.md` — CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04 are the acceptance criteria for this phase
- `.planning/PROJECT.md` — Core value, constraints, warm & personal tone

### Tech Stack
- `CLAUDE.md` — Authoritative for package versions (React Hook Form 7.x, Zod 3.x, Resend), import paths, and conventions

### Existing Implementation
- `components/sections/Contact.tsx` — Existing stub to replace (has `id="contact"`, wired into page.tsx)
- `app/page.tsx` — Contact is already imported and rendered; do not re-wire
- `components/layout/NavbarMobile.tsx` — Reference for 'use client' + Server Component shell pattern
- `components/sections/About.tsx` — Reference for two-column grid layout pattern
- `components/sections/Footer.tsx` — Reference for social icon link style (hover:text-primary pattern)
- `app/globals.css` — CSS variable tokens in use (--primary, --muted-foreground, --destructive, --border, --input, --ring)

### External
- Resend Next.js integration: https://resend.com/nextjs (Server Action pattern)

</canonical_refs>

<specifics>
## Specific Notes

- Honeypot field must be visually hidden (`sr-only` or `opacity-0 absolute`) but present in the DOM — CSS hidden only, not `display:none` or `hidden` attribute (some bots render CSS)
- `RESEND_API_KEY` env var should be added to `.env.local` (gitignored) and noted in a `.env.example` file for reference
- The form is `'use client'` — it is the only new client component in this phase
- No CAPTCHA — honeypot only (CONTACT-04 explicitly excludes CAPTCHA friction)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. User indicated no preference → all decisions made at Claude's discretion.

</deferred>

---
*Phase: 03-contact-form*
*Context gathered: 2026-03-28 — all decisions at Claude's discretion (user: no preference)*
