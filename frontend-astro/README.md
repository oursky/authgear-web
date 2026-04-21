# frontend-astro

Astro 5 port of the Authgear marketing site. Runs alongside `frontend/` (Next.js) during migration.

Design rationale: `docs/ARCHITECTURE-ASTRO.md`.
Implementation plan: `docs/superpowers/plans/2026-04-21-astro-migration-foundation.md`.

## Dev

```bash
npm install
cp ../frontend/.env.local .env
# Rename NEXT_PUBLIC_* to PUBLIC_* in .env
npm run dev                       # http://localhost:4321
```

## Build & run (production)

```bash
npm run build
PORT=3000 npm start               # node ./dist/server/entry.mjs on :3000
```

## Tests

```bash
npm run test:unit                 # vitest — t() translation helper
npm test                          # playwright — smoke tests (home + redirects + analytics)
```

## Phase status

- [x] Phase 1 — Foundation (home page renders in en + zh-TW, smoke tests pass)
- [ ] Phase 2 — Port remaining static marketing pages (~30 pages)
- [ ] Phase 3 — Port CMS-backed pages (blog, customer stories, integrations, login gallery, what's new) + API routes
- [ ] Phase 4 — Fly.io deployment + cutover from `frontend/`
