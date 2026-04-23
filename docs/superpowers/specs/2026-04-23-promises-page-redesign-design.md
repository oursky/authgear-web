# Promises page redesign

Date: 2026-04-23
Branch: `feat/promises-redesign`
Scope: `/promises` and `/zh-TW/promises`

## Goal

Replace the legacy Webflow-derived `/promises` page with a minimal, standalone
layout that uses the existing `ds-*` design system tokens. The content is four
short promise statements — the page should read as a quiet manifesto, not a
marketing feature grid.

This redesign is intentionally **not coupled** to the in-flight About page
redesign. It uses shared design tokens and the shared footer CTA, but does not
adopt About's hero treatment or principles-section layout.

## Non-goals

- Animations, illustrations, or imagery.
- Testimonials, customer logos, or social proof.
- Any new content collection or CMS plumbing.
- Changes to the zh-TW translations of the promise sentences beyond adding the
  new keys (the four promises themselves are kept verbatim in English for now,
  matching the current page which has no zh-TW body translation).

## Structure

Top to bottom:

1. **Hero** — light/white hero using `ds-hero-banner--light` (or the closest
   existing variant). Contains:
   - Eyebrow: "Our commitments"
   - H1: the existing `Promises.title` ("Authgear Promises")
   - Lede: one short sentence introducing why these promises exist.
2. **Promises list** — centered single column, ~640–720px max. Each of the four
   promises is its own block:
   - Numeral (01, 02, 03, 04) in an accent color
   - Promise sentence in a size larger than body copy
   - Thin hairline divider between items; generous vertical spacing
   - No cards, no borders around each item
3. **Footer CTA** — reuse whatever shared footer CTA component the About page
   now ends with (e.g. `FooterCta.astro` or equivalent). If a reusable
   component does not yet exist as a standalone file, inline the same markup
   pattern the About page uses so both pages stay visually aligned.

## Content (i18n)

Add under the existing `Promises` namespace in both `src/i18n/en.json` and
`src/i18n/zh-TW.json`:

```
Promises.eyebrow      "Our commitments"
Promises.lede         <one short sentence — final wording TBD during impl>
Promises.items.1      "You own your code and data, not us."
Promises.items.2      "We won't lock you in from other vendors."
Promises.items.3      "We will do everything we can to achieve 100% uptime."
Promises.items.4      "We will never achieve 100% uptime, but when we fall short, we'll explain why and how we'll do better next time."
```

zh-TW: copy English values as placeholders (same pattern as the current page,
which renders English body text for the zh-TW route). A future translation pass
can replace them.

The lede sentence — draft: *"A short list of the things we commit to, and the
things we don't."* Final wording can be tightened during implementation; this
is not a design-blocking decision.

## Files touched

- `src/components/pages/PromisesPage.astro` — rewrite body
- `src/i18n/en.json` — add `Promises.eyebrow`, `Promises.lede`,
  `Promises.items.{1..4}`
- `src/i18n/zh-TW.json` — same keys, English placeholders
- `src/pages/promises.astro` and `src/pages/zh-TW/promises.astro` — no change
  expected (they already pass `locale` to `PromisesPage`)

## What gets removed

- The two-column "Get Started for free / Talk with sales" CTA block (replaced
  by the shared footer CTA).
- The Webflow-era classes `container-medium-761px`, `w-richtext`,
  `inner-page-hero`, `split-content`, `animation-div`, and the trailing
  `.divider` div.

## Testing

- `npm run build` succeeds for both locales.
- Manual visual check at `/promises` and `/zh-TW/promises` via `npm run dev`.
- No Playwright or Vitest additions — this page has no interactive behavior.
