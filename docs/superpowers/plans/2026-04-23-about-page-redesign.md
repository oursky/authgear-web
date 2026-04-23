# About Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `/about` (and `/zh-TW/about` via the same component) to match the positioning in the internal "Authgear Position" Notion doc and the `ds-*` design system, removing the legacy Webflow `w-tabs` team-members block.

**Architecture:** Single-component rewrite of `src/components/pages/AboutPage.astro`. Copy is driven by new `About.*` keys in `src/i18n/en.json` and `src/i18n/zh-TW.json`; customer-proof content is pulled from the existing `customer-stories` content collection. All layout reuses existing `ds-hero-banner--dark`, `ds-section`, `ds-grid-4`, `svg-card`, `_2-card-grid`, `solution-case-study-card`, and `footer-form-section` patterns from `EnterpriseSsoPage.astro` + `FrontlineWorkersIdentityPage.astro`. No new shared components.

**Tech Stack:** Astro 5, TypeScript, `astro:content` (content collections), `astro:assets` (`<Image>`), existing `@/i18n` helper, existing `@/components/islands/ContactForm` React island.

**Spec:** `docs/superpowers/specs/2026-04-23-about-page-redesign-design.md`

---

## File Structure

**Modify:**
- `src/components/pages/AboutPage.astro` — full rewrite.
- `src/i18n/en.json` — expand `About` block with new keys; remove obsolete keys.
- `src/i18n/zh-TW.json` — same key changes; provide zh-TW translations for new keys.

**Delete (after verifying no other references):**
- `public/images/Lessons-Working-Remotely-in-the-Time-of-Coronavirus-5.png` — old hero photo.

**Not touched:**
- Routes (`src/pages/about.astro`, `src/pages/zh-TW/about.astro`) — they already thin-wrap `AboutPage` with the correct locale.
- Styles — all layout patterns already exist in `src/styles/authgear-design-system.css` and `public/css/authgear-new.webflow.css`.
- Other pages, nav, footer.

## Customer-story selection

The spec names 6 logos. `global-qsr` lacks a `logo.png` file, so the logo wall swaps it for `bupa` (which has a logo). `global-qsr` stays as one of the 2 featured case cards (the cards use `thumbnail`, not logo, so the absence is irrelevant there).

- **Logo wall (6):** `hongkong-mtr`, `hongkong-land`, `k11`, `cornerstone-technologies`, `outback-steakhouse`, `bupa`
- **Featured case cards (2):** `hongkong-mtr`, `global-qsr`

## Verification strategy

Astro pages have no unit tests. Per-task verification is:
- `npm run build` — type-checks, validates all i18n keys used in the component, validates `getCollection` calls against the content-collection schema.
- `npm run dev` + browser spot-check at `http://localhost:4321/about` and `http://localhost:4321/zh-TW/about`.
- `grep` to confirm removed keys have no remaining references.

Each task ends in `npm run build` and — where a user-visible change happened — a `npm run dev` spot-check is called out explicitly.

---

## Task 1: Add new `About.*` i18n keys (both locales)

**Files:**
- Modify: `src/i18n/en.json:179-195`
- Modify: `src/i18n/zh-TW.json:179-195`

Old keys stay in place for now — they'll be removed in Task 3 after the component no longer references them.

- [ ] **Step 1: Add new keys to `src/i18n/en.json`**

Open `src/i18n/en.json` at line 179. Find the `"About": { ... }` block (currently ending at line 195). Replace the closing `}` of that block so the block becomes:

```json
  "About": {
    "title": "About Us - Authgear",
    "description": "Help developers to build better, more secure, privacy-aware software. Add secure and user friendly authentication and user management to your web & mobile apps in minutes.",
    "heroHeading": "About Us",
    "heroParagraph": "Authgear is the flagship product of <skymakerLink>SkyMakers</skymakerLink>. <br></br>We have been serving various Enterprises and Startups in the UK, Canada, US, Hong Kong and Taiwan since 2009.<br></br><br></br>Our mission, is to help developers to build better, more secure, privacy-aware software with our open sources technologies.",
    "heroImageAlt": "zoom call with authgear team",
    "teamHeading": "The team behind Authgear",
    "teamSubheading": "Our team work remotely from different parts of the world",
    "joinUsButton": "Join us",
    "partnersHeading": "Our Partners",
    "ctaGetStartedHeading": "Get Started for free",
    "ctaGetStartedBody": "Authgear.com is free for apps unlimited MAUs (Monthly Active Users) with Authgear branding. It is also open source and always free!",
    "ctaGetStartedLink": "Get Started",
    "ctaSalesHeading": "Talk with our sales team",
    "ctaSalesBody": "If you are looking for volume discounts, custom support plans, SLA, or have a different compliance requirements, feel free to contact us!",
    "ctaSalesLink": "Contact Us",
    "heroTitle": "Authentication is infrastructure. We treat it that way.",
    "heroSubhead": "Authgear is the open-source CIAM platform built for teams who can't afford to re-platform their auth stack every time a vendor gets acquired.",
    "heroCta1": "Get a Demo",
    "heroCta2": "View Pricing",
    "whyEyebrow": "Why Authgear",
    "whyTitle": "Why we built Authgear",
    "whyP1": "Auth gets built twice: once hastily by junior developers, and then again by seniors under deadline pressure. The result is the same — brittle login flows, bolted-on MFA, poor password hygiene, and security handled as an afterthought.",
    "whyP2": "Most CIAM vendors either hand you a pile of SDKs and expect you to wire together your own flows, or get acquired and shelved two years later. Neither is a foundation you want to build on.",
    "whyP3": "Authgear is different on three axes: opinionated defaults instead of configuration sprawl, open source and bootstrapped so it outlives funding cycles, and Asia-first — WhatsApp OTP, LINE, multi-lingual UI, regional SMS gateways, and local data residency, shipped rather than promised.",
    "principlesTitle": "How Authgear is different",
    "principles1Title": "Opinionated by default",
    "principles1Desc": "Safe, tested flows out of the box — passkeys, MFA, account linking, recovery. No 40-line forgot-password detours.",
    "principles2Title": "Open source, no lock-in",
    "principles2Desc": "Self-host, migrate, or swap for any OIDC-compliant provider. Your auth isn't trapped in our cloud.",
    "principles3Title": "Built to outlive funding cycles",
    "principles3Desc": "Profitable, bootstrapped, not chasing a valuation. You won't wake up to an acquisition notice.",
    "principles4Title": "Asia-first, globally capable",
    "principles4Desc": "WhatsApp OTP, LINE, GovID, regional SMS, multi-lingual UI, local data residency. Shipped, not promised.",
    "snapshotTitle": "The company behind Authgear",
    "snapshotLine": "Built by SkyMakers Digital Group · Since 2009 · Remote team across Hong Kong, Taiwan, UK, Canada, US · ISO 27001 + SoC 2 Type II · Passkey Pledge Partner · Runs on Azure + GCP",
    "customersTitle": "Teams building on Authgear",
    "caseStudy1Title": "MTR Corporation simplifies part-time hiring login",
    "caseStudy1Cta": "Read the story",
    "caseStudy2Title": "Global QSR streamlines frontline login",
    "caseStudy2Cta": "Read the story",
    "footerTitle": "Ready to put auth behind you?",
    "footerBody": "Get a demo, or start building on the free tier. We'll show you what opinionated, open-source CIAM looks like."
  },
```

(The new keys are appended after `ctaSalesLink`; old keys are retained for now and will be cleaned up in Task 3.)

- [ ] **Step 2: Add the same new keys to `src/i18n/zh-TW.json`**

Open `src/i18n/zh-TW.json` at line 179. Replace the `About` block the same way:

```json
  "About": {
    "title": "About Us - Authgear",
    "description": "Help developers to build better, more secure, privacy-aware software. Add secure and user friendly authentication and user management to your web & mobile apps in minutes.",
    "heroHeading": "About Us",
    "heroParagraph": "Authgear is the flagship product of <skymakerLink>SkyMakers</skymakerLink>. <br></br>We have been serving various Enterprises and Startups in the UK, Canada, US, Hong Kong and Taiwan since 2009.<br></br><br></br>Our mission, is to help developers to build better, more secure, privacy-aware software with our open sources technologies.",
    "heroImageAlt": "zoom call with authgear team",
    "teamHeading": "The team behind Authgear",
    "teamSubheading": "Our team work remotely from different parts of the world",
    "joinUsButton": "Join us",
    "partnersHeading": "Our Partners",
    "ctaGetStartedHeading": "Get Started for free",
    "ctaGetStartedBody": "Authgear.com is free for apps unlimited MAUs (Monthly Active Users) with Authgear branding. It is also open source and always free!",
    "ctaGetStartedLink": "Get Started",
    "ctaSalesHeading": "Talk with our sales team",
    "ctaSalesBody": "If you are looking for volume discounts, custom support plans, SLA, or have a different compliance requirements, feel free to contact us!",
    "ctaSalesLink": "Contact Us",
    "heroTitle": "身份驗證是基礎建設，我們也是這麼對待它的。",
    "heroSubhead": "Authgear 是開源 CIAM 平台，為那些不想每次供應商被併購就重建身份驗證系統的團隊而打造。",
    "heroCta1": "預約展示",
    "heroCta2": "查看定價",
    "whyEyebrow": "為什麼是 Authgear",
    "whyTitle": "我們為什麼打造 Authgear",
    "whyP1": "身份驗證往往被做兩次:先是由資淺工程師匆忙實作,再是由資深工程師在時程壓力下補救。結果都一樣——登入流程脆弱、MFA 事後硬加、密碼儲存不當,安全性永遠是附加項。",
    "whyP2": "多數 CIAM 廠商要嘛丟給你一堆 SDK 讓你自行串起流程,要嘛在兩年後被併購然後束之高閣。兩者都不是值得建置其上的基礎。",
    "whyP3": "Authgear 在三個面向上選擇不同的路:用有主見的預設值取代無盡的設定、以開源與自力營運的方式超越創投週期、以亞洲優先的設計—WhatsApp OTP、LINE、多語系介面、在地簡訊通道、資料在地儲存—是實際交付,而非承諾。",
    "principlesTitle": "Authgear 有何不同",
    "principles1Title": "預設即有主見",
    "principles1Desc": "安全且經過驗證的流程開箱即用——通行金鑰、MFA、帳號連結、復原。不必為「忘記密碼」另寫 40 行程式。",
    "principles2Title": "開源,沒有鎖定",
    "principles2Desc": "可自主架設、遷移,或換成任何相容 OIDC 的服務。你的身份驗證不會被困在我們的雲端。",
    "principles3Title": "撐得過創投週期",
    "principles3Desc": "營運獲利、自力經營、不追估值。你不會在某天早上醒來看到併購通知。",
    "principles4Title": "亞洲優先,放諸四海",
    "principles4Desc": "WhatsApp OTP、LINE、GovID、在地簡訊通道、多語系介面、資料在地儲存。是已交付,不是口頭承諾。",
    "snapshotTitle": "Authgear 背後的團隊",
    "snapshotLine": "由 SkyMakers Digital Group 打造 · 自 2009 年起 · 遠距團隊分布於香港、台灣、英國、加拿大、美國 · 通過 ISO 27001 與 SoC 2 Type II · Passkey Pledge 合作夥伴 · 運行於 Azure + GCP",
    "customersTitle": "採用 Authgear 的團隊",
    "caseStudy1Title": "港鐵簡化兼職應徵登入流程",
    "caseStudy1Cta": "閱讀案例",
    "caseStudy2Title": "跨國速食品牌強化前線員工登入",
    "caseStudy2Cta": "閱讀案例",
    "footerTitle": "準備把身份驗證交給我們?",
    "footerBody": "預約展示,或從免費方案開始。我們會示範什麼叫做有主見的開源 CIAM。"
  },
```

- [ ] **Step 3: Verify JSON is still valid**

