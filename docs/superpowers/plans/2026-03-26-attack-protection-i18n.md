# Attack Protection Page i18n Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract all hardcoded English strings from `AttackProtectionPage.tsx` into `next-intl` message files and update the component to read translations dynamically based on the active locale.

**Architecture:** Add an `AttackProtection` namespace to both `messages/en.json` and `messages/zh-TW.json`. Update the component to call `useTranslations('AttackProtection')` for page-specific copy and `useTranslations('Features')` for the four shared CTA strings that already exist. Locale is injected automatically via the `x-locale` request header (set by `frontend/proxy.ts`) — the component's `locale` prop is unrelated to `useTranslations` and is kept for structural consistency.

**Tech Stack:** next-intl (already installed), TypeScript, React Server Components

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `frontend/messages/en.json` | Modify | Add `AttackProtection` namespace with English strings |
| `frontend/messages/zh-TW.json` | Modify | Add `AttackProtection` namespace with Traditional Chinese strings |
| `frontend/components/pages/features/AttackProtectionPage.tsx` | Modify | Replace hardcoded strings with `useTranslations` calls |

---

### Task 1: Add English messages

**Files:**
- Modify: `frontend/messages/en.json` (after line 227, following the `Features` block)

- [ ] **Step 1: Insert `AttackProtection` namespace into `en.json`**

Open `frontend/messages/en.json`. After the closing `}` of the `"Features"` block (currently ends at line 227), insert:

```json
  "AttackProtection": {
    "heroSmallTitle": "Attack Protection",
    "heroTitle": "Fortify Your Business with Unbreakable Identity Security",
    "heroDescription": "Stop fraud, block bots, and protect every authentication flow automatically.",
    "feature1Title": "Bot Detection & CAPTCHA Protection",
    "feature1Description": "Detect and block automated sign-ups and brute-force attempts using CAPTCHAs, JA4 fingerprinting, and proof-of-work challenges",
    "feature2Title": "Phishing-Resistant Authentication",
    "feature2Description": "Passkey and WebAuthn support ensure only legitimate users can log in, protecting against phishing attacks.",
    "feature3Title": "Multi-Factor Authentication (MFA)",
    "feature3Description": "Add another layer of defense with flexible MFA options",
    "feature4Title": "IP and Country Blocklist",
    "feature4Description": "Block or throttle traffic from high-risk geographies and IP ranges to stop abuse before it starts.",
    "feature5Title": "Account Lockout Policies",
    "feature5Description": "Prevent brute-force attacks with configurable lockout thresholds and timed re-enablement.",
    "feature6Title": "Rate Limits",
    "feature6Description": "Protect your APIs and login flows from spamming and enumeration with per-action, per-user, or per-IP rate limits.",
    "feature7Title": "Breached Password Detection",
    "feature7Description": "Stop users from using compromised credentials. Detect and require reset when a password appears in public breach datasets.",
    "feature8Title": "SMS Pumping Protection",
    "feature8Description": "Detect and stop automated SMS fraud in real time. Authgear analyzes OTP traffic for unusual patterns, blocks suspicious activity automatically, and alerts admins instantly.",
    "valuesSectionTitle": "Protect your apps and users",
    "value1": "Prevent losses from SMS fraud and automated abuse",
    "value2": "Protect user trust with phishing-resistant, frictionless authentication",
    "value3": "Reduce operational load automated detection and response means fewer manual interventions",
    "value4": "Scale securely flexible policies adapt to traffic spikes without blocking real users",
    "builtForTitle": "Built for Developers & Security Teams",
    "builtForDescription": "Plug it in once, protect everywhere. Authgear's SDKs and APIs make it simple to deploy robust protection across your apps.",
    "ctaTitle": "Ready to transform your authentication experience?",
    "ctaDescription": "Ready to explore Authgear? Request a demo today!",
    "freePlanIncludes": "Free plan includes",
    "unlimitedMAUs": "unlimited MAUs"
  },
```

The surrounding context to locate insertion point:

```json
  "Features": {
    "startForFree": "Start for Free",
    "getDemo": "Get a Demo",
    "scheduleDemo": "Schedule Demo",
    "freePlanDescription": "Free plan includes unlimited MAUs"
  },
  "AttackProtection": {          ← INSERT HERE
    ...
  },
  "Compare": {                   ← already exists, comes next
```

- [ ] **Step 2: Verify JSON is valid**

```bash
cd frontend && node -e "require('./messages/en.json'); console.log('valid')"
```

Expected output: `valid`

- [ ] **Step 3: Commit**

```bash
cd frontend && git add messages/en.json
git commit -m "i18n: add AttackProtection namespace to en.json"
```

---

### Task 2: Add Traditional Chinese messages

**Files:**
- Modify: `frontend/messages/zh-TW.json` (same position as Task 1 — after the `Features` block)

- [ ] **Step 1: Insert `AttackProtection` namespace into `zh-TW.json`**

Same insertion point as `en.json` (after the `Features` block, before `Compare`):

```json
  "AttackProtection": {
    "heroSmallTitle": "攻擊防護",
    "heroTitle": "以無懈可擊的身份安全強化您的業務",
    "heroDescription": "自動阻止詐騙、封鎖機器人，保護每個驗證流程。",
    "feature1Title": "機器人偵測與 CAPTCHA 防護",
    "feature1Description": "使用 CAPTCHA、JA4 指紋識別和工作量證明挑戰，偵測並封鎖自動化注冊和暴力破解嘗試",
    "feature2Title": "防釣魚驗證",
    "feature2Description": "Passkey 和 WebAuthn 支援確保只有合法用戶可以登入，防止釣魚攻擊。",
    "feature3Title": "多重要素驗證 (MFA)",
    "feature3Description": "透過靈活的 MFA 選項增加額外的防禦層",
    "feature4Title": "IP 和國家封鎖清單",
    "feature4Description": "封鎖或限制來自高風險地區和 IP 範圍的流量，在濫用發生前阻止。",
    "feature5Title": "帳戶鎖定政策",
    "feature5Description": "透過可設定的鎖定閾值和定時重新啟用防止暴力破解攻擊。",
    "feature6Title": "速率限制",
    "feature6Description": "透過每個操作、每個用戶或每個 IP 的速率限制，保護您的 API 和登入流程免受垃圾郵件和枚舉攻擊。",
    "feature7Title": "洩露密碼偵測",
    "feature7Description": "阻止用戶使用已洩露的憑證。當密碼出現在公開洩露資料集中時偵測並要求重設。",
    "feature8Title": "SMS 詐騙防護",
    "feature8Description": "即時偵測並阻止自動化 SMS 詐騙。Authgear 分析 OTP 流量中的異常模式，自動封鎖可疑活動，並立即提醒管理員。",
    "valuesSectionTitle": "保護您的應用程式和用戶",
    "value1": "防止 SMS 詐騙和自動化濫用造成的損失",
    "value2": "透過防釣魚、無摩擦的驗證保護用戶信任",
    "value3": "減少運營負擔，自動化偵測和回應意味著更少的人工干預",
    "value4": "安全擴展，靈活的政策可適應流量峰值而不阻塞真實用戶",
    "builtForTitle": "專為開發人員和安全團隊打造",
    "builtForDescription": "一次整合，全面保護。Authgear 的 SDK 和 API 讓您輕鬆在所有應用程式中部署強大的防護。",
    "ctaTitle": "準備好改變您的驗證體驗了嗎？",
    "ctaDescription": "準備好探索 Authgear 了嗎？立即申請演示！",
    "freePlanIncludes": "免費方案包含",
    "unlimitedMAUs": "無限 MAU"
  },
```

- [ ] **Step 2: Verify JSON is valid**

```bash
cd frontend && node -e "require('./messages/zh-TW.json'); console.log('valid')"
```

Expected output: `valid`

- [ ] **Step 3: Commit**

```bash
cd frontend && git add messages/zh-TW.json
git commit -m "i18n: add AttackProtection namespace to zh-TW.json"
```

