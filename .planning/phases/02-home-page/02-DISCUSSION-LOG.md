# Phase 2: Home Page - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-28
**Phase:** 02-home-page
**Areas discussed:** Color palette & warmth, Hero layout, Navbar behavior, About section layout, Project cards style, Footer content, Resume section

---

## Color Palette & Warmth

| Option | Description | Selected |
|--------|-------------|----------|
| Warm cream / off-white | ~#FAF8F5, subtle warmth, feels like paper | ✓ |
| Pure white + warm accent | #FFFFFF background, warmth in details only | |
| Light warm gray | ~#F5F4F2, barely-there warmth | |

**Background:** Warm cream (#FAF8F5)

| Option | Description | Selected |
|--------|-------------|----------|
| Terracotta / burnt orange | Earthy, warm, ~#C2603A | ✓ |
| Deep forest green | Grounded, sophisticated | |
| Warm slate blue | Blue with warm undertones | |
| You decide | Claude picks | |

**Accent color:** Terracotta / burnt orange (~#C2603A)

| Option | Description | Selected |
|--------|-------------|----------|
| Deep warm charcoal | #1C1917, stone-950, warm undertone | ✓ |
| Pure black | #000000, maximum contrast | |
| Dark warm brown | #292524, even warmer | |

**Text color:** Deep warm charcoal (#1C1917)

| Option | Description | Selected |
|--------|-------------|----------|
| Consistent cream throughout | One surface, separated by spacing/type | ✓ |
| Alternate cream + deeper warm sections | Rhythm through alternating backgrounds | |
| You decide | Claude picks | |

**Section backgrounds:** Consistent cream throughout

---

## Hero Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Centered text, full viewport height | Name + tagline + CTA + badge, centered | ✓ |
| Left-aligned text, right side open | Asymmetric layout | |
| Two-column: text left, headshot right | Split with photo | |

**Layout:** Centered, full viewport height

| Option | Description | Selected |
|--------|-------------|----------|
| "View My Work" → Projects | Direct, action-oriented | ✓ |
| "Get In Touch" → Contact | For ready-to-reach-out visitors | |
| Two CTAs | Primary + secondary | |

**CTA:** "View My Work" → scrolls to #projects

| Option | Description | Selected |
|--------|-------------|----------|
| Green dot + "Available for work" pill badge | Pulsing dot, pill shape, near CTA | ✓ |
| Inline text note | Small italic line below tagline | |
| You decide | Claude picks | |

**Availability badge:** Green dot pill badge

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — animated down arrow/chevron | Bouncing scroll indicator | ✓ |
| No — let content speak | No scroll indicator | |

**Scroll indicator:** Yes, animated bouncing chevron

---

## Navbar Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky — always visible | Fixed to top at all times | ✓ |
| Scroll-aware — hides/reappears | Hides on scroll down, shows on scroll up | |
| Static — scrolls with page | No fixed behavior | |

**Behavior:** Sticky always visible

| Option | Description | Selected |
|--------|-------------|----------|
| Logo left + nav links right | "DJ Catan" left, links right | ✓ |
| Centered nav links, no logo | Minimal, editorial | |
| Logo + links center + CTA right | Three-column | |

**Desktop layout:** Logo/name left, nav links right

| Option | Description | Selected |
|--------|-------------|----------|
| Solid cream background always | Consistent, simple | ✓ |
| Transparent over hero, solid after | Blends into hero then gets background | |
| Frosted glass / backdrop blur | Modern, semi-transparent | |

**Background:** Solid cream always

---

## About Section Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Two-column: photo left, bio right | Portrait photo left, text right | ✓ |
| Bio top, photo below (stacked) | Text first then photo | |
| Photo right, bio left | Reversed two-column | |

**Layout:** Two-column, photo left / bio right

| Option | Description | Selected |
|--------|-------------|----------|
| Rounded rectangle portrait crop | ~3:4, rounded corners, placeholder icon | ✓ |
| Circle crop (headshot style) | Round, professional | |
| Square with slight rotation/tilt | Casual, pinned-photo feel | |

**Photo placeholder:** Rounded rectangle portrait (~3:4)

---

## Project Cards Style

| Option | Description | Selected |
|--------|-------------|----------|
| Clean card with border + shadow | Thin border, soft shadow, classic | ✓ |
| Borderless with background tint | Slightly warmer bg, no border | |
| Image-first card | Thumbnail at top, info below | |

**Card style:** Clean with border + shadow

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle lift — shadow deepens + translateY | Card rises, shadow grows on hover | ✓ |
| Border color changes to terracotta | Border shifts to accent on hover | |
| You decide | Claude picks | |

**Hover:** Subtle lift (translateY + deeper shadow)

---

## Footer Content

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: name + social icons + copyright | Clean, uncluttered | ✓ |
| Two-column: nav links + social links | More complete, repeated nav | |
| Single line: copyright + social icons | Ultra-minimal | |

**Layout:** Minimal (name + icons + copyright)

| Option | Description | Selected |
|--------|-------------|----------|
| GitHub + LinkedIn only | Two professional links | |
| GitHub + LinkedIn + Email | Three icons including mailto | ✓ |
| You decide | Claude picks | |

**Social links:** GitHub + LinkedIn + Email (mailto)

---

## Resume Section

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: intro line + download button | Brief text + prominent button | ✓ |
| Skills list + download button | More content, requires maintenance | |
| Just the download button | Ultra-minimal, no text | |

**Layout:** Minimal intro + download button

| Option | Description | Selected |
|--------|-------------|----------|
| public/resume.pdf — placeholder file | Local file, easy to swap | ✓ |
| External link (Google Drive, etc.) | External URL, no redeploy needed | |

**PDF location:** public/resume.pdf (placeholder to be replaced)

---

## Claude's Discretion

- Exact spacing/padding values between sections
- Specific font sizes for headings
- Card border radius and shadow values
- Active nav link highlighting on scroll
- Tailwind class composition details
