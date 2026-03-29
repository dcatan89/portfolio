# Phase 3: Contact Form - Research

**Researched:** 2026-03-28
**Domain:** React Hook Form + Zod + Resend + Next.js 15 Server Actions
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Section Layout**
- D-01: Two-column layout on desktop (form ~60%, contact info ~40%). Mobile stacks vertically (form first). Mirrors About section `grid-cols-1 md:grid-cols-2` pattern.
- D-02: Direct contact info column: DJ's email as `mailto:` link + icon links for GitHub and LinkedIn. Style: `text-muted-foreground hover:text-primary transition-colors` (matches Footer).
- D-03: Section heading "Get in Touch" (already in stub — keep it). Sub-line: "Drop me a message or reach out directly."

**Form Fields & Validation**
- D-04: Three fields: Name (text, required), Email (email, required + valid format), Message (textarea, required, min 10 chars). No subject field.
- D-05: Validation: React Hook Form 7.x + Zod 3.x. Client and server both validate.
- D-06: Honeypot: hidden `<input name="website" tabIndex={-1} autoComplete="off">`. Server checks: if `website` has value → silently return success, skip email.
- D-07: Visible field labels (accessibility), placeholders are supplementary only.

**Form Feedback States**
- D-08: Inline per-field errors, below each input on blur or submit. Red text (`text-sm`, `--destructive` token).
- D-09: Submit success: replace form fields with "Message sent!" / "Thanks — I'll get back to you soon." + "Send another" link resets to empty form.
- D-10: Submit error: error message above form — "Something went wrong. Please try emailing directly at [email]." with `mailto:` fallback. No technical details.
- D-11: Loading state: submit button shows "Sending…" and is disabled while Server Action is in flight. Prevents double-submit.

**Resend Integration**
- D-12: Full Resend integration — real emails, `resend` npm SDK. Server Action in `app/actions/contact.ts`.
- D-13: `RESEND_API_KEY` env var. If missing at runtime → return error response (D-10), no crash.
- D-14: TO: `hello@djcatan.com`. FROM: `onboarding@resend.dev` for dev (Resend sandbox, no domain verification needed). Update to verified domain before launch.
- D-15: Email format: plain HTML string — title "New portfolio contact from [name]", body includes name, email, message. No react-email template.
- D-16: Free tier: 3,000 emails/month.

**Component Architecture**
- D-17: `Contact.tsx` = Server Component shell (section, heading, layout grid). Form logic in separate `ContactForm.tsx` with `'use client'`.
- D-18: Server Action uses `'use server'`. Lives in `app/actions/contact.ts`. Returns `{ success: boolean; error?: string }`.
- D-19: `useActionState` (React 19) to wire Server Action to form — idiomatic pattern.

**Copy (Placeholder-First)**
- D-20: Section heading: "Get in Touch"
- D-21: Sub-line: "Drop me a message or reach out directly."
- D-22: Submit button: "Send Message" / loading: "Sending…"
- D-23: Success: "Message sent!" / "Thanks — I'll get back to you soon."
- D-24: Error: "Something went wrong. Please try emailing directly at [email]."
- D-25: Direct email: `hello@djcatan.com` (placeholder)

**Specifics (from CONTEXT.md)**
- Honeypot must be visually hidden via CSS (`sr-only` or `opacity-0 absolute`) — NOT `display:none` or `hidden` attribute
- `RESEND_API_KEY` added to `.env.local` (gitignored), documented in `.env.example`
- `ContactForm.tsx` is the only new `'use client'` component in this phase
- No CAPTCHA — honeypot only

### Claude's Discretion
- Exact spacing/padding within the form and section
- Input border/focus ring styling (use shadcn-style `border-input focus:ring-ring` tokens)
- Whether to use shadcn `<Input>`, `<Textarea>`, `<Label>`, `<Button>` primitives or Tailwind utilities directly (preferred: shadcn primitives for consistency)
- Textarea minimum height
- Whether to add "Powered by Resend" attribution

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONTACT-01 | Visitor can submit a contact form with name, email, and message fields, delivered via Resend Server Action | React Hook Form + Zod + useActionState pattern; Resend SDK `resend.emails.send()` with `html:` body string |
| CONTACT-02 | Visitor can find links to DJ's social profiles (GitHub, LinkedIn) in the Contact section | Footer already has the exact SVG icon + hover pattern to reuse; right column layout wired from D-01/D-02 |
| CONTACT-03 | Visitor can see DJ's email address displayed directly in the Contact section | Displayed as `mailto:` link in right column; `hello@djcatan.com` placeholder |
| CONTACT-04 | Contact form has honeypot spam protection without CAPTCHA friction | Hidden `<input name="website">` via `sr-only` CSS; Server Action checks before calling Resend |
</phase_requirements>

