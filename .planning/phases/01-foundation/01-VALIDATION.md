---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-28
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Next.js build + TypeScript compiler (`tsc --noEmit`) |
| **Config file** | `tsconfig.json` (created by scaffold) |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-02 | manual | Vercel URL loads | ❌ manual | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-03 | type-check | `npx tsc --noEmit` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-04 | build | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tsconfig.json` — TypeScript config (created by `create-next-app@15`)
- [ ] `package.json` with `build` script — created by scaffold
- [ ] `npm install` completed — all deps installed

*If none: "Existing infrastructure covers all phase requirements." — N/A, Wave 0 IS the scaffold task itself.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Vercel production URL loads | FOUND-02 | Requires live deployment and browser check | Push to main, open Vercel dashboard URL, confirm 200 response with working page |
| No FOUT on font load | FOUND-01 (app/layout.tsx) | Visual — requires browser network tab | Open production URL, check Network tab for font requests, confirm fonts load before paint |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
