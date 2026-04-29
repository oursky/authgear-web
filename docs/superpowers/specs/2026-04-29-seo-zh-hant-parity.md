# SEO i18n Parity Audit: zh-Hant Translations for Page-Level Title & Description

## Overview

This audit identifies all page-level `title` and `description` i18n keys used by `BaseLayout.astro` for SEO metadata (HTML `<title>`, `<meta name="description">`, OG, and Twitter tags). The `t(locale, 'Key.path')` helper in `src/i18n/index.ts` falls back **silently** to the English value when a key is missing or non-string in `zh-Hant.json`—meaning untranslated pages ship as English copy on `/zh-Hant/<page>` without any build-time warning.

This audit surfaces those gaps so they can be prioritized for translation or deprecation.

---

## MISSING Keys

Keys absent from `zh-Hant.json` entirely — the `t()` helper will silently fall back to English.

| Key | English Value | Route(s) Affected |
|-----|---------------|-------------------|
| `AuthToolkit.description` | Auth Developer Mini-Toolkit | `/auth-toolkit` |
| `DataPrivacy.description` | (missing in English, likely legacy) | `/data-privacy` |
| `Policy.description` | (missing in English, likely legacy) | `/policy` |
| `Security.description` | (missing in English, likely legacy) | `/security` |
| `Sla.description` | (missing in English, likely legacy) | `/sla` |
| `Terms.description` | (missing in English, likely legacy) | `/terms` |
| `TermsEnterprise.description` | (missing in English, likely legacy) | `/terms-of-enterprise-license` |

**Count:** 7 MISSING

---

## UNTRANSLATED Keys

Keys present in `zh-Hant.json` but with byte-identical values to English — these are stub translations that shipped as English copy.

| Key | English Value | Route(s) Affected |
|-----|---------------|-------------------|
| `AuthToolkit.title` | Auth Developer Mini-Toolkit | `/auth-toolkit` |
| `DataPrivacy.title` | Privacy Policy - Authgear | `/data-privacy` |
| `Policy.title` | Acceptable Use Policy - Authgear | `/policy` |
| `Security.title` | Security - Authgear | `/security` |
| `Sla.title` | Service Level Agreement - Authgear | `/sla` |
| `Terms.title` | Terms of Services - Authgear | `/terms` |
| `TermsEnterprise.title` | Enterprise Subscription Terms - Authgear | `/terms-of-enterprise-license` |

**Count:** 7 UNTRANSLATED (stubs)

---

## PARTIAL Keys

Keys with identical alphanumeric content and only minor punctuation/whitespace differences. Typically brand names or short identifiers that require no translation. These are safe to ignore.

| Key | English Value | Note |
|-----|---------------|------|
| (None found) | — | All variations have substantive differences |

**Count:** 0 PARTIAL

---

## OK Keys

Keys with complete, distinct translations in `zh-Hant.json`.

| Key | EN Snippet | ZH Snippet |
|-----|-----------|-----------|
| `About.title` | About Authgear — open-source... | 關於 Authgear——持久的開源... |
| `About.description` | Authgear is the open-source CIAM... | Authgear 是為「不想每次供應商被併購... |
| `Blog.title` | Resource Center | 資源中心 |
| `Blog.subtitle` | Stay updated with the latest... | 掌握最新最佳實務、產品更新與專家觀點... |
| `CustomerStories.subtitle` | Power ambitious teams to build... | 加速團隊開發效率。Authgear 處理繁瑣... |
| `Glossary.title` | Glossary - Authgear | 名詞解釋 - Authgear |
| `Glossary.description` | Decode identity, authentication... | 快速掌握身分、驗證與安全存取相關概念... |
| `LoginGalleryIndex.metaTitle` | Login Gallery | 登入頁體驗展示 |
| `LoginGalleryIndex.metaDescription` | Build login experiences that match... | 打造符合品牌、提升轉換的登入體驗... |
| `MigrateToAuthgear.title` | Migrate to Authgear: Get 6 Months... | 遷移至 Authgear：享有 6 個月免費試用... |
| `MigrateToAuthgear.description` | Stop struggling with your current... | 告別現有認證系統的困擾。遷移至 Authgear... |
| `Once.title` | Authgear ONCE – Own Your IAM... | Authgear ONCE – 買斷授權，自主掌握 IAM |
| `Once.description` | Self-hosted IAM with a perpetual... | 以買斷授權自建 IAM——Authgear ONCE... |
| `Pricing.metaTitle` | Pricing - Authgear | 定價 - Authgear |
| `Pricing.metaDescription` | Authentication and authorization... | 為您的應用程式與 API 提供驗證與授權... |
| `Promises.title` | Authgear Promises | Authgear 的承諾 |
| `Promises.description` | The commitments we make to every... | 我們對每一位 Authgear 客戶所做的承諾... |
| `ScheduleDemo.title` | Schedule a Demo — Authgear | 預約展示 — Authgear |
| `ScheduleDemo.description` | Request a personalized Authgear... | 預約 Authgear 個人化展示，了解安全存取... |
| `Seo.home.title` | Authgear CLOUD — Your Managed... | Authgear CLOUD — 為您託管的 IAM 解決方案 |
| `Seo.home.description` | Authgear makes it easier for... | Authgear 讓開發者更輕鬆地滿足複雜... |
| `WhatsNew.title` | What's New | 最新消息 |
| `WhatsNew.subtitle` | Latest updates, releases, and... | 掌握 Authgear 團隊的最新更新、版本發布... |

