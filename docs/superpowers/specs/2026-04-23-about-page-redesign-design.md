# About Page Redesign — Design Spec

**Date:** 2026-04-23
**Scope:** `/about` and `/zh-TW/about`
**Status:** Design — awaiting approval before implementation plan

## Problem

The current About page (`src/components/pages/AboutPage.astro`) is the legacy Webflow export. It has:
- A hero with an outdated zoom-call photo and ambiguous "About Us" heading.
- A team-members section that uses Webflow's `w-tabs` + `w-dyn-list` with empty CMS stubs (no real content renders).
- A partners section (Azure, GCP).
- A two-column CTA split.

Problems:
1. The team section is visually empty — the Webflow CMS that populated it is gone.
2. The page doesn't communicate Authgear's actual positioning: open source, bootstrapped, opinionated defaults, Asia-first.
3. Markup still relies on legacy Webflow classes (`w-tabs`, `w-dyn-list`, etc.) and `webflow.js` for tab behavior.

## Goals

Rebuild `/about` (and `/zh-TW/about`) to:
- Serve two audiences: (1) enterprise buyers doing diligence and (2) developers evaluating the product.
- Communicate the positioning captured in the internal `Authgear Position` Notion doc — opinionated, open source, bootstrapped, Asia-first, identity as infrastructure.
- Match the `ds-*` design-system language already used on `EnterpriseSsoPage.astro` and `FrontlineWorkersIdentityPage.astro`.
- Drop the `w-tabs` block (one less `webflow.js` dependency on this page).

## Non-Goals

- No new recruiting flow. The existing "Join us" CTA is removed.
- No team/leadership profiles. No photos, no LinkedIn cards.
- No blog of company history. Keep the story tight (one section, ~150 words).
- No redesign of unrelated pages or of the `ds-*` design system itself.

## Target audiences

| Audience | What they want | Section that serves it |
|---|---|---|
| Enterprise buyer | Trust signals, compliance, named customers | Hero, Company snapshot, Customer proof |
| Developer | Product positioning, principles, open-source stance | Hero subhead, Why section, Principles cards |

## Page structure (top to bottom)

### 1. Hero

- Pattern: reuse the `ds-hero-banner--dark` structure from `EnterpriseSsoPage.astro`.
- Headline: **Authentication is infrastructure. We treat it that way.**
- Subhead: **Authgear is the open-source CIAM platform built for teams who can't afford to re-platform their auth stack every time a vendor gets acquired.**
- CTAs:
  - Primary: "Get a Demo" → `/schedule-demo`
  - Ghost: "View Pricing" → `/pricing`
- Visual: no image. Centered copy in the hero. The old zoom-call photo is gone.

### 2. "Why we built Authgear" — narrative

- Pattern: `ds-section` with light background, centered `title-content` eyebrow + heading, then three paragraphs.
- Copy (~150 words total, new, drawn from the Notion doc):

> **Paragraph 1 — the problem.** Auth gets built twice: once hastily by junior developers, and then again by seniors under deadline pressure. The result is the same — brittle login flows, bolted-on MFA, poor password hygiene, and security handled as an afterthought.
>
> **Paragraph 2 — the market.** Most CIAM vendors either hand you a pile of SDKs and expect you to wire together your own flows, or get acquired and shelved two years later. Neither is a foundation you want to build on.
>
> **Paragraph 3 — the approach.** Authgear is different on three axes: **opinionated defaults** instead of configuration sprawl, **open source and bootstrapped** so it outlives funding cycles, and **Asia-first** — WhatsApp OTP, LINE, multi-lingual UI, regional SMS gateways, and local data residency, shipped rather than promised.

### 3. Product principles — 4 cards

- Pattern: `ds-grid-4` with `svg-card` cells (4-in-a-row on desktop, wraps on narrower viewports — `ds-grid-4` is already defined in `src/styles/authgear-design-system.css`). Each card follows the same icon + title + description layout used by the feature cards on EnterpriseSsoPage.
- Icons: reuse existing SVGs from the design system (cards already use inline SVGs on EnterpriseSsoPage). Pick one that fits each principle; no new icons needed.

| # | Title | Description |
|---|---|---|
| 1 | Opinionated by default | Safe, tested flows out of the box — passkeys, MFA, account linking, recovery. No 40-line forgot-password detours. |
| 2 | Open source, no lock-in | Self-host, migrate, or swap for any OIDC-compliant provider. Your auth isn't trapped in our cloud. |
| 3 | Built to outlive funding cycles | Profitable, bootstrapped, not chasing a valuation. You won't wake up to an acquisition notice. |
| 4 | Asia-first, globally capable | WhatsApp OTP, LINE, GovID, regional SMS, multi-lingual UI, local data residency. Shipped, not promised. |

### 4. Company snapshot — dense one-row fact strip

- Pattern: `ds-section` with a single centered row of short facts separated by middot `·`. Inline compliance badges and cloud partner logos rendered at small/medium scale within the same row block (not a full partners grid).
- Content (one continuous line, wraps naturally on smaller viewports):

> Built by **SkyMakers Digital Group** · Since **2009** · Remote team across **HK, Taiwan, UK, Canada, US** · **ISO 27001** + **SoC 2 Type II** · **Passkey Pledge Partner** · Runs on **Azure + GCP**

- Images rendered inline (same sources already used in the footer / current About page):
  - `/images/Authgear_footer_certificated_blue2x.png` (ISO + SoC badge)
  - `/images/PasskeyPledge_color.png`
  - `/images/1111.png` (Azure)
  - `/images/gcp.png` (GCP)

### 5. Customer proof

