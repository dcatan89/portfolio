---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, typescript, tailwind, shadcn, prettier, fonts, next-font]

# Dependency graph
requires: []
provides:
  - Next.js 15.5.14 App Router project scaffolded and building
  - Tailwind CSS v4 with CSS-first @theme config (no tailwind.config.js)
  - shadcn/ui initialized with components.json and lib/utils.ts
  - Playfair Display + Inter fonts loaded via next/font/google as CSS variables
  - metadataBase set using VERCEL_PROJECT_PRODUCTION_URL env pattern
  - Prettier 3.x with prettier-plugin-tailwindcss configured
affects: [all subsequent phases - every task builds on this foundation]

# Tech tracking
tech-stack:
  added:
    - Next.js 15.5.14 (App Router, Turbopack dev server)
    - React 19.1.0
    - TypeScript 5.x
    - Tailwind CSS 4.x (CSS-first config via @theme)
    - "@tailwindcss/postcss 4.x (v4 PostCSS plugin)"
    - shadcn/ui (copy-paste model, components.json configured)
    - class-variance-authority (shadcn/ui dependency)
    - clsx + tailwind-merge (shadcn/ui cn() helper)
    - lucide-react (shadcn/ui icon library)
    - Prettier 3.x + prettier-plugin-tailwindcss
  patterns:
    - "Tailwind v4 CSS-first: @import tailwindcss + @theme directive in globals.css, no JS config"
    - "Font loading: next/font/google with CSS variables on <html>, utility class on <body>"
    - "metadataBase: VERCEL_PROJECT_PRODUCTION_URL with localhost:3000 fallback"
    - "shadcn/ui: components.json with @/components, @/lib/utils, @/components/ui aliases"

key-files:
  created:
    - app/globals.css
    - app/layout.tsx
    - app/page.tsx
    - postcss.config.mjs
    - prettier.config.js
    - .prettierignore
    - components.json
    - lib/utils.ts
    - package.json
    - tsconfig.json
    - eslint.config.mjs
    - next.config.ts
  modified: []

key-decisions:
  - "Scaffolded to temp directory then rsync'd to worktree — create-next-app cannot run in non-empty directory"
  - "shadcn/ui CLI (v4.1.1) requires Node >=20.5.0 but env has 20.4.0 — manually created components.json and installed runtime deps"
  - "shadcn/ui neutral color palette added to globals.css as CSS variables for future component compatibility"

patterns-established:
  - "Pattern: Tailwind v4 PostCSS uses object syntax { '@tailwindcss/postcss': {} } not array ['@tailwindcss/postcss']"
  - "Pattern: Font CSS variables declared on <html>, font-body utility class on <body>"
  - "Pattern: cn() helper via clsx + tailwind-merge in lib/utils.ts for conditional class merging"

requirements-completed: [FOUND-01]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 1 Plan 01: Next.js 15 Project Scaffold Summary

**Next.js 15.5.14 with Tailwind v4 CSS-first config, Playfair Display + Inter via next/font, shadcn/ui initialized, and Prettier with Tailwind class sorting — build and lint both pass cleanly**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T07:43:28Z
- **Completed:** 2026-03-28T07:47:28Z
- **Tasks:** 2
- **Files modified:** 15

## Accomplishments

- Next.js 15.5.14 with React 19 and TypeScript scaffolded; build passes with 0 errors
- Tailwind v4 CSS-first config: `@import "tailwindcss"` + `@theme` with font tokens, correct `@tailwindcss/postcss` PostCSS plugin, no tailwind.config.js
- shadcn/ui initialized: components.json with all aliases, lib/utils.ts cn() helper, neutral CSS variable palette in globals.css
- Playfair Display + Inter loaded via next/font/google as CSS variables `--font-playfair-display` and `--font-inter`, referenced via `--font-display` and `--font-body` Tailwind tokens
- metadataBase set with VERCEL_PROJECT_PRODUCTION_URL pattern, title template and description configured
- Prettier 3.x with prettier-plugin-tailwindcss installed; prettier.config.js and .prettierignore created

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project and fix Tailwind v4 PostCSS config** - `cccfb10` (chore)
2. **Task 2: Initialize shadcn/ui and configure Prettier with Tailwind plugin** - `9de3648` (feat)
3. **Favicon cleanup** - `dd353db` (chore)

