# Astro 5 → 6 + @astrojs/netlify 6 → 7 upgrade

**Branch:** `upgrade/astro-6-netlify-7`
**Status:** Planning. No code changes yet.

## Why

We pinned `@astrojs/netlify@^6` during the Fly→Netlify swap because v7 requires Astro 6. v7 is the actively maintained line; v6 will only receive security patches. To stay on a supported track and unlock newer Astro features, we move the whole stack forward in one branch.

## Current state

```
astro                  ^5.2.0   (resolved 5.18.x)
@astrojs/node          removed
@astrojs/netlify       ^6
@astrojs/react         ^4.2.0
@astrojs/sitemap       ^3.7.2
@astrojs/check         ^0.9.8
react / react-dom      ^19.2.4
@tailwindcss/vite      ^4.2.2
```

## Target

```
astro                  ^6
@astrojs/netlify       ^7
@astrojs/react         (latest peer-compatible with Astro 6)
@astrojs/sitemap       (latest peer-compatible with Astro 6)
@astrojs/check         (latest peer-compatible with Astro 6)
```

React 19 / Tailwind v4 already current — no changes expected.

## Known breaking changes (to verify against the Astro 6 changelog)

These are the categories to scan for; each must be checked against the official Astro 6 migration guide before assuming the codebase needs no change.

1. **Content Collections API.** All five collections in `src/content/` use `defineCollection` with zod schemas in `src/content/config.ts`. If the loader API or `getCollection` signature changed, every page that calls `getCollection('blog-posts', …)` etc. needs a sweep.
2. **Astro middleware signature.** `src/middleware.ts` uses `defineMiddleware`. If the request/response shape changed, the locale-prefix redirects need updating.
3. **`Astro.redirect` / endpoint return types.** Used in `src/pages/**/*[slug].astro` for 404 fallbacks and SSR endpoints (`src/pages/api/contact.ts`, sitemap).
4. **`astro:assets`.** Used heavily in markdown frontmatter and in `BlogCard`/hero components. Image component prop names sometimes shift between majors.
5. **View transitions / client directives.** Audit React islands for any `client:*` directive whose semantics changed.
6. **Vite / Rollup major bump.** Astro 6 likely ships a newer Vite. Tailwind v4 + `@tailwindcss/vite` plugin must remain compatible — verify peer ranges.
7. **Sitemap integration peer.** `@astrojs/sitemap` major ≥ peer of Astro 6.
8. **Netlify adapter v7 config.** Read its CHANGELOG; verify `netlify()` call still takes no args (or update if `edgeMiddleware` / `imageCDN` defaults flipped).

## Scope of files to touch

```
package.json
package-lock.json
astro.config.mjs           (likely no change beyond adapter import)
src/content/config.ts      (only if Content Collections API moved)
src/middleware.ts          (only if signature changed)
src/pages/api/contact.ts   (only if endpoint signature changed)
docs/ARCHITECTURE-ASTRO.md (version mention update)
README.md                  (version mention update)
```

`@types/node`, `typescript`, `vitest`, `@playwright/test` are independent and out of scope.

## Plan

1. **Read the upstream notes.**
   - Astro 6 migration guide.
   - `@astrojs/netlify` v7 CHANGELOG.
   - Peer-compatible majors for `@astrojs/react`, `@astrojs/sitemap`, `@astrojs/check`.
   - Capture every "breaking" item in a checklist before touching code.
2. **Bump packages.**
   ```bash
   npm install astro@^6 \
               @astrojs/netlify@^7 \
               @astrojs/react@latest \
               @astrojs/sitemap@latest \
               @astrojs/check@latest
   ```
   No `--force` / `--legacy-peer-deps`. If npm refuses, the resolution is the signal that something else needs bumping.
3. **Fix typecheck first.** `npm run check` — resolve every error before attempting a build.
4. **Build.** `npm run build`. Compare prerendered page count against `main` (should match within a few — any new 404s or skipped pages mean a regression).
5. **Smoke test locally.** `npm run preview` and click through:
   - Home (en + zh-Hant)
   - A blog post detail page (`/post/{slug}`)
   - The contact form happy path (will log to stdout without `CONTACT_WEBHOOK_URL`)
   - A login-gallery and a customer-story detail page
   - One legacy redirect (e.g. `/blog/{slug}` → `/post/{slug}` via `_redirects` does not run under `astro preview`; verify this on the deploy preview instead)
   - Sitemap: `/sitemap-index.xml`
6. **Run tests.** `npm run test:unit` and `npm test` (Playwright). The Playwright suite is the strongest regression signal we have.
7. **Push the branch and rely on Netlify's deploy preview.** Click through the same checklist on the preview URL — that's the only place where `_redirects` and the SSR Function actually fire.
8. **Open PR.** Title: `upgrade: astro 5 → 6 + @astrojs/netlify 6 → 7`. Body lists every breaking-change category from §3 with "no change required" or a link to the fix commit.

## Validation checklist (must all pass before merge)

- [ ] `npm run check` clean
- [ ] `npm run build` succeeds, page count matches main ±3
- [ ] `npm run test:unit` green
- [ ] `npm test` (Playwright) green
- [ ] Netlify deploy preview: home, a blog post, contact form, sitemap, one legacy redirect — all pass
- [ ] No new console errors on the deploy preview home page

## Rollback

The whole change is one branch. If anything regresses in production after merge, `git revert` the merge commit and Netlify rebuilds the previous static site. No data migration, no DB state — purely build-time.

## Out of scope (handle separately if needed)

- React 20 (not released).
- Tailwind v4 minor/patch bumps.
- `@types/node` bump.
- `typescript` bump.
- Splitting locale-prefix middleware redirects into `_redirects` (tracked separately).
- Dependabot security advisories surfaced on push (review on their own PR).