Run:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json'))" && \
node -e "JSON.parse(require('fs').readFileSync('src/i18n/zh-TW.json'))" && \
echo OK
```

Expected output: `OK`. Any SyntaxError means a missing comma or stray quote — fix and re-run.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: "Complete!" at the bottom. No errors.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/en.json src/i18n/zh-TW.json
git commit -m "feat(about): add new About.* i18n keys for page redesign

Add hero, why-narrative, principles, snapshot, customer-proof, and
footer-form copy keys in both locales. Old keys remain in place until
the component rewrite in the next commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2a: Rewrite `AboutPage.astro` — hero + meta only

Replace the entire file with the new frontmatter, layout scaffolding, and the hero section only. All old sections are deleted in this step; subsequent tasks append new sections.

**Files:**
- Modify: `src/components/pages/AboutPage.astro` (full rewrite)

- [ ] **Step 1: Replace `src/components/pages/AboutPage.astro` with the new scaffold**

Overwrite the file with exactly this content:

```astro
---
import { Image } from 'astro:assets';
import { getCollection } from 'astro:content';
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import ContactForm from '@/components/islands/ContactForm';

interface Props { locale: string }
const { locale } = Astro.props;

// Logo wall: 6 customer stories that ship a logo.png file.
const logoWallSlugs = [
  'hongkong-mtr',
  'hongkong-land',
  'k11',
  'cornerstone-technologies',
  'outback-steakhouse',
  'bupa',
];
// Featured case cards: 2 "extended enterprise / frontline workers" stories.
const featuredCaseSlugs = ['hongkong-mtr', 'global-qsr'];

const allStories = await getCollection('customer-stories', ({ id }) => id.startsWith('en/'));
const findStory = (slug: string) =>
  allStories.find((e) => e.id === `en/${slug}/index.md`);

