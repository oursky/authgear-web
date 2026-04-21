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

- [x] Phase 1 — Foundation
- [x] Phase 2a — Core islands + home parity (ContactForm, LogoMarquee, /api/contact)
- [ ] Phase 2b — Simple static marketing pages (~13 pages)
- [ ] Phase 2c — Dynamic subtrees (features, solutions, compare — ~33 pages)
- [ ] Phase 2d — Tools subtree + SMS calculator
- [ ] Phase 2e — Once page + Pricing page
- [ ] Phase 3 — CMS-backed pages (blog, customer stories, etc.)
- [ ] Phase 4 — Fly.io deployment + cutover
