---
phase: 3
slug: contact-form
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no Jest, Vitest, or Playwright installed |
| **Config file** | None |
| **Quick run command** | `npx next build` (build must succeed, TypeScript errors surface here) |
| **Full suite command** | Manual browser inspection at `localhost:3000` + Resend dashboard check |
| **Estimated runtime** | ~30 seconds (build) + manual |

---

## Sampling Rate

- **After every task commit:** Run `npx next build` — zero TypeScript/build errors
- **After every plan wave:** Full manual browser pass at `localhost:3000`
- **Before `/gsd:verify-work`:** Resend dashboard confirms real email received; manual form submit on mobile
- **Max feedback latency:** 30 seconds (build check)

---

## Per-Task Verification Map

| Task | Requirement | Test Type | Automated Command | Status |
|------|-------------|-----------|-------------------|--------|
| Install deps + shadcn components | CONTACT-01 | Build | `npx next build exits 0` | ⬜ pending |
| Zod schema + Server Action | CONTACT-01, CONTACT-04 | Build + grep | `npx next build` + `grep "website" app/actions/contact.ts` | ⬜ pending |
| ContactForm client component | CONTACT-01 | Build + grep | `npx next build` + `grep "useActionState"` | ⬜ pending |
| Contact section layout | CONTACT-02, CONTACT-03 | Build + manual | `npx next build` + browser visual | ⬜ pending |
| .env.example | CONTACT-01 | File check | `test -f .env.example && grep RESEND_API_KEY .env.example` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

None — no test framework to install. Build success (`next build` exits 0) is the automated gate. shadcn/ui component installation and npm dependency install are Wave 1 tasks, not Wave 0 (they are the first tasks of the plan).

*Existing infrastructure covers all phase requirements via build gate + manual verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Form submits and Resend sends real email | CONTACT-01 | Requires live API key + network | Fill form → submit → check `hello@djcatan.com` inbox |
| Success confirmation shown after submit | CONTACT-01 | UI state change | Submit form → "Message sent!" appears, form hides |
| Inline field validation errors | CONTACT-01 | Client-side UI behavior | Submit empty form → error messages appear per field |
| Loading state ("Sending…") | CONTACT-01 | UI during inflight request | Submit → button shows "Sending…" and is disabled |
| Honeypot blocks bot submissions | CONTACT-04 | Server-side logic | Manually POST with `website` field set → no email sent, fake success returned |
| Social links visible without form submit | CONTACT-02 | Static rendering | Browse to #contact → GitHub + LinkedIn icons visible in right column |
| Email address displayed as mailto link | CONTACT-03 | Static rendering | Browse to #contact → email visible, clicking opens mail client |
| "Send another" resets form | CONTACT-01 | UI interaction | After success → click "Send another" → empty form shown |
| Mobile layout stacks correctly | CONTACT-01 | Responsive visual | DevTools mobile viewport → form above, contact info below |

---

## Validation Sign-Off

- [ ] All tasks have build-gate automated verify
- [ ] Sampling continuity: `npx next build` after every task commit
- [ ] Wave 0: N/A (no missing test infrastructure — build gate suffices)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s (build gate)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