**Count:** 24 OK

---

## Meta-Map Files (Not i18n-driven)

The following files export English-only metadata objects used by dynamic pages. They have no i18n translations and require separate follow-up to add Chinese support.

### featuresMeta
**Location:** `src/lib/features-meta.ts`  
**Count:** 12 entries  
**Examples:** `attack-protection`, `authentication`, `authorization`, `biometric-authentication`, `customization`, `extensibility`, `machine-to-machine-token`, `multi-factor-authentication`, `passwordless`, `passkeys`, `self-serve-settings`, `social-login`, `user-management`  
**Impact:** Used by `/features/<slug>` and `/zh-Hant/features/<slug>` routes. Currently ships English `title` and `description` on all locale variants.

### solutionsMeta
**Location:** `src/lib/solutions-meta.ts`  
**Count:** 7 entries  
**Examples:** `b2b-saas-authentication`, `ciam-solution`, `customer-identity-and-access-management`, `enterprise-sso`, `external-identity-access-management`, `frontline-workers-identity`, `reduce-sms-otp-cost`  
**Impact:** Used by `/solutions/<slug>` and `/zh-Hant/solutions/<slug>` routes. Currently ships English `title` and `description` on all locale variants.

---

## Summary Table

| Category | Count |
|----------|-------|
| **MISSING** | 7 |
| **UNTRANSLATED** (stub copy) | 7 |
| **PARTIAL** | 0 |
| **OK** (fully translated) | 24 |
| **Meta-map entries** (not i18n) | 19 (12 + 7) |
| **Total page-level keys audited** | 38 |

---

## Recommended Next Steps

1. **Translate the 7 UNTRANSLATED keys** (highest impact for user trust & SEO)
   - These are legal/policy pages: `Terms.title`, `TermsEnterprise.title`, `Policy.title`, `Security.title`, `Sla.title`, `DataPrivacy.title`, `AuthToolkit.title`
   - Currently showing English copy to zh-Hant users despite having stub translations
   - Impacts routes: `/terms`, `/terms-of-enterprise-license`, `/policy`, `/security`, `/sla`, `/data-privacy`, `/auth-toolkit`

2. **Add 7 MISSING descriptions** (these keys exist only in page code, not in i18n yet)
   - Coordinate with translation team to determine whether these pages should have zh-Hant translations at all
   - If yes: create translations for `AuthToolkit.description` + 6 legal/policy descriptions
   - If no: remove the `t()` call from page code and use English-only hardcoded strings

3. **Localize featuresMeta & solutionsMeta objects**
   - 19 metadata entries currently English-only
   - Refactor both files to support locale-specific title/description (move to i18n)
   - Affects `/features/*` and `/solutions/*` routes and their zh-Hant equivalents

4. **Add pre-merge build check**
   - Implement a build-time verification that flags any `t(locale, 'Key')` where the value is either missing in zh-Hant or identical to English
   - Prevents silent fallback regressions in future PRs

5. **Review dynamic compare pages**
   - `/compare/[slug]` uses dynamic namespace keys (`${entry.namespace}.metaTitle`, `Tools.${prefix}.metaDescription`)
   - Audit whether all possible dynamically-generated keys have zh-Hant translations
   - May require a similar report for comparison pages

---

**Report generated:** 2026-04-29  
**Branch:** feat/seo-og-sitewide  
**Audit scope:** Page-level SEO metadata (`title`, `description` props to `BaseLayout`)  
**Methodology:** Static grep of `src/pages/**/*.astro` + programmatic JSON key lookup in `en.json` and `zh-Hant.json`
