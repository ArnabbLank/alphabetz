<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Alphabetz — Project Rules

Rules that govern how work happens in this repository. Imperative and enforceable.
Narrative context lives in `~/notes/personal/college-coaching-website/`; the delivery
board is `10-project-board.md`. Human-facing contribution guidance is `CONTRIBUTING.md`.

## Branching

- Never commit directly to `main`. `main` only ever advances through a merged pull request.
- Create a branch before any edit. Name it `<type>/<scope>`: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`.
- One branch, one coherent change. Do not bundle unrelated work; do not hide cleanup inside a feature branch.
- Rebase onto `origin/main` before opening a pull request. Do not merge `main` into your branch.
- Never force-push a branch another person has pulled. Never force-push `main` under any circumstance.

## Tests

The rule is **behaviour changes require tests**, not "every file needs a test file". A
test that asserts nothing exists only to satisfy a checker, and it makes coverage lie.

Required:

- New or changed logic in `src/lib/**` → a unit test beside it as `*.test.ts`.
- New or changed component behaviour (conditional rendering, variants, events, state) → a component test as `*.test.tsx`.
- A new route or a change to a user-visible flow → an end-to-end spec in `e2e/`.
- A bug fix → a test that fails before the fix and passes after. Write it first.
- Anything touching Row Level Security → a test proving the *negative* case: the wrong role is denied. A positive-only test does not count as coverage of a security boundary.

Exempt — do not add a test file for these:

- Documentation, comments, and Markdown.
- Configuration, lockfiles, CI workflow edits.
- Purely presentational styling with no conditional logic (a colour token, a spacing value).
- Type-only declarations in `src/types/**`.
- Generated files.

If a change is exempt, say so in the pull request body. Silence reads as an oversight.

## Definition of Done

A change is not done until all of the following hold. `npm run verify` runs the first four.

1. `npm run typecheck` passes. No `any`, no `@ts-ignore`, no `@ts-expect-error` without a comment explaining why.
2. `npm run lint` passes with zero warnings.
3. `npm test` passes, and the change is covered per the Tests section above.
4. `npm run build` succeeds.
5. `npm run test:e2e` passes when a route or user-visible flow changed.
6. No `console.log`. No hardcoded secrets, URLs, or credentials.
7. The relevant document in the notes directory is updated if behaviour, schema, or architecture changed.

## Code conventions

- Data access goes through `src/lib/supabase/server.ts` (server components) or `client.ts` (client components). Never instantiate a Supabase client inline.
- Keep portals isolated. Do not import from `components/admin/**` into a student page, or the reverse. Shared UI belongs in `components/shared/**`.
- Use `cn()`, `formatDate()`, `formatCurrency()` from `src/lib/utils.ts`. Do not reimplement them inline.
- Validate every mutation input with Zod server-side. Client-side validation is a convenience, not a control.
- Types come from the generated Supabase schema once `ALZ-19` lands. Until then `src/types/database.ts` is hand-written and will drift — treat a mismatch as a bug in the types.

## Security

- `.env*` is gitignored and stays that way. This repository is **public**.
- The `service_role` key is server-only. It must never appear in client code, in any variable prefixed `NEXT_PUBLIC_`, or in a workflow file.
- `middleware.ts` currently performs **no real authentication** — it reads an `alphabetz-role` cookie and trusts it. Do not deploy to a public URL until `ALZ-27` replaces it with Supabase session verification.
- Never commit real credentials to make a test or a build pass. Use placeholders.

## Pull requests

- Title under 70 characters, imperative mood.
- Body states: what changed, how it was tested, and which tests were added or why the change is exempt.
- CI must be green before merge. Do not merge around a red check.
- Link the board story (`ALZ-nn`) when one applies.