---

## Summary

Phase 3 replaces the existing `Contact.tsx` stub with a fully working contact form wired to Resend. The codebase already has the foundational patterns in place: the About section provides the two-column grid template, the Footer provides the social icon + hover style, and NavbarMobile demonstrates the Server Component shell + `'use client'` child split.

The three key packages that need installing are `react-hook-form`, `zod`, `@hookform/resolvers`, and `resend`. shadcn/ui component primitives (Input, Textarea, Label, Button) are not yet installed — `components.json` is configured and ready, so they can be added via `npx shadcn@latest add`. No existing `components/ui/` directory exists yet; these will be the first shadcn components in the project.

The integration pattern for React Hook Form + `useActionState` requires `startTransition` to maintain React's async action context. Without it, React 19 throws an error. The form uses RHF's `handleSubmit` for client-side Zod validation first; on success it wraps the server action call in `startTransition`. `isPending` from `useActionState` drives the disabled/loading button state.

**Primary recommendation:** Install four packages, add four shadcn primitives, build `ContactForm.tsx` as a `'use client'` component with the RHF + `useActionState` + `startTransition` pattern, and write the Server Action in `app/actions/contact.ts` with the Resend `html:` body approach (no react-email needed).

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | 7.72.0 (latest) | Form state, validation, blur/submit error display | Locked decision D-05; uncontrolled inputs, minimal re-renders, idiomatic with Next.js |
| zod | 4.3.6 (latest) | Schema definition shared by client validation (zodResolver) and server-side re-validation | Locked decision D-05; single schema eliminates type duplication |
| @hookform/resolvers | 5.2.2 (latest) | Bridges Zod schema into RHF's `resolver` option | Required companion to use zodResolver |
| resend | 6.9.4 (latest) | Transactional email delivery from Server Action | Locked decision D-12; official npm SDK, `{ data, error }` response tuple, no SMTP config |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui Input | copy-paste | Styled accessible input primitive | Form name and email fields |
| shadcn/ui Textarea | copy-paste | Styled accessible textarea primitive | Message field |
| shadcn/ui Label | copy-paste | Accessible label with `for` association | All three fields |
| shadcn/ui Button | copy-paste | Styled button with disabled state | Submit button |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn primitives | Raw Tailwind `<input>` | Primitives are faster to implement correctly and already use the project CSS token system |
| html: string email | react-email template | react-email is overkill for a single contact notification; `html:` string is simpler and sufficient |
| useActionState | useState + fetch | useActionState is the React 19 idiomatic path; integrates loading state via `isPending` without manual state |

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers resend
npx shadcn@latest add input textarea label button
```

**Version verification (confirmed against npm registry 2026-03-28):**
- react-hook-form: 7.72.0
- zod: 4.3.6
- @hookform/resolvers: 5.2.2
- resend: 6.9.4

---

## Architecture Patterns

### Recommended Project Structure
```
app/
├── actions/
│   └── contact.ts          # 'use server' — Server Action, Resend call
├── page.tsx                 # Already imports Contact — no change needed
components/
├── sections/
│   ├── Contact.tsx          # Replace stub: Server Component shell + grid layout
│   └── ContactForm.tsx      # NEW: 'use client' — RHF + useActionState form
.env.local                   # RESEND_API_KEY=re_... (gitignored)
.env.example                 # RESEND_API_KEY=your_resend_api_key_here
```

### Pattern 1: Server Component Shell + Client Form (D-17)
**What:** `Contact.tsx` is a Server Component that renders section markup, heading, and two-column grid. It imports `<ContactForm />` which carries the `'use client'` boundary.
**When to use:** Any section that needs interactive form within a static layout — same pattern as Navbar/NavbarMobile.
**Example:**
```typescript
// components/sections/Contact.tsx (Server Component — no directive)
import { ContactForm } from '@/components/sections/ContactForm'

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-muted-foreground">
          Drop me a message or reach out directly.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr]">
          <ContactForm />
          {/* Direct contact info column */}
        </div>
      </div>
    </section>
  )
}
```

### Pattern 2: Server Action with Resend (D-12, D-13, D-18)
**What:** Server Action in `app/actions/contact.ts` receives `FormData`, re-validates with Zod, checks honeypot, calls Resend SDK, returns `{ success: boolean; error?: string }`.
**When to use:** Any mutation that sends external data — Server Action keeps API key server-side.
**Example:**
```typescript
// app/actions/contact.ts
'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string(), // honeypot — expected to be empty
})

