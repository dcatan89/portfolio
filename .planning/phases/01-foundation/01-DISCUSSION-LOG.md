# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-28
**Phase:** 01-foundation
**Areas discussed:** Project data model, Placeholder content feel

---

## Project Data Model

| Option | Description | Selected |
|--------|-------------|----------|
| Full shape now | All fields Phase 2 and 4 need from day one: id, slug, title, description, techStack[], links, featured, case study strings | ✓ |
| Minimal for Phase 1, expand later | Just core fields now; add slug/featured/caseStudy when Phase 4 needs them | |

**User's choice:** Full shape now
**Notes:** Agreed to include case study content fields (problem, role, keyDecisions, outcome) as strings in lib/projects.ts rather than separate MDX files — appropriate for a portfolio this size.

---

| Option | Description | Selected |
|--------|-------------|----------|
| 3 projects | 2 featured + 1 non-featured — covers all UI states | ✓ |
| 5–6 projects | More variety from day one | |
| 1 placeholder | Minimal, just confirms data layer works | |

**User's choice:** 3 projects (2 featured, 1 non-featured)

---

| Option | Description | Selected |
|--------|-------------|----------|
| In lib/projects.ts as strings | Single typed file, simple, no MDX setup | ✓ |
| Separate MDX files | Better long-form formatting, Phase 4 setup overhead | |
| You decide | Claude picks | |

**User's choice:** In lib/projects.ts as strings

---

## Placeholder Content Feel

| Option | Description | Selected |
|--------|-------------|----------|
| DJ-flavored realistic | Real name, rough but real tagline/bio — deployed URL feels like a real site | ✓ |
| Labeled slots | Explicit `[Your name]` markers — clear but obviously unfinished | |
| Lorem Ipsum | Generic filler | |

**User's choice:** DJ-flavored realistic

---

| Option | Description | Selected |
|--------|-------------|----------|
| Real project names, placeholder descriptions | Actual project names DJ plans to feature; descriptions are placeholder | ✓ |
| Invented placeholder projects | Made-up names like "Project Alpha" | |

**User's choice:** Real project names/titles with placeholder descriptions

---

## Claude's Discretion

- Section stub structure (return null vs semantic shells)
- Tailwind/shadcn/ui initial configuration details
- File organization within app/ and components/
- metadataBase placeholder value

## Deferred Ideas

None.
