# Sitewide SEO content audit (post-Webflow cutover)

**Branch:** to be created off `main` after PR #44 (`feat/seo-og-sitewide`) merges
**Status:** Plan only. No code changes yet.
**Depends on:** PR #44 (BaseLayout emits canonical / hreflang / OG / Twitter — required so each page's `title`/`description` becomes meaningful).

## Why this exists

PR #44 wired the SEO/OG infrastructure into `BaseLayout`. Every page that already passes `title` and `description` now emits a full set of canonical, hreflang, OG, and Twitter tags. But the **content** of those `title`/`description` strings has known gaps:

- 12 feature pages and 7 solution pages share an English-only meta map. zh-Hant variants emit English copy.
- Login gallery detail pages emit `description=""`.
- Some Astro static-page SEO strings drift from the Webflow originals (verified via the Webflow API).
- `t()` falls back to English silently when a key is missing from `zh-Hant.json`, so missing translations don't fail loudly.

Webflow itself never localized SEO meta either — querying its API with the zh-tw locale returns the English strings. So this is greenfield improvement, not a regression to recover from.

## Approach: subagent-driven

Each task below is independent enough to dispatch a fresh subagent against. Two-stage review (spec compliance + code quality) per task per `superpowers:subagent-driven-development`.

## Tasks

### Task 1 — `featuresMeta` locale split

**File:** `src/lib/features-meta.ts`, `src/pages/features/[slug].astro`, `src/pages/zh-Hant/features/[slug].astro`

**Spec:** Extend `featuresMeta` to a per-locale map: `Record<Locale, Record<FeatureSlug, FeatureMeta>>`. For zh-Hant, translate the 12 entries (`title` + `description`). Update both `[slug].astro` files to look up `featuresMeta[locale][slug]`. Keep the `FeatureSlug` union for static-paths typing.

Source data (preferred): pull each feature page's SEO from the Webflow API (`mcp__webflow__data_pages_tool > get_page_metadata`) for ground truth on the English copy, then translate to zh-Hant. Slugs ↔ Webflow page IDs already documented in this conversation:

| slug | Webflow page id |
| --- | --- |
| attack-protection | 6965fc75096ff2f45516fc99 |
| authentication | 695dfbd7da80746afbb57f3a |
| passkeys | 62847dcf947cb01ec4f83b00 |
| whatsapp-otp | 628479a8117dd7347c0a9291 |
| multi-factor-authentication | 66e3b64a8e7638adc0727b43 |
| customization | 6967317dd23370c3d03dbfc4 |
| extensibility | 69676a726c9f6e0614796d40 |
| self-serve-settings-page | 6964b20d3b846f5fe65171da |
| authorization | 6960dae57bc7659fc0f31f81 |
| machine-to-machine-token | 6878b73de811b89440064312 |
| (others) | look up via `list_pages` then `get_page_metadata` |

**Done when:**
- `dist/features/passkeys/index.html` and `dist/zh-Hant/features/passkeys/index.html` emit different localized `<title>` / `<meta name="description">`.
- `npm run check` and `npm run build` clean.

### Task 2 — `solutionsMeta` locale split

**Files:** `src/lib/solutions-meta.ts`, `src/pages/solutions/[slug].astro`, `src/pages/zh-Hant/solutions/[slug].astro`

**Spec:** Same pattern as Task 1, for 7 solution slugs. Translate `title` + `description` to zh-Hant. Slugs ↔ Webflow IDs (already gathered): `ciam-solution=66a19e48eb844b5715311187`, `enterprise-sso=673ea525a0474e335ddd10e3`, `frontline-workers-identity=6583b7d7043fa86628512ec2`, plus the rest via `list_pages`.

### Task 3 — Login gallery detail description

**Files:** `src/content/config.ts` (or wherever the login-gallery zod schema lives — actually `src/content.config.ts`), every `src/content/login-gallery/{en,zh-Hant}/*/index.md`, `src/pages/login-gallery/[slug].astro`, `src/pages/zh-Hant/login-gallery/[slug].astro`.

**Spec:** Decide between two options and execute the chosen one:

a) **Per-entry description** — add an optional `description` field to the login-gallery schema; populate the existing entries (~6–10 entries) with a one-sentence SEO description; update both `[slug].astro` files to pass it through, falling back to a localized generic ("Browse the login experience for {title} on Authgear's gallery.") if missing.

b) **Generic localized description** — keep the schema as-is; in both `[slug].astro` files, build `description = t(locale, 'LoginGallery.detailDescription', { title: data.title })` and add the i18n keys.

Option (b) is faster; Option (a) yields better SEO copy. **Recommend (b) for this round, file (a) as future content work** unless the user wants the better copy now.

### Task 4 — Astro vs Webflow SEO copy reconciliation (research, not implementation)

**Files:** `src/i18n/en.json`, all `src/pages/*.astro` that pass localized title/description.

**Spec:** Read-only audit. For each static page, compare:
- The current Astro SEO copy (e.g. `t('en', 'About.title')` = `"About Authgear — open-source CIAM built to last"`)
- The legacy Webflow SEO copy (fetched via `mcp__webflow__data_pages_tool > get_page_metadata` — already gathered for ~17 major pages in this conversation).

Produce a table:

| route | astro title | webflow title | astro desc | webflow desc | recommendation |
| --- | --- | --- | --- | --- | --- |

Recommendation column: keep / adopt-webflow / merge / write-new. Do NOT edit anything in this task — output the table to `docs/superpowers/specs/2026-04-29-seo-copy-reconciliation.md` for human review. Implementation is a follow-up.

### Task 5 — zh-Hant translation parity check (research, not implementation)

**Spec:** For every i18n key used as a page `title` or `description` (find via grep over `src/pages/**/*.astro` and `src/components/pages/**/*.astro` for the `t(` calls feeding into BaseLayout), verify the same key exists in `src/i18n/zh-Hant.json` AND its value is not byte-identical to the en value (which would suggest a stale untranslated copy left in from a content sync).

Produce a list of missing or untranslated keys in `docs/superpowers/specs/2026-04-29-seo-zh-hant-parity.md`. Do NOT edit i18n files.

### Task 6 — Add `og:image` (out of scope this round)

Mentioned for completeness; do not start. The user explicitly opted out of `og:image` in this iteration. Easy to add later by extending `BaseLayout` with an optional `ogImage` prop and threading from each page.

## Dispatch order

1. Tasks 4 and 5 (research) can run **in parallel** — fresh Explore subagents, both read-only.
2. Tasks 1, 2, 3 (implementation) run **sequentially** — each one is a separate implementer + spec reviewer + code quality reviewer triple per `superpowers:subagent-driven-development`. Avoid parallel implementation subagents on overlapping files (zh-Hant.json is touched by all three).
3. After all tasks land: one final whole-branch reviewer, then PR.

## Validation per task

- `npm run check` clean
- `npm run build` clean
- Spot-check a representative built `dist/.../index.html` for the new `<title>` and `<meta name="description">` on both locales.
- For tasks 1 and 2: `grep -l '英文-only-string' dist/zh-Hant/...` should find nothing.

## Out of scope

- Translating `<h1>`/body copy that's still in English on zh-Hant pages (separate, larger content effort).
- Adding `og:image` (next iteration).
- Inlining critical CSS or further perf work.
- Self-hosting Google Fonts.
