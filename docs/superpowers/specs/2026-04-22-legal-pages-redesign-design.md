# Legal Pages Redesign — Design Spec

**Date:** 2026-04-22
**Scope:** `frontend-astro/` — visual redesign of the 6 legacy legal pages so they share a single modern template.

## Goal

Replace the Webflow-era layout on `/terms`, `/policy`, `/data-privacy`, `/security`, `/sla`, `/terms-of-enterprise-license` with a clean, modern template consistent with the rest of the Astro site. Preserve the wording of the legal text byte-for-byte; reformat only the HTML structure (option A) and the chrome around it (option C — minimalist, no TOC).

## Non-goals

- No copywriting changes. Wording is fixed; only markup and styling change.
- No TOC, sticky sidebar, or anchor navigation.
- No "Last updated" metadata (dates are not available in source).
- No new translations — zh-TW routes render the same English content (per user direction).

## Affected pages

| Route | Component |
| --- | --- |
| `/terms` | `components/pages/TermsPage.astro` |
| `/policy` | `components/pages/PolicyPage.astro` |
| `/data-privacy` | `components/pages/DataPrivacyPage.astro` |
| `/security` | `components/pages/SecurityPage.astro` |
| `/sla` | `components/pages/SlaPage.astro` |
| `/terms-of-enterprise-license` | `components/pages/TermsEnterprisePage.astro` |

Both `src/pages/<slug>.astro` and `src/pages/zh-TW/<slug>.astro` import the same page component and render English content.

## Architecture

### New shared layout

`src/components/legal/LegalPageLayout.astro`

Props:
- `title: string` — displayed in the hero `<h1>`.
- `eyebrow?: string` — small label above the title; defaults to `"Legal"`.

Structure (single slot):

```astro
<section class="ds-hero-banner--gradient legal-hero">
  <div class="ds-container ds-container--gradient-hero-shell">
    <div class="ds-hero-banner--gradient__inner">
      <div class="ds-container ds-container--hero legal-hero__inner">
        <p class="ds-section-eyebrow ds-section-eyebrow--on-dark">{eyebrow}</p>
        <h1 class="ds-hero-banner__title legal-hero__title">{title}</h1>
      </div>
    </div>
  </div>
</section>

<section class="ds-section ds-bg-white">
  <div class="ds-container legal-content">
    <div class="ds-richtext-prose">
      <slot />
    </div>
  </div>
</section>

<section class="ds-section ds-footer-cta-section">
  {/* standard Start-for-free + Schedule-demo CTA, matching UserManagementPage */}
</section>
```

Notes:
- Reuses existing `ds-hero-banner--gradient` and `ds-footer-cta-section` classes — no new component tree.
- The content container uses `ds-container` with a narrower max-width override (`.legal-content { max-width: 760px; margin-inline: auto; }`).
- `ds-richtext-prose` already defines typography for `h2/h3/p/ul/ol/a` across the site (used by Strapi-rendered rich text) — no new prose styles needed.

### Page components

Each page component becomes a thin wrapper:

```astro
---
import LegalPageLayout from '@/components/legal/LegalPageLayout.astro';
interface Props { locale: string }
---
<LegalPageLayout title="Terms of Services">
  {/* reformatted content */}
</LegalPageLayout>
```

The `locale` prop is accepted (for API consistency with other pages) but unused — content is always English.

### Route files

`src/pages/<slug>.astro` and `src/pages/zh-TW/<slug>.astro` both:
- Keep `export const prerender = true;`
- Use `BaseLayout` with `locale={locale}` (so nav + footer localize correctly) and pass English title/description to it.
- Render the same page component inside.

## Content reformatting — `TermsPage`

Only `TermsPage` has a single-`<p>`-with-`<br/><br/>` wall. Reformat as:

- Each top-level numbered section (`1.`, `2.`, …, `17.`) → `<h2>`. Example: `<h2>1. Your Agreement with Authgear</h2>`.
- Each sub-clause (`1.1`, `1.2`, …) → a `<p>` starting with `<strong>1.1</strong>` followed by the clause text. This keeps the numbering visible without inflating hierarchy.
- `<br/><br/>` separators → real paragraph breaks.
- ALL-CAPS disclaimer clauses in sections 11 and 12 remain in ALL-CAPS wording; they render as normal `<p>` under their `<h2>`.
- Inline `<a href="…">` links preserved verbatim (including `/policy`, `/data-privacy`, `/pricing`, external links).

The other five pages already use `<h3>` / `<ul>` / `<p>` correctly; their content moves into the new layout unchanged.

## Footer CTA

Reuses the `ds-footer-cta-section` block already shipped on `UserManagementPage` and other feature pages:

- Heading: `"Start building with Authgear"` (or matching copy already used on feature pages).
- Two buttons: "Start for free" (primary, → portal signup) and "Schedule a demo" (outline, → `/schedule-demo`).
- Footnote: "Free plan includes unlimited MAUs".

Drops the legacy `cta-split-content-left/right` dual block used on the old pages.

## Styling additions

In `src/styles/global.css`:

```css
.legal-hero .legal-hero__inner { text-align: center; }
.legal-hero .legal-hero__title { max-width: 48rem; margin-inline: auto; }
.legal-content { max-width: 760px; margin-inline: auto; }
```

If `ds-richtext-prose` turns out to need small tweaks for legal copy (e.g., tighter spacing for the dense sub-clause paragraphs in Terms), those are one-offs under `.legal-content .ds-richtext-prose …` — additive, not global.

## Testing

- Manual verification against `npm run dev` at port 4321 for each of the 6 routes.
- Spot-check that inline links in Terms (to `/policy`, `/data-privacy`, `/pricing`) still resolve.
- Visual check on mobile (≤767px): hero title wraps cleanly; content column is comfortable; footer CTA buttons stack.
- No Playwright tests required — these are static content pages with no interactivity.

## Risk / rollback

- All changes are localized to the 6 legal page components, one new layout, a small CSS addition, and the 12 route files (mechanical edit). Revertable with `git revert` of a single commit.
- No impact on Strapi, pricing, navigation, or any interactive island.