type ActionResult = { success: boolean; error?: string }

export async function sendContactEmail(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Honeypot check — silent success to avoid revealing detection
  const honeypot = formData.get('website')
  if (honeypot) return { success: true }

  // Guard against missing env var
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: 'Configuration error' }
  }

  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    website: formData.get('website') ?? '',
  })

  if (!parsed.success) {
    return { success: false, error: 'Validation failed' }
  }

  const { name, email, message } = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: ['hello@djcatan.com'],
    replyTo: email,
    subject: `New portfolio contact from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`,
  })

  if (error) {
    return { success: false, error: 'Email delivery failed' }
  }

  return { success: true }
}
```

### Pattern 3: React Hook Form + useActionState + startTransition (D-19)
**What:** Client component wires RHF client-side validation to Server Action via `useActionState`. `startTransition` is required to dispatch the action outside a form's `action` prop while preserving React's async context.
**When to use:** Any form that needs both RHF client validation AND Server Action processing.
**Example:**
```typescript
'use client'

import { useRef, useTransition } from 'react'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { sendContactEmail } from '@/app/actions/contact'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  const [state, formAction] = useActionState(sendContactEmail, {
    success: false,
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit(() => {
    startTransition(() => {
      formAction(new FormData(formRef.current!))
    })
  })

  if (state.success) {
    return (
      <div>
        <h3>Message sent!</h3>
        <p>Thanks — I&apos;ll get back to you soon.</p>
        <button onClick={() => reset()}>Send another</button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      {state.error && <p className="text-destructive">{state.error}</p>}
      {/* fields + honeypot + submit */}
    </form>
  )
}
```

### Pattern 4: Honeypot Field (D-06, CONTACT-04)
**What:** Hidden input with a realistic-sounding name (`website`). Hidden via `sr-only` CSS class (Tailwind utility: `absolute w-px h-px p-0 -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0`). Never shown to real users. Bots fill it in.
**Key rules:**
- Do NOT use `type="hidden"` — bots fill these too
- Do NOT use `display:none` or `hidden` attribute — some bots detect and skip
- DO use `sr-only` (CSS positioning off-screen) — visually hidden, present in DOM
- Add `tabIndex={-1}` and `autoComplete="off"` so screen reader users cannot tab to it
- Add `aria-hidden="true"` so screen readers skip it entirely

```tsx
{/* Honeypot — do not remove */}
<input
  {...register('website')}
  type="text"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  className="sr-only"
/>
```

### Anti-Patterns to Avoid
- **Passing server action directly to form `action` prop when using RHF:** Bypasses RHF's `handleSubmit` and client validation. Always use `onSubmit={handleSubmit(...)}` + `startTransition`.
- **Calling Server Action outside `startTransition` in a client component:** React 19 throws "async function dispatched outside of action context". Always wrap in `startTransition`.
- **Instantiating `new Resend()` at module scope:** If `RESEND_API_KEY` is undefined at build time, Next.js may fail to build. Instantiate inside the function body after the env var guard.
- **Using `type="hidden"` for honeypot:** Ineffective — bots know to leave hidden inputs empty precisely because developers check them.
- **Returning error message with technical details:** Leaks implementation. Return generic messages like "Configuration error" only.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation + error display | Custom state + regex | React Hook Form 7 + Zod | RHF handles blur/submit modes, error object shape, touched state; Zod gives typed inference and shared schema |
| Email delivery | Nodemailer + SMTP config | Resend SDK | SMTP setup requires server credentials, SPF/DKIM config; Resend provides all of this with a single API key |
| Accessible form inputs | Custom `<div>` + CSS | shadcn/ui Input, Label, Textarea | Correct `for`/`id` association, keyboard interaction, focus ring tokens — all pre-built |
| Loading state tracking | `useState(false)` + manual toggle | `isPending` from `useActionState` | Automatically tied to Server Action lifecycle; no race conditions |
| Spam protection | CAPTCHA (bad UX) | Honeypot field | Zero friction for real users; server-side check before email send |

**Key insight:** The RHF + Zod + Resend combination is battle-tested for exactly this use case. Any custom solution replicates what these tools already handle, but with more code and more edge cases.

---

## Common Pitfalls

### Pitfall 1: startTransition Missing from Server Action Dispatch
**What goes wrong:** React 19 throws `"An async function (sendContactEmail) was dispatched outside of action context"`. Form appears to work locally but errors in production or strict mode.
**Why it happens:** `useActionState`'s dispatch function must be called inside React's action context. When you call `formAction(formData)` from an event handler directly, you're outside that context.
**How to avoid:** Always wrap the dispatch in `startTransition`:
```typescript
const onSubmit = handleSubmit(() => {
  startTransition(() => formAction(new FormData(formRef.current!)))
})
```
**Warning signs:** Console error mentioning "async function dispatched outside of action context" or "not inside a Server Action context".

### Pitfall 2: Resend Client Instantiated at Module Scope
**What goes wrong:** `next build` fails with "RESEND_API_KEY is not defined" even if the var is in `.env.local`.
**Why it happens:** Next.js evaluates module-level code during the build phase. `.env.local` values are not available at build time — only at runtime. `new Resend(process.env.RESEND_API_KEY)` at module scope throws during SSG/build.
**How to avoid:** Instantiate inside the function body, after the env var guard check.
**Warning signs:** Build error referencing missing env var; works locally but breaks on Vercel.

### Pitfall 3: `state.success` Reset Not Handled
**What goes wrong:** After clicking "Send another", the form resets its fields but `state.success` in `useActionState` remains `true`, so the success view keeps rendering.
**Why it happens:** `useActionState` state persists until the action is called again. Calling `reset()` from RHF only resets the form fields, not the action state.
**How to avoid:** Use local state to track whether the user has clicked "Send another". A `useState(false)` flag that flips to `true` on button click overrides the `state.success` display.
**Warning signs:** Clicking "Send another" re-renders empty fields but the success message immediately reappears.

### Pitfall 4: Honeypot Field Appears in Accessibility Tree
**What goes wrong:** Screen reader users encounter an unexpected "website" field and fill it in, causing their submission to be silently dropped.
**Why it happens:** `sr-only` hides visually but the field is still focusable and announced by screen readers.
**How to avoid:** Add both `tabIndex={-1}` (removes from tab order) and `aria-hidden="true"` (removes from accessibility tree).
**Warning signs:** VoiceOver/NVDA announces a "website" field during form navigation.

### Pitfall 5: Missing `.env.example` Causes Deployment Mystery
**What goes wrong:** Resend emails never arrive on Vercel even though local dev works. Developer has no record of which env vars to set.
**Why it happens:** `.env.local` is gitignored; the Vercel project has no env var configured.
**How to avoid:** Create `.env.example` with `RESEND_API_KEY=your_resend_api_key_here` (committed to git) so the Vercel dashboard configuration is self-documenting.
**Warning signs:** Form shows success state locally but DJ never receives emails from production.

### Pitfall 6: Form Does Not Re-validate on Second Submission
**What goes wrong:** User fills in invalid data, submits, sees errors, corrects fields, submits again — but RHF doesn't re-run validation because mode isn't set correctly.
**Why it happens:** Default RHF mode is `'onSubmit'` — errors only appear after first submit. But with `useActionState`, the second submit doesn't go through RHF's internal submit tracking the same way.
**How to avoid:** Set `mode: 'onBlur'` in `useForm` config so validation re-runs as the user leaves each field after the first submit attempt.

---

## Code Examples

Verified patterns from official sources and npm registry.

### Resend SDK — Send HTML Email
```typescript
// Source: https://resend.com/docs/send-with-nextjs
import { Resend } from 'resend'

// Inside server action, after env var guard:
const resend = new Resend(process.env.RESEND_API_KEY)

const { data, error } = await resend.emails.send({
  from: 'Portfolio Contact <onboarding@resend.dev>',
  to: ['hello@djcatan.com'],
  replyTo: email,           // visitor's email — enables Reply in Gmail
  subject: `New portfolio contact from ${name}`,
  html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
})

if (error) {
  // error.message is safe to log server-side but never expose to client
  return { success: false, error: 'Email delivery failed' }
}
return { success: true }
```

### Zod Schema (shared client + server)
```typescript
// Define once, import in both ContactForm.tsx and contact.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
```

### shadcn Input + Label usage
```tsx
// After: npx shadcn@latest add input label
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="name">Your name</Label>
  <Input
    id="name"
    placeholder="e.g. Alex Chen"
    {...register('name')}
    aria-describedby={errors.name ? 'name-error' : undefined}
  />
  {errors.name && (
    <p id="name-error" className="text-sm text-destructive">
      {errors.name.message}
    </p>
  )}
</div>
```

### CSS Token Reference (from globals.css)
```
--destructive: 0 84.2% 60.2%    → text-destructive (inline errors)
--border:      36 15% 88%        → border-input (input borders)
--ring:        18 55% 49%        → ring-ring (focus ring, warm terracotta)
--muted-foreground: 25 6% 44%   → text-muted-foreground (labels, secondary text)
--primary:     18 55% 49%        → hover:text-primary (icon hover)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useState` + `fetch` to call API route | `useActionState` + Server Action | React 19 / Next.js 15 | No API route needed; loading state built-in via `isPending` |
| `framer-motion` import | `motion/react` import | Mid-2025 rebrand | N/A for this phase (no animations in Phase 3) |
| `zodResolver` from `@hookform/resolvers/zod` | Same path, same usage | Stable | No change needed |
| Formspree / EmailJS for contact forms | Resend SDK via Server Action | 2023+ | API key stays server-side; no third-party redirect |

**Deprecated/outdated:**
- `next-seo` package: Targets Pages Router; App Router uses native `metadata` export. Not relevant here but noted for Phase 5.
- `react-email` for this phase: Overkill for a single notification email; plain `html:` string is the right level of complexity.

---

## Open Questions

1. **Resend account and DNS setup**
   - What we know: Resend's sandbox domain (`onboarding@resend.dev`) works without DNS verification for development and testing. Production delivery from `hello@djcatan.com` requires SPF/DKIM records on the `djcatan.com` domain.
   - What's unclear: Whether the Resend account has been created and the domain verified. STATE.md flags this as a pre-Phase-3 blocker.
   - Recommendation: Planner should include a Wave 0 prerequisite task: "Verify Resend account exists and `onboarding@resend.dev` sandbox sends successfully with a test API key." Phase can proceed with sandbox; domain verification is a launch-day concern.

2. **"Send another" state reset architecture**
   - What we know: `useActionState` state persists across renders; RHF `reset()` only clears form fields.
   - What's unclear: Whether the planner prefers a local `useState` flag or re-initializing `useActionState` by key.
   - Recommendation: Use a local `const [sent, setSent] = useState(false)` flag. When `state.success` is true AND `sent` is false, show success view. "Send another" calls `reset()` and `setSent(false)`. Simple, readable, no key tricks.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm installs | ✓ | v20.4.0 | — |
| npm | Package installation | ✓ | 9.7.2 | — |
| resend (npm) | Email delivery | ✗ (not installed) | — | Install in Wave 0 |
| react-hook-form (npm) | Form management | ✗ (not installed) | — | Install in Wave 0 |
| zod (npm) | Validation schemas | ✗ (not installed) | — | Install in Wave 0 |
| @hookform/resolvers (npm) | zodResolver bridge | ✗ (not installed) | — | Install in Wave 0 |
| shadcn/ui components | Input/Textarea/Label/Button | ✗ (no `components/ui/`) | — | Add via CLI in Wave 0 |
| RESEND_API_KEY env var | Server Action | ✗ (no .env.local) | — | Action returns error (D-13); graceful degradation |
| .env.example | Documentation | ✗ (no file) | — | Create in Wave 0 |

**Missing dependencies with no fallback (blockers):**
- All four npm packages must be installed before implementation begins
- shadcn/ui primitives must be added before `ContactForm.tsx` can be written (they are imported directly)

**Missing dependencies with fallback:**
- `RESEND_API_KEY`: Server Action already handles the missing case per D-13; form can be built and verified for structure/validation before the API key is added. Email delivery test requires a real key.

**Note on Node.js version:** Node 20.4.0 is installed. The shadcn/ui CLI previously required 20.5.0 (documented in STATE.md Phase 01-01). However, `npx shadcn@latest add [component]` (adding individual components) is less restrictive than the full `init` command and worked manually in Phase 1. The manual fallback from Phase 1 applies here if CLI fails: copy component source from ui.shadcn.com, paste into `components/ui/`.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no test config files or test directories in project |
| Config file | None — see Wave 0 |
| Quick run command | N/A — no framework installed |
| Full suite command | N/A — no framework installed |

No test infrastructure exists in this project. `nyquist_validation` is enabled in `.planning/config.json`.

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONTACT-01 | Form submits name/email/message and Resend action is called | integration | Manual — requires live Resend key | ❌ |
| CONTACT-01 | Zod schema rejects empty name | unit | N/A until framework installed | ❌ Wave 0 |
| CONTACT-01 | Zod schema rejects invalid email | unit | N/A until framework installed | ❌ Wave 0 |
| CONTACT-01 | Zod schema rejects message < 10 chars | unit | N/A until framework installed | ❌ Wave 0 |
| CONTACT-02 | GitHub and LinkedIn links present in Contact section | smoke (manual) | Visual inspection | — |
| CONTACT-03 | Email address displays as mailto: link | smoke (manual) | Visual inspection | — |
| CONTACT-04 | Honeypot field present in DOM, not visible | smoke (manual) | Browser DevTools inspection | — |
| CONTACT-04 | Server action returns success without sending when honeypot filled | unit | N/A until framework installed | ❌ Wave 0 |

### Sampling Rate
Given no test framework is installed, validation for this phase is manual + visual. The plan should include explicit manual verification steps at each wave boundary.

### Wave 0 Gaps
Given the project has no test infrastructure and granularity is `coarse` (per config), the recommendation is:
- Do not install a test framework in this phase — it is out of scope
- Validation is via manual browser testing and a real Resend test submission (CONTACT-01 requires a real email)
- Document manual verification checklist in the PLAN.md verification section instead

*(Formal test framework setup is a candidate for Phase 5 Polish or a dedicated quality phase.)*

---

## Sources

### Primary (HIGH confidence)
- [resend npm registry](https://www.npmjs.com/package/resend) — version 6.9.4 confirmed
- [react-hook-form npm registry](https://www.npmjs.com/package/react-hook-form) — version 7.72.0 confirmed
- [zod npm registry](https://www.npmjs.com/package/zod) — version 4.3.6 confirmed
- [@hookform/resolvers npm registry](https://www.npmjs.com/package/@hookform/resolvers) — version 5.2.2 confirmed
- [Resend Next.js docs](https://resend.com/docs/send-with-nextjs) — `resend.emails.send()` signature, `{ data, error }` pattern, `html:` parameter
- CLAUDE.md — package versions, stack constraints, import paths (authoritative project source)
- Codebase inspection — `components.json` config, `globals.css` CSS tokens, existing component patterns

### Secondary (MEDIUM confidence)
- [Ryan Knight — useActionState + React Hook Form](https://ryanknight.io/posts/using-useactionstate-with-react-hook-form) — `startTransition` requirement verified against React 19 docs behavior
- [DEV Community — useActionState + Next.js 15](https://dev.to/emmanuel_xs/how-to-use-react-hook-form-with-useactionstate-hook-in-nextjs15-1hja) — form action pattern
- [Markus Oberlehner — RHF + React 19](https://markus.oberlehner.net/blog/using-react-hook-form-with-react-19-use-action-state-and-next-js-15-app-router) — integration architecture
- [FormShield — honeypot implementation](https://formshield.dev/blog/form-honeypot-implementation-guide) — CSS hiding best practices
- [shadcn/ui install docs](https://ui.shadcn.com/docs/cli) — `npx shadcn@latest add` command syntax

### Tertiary (LOW confidence)
- None — all critical findings verified against official sources or npm registry.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed against npm registry on 2026-03-28
- Architecture: HIGH — patterns verified against official Next.js docs and Resend docs; codebase patterns inspected directly
- Pitfalls: HIGH — critical pitfalls (startTransition, module-scope Resend, honeypot accessibility) verified against React 19 behavior and community sources
- Honeypot: HIGH — CSS hiding approach confirmed against accessibility + bot-detection research

**Research date:** 2026-03-28
**Valid until:** 2026-04-27 (30 days — stack is stable)
