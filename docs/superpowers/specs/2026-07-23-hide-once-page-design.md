# Hide /once page (step 1 of Authgear ONCE removal)

**Date:** 2026-07-23
**Status:** Approved

## Context

Authgear is retiring the ONCE (self-hosted, one-time-license) offering as part of a
website restructure. This first step hides the /once marketing page and stops selling
ONCE on the pricing page. Later steps will handle the homepage hero product switch,
remaining ONCE mentions in content, and asset cleanup.

## Scope

### 1. Pages and redirects

- Delete `src/pages/once.astro` and `src/pages/zh-hant/once.astro`.
- Delete `src/components/pages/OncePage.astro` and its orphaned islands:
  `src/components/islands/once/OncePageFaq.tsx`,
  `src/components/islands/once/OnceSdkFrameworkHarness.tsx`, and the
  `ONCE_SDK_MARQUEE_LOGOS` export in `src/components/islands/LogoMarquee.tsx`
  (only if nothing else imports them — verify before deleting).
- **Keep `/once/license` live and untouched** (`src/pages/once/license.astro`).
  Existing ONCE customers' license terms must stay reachable.
- `public/_redirects`:
  - Add exact-path rules `/once/ → / 301` and `/zh-hant/once/ → /zh-hant/ 301`.
    Exact paths only — no `/once/*` splat — so `/once/license` is not caught.
  - Re-point legacy rules that currently target `/once/`
    (`/authgear-once-v2`, `/old-home-2`) to `/`.
  - Leave `/zh-hant/once/license → /once/license/` as is.

### 2. Links

- Main nav: remove the "On your Server" item (`src/lib/navigation-data.ts`).
- Footer: remove the /once link (`src/components/nav/SiteFooter.astro`).
- Homepage hero: **keep the Cloud / "On your Server" product-switch block unchanged
  for now** (explicit user decision — will be reworked in a later step). Its /once
  link will follow the 301 to the homepage in the meantime.

### 3. Pricing page (Cloud-only)

- `src/components/islands/pricing/PricingPageClient.tsx`: remove the
  Cloud/ONCE tab switcher, the ONCE plans section, and the ONCE core-features
  table. The page renders the Cloud content only.
- Strip the `once` structures from `src/lib/pricing/copy-en.ts`,
  `src/lib/pricing/copy-zh-Hant.ts`, and `src/lib/pricing/types.ts`
  (including `tabs.once` and the `onceSuffix` prop plumbing).
- Delete `src/lib/pricing/data/once-core-en.ts`,
  `src/lib/pricing/data/once-core-zh-Hant.ts`, and the
  `onceCoreSection` / `onceCoreFeature` helpers in
  `src/lib/pricing/comparison-rows.ts` (verify no other usage first).
- Remove now-dead ONCE-specific CSS in
  `src/components/islands/pricing/PricingPlanFinder.css` only where clearly
  scoped to removed markup (e.g. `.once-row--section`); leave shared classes alone.

## Out of scope (later restructure steps)

- Homepage hero product-switch rework.
- Blog posts and other content mentioning ONCE.
- i18n string sweep beyond keys used by removed components.
- Unused `/images/once_*` assets.
- The sitemap needs no manual work — it is generated at build time, so deleted
  pages drop out automatically.

## Verification

- `npm run build` succeeds.
- Built HTML contains no links to `/once` except the intentionally kept
  homepage product switch, and `/once/license` still builds.
- `_redirects` rules behave as specified (exact-path, license page unaffected).
- Dev-server spot check of home, pricing, nav, and footer in both `en` and
  `zh-hant`; pricing page shows Cloud content only with no tab switcher.
- Existing tests pass (`npm test` / Playwright suite if configured to run locally).