const logoWall = logoWallSlugs
  .map(findStory)
  .filter((e): e is NonNullable<typeof e> => e !== undefined)
  .map((entry) => ({
    slug: entry.id.replace(/^en\//, '').replace(/\/index(\.(md|mdx))?$/, ''),
    title: entry.data.title,
    logo: entry.data.companyLogo,
  }));

const featuredCases = featuredCaseSlugs
  .map(findStory)
  .filter((e): e is NonNullable<typeof e> => e !== undefined)
  .map((entry, idx) => ({
    slug: entry.id.replace(/^en\//, '').replace(/\/index(\.(md|mdx))?$/, ''),
    title: entry.data.title,
    thumbnail: entry.data.thumbnail,
    titleKey: `About.caseStudy${idx + 1}Title` as const,
    ctaKey: `About.caseStudy${idx + 1}Cta` as const,
  }));
---

<div class="page-wrapper">
  <!-- SECTION: Hero -->
  <section class="ds-hero-banner--dark">
    <div class="ds-container ds-container--hero">
      <div class="ds-hero-banner__row">
        <div class="ds-hero-banner__body">
          <h1 class="ds-hero-banner__title">{t(locale, 'About.heroTitle')}</h1>
          <p class="ds-hero-banner__description">{t(locale, 'About.heroSubhead')}</p>
          <div class="ds-hero-banner__ctas">
            <a href={localizedPath(locale, '/schedule-demo')} class="ds-btn ds-btn-secondary">
              {t(locale, 'About.heroCta1')}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ds-btn__icon-arrow" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </a>
            <a href={localizedPath(locale, '/pricing')} class="ds-btn ds-btn-tertiary">
              {t(locale, 'About.heroCta2')}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ds-btn__icon-arrow" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: "Complete!" Any missing-key error (`t is not a function`, `Cannot read property ...`) or content-collection error points to a typo — fix and re-run.

- [ ] **Step 3: Manual spot-check**

Start the dev server (`npm run dev`), open `http://localhost:4321/about`. Expected: dark hero with headline "Authentication is infrastructure…", subhead, and two CTAs. No team section, no partner logos, nothing below the hero.

Also open `http://localhost:4321/zh-TW/about`. Expected: same layout, Chinese copy.

Stop the dev server before continuing (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
git add src/components/pages/AboutPage.astro
git commit -m "refactor(about): rewrite page with ds-* hero (WIP — hero only)

Drops the legacy Webflow team-members, partners, and CTA-split
sections. Subsequent commits append the remaining sections.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2b: Add "Why we built Authgear" + principles sections

**Files:**
- Modify: `src/components/pages/AboutPage.astro`

- [ ] **Step 1: Append the "why" section after the hero**

In `src/components/pages/AboutPage.astro`, locate the closing `</section>` of the hero and add the following two sections immediately after it, still inside `<div class="page-wrapper">`:

```astro
  <!-- SECTION: Why we built Authgear -->
  <section class="ds-section ds-bg-light-blue">
    <div class="ds-container">
      <div class="title-content">
        <p class="ds-section-eyebrow">{t(locale, 'About.whyEyebrow')}</p>
        <h2 class="heading-on-light">{t(locale, 'About.whyTitle')}</h2>
      </div>
      <div class="about-why__prose">
        <p class="section-lede-on-light">{t(locale, 'About.whyP1')}</p>
        <p class="section-lede-on-light">{t(locale, 'About.whyP2')}</p>
        <p class="section-lede-on-light">{t(locale, 'About.whyP3')}</p>
      </div>
    </div>
  </section>

  <!-- SECTION: Product principles -->
  <section class="ds-section">
    <div class="ds-container">
      <div class="title-content">
        <h2 class="heading-on-light">{t(locale, 'About.principlesTitle')}</h2>
      </div>
      <div class="ds-grid-4">
        <div class="svg-card">
          <div class="ds-svg-card-content">
            <div class="ds-svg-card-title">{t(locale, 'About.principles1Title')}</div>
            <div class="ds-svg-card-description">{t(locale, 'About.principles1Desc')}</div>
          </div>
        </div>
        <div class="svg-card">
          <div class="ds-svg-card-content">
            <div class="ds-svg-card-title">{t(locale, 'About.principles2Title')}</div>
            <div class="ds-svg-card-description">{t(locale, 'About.principles2Desc')}</div>
          </div>
        </div>
        <div class="svg-card">
          <div class="ds-svg-card-content">
            <div class="ds-svg-card-title">{t(locale, 'About.principles3Title')}</div>
            <div class="ds-svg-card-description">{t(locale, 'About.principles3Desc')}</div>
          </div>
        </div>
        <div class="svg-card">
          <div class="ds-svg-card-content">
            <div class="ds-svg-card-title">{t(locale, 'About.principles4Title')}</div>
            <div class="ds-svg-card-description">{t(locale, 'About.principles4Desc')}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append a small scoped style for `.about-why__prose`**

At the very end of the file (after the final `</div>`), add:

```astro

<style>
  .about-why__prose {
    max-width: 820px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    text-align: center;
  }
</style>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: "Complete!"

- [ ] **Step 4: Manual spot-check**

`npm run dev`, open `/about`. Expected below the hero:
1. Light-blue band with "Why Authgear" eyebrow + "Why we built Authgear" heading + 3 centered paragraphs.
2. White band with "How Authgear is different" heading + 4-card row (wraps on narrow viewports).

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/pages/AboutPage.astro
git commit -m "feat(about): add Why + Principles sections

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2c: Add company snapshot + customer proof sections

**Files:**
- Modify: `src/components/pages/AboutPage.astro`

- [ ] **Step 1: Append the two sections after the principles section**

After the principles `</section>` (and still inside the `<div class="page-wrapper">`), add:

```astro
  <!-- SECTION: Company snapshot -->
  <section class="ds-section ds-bg-light-blue">
    <div class="ds-container">
      <div class="title-content">
        <h2 class="heading-on-light">{t(locale, 'About.snapshotTitle')}</h2>
      </div>
      <p class="about-snapshot__line">{t(locale, 'About.snapshotLine')}</p>
      <div class="about-snapshot__badges">
        <img
          src="/images/Authgear_footer_certificated_blue2x.png"
          alt="ISO 27001 and SoC 2 Type II certified"
          class="about-snapshot__badge"
          loading="lazy"
        />
        <a
          href="https://fidoalliance.org/passkeypledge/"
          target="_blank"
          rel="noopener noreferrer"
          class="about-snapshot__badge-link"
          aria-label="Passkey Pledge Partner"
        >
          <img
            src="/images/PasskeyPledge_color.png"
            alt="Passkey Pledge Partner"
            class="about-snapshot__badge"
            loading="lazy"
          />
        </a>
        <img
          src="/images/1111.png"
          alt="Microsoft Azure"
          class="about-snapshot__cloud-logo"
          loading="lazy"
        />
        <img
          src="/images/gcp.png"
          alt="Google Cloud"
          class="about-snapshot__cloud-logo"
          loading="lazy"
        />
      </div>
    </div>
  </section>

  <!-- SECTION: Customer proof -->
  <section class="ds-section">
    <div class="ds-container">
      <div class="title-content">
        <h2 class="heading-on-light">{t(locale, 'About.customersTitle')}</h2>
      </div>
      <div class="about-logo-wall" role="list">
        {logoWall.map((story) => (
          story.logo && (
            <a
              href={localizedPath(locale, `/customer-stories/${story.slug}`)}
              class="about-logo-wall__item"
              role="listitem"
              aria-label={story.title}
            >
              <Image
                src={story.logo}
                alt={story.title}
                width={160}
                class="about-logo-wall__img"
                loading="lazy"
              />
            </a>
          )
        ))}
      </div>
      <div class="_2-card-grid">
        {featuredCases.map((story) => (
          <div class="solution-case-study-card">
            <Image
              src={story.thumbnail}
              alt={story.title}
              width={624}
              class="solution-case-study-card-thumb"
              loading="lazy"
              sizes="(max-width: 767px) 100vw, 624px"
            />
            <div class="solution-case-study-card-text">
              <div class="ds-svg-card-content">
                <h3 class="ds-svg-card-title">{t(locale, story.titleKey)}</h3>
                <a href={localizedPath(locale, `/customer-stories/${story.slug}`)} class="ds-btn ds-btn-secondary">
                  {t(locale, story.ctaKey)}
                  <svg class="ds-btn__icon-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Extend the `<style>` block at the bottom of the file**

Replace the existing `<style>` block with:

```astro
<style>
  .about-why__prose {
    max-width: 820px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    text-align: center;
  }
  .about-snapshot__line {
    max-width: 960px;
    margin: 1.5rem auto 2rem;
    text-align: center;
    color: #3e4f6f;
    font-size: 1.0625rem;
    line-height: 1.6;
  }
  .about-snapshot__badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 1rem;
  }
  .about-snapshot__badge {
    height: 72px;
    width: auto;
  }
  .about-snapshot__cloud-logo {
    height: 40px;
    width: auto;
    opacity: 0.85;
  }
  .about-snapshot__badge-link {
    display: inline-flex;
    align-items: center;
  }
  .about-logo-wall {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem 2rem;
    align-items: center;
    justify-items: center;
    margin: 2rem 0 3rem;
  }
  .about-logo-wall__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
  .about-logo-wall__img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    filter: grayscale(1);
    opacity: 0.7;
    transition: filter 0.2s ease, opacity 0.2s ease;
  }
  .about-logo-wall__item:hover .about-logo-wall__img {
    filter: grayscale(0);
    opacity: 1;
  }
  @media (max-width: 991px) {
    .about-logo-wall {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 479px) {
    .about-logo-wall {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: "Complete!" If the build warns about an unresolved image import for a missing logo, double-check that `src/content/customer-stories/en/{slug}/logo.png` exists for every slug in `logoWallSlugs`. The `story.logo &&` guard should keep the filter safe either way.

- [ ] **Step 4: Manual spot-check**

`npm run dev`, open `/about`. Expected below the principles:
1. Light-blue band with snapshot heading, one-line fact strip, compliance badges + Azure + GCP logos inline.
2. White band with "Teams building on Authgear" heading, a 6-logo wall (grayscale; colors up on hover), and 2 case-study cards underneath.

Narrow the window to ~700px and confirm the logo wall collapses to 3 columns, and to ~400px for 2 columns.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/pages/AboutPage.astro
git commit -m "feat(about): add company snapshot + customer proof sections

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2d: Add footer-form CTA + close `<div class="page-wrapper">`

**Files:**
- Modify: `src/components/pages/AboutPage.astro`

- [ ] **Step 1: Append the footer CTA inside `page-wrapper`**

Before the closing `</div>` of `<div class="page-wrapper">`, add:

```astro
  <!-- SECTION: Footer Form -->
  <div class="footer-form-section form__bg-dark">
    <div class="container-default">
      <div class="container-default-inner px-0">
        <div class="_2-block-flex footer-form">
          <div class="_2-block-flex-content footer-form">
            <div class="_2-block-flex-content-text-wrap footer-form">
              <h2 class="form-heading color-white footer-form">{t(locale, 'About.footerTitle')}</h2>
              <div class="footerform__divider-sm"></div>
              <div class="color-white footer-get-started-text">{t(locale, 'About.footerBody')}</div>
            </div>
          </div>
          <div class="_2-block-flex-image footer-form">
            <ContactForm client:load />
          </div>
        </div>
      </div>
    </div>
  </div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: "Complete!"

- [ ] **Step 3: Full-page manual check**

`npm run dev`, open both `/about` and `/zh-TW/about`. Scroll from top to bottom, confirm all six sections render in order:
1. Hero (dark)
2. Why Authgear (light blue)
3. Principles grid (white, 4 cards)
4. Company snapshot (light blue, text + 4 logos)
5. Customer proof (white, 6-logo wall + 2 case cards)
6. Footer form (dark, with ContactForm)

Submit test: the ContactForm renders (no need to submit — that's covered by its own tests).

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/pages/AboutPage.astro
git commit -m "feat(about): add footer-form CTA — redesign complete

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Remove obsolete `About.*` i18n keys

Now that the component references only the new keys, the 13 legacy keys can go.

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh-TW.json`

- [ ] **Step 1: Confirm no consumers remain**

Run:

```bash
grep -rn "About\.heroHeading\|About\.heroParagraph\|About\.heroImageAlt\|About\.teamHeading\|About\.teamSubheading\|About\.joinUsButton\|About\.partnersHeading\|About\.ctaGetStartedHeading\|About\.ctaGetStartedBody\|About\.ctaGetStartedLink\|About\.ctaSalesHeading\|About\.ctaSalesBody\|About\.ctaSalesLink" src/
```

Expected output: only hits inside `src/i18n/en.json` and `src/i18n/zh-TW.json`. If `AboutPage.astro` or any other source file shows up, stop — the component still references a legacy key. Fix before continuing.

- [ ] **Step 2: Remove the keys from `src/i18n/en.json`**

Inside the `"About"` block, delete these lines:

```
    "heroHeading": "About Us",
    "heroParagraph": "Authgear is the flagship product of <skymakerLink>SkyMakers</skymakerLink>. <br></br>We have been serving various Enterprises and Startups in the UK, Canada, US, Hong Kong and Taiwan since 2009.<br></br><br></br>Our mission, is to help developers to build better, more secure, privacy-aware software with our open sources technologies.",
    "heroImageAlt": "zoom call with authgear team",
    "teamHeading": "The team behind Authgear",
    "teamSubheading": "Our team work remotely from different parts of the world",
    "joinUsButton": "Join us",
    "partnersHeading": "Our Partners",
    "ctaGetStartedHeading": "Get Started for free",
    "ctaGetStartedBody": "Authgear.com is free for apps unlimited MAUs (Monthly Active Users) with Authgear branding. It is also open source and always free!",
    "ctaGetStartedLink": "Get Started",
    "ctaSalesHeading": "Talk with our sales team",
    "ctaSalesBody": "If you are looking for volume discounts, custom support plans, SLA, or have a different compliance requirements, feel free to contact us!",
    "ctaSalesLink": "Contact Us",
```

Also tighten `About.title` and `About.description`:

Replace:

```
    "title": "About Us - Authgear",
    "description": "Help developers to build better, more secure, privacy-aware software. Add secure and user friendly authentication and user management to your web & mobile apps in minutes.",
```

With:

```
    "title": "About Authgear — open-source CIAM built to last",
    "description": "Authgear is the open-source CIAM platform built for teams who can't afford to re-platform their auth stack every time a vendor gets acquired. Built by SkyMakers, serving Asia since 2009.",
```

- [ ] **Step 3: Mirror the same changes in `src/i18n/zh-TW.json`**

Delete the same 13 legacy key lines, and replace `title` + `description` with:

```
    "title": "關於 Authgear——持久的開源 CIAM",
    "description": "Authgear 是為「不想每次供應商被併購就重建身份驗證系統的團隊」打造的開源 CIAM 平台。由 SkyMakers 打造,自 2009 年起服務亞洲各地客戶。",
```

- [ ] **Step 4: Verify JSON still valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json'))" && \
node -e "JSON.parse(require('fs').readFileSync('src/i18n/zh-TW.json'))" && \
echo OK
```

Expected: `OK`.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: "Complete!"

- [ ] **Step 6: Commit**

```bash
git add src/i18n/en.json src/i18n/zh-TW.json
git commit -m "chore(about): remove obsolete About.* i18n keys

Drop 13 legacy keys referenced only by the old Webflow About page
(heroHeading, heroParagraph, heroImageAlt, team*, joinUsButton,
partnersHeading, ctaGetStarted*, ctaSales*). Also updates title +
description to match the new page.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Delete the orphan zoom-call photo + push

**Files:**
- Delete: `public/images/Lessons-Working-Remotely-in-the-Time-of-Coronavirus-5.png`

- [ ] **Step 1: Confirm no remaining references**

```bash
grep -rn "Lessons-Working-Remotely-in-the-Time-of-Coronavirus-5" src/ public/ 2>/dev/null
```

Expected: no output (file is not referenced anywhere after the rewrite).

If any references appear, stop and inspect them before deleting.

- [ ] **Step 2: Delete the file**

```bash
rm public/images/Lessons-Working-Remotely-in-the-Time-of-Coronavirus-5.png
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: "Complete!"

- [ ] **Step 4: Commit and push**

```bash
git add -A public/images
git commit -m "chore(about): remove orphan zoom-call hero photo

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin main
```

- [ ] **Step 5: Final smoke check after deploy (Fly.io auto-deploy)**

Wait for the staging deploy, then open `https://authgear-web-staging.fly.dev/about` and confirm the new page renders without broken images or missing sections.

---

## Rollback

If anything goes wrong after merge, revert the specific commit(s):

```bash
git revert <commit-sha>          # for a targeted rollback
git revert <oldest>..<newest>    # to revert a range
```

Because each task above is its own commit, you can selectively revert (e.g. only Task 4) without losing the i18n work.

## Self-review notes (author)

1. **Spec coverage.** Every spec section → a task:
   - Hero → 2a
   - Why narrative → 2b (first half)
   - Principles grid → 2b (second half)
   - Company snapshot → 2c (first half)
   - Customer proof → 2c (second half)
   - Footer form → 2d
   - i18n add → Task 1
   - i18n remove → Task 3
   - Old image cleanup → Task 4
   - Open questions resolved in the spec doc before this plan was written.
2. **Placeholders:** No TBDs, TODOs, or "implement later" strings in any step.
3. **Type consistency:** `logoWallSlugs` / `featuredCaseSlugs` names are used consistently; `story.titleKey` / `story.ctaKey` match the `About.caseStudy1Title`/`About.caseStudy2Title` keys added in Task 1.
4. **File paths:** Every step names exact paths.
5. **Verification:** Every task ends in `npm run build` + (where relevant) a `npm run dev` spot-check + a commit.