- Pattern: two sub-blocks in one `ds-section`.
- **Logo wall (top):** 6 logos from `src/content/customer-stories/en/*` rendered inline on a single row (wrap on mobile). Source: each story's `companyLogo` or (fallback) `thumbnail` field. Featured slugs: `hongkong-mtr`, `global-qsr`, `hongkong-land`, `k11`, `cornerstone-technologies`, `outback-steakhouse`.
- **Featured cases (bottom):** 2 cards using the existing `solution-case-study-card` component/pattern from `FrontlineWorkersIdentityPage.astro`. Slugs: `hongkong-mtr`, `global-qsr`. These both represent the "extended enterprise / frontline workers" positioning from the Notion doc.

### 6. Footer form CTA

- Pattern: identical to the `footer-form-section` block at the bottom of `EnterpriseSsoPage.astro`.
- Heading: **Ready to put auth behind you?**
- Body: **Get a demo, or start building on the free tier. We'll show you what opinionated, open-source CIAM looks like.**
- Right side: `<ContactForm client:load />`

## Content reuse vs. new

| Content | Source |
|---|---|
| Customer logos + case studies | `src/content/customer-stories/en/{slug}/` |
| Compliance badge (ISO + SoC) | `/images/Authgear_footer_certificated_blue2x.png` (already used in footer) |
| Passkey Pledge badge | `/images/PasskeyPledge_color.png` (already used in footer) |
| Azure + GCP logos | `/images/1111.png`, `/images/gcp.png` (already on current About page) |
| Contact form | `@/components/islands/ContactForm` |
| ds-* styles | Existing CSS |

All written copy (hero, why narrative, principles, footer) is new. No body content is pulled from the existing `About.*` i18n block.

## i18n changes

### New keys under `About` (en + zh-TW)

```
About.title                → document title
About.description          → meta description
About.heroTitle
About.heroSubhead
About.heroCta1             → "Get a Demo"
About.heroCta2             → "View Pricing"
About.whyEyebrow           → "Why Authgear" (section eyebrow)
About.whyTitle             → "Why we built Authgear"
About.whyP1                → paragraph 1 (the problem)
About.whyP2                → paragraph 2 (the market)
About.whyP3                → paragraph 3 (the approach)
About.principlesTitle
About.principles1Title     × 4 …
About.principles1Desc      × 4 …
About.principles2Title
About.principles2Desc
About.principles3Title
About.principles3Desc
About.principles4Title
About.principles4Desc
About.snapshotTitle        → e.g. "The company behind Authgear"
About.snapshotLine         → single string with middot-separated facts
About.customersTitle       → "Teams building on Authgear"
About.caseStudy1Title      → MTR card heading
About.caseStudy1Cta        → "Read the story"
About.caseStudy2Title      → Global QSR card heading
About.caseStudy2Cta
About.footerTitle
About.footerBody
```

### Keys to remove from `About` (both en + zh-TW)

```
About.heroHeading
About.heroParagraph
About.heroImageAlt
About.teamHeading
About.teamSubheading
About.joinUsButton
About.partnersHeading
About.ctaGetStartedHeading
About.ctaGetStartedBody
About.ctaGetStartedLink
About.ctaSalesHeading
About.ctaSalesBody
About.ctaSalesLink
```

`About.title` and `About.description` stay, but their text will be updated.

## Code changes

### `src/components/pages/AboutPage.astro`

- Full rewrite against the structure above.
- Drop the `w-tabs` / `w-dyn-list` team section entirely.
- Drop the two-column CTA split; replace with the `footer-form-section` pattern.
- Drop the inline HTML-escape hack for `heroParagraph` (`<skymakerLink>` / `<br></br>`).
- Pull 6 customer-stories for the logo wall and 2 for the featured case cards via `getCollection('customer-stories', …)`.
- Component takes `locale: string` (already does).

### `src/i18n/en.json` and `src/i18n/zh-TW.json`

- Add the new keys listed above.
- Remove the keys listed above.

### `src/layouts/BaseLayout.astro` / routing

- No routing changes. `/about` and `/zh-TW/about` URLs stay the same.

### Images

- Old hero photo `/public/images/Lessons-Working-Remotely-in-the-Time-of-Coronavirus-5.png` becomes unused. Verify no other page references it before deletion (likely safe to delete; low priority — can leave in place).

## Architecture notes

- Single-file rewrite of `AboutPage.astro` — no new shared components needed. All ds-* patterns are inline usage of existing classes.
- No new client-side JavaScript. The `ContactForm` island already exists; everything else is static markup.
- Section heights are driven by content; ds-section provides the vertical rhythm.
- `getCollection('customer-stories')` is already used in other pages (e.g. `EnterpriseSsoPage.astro`) — follow the same pattern (filter by `en/` prefix, map to `{ slug, title, thumbnail, companyLogo }`).

## Testing

- Build passes (`npm run build`).
- Dev server renders `/about` and `/zh-TW/about` without regressions.
- Links: demo CTA hits `/schedule-demo`, pricing CTA hits `/pricing`, case study CTAs hit `/customer-stories/{slug}`.
- Visual spot-check at three viewports: desktop (≥1280), tablet (768–991), mobile (<768).
- Verify compliance badges and cloud logos render at reasonable sizes inline.

## Out of scope / follow-ups

- No change to the nav — `/about` link in the footer `Company` block remains as-is.
- `webflow.js` stays loaded in `BaseLayout` — other pages still depend on it for `w-tabs` and `w-form`.
- A broader `ds-grid-logo-wall` component (if we want to reuse the logo wall elsewhere) is a future extraction; not required for this change.
