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
- [x] Phase 2b — Simple static marketing pages (~13 pages)
- [x] Phase 2c-1 — Compare subtree + dynamic route pattern (4 pages)
- [x] Phase 2c-2 — Solutions subtree (7 pages)
- [x] Phase 2c-3 — Features subtree + 3 tab/accordion islands (19 pages)
- [x] Phase 2d-1 — SMS Cost Calculator island (unblocks Phase 2c-2 stub)
- [x] Phase 2d-2 — Tools subtree (9 interactive dev-tool pages as React islands)
- [x] Phase 2e-1 — Once page (SDK tab switcher + FAQ accordion)
- [x] Phase 2e-2 — Pricing page (comparison table + toggle + FAQ)
- [x] Phase 3-1 — Blog (listing + detail + /api/blog-posts)
- [x] Phase 3-2 — Customer stories (listing + detail)
- [x] Phase 3-3 — Login gallery + What's new
- [ ] Phase 4 — Fly.io deployment + cutover