---

### Task 3: Update component to use translations

**Files:**
- Modify: `frontend/components/pages/features/AttackProtectionPage.tsx`

- [ ] **Step 1: Replace the full component file**

Replace the entire contents of `frontend/components/pages/features/AttackProtectionPage.tsx` with:

```tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function AttackProtectionPage(_props: Props) {
  const t = useTranslations('AttackProtection');
  const tFeatures = useTranslations('Features');
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">{t('heroSmallTitle')}</div>
        <h1 className="title features-hero-v2 text-white">{t('heroTitle')}</h1>
        <p className="features-hero-description text-purple">{t('heroDescription')}</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">{tFeatures('getDemo')}  -{`>`}</Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">{t('freePlanIncludes')} <span className="features-hero-cta-description-bold text-white">{t('unlimitedMAUs')}</span></p>
          </div>
        </div>
      </div><img src="/images/features-attackprotection-banner-kv2x.webp" sizes="(max-width: 767px) 100vw, 738px" width={738} alt="" srcSet="/images/features-attackprotection-banner-kv2x-p-500.webp 500w, /images/features-attackprotection-banner-kv2x-p-800.webp 800w, /images/features-attackprotection-banner-kv2x-p-1080.webp 1080w, /images/features-attackprotection-banner-kv2x.webp 1244w" className="image features-hero-image-v2" />
    </div>
  </div>
  <section>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-01-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature1Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature1Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-02-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature2Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature2Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-03-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature3Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature3Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-04-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature4Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature4Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-05-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature5Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature5Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-06-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature6Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature6Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-07-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature7Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature7Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-08-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature8Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature8Description')}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60 top-content-title-only">
          <h2 className="title features-page-v2">{t('valuesSectionTitle')}</h2>
        </div>
        <div className="_2-card-grid gap-32 mb-40 _2-rows">
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e551a-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value1')}</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e5522-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value2')}</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e552a-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-03.svg" loading="lazy" width={48} alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value3')}</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e5532-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value4')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0"></div>
      <div className="w-layout-hflex features-attack-protection">
        <div className="split-content-right-only">
          <p className="features-attack-protection-built-for-title">{t('builtForTitle')}</p>
          <p className="features-attack-protection-built-for-description">{t('builtForDescription')}</p>
        </div>
      </div>
    </div>
  </section>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">{t('ctaTitle')}</h2>
          <div className="text-block-46">{t('ctaDescription')}</div>
        </div>
        <div className="footer-section-none-form-cta-wrap">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="footer-section-none-form-button w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" className="footer-section-none-form-button inverse w-button">{tFeatures('getDemo')}</Link>
        </div>
        <div className="w-layout-hflex footer-section-none-form-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
          <p className="footer-section-none-form-cta-description">{t('freePlanIncludes')} <span className="text-span-45">{t('unlimitedMAUs')}</span></p>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
```

- [ ] **Step 2: Check for TypeScript errors**

```bash
cd frontend && npx tsc --noEmit 2>&1 | grep AttackProtection
```

Expected output: *(empty — no errors)*

- [ ] **Step 3: Commit**

```bash
cd frontend && git add components/pages/features/AttackProtectionPage.tsx
git commit -m "feat: i18n AttackProtectionPage — use next-intl translations"
```

---

### Task 4: Verify end-to-end

- [ ] **Step 1: Start the dev server (if not already running)**

```bash
cd frontend && npm run dev
```

- [ ] **Step 2: Check English page renders correctly**

Visit `http://localhost:3000/features/attack-protection`

Expected: Page renders with English copy — "Attack Protection", "Fortify Your Business with Unbreakable Identity Security", etc.

- [ ] **Step 3: Check Traditional Chinese page renders correctly**

Visit `http://localhost:3000/zh-TW/features/attack-protection`

Expected: Page renders with Traditional Chinese copy — "攻擊防護", "以無懈可擊的身份安全強化您的業務", etc.

- [ ] **Step 4: Push**

```bash
git push
```