## Files Created/Modified

- `app/globals.css` - Tailwind v4 @import, @theme font tokens, shadcn neutral CSS variables
- `app/layout.tsx` - Playfair Display + Inter fonts, metadataBase, title template, lang="en"
- `app/page.tsx` - Minimal DJ Catan placeholder using font-display and font-body classes
- `postcss.config.mjs` - @tailwindcss/postcss v4 plugin (object syntax)
- `components.json` - shadcn/ui config with neutral base, CSS variables, path aliases
- `lib/utils.ts` - cn() helper (clsx + tailwind-merge)
- `prettier.config.js` - Prettier 3.x with prettier-plugin-tailwindcss, singleQuote, no semi
- `.prettierignore` - Excludes .next, node_modules, lock files
- `package.json` - All deps: Next.js 15.5.14, Tailwind v4, shadcn runtime deps, Prettier

## Decisions Made

- Scaffolded to `/tmp/nextjs-scaffold` then rsync'd to worktree — create-next-app refuses to run in non-empty directories (had .planning/, .claude/, CLAUDE.md present)
- shadcn/ui CLI v4.1.1 requires Node >=20.5.0; environment has Node 20.4.0 — manually created components.json and installed runtime dependencies (class-variance-authority, clsx, tailwind-merge, lucide-react) to achieve equivalent result
- Added shadcn neutral CSS variable palette to globals.css to ensure future component installations work correctly without additional setup

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffolded to temp directory due to non-empty worktree**
- **Found during:** Task 1 (Next.js scaffold)
- **Issue:** create-next-app@15 refuses to scaffold into a non-empty directory (.planning/, .claude/, CLAUDE.md were present)
- **Fix:** Ran scaffold in /tmp/nextjs-scaffold then rsync'd files to worktree, excluding planning and config artifacts
- **Files modified:** All scaffold files
- **Verification:** Build passes, no planning files overwritten
- **Committed in:** cccfb10 (Task 1 commit)

**2. [Rule 3 - Blocking] shadcn/ui CLI incompatible with Node 20.4.0**
- **Found during:** Task 2 (shadcn/ui init)
- **Issue:** shadcn@4.1.1 CLI requires Node >=20.5.0; environment has Node 20.4.0; execa 9.x uses addAbortListener which is not available until Node 20.5.0
- **Fix:** Manually created components.json with correct shadcn/ui configuration, installed runtime dependencies manually, created lib/utils.ts with cn() helper, added shadcn CSS variables to globals.css
- **Files modified:** components.json, lib/utils.ts, app/globals.css, package.json
- **Verification:** Build passes; components.json has correct aliases; shadcn components can be added manually or via CLI once Node is upgraded
- **Committed in:** 9de3648 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both deviations handled automatically with equivalent outcomes. No functionality missing. shadcn/ui will work fully once Node is upgraded to >=20.5.0.

## Known Stubs

- `app/page.tsx` line 4: "Portfolio coming soon." — intentional placeholder per plan spec (Task 1 step 7). Will be replaced in Phase 2 with real section components.

## Issues Encountered

None beyond the two blocking deviations documented above.

## User Setup Required

None - no external service configuration required for this plan.

## Next Phase Readiness

- Foundation complete: build passes, Tailwind v4 CSS-first working, fonts load, shadcn/ui configured
- Phase 1 Plan 02 can proceed: Vercel deployment configuration
- shadcn component installation: works via manual copy-paste or CLI after Node upgrade to >=20.5.0

---
*Phase: 01-foundation*
*Completed: 2026-03-28*
