# Lighthouse improvements after the Astro/Netlify cutover

**Branch:** `perf/lighthouse-improvements`
**Status:** Plan only. No code changes yet.
**Audited URL:** `https://authgear-web.netlify.app/` (Astro on Netlify, Apr 29 2026 trace).

## Baseline (Astro, Netlify edge)

Lab metrics from a single Chrome DevTools trace, no throttling, US edge:

| Metric | Value |
|---|---|
| LCP | 266 ms |
| TTFB | 24 ms |
| CLS | 0.00 |
| Critical-path latency | 397 ms |
| Render-blocking requests | 4 CSS files (no JS) |
| Third-party origins | Google Fonts, cloudfront.net (intl-tel-input util), geojs.io |
| LCP element | Hero `<div>` with `background-image` set in `authgear-new.webflow.css` |

Field metrics (CrUX): **n/a** — too few real users on the Netlify URL. Once `www.authgear.com` cuts over, CrUX will replace the current Webflow numbers (LCP p75 2541 ms, TTFB p75 1276 ms) within ~28 days.

## Why the room left is small

The Astro migration killed the bulk of the old performance debt:

- Webflow shared CSS, jQuery, codemirror, recaptcha, intl-tel-input v17 — all gone or self-hosted.
- 17+ third-party trackers (GTM, FB Pixel, Clarity, LinkedIn Ads, PostHog, Apollo, Ahrefs, etc.) → 3 origins in the new build.
- 7 MB of third-party transfer → ~750 kB.
- TTFB 1276 ms → 24 ms (Netlify edge vs whatever fronts the Webflow site).

That means the targets below are about **squeezing the last few hundred ms** rather than rescuing a broken page.

## Targeted improvements (ordered by impact / effort)

### 1. Preload the hero LCP image (high impact, trivial)

The LCP element is set via CSS `background-image` in `authgear-new.webflow.css`, so the browser only discovers `/images/home_kv_bg-pc2x.webp` after parsing that stylesheet — Lighthouse's "Request is discoverable in initial document" check **fails**.

**Fix:** add a per-page preload hint in the home `index.astro` (and the `zh-Hant` variant if it uses the same image) inside `BaseLayout`'s `<slot name="head">` (or equivalent).

```html
<link
  rel="preload"
  as="image"
  href="/images/home_kv_bg-pc2x.webp"
  fetchpriority="high"
  imagesrcset="/images/home_kv_bg-pc2x.webp"
/>
```

Expected: LCP load-delay subpart drops from ~57 ms toward 0 ms; "Discoverable" + "fetchpriority=high" checks both pass.

### 2. Defer ContactForm hydration to `client:visible` (medium impact, low effort)

Trace shows a **42 ms forced reflow** during `ContactForm.zZ3Tyb3D.js` mount, plus a 397 ms critical chain caused by `intl-tel-input` calling `https://get.geojs.io/v1/ip/country.json` for IP geolocation on every page load — even when the contact form is below the fold (it lives in the footer / about / promises / migrate / schedule-demo pages).

**Fix:** every `<ContactForm client:load … />` site-wide → `client:visible`. The form only matters when the user scrolls to it.

Files to touch (already located via grep): `AboutPage.astro`, `PromisesPage.astro`, `MigrateToAuthgearPage.astro`, `ScheduleDemoPage.astro`.

Expected: removes 42 ms main-thread reflow + the geojs round-trip from initial load. Improves TBT and INP, no LCP change.

### 3. Set immutable cache headers for `/images/*` and `/css/*` (medium impact, low effort)

Right now Netlify serves `/images/home_kv_bg-pc2x.webp` and `/css/webflow.css` with `cache-control: public,max-age=0,must-revalidate`. Hashed `_astro/*.css` are correctly `max-age=31536000,immutable`. The unhashed assets are content-stable in practice (we redeploy intentionally when they change) and would benefit from a long TTL.

**Fix:** add a `[[headers]]` block to `netlify.toml`:

```toml
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Caveat: with `immutable`, an in-place change to e.g. `/css/webflow.css` won't be picked up by returning users until they hard-reload. Mitigation: rename the file (add a hash to the filename) on any future change, or drop `immutable` and keep the long `max-age` only.

Expected: dramatic improvement for repeat visits and CrUX p75 once it stabilises. No change for first paint.

### 4. Trim the Google Fonts payload (medium impact, medium effort)

Google Fonts is now the largest third-party at 740 kB. The `<link>` requests **5 families** × 5–10 weights:

- IBM Plex Sans (10 weights, italic + roman)
- Noto Sans TC (5 weights) — **only used on zh-Hant pages**
- PT Sans (4 weights)
- Inter (5 weights)
- Red Hat Display (5 weights)

**Fixes, in order of effort/payoff:**

a. Drop unused weights. Run `grep` across `src/` for `font-weight` usage; most weights are likely unused. Each unused weight in the URL is one extra `woff2` download.

b. Move `Noto Sans TC` to the zh-Hant locale only — locale-aware `<link>` in `BaseLayout.astro`.

c. Self-host the woff2 files under `public/fonts/`. Removes the Google Fonts CSS round-trip (one less critical chain hop, currently 35 ms) and lets us cache them with our own headers (point 3). `fonttools` or `glyphhanger` can subset the files to the glyphs we actually use.

Expected: ~200–400 kB shaved from initial load, removes one render-blocking stylesheet hop.

### 5. Inline critical CSS, defer the rest (low impact, medium effort)

Four stylesheets are render-blocking on the home page (`webflow.css`, `authgear-new.webflow.css`, `authgear-ds-split-stack.css`, `BaseLayout.B-LIfuh8.css`, plus the `ContactForm` chunk if hydration stays at `client:load`). Lighthouse estimates 0 ms savings — these are tiny and cached after first visit — so this is not a priority. Revisit only if the legacy `webflow.css` and `authgear-new.webflow.css` can be slimmed to just the rules actually used by the design system.

### 6. Add `preconnect` for `get.geojs.io` (only if step 2 isn't done)

If we keep `client:load` on ContactForm for some reason, a `<link rel="preconnect" href="https://get.geojs.io" crossorigin>` in `BaseLayout` would shave ~50 ms off the geojs round-trip. Step 2 is strictly better (avoids the request entirely).

## Validation plan

1. Re-run a Chrome DevTools performance trace against `authgear-web.netlify.app` after each change merges.
2. After the production cutover (DNS swap to Netlify), re-audit `https://www.authgear.com/` and confirm CrUX field metrics start tracking the new numbers within ~28 days.
3. Set up Netlify's built-in Lighthouse CI plugin so each deploy posts scores to the deploy summary — gives us per-PR regression detection without extra infra.

## Out of scope

- INP / interaction profiling (current trace is navigation-only).
- Other pages (`/blog`, customer-stories detail, etc.) — same `BaseLayout` so most fixes apply uniformly, but each should be re-audited individually.
- Rewriting the legacy `webflow.css` files (they're large but cached; only worth it if a redesign is on the table).
- Plausible / GTM impact — neither is loading on the Netlify deploy because the env vars aren't set; will appear once the prod env is configured.
