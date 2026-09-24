# Contributing

Practical guide to working on Alphabetz. The enforceable rules live in
[`AGENTS.md`](./AGENTS.md) — this file explains how to actually run things and why the
rules are shaped the way they are.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000
```

The app currently runs entirely on static data from `src/lib/dummy-data.ts`, so it starts
without a working Supabase project. That changes with `ALZ-11` onward.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit and component tests once |
| `npm run test:watch` | Tests in watch mode while developing |
| `npm run test:coverage` | Tests with a coverage report in `coverage/` |
| `npm run test:e2e` | Playwright against a production build |
| `npm run test:e2e:ui` | Playwright in its interactive runner |
| `npm run build` | Production build |
| `npm run verify` | typecheck → lint → test → build, in order |

Run `npm run verify` before pushing. It is the same sequence CI runs, so a green local
run means a green pipeline in almost every case.

## Workflow

```bash
git switch main && git pull
git switch -c feat/course-catalogue
# ... work, writing tests as you go ...
npm run verify
git push -u origin feat/course-catalogue
gh pr create
```

Never commit to `main` directly. It only advances through a merged pull request.

## Testing: what is actually expected

The rule is **behaviour changes require tests**, not one test file per source file. An
assertion-free test written to satisfy a checker is worse than no test, because it makes
the coverage number dishonest.

- Logic in `src/lib/**` → a `*.test.ts` beside it.
- Component behaviour — variants, conditional rendering, events → a `*.test.tsx` beside it.
- A new route or a changed user-visible flow → a spec in `e2e/`.
- A bug fix → write the failing test first, then fix it.

Docs, config, lockfiles, type-only declarations and purely presentational styling are
exempt. When your change is exempt, say so in the pull request rather than leaving it
unexplained.

### Where the tests live

```
src/lib/utils.test.ts                    unit
src/components/shared/Badge.test.tsx     component
e2e/public-site.spec.ts                  end-to-end
```

Vitest owns everything under `src/`; Playwright owns `e2e/`. They are configured not to
pick up each other's files, so a Playwright spec will not be run by Vitest and fail
confusingly.

## CI

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`, in two jobs:

- **verify** — typecheck, lint, unit tests with coverage, then build
- **e2e** — Playwright against a real production build, on desktop and mobile viewports

Both use placeholder Supabase values. The build must never depend on real credentials.
Playwright artifacts upload only on failure, so a green run stays cheap.

Coverage is reported but **not yet gated**. The floor gets set from a measured baseline in
`ALZ-157`, once there is enough coverage for a gate to be useful rather than obstructive.

## Deployment

Not yet configured. Connect the repository to Vercel via its Git integration rather than
writing a bespoke deploy workflow — that gives a preview URL per pull request for free.
Tracked as `ALZ-7`.

> **Do not deploy to a public URL yet.** `middleware.ts` reads an `alphabetz-role` cookie
> and trusts its value, so anyone can set it in devtools and reach `/admin/*`. Real session
> verification is `ALZ-27`.

## Project structure

Three portals in one Next.js app, separated by route groups:

| Group | Audience |
|---|---|
| `(public)` | Prospective students and parents |
| `(student)` | Enrolled students |
| `(admin)` | Teachers and administrators |
| `(student-auth)`, `(admin-auth)` | Separate login entry points |

Keep them isolated: no importing an admin component into a student page. Shared UI goes in
`src/components/shared/`.

## Where the planning lives

Narrative documentation and the delivery board are outside this repository, in
`~/notes/personal/college-coaching-website/`. `10-project-board.md` is the board; story
IDs referenced here and in `AGENTS.md` (`ALZ-nn`) point at it.
