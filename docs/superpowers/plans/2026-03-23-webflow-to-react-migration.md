# Webflow → React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the `authgear-new.webflow/` directory entirely by converting every Webflow HTML file it contains into a native React/JSX component, with all user-visible strings extracted to `messages/` for i18n.

**Architecture:** Each Webflow HTML page becomes a React server component. The HTML body content is converted to JSX (class→className, self-closing tags, inline styles as objects). User-visible strings are extracted to the appropriate `messages/<locale>.json` namespace using next-intl `getTranslations()`. Webflow CSS stays in `frontend/public/css/` unchanged — only markup moves. Dynamic/slug-based pages (features, compare, solutions, etc.) become content-driven: their data moves to Strapi single-type or typed TS data files, rendered by a shared template component.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, next-intl (from Plan A), existing Webflow CSS classes

**Prerequisites:** Plan A (i18n infrastructure) must be complete before starting this plan.

---

## Scope

~70 HTML files across 8 section groups. The plan migrates them in groups of similar structure:

| Group | Files | Approach |
|-------|-------|----------|
| Root simple pages | ~16 HTML files | One component per page, JSX conversion |
| `features/` | 19 HTML files | Shared template + per-page data in TS |
| `compare/` | 4 HTML files | Shared template + per-page data in TS |
| `solutions/` | 7 HTML files | Shared template + per-page data in TS |
| `go/` | 8 HTML files | One component per page (landing pages, unique structure) |
| `events/` | 3 HTML files | One component per page |
| `campaign/` | 2 HTML files | One component per page |
| `tools/` | 9 HTML files | Shared layout + embedded interactive JS |

---

## Conversion Reference (read before every task)

### HTML → JSX rules
- `class="..."` → `className="..."`
- `for="..."` → `htmlFor="..."`
- Self-close void elements: `<img ...>` → `<img ... />`; `<br>` → `<br />`; `<input ...>` → `<input ... />`
- Boolean attributes: `checked` → `defaultChecked`, `selected` → `defaultValue`
- Inline styles: `style="color: red; font-size: 14px"` → `style={{ color: 'red', fontSize: '14px' }}`
- Remove `data-w-id`, `data-wf-*` attributes (Webflow internals — the CSS classes still work)
- Remove `<!-- HTML comment -->` blocks (optional, improves readability)
- `<a href="..."` with external URLs: add `target="_blank" rel="noreferrer"` if not present
- Internal links: use Next.js `<Link href="...">` instead of `<a href="...">`

### What to extract to messages
- Page `<title>` and `<meta name="description">` content → `generateMetadata` using `getTranslations`
- Any `<h1>`, `<h2>`, heading copy that could need translation
- Button/CTA labels, form labels, placeholder text
- Short descriptive text, taglines, section titles
- Do NOT extract: URLs, CSS class names, HTML attributes, image alt text referencing brand names

### What to keep as-is (no JSX changes needed)
- Webflow CSS class names
- `data-collapse`, `data-animation`, `data-duration` on nav wrappers (already in root layout)
- `loading="lazy"` attributes
- Lottie/JSON animation `data-src` attributes

### Image paths
Webflow exports use `../images/foo.png` or `images/foo.png`. These are already in `frontend/public/images/`. The `webflow-page.ts` loader rewrote them to `/images/foo.png`. In JSX, just use `/images/foo.png` directly.

### When to use `<Image>` vs `<img />`
- Use plain `<img ... />` for **layout/decorative images** whose dimensions are controlled by Webflow CSS classes (the vast majority of Webflow images).
- Use Next.js `<Image>` (from `next/image`) **only** for images sourced from Strapi or external CDNs where optimization is needed — those require explicit `width`/`height` or `fill` props.
- Do not import `Image` from `next/image` in a component unless you are actually using it.

### Scripts
Webflow pages contain `<script>` tags for page-specific behavior (e.g., FAQ accordion, pricing toggle). These should be extracted and handled via `PageScripts` component (already exists: `components/PageScripts.tsx`). Move inline script content to a `const pageScripts: string[]` and pass to `<PageScripts scripts={pageScripts} />` at the bottom of the component.

---

## File Structure

For each converted page:

| Action | Path |
|--------|------|
| Modify | `frontend/app/[locale]/<page>/page.tsx` — use new React component instead of `StaticWebflowPage` |
| Create | `frontend/components/pages/<page>.tsx` — the converted JSX component |
| Modify | `frontend/messages/en.json` — add page namespace |
| Modify | `frontend/messages/zh-TW.json` — add page namespace (translate values) |

For slug-based page groups (features, compare, solutions):

| Action | Path |
|--------|------|
| Create | `frontend/components/pages/<group>/[slug].tsx` — shared template component |
| Create | `frontend/lib/<group>/data.ts` — typed data for each slug |
| Modify | `frontend/app/[locale]/<group>/[slug]/page.tsx` — load data + render template |

---

### Task 1: Convert `about.html` — full reference example

This task is the complete reference. Every subsequent task follows this same pattern.

**Files:**
- Create: `frontend/components/pages/AboutPage.tsx`
- Modify: `frontend/app/[locale]/about/page.tsx`
- Modify: `frontend/messages/en.json`
- Modify: `frontend/messages/zh-TW.json`

- [ ] **Step 1: Read the source HTML file**

```bash
wc -l /Users/fung/dev/authgear-web/authgear-new.webflow/about.html
```

Open `authgear-new.webflow/about.html`. Identify:
- The `<title>` and `<meta name="description">` values
- The content between `<div class="page-wrapper">` and the footer (what `getWebflowPageBody()` currently extracts)
- Any `<script>` tags in the body that are not analytics/tracking
- Any inline `style=""` attributes that need conversion

- [ ] **Step 2: Create `frontend/components/pages/AboutPage.tsx`**

The component structure:

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PageScripts from '@/components/PageScripts';

// Any page-specific scripts extracted from the HTML:
const pageScripts: string[] = [
  // paste inline script contents here (filter out analytics, webflow IX2 init)
];

interface Props {
  locale: string;
}

export default async function AboutPage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <>
      <div className="page-wrapper">
        {/* Paste converted JSX here — apply HTML→JSX rules above */}
        {/* Replace hardcoded strings with t('key') */}
      </div>
      <PageScripts scripts={pageScripts} />
    </>
  );
}
```

Convert the extracted body HTML to JSX following the conversion rules above.

- [ ] **Step 3: Add `About` namespace to `messages/en.json`**

```json
"About": {
  "title": "<value from about.html <title>>",
  "description": "<value from meta description>",
  "heroHeading": "<h1 text>",
  "heroSubtitle": "<subtitle text>"
  // ... all other user-visible strings
}
```

- [ ] **Step 4: Add `About` namespace to `messages/zh-TW.json`**

Since `about.html` is English-only (no zh-TW variant), the zh-TW values are identical to English for now. Mark them with a `// TODO: translate` comment in the file, or duplicate the en values.

- [ ] **Step 5: Update `frontend/app/[locale]/about/page.tsx`**

```typescript
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutPage from '@/components/pages/AboutPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return { title: t('title'), description: t('description') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <AboutPage locale={locale} />;
}
```

- [ ] **Step 6: Run dev server and verify visually**

```bash
cd frontend && npm run dev
```

Open http://localhost:3000/about. Compare visually against the current page. Check:
- Layout matches
- Images load
- Links work (use browser inspector if needed)
- No console errors

Kill server.

- [ ] **Step 7: Verify build**

```bash
cd frontend && npm run build 2>&1 | grep -E "(error|Error|✓)"
```
Expected: no errors.

- [ ] **Step 8: Verify root-level about route has no remaining Webflow imports**

There is a root-level `frontend/app/about/page.tsx` (the non-locale version) in addition to `app/[locale]/about/page.tsx`. Check both:

```bash
grep -r "webflow-page\|StaticWebflowPage" frontend/app/about/ frontend/app/\[locale\]/about/
```
Expected: no output. If either file still imports from Webflow, update it to use the new `AboutPage` component.

Verify http://localhost:3000/about still resolves correctly (middleware rewrites to `/en/about`).

- [ ] **Step 9: Commit**

```bash
cd frontend && git add components/pages/AboutPage.tsx app/\[locale\]/about/page.tsx messages/en.json messages/zh-TW.json
git commit -m "feat(migrate): convert about page to React"
```

---

### Task 2: Convert simple root pages (no zh-TW variant)

Convert these pages using the exact same pattern as Task 1. Each needs its own component file and messages namespace.

**Pages to convert:**

| HTML file | Component | Messages namespace |
|-----------|-----------|-------------------|
| `ciam.html` | `CiamPage.tsx` | `Ciam` |
| `data-privacy.html` | `DataPrivacyPage.tsx` | `DataPrivacy` |
| `glossary.html` | `GlossaryPage.tsx` | `Glossary` |
| `migrate-to-authgear.html` | `MigrateToAuthgearPage.tsx` | `MigrateToAuthgear` |
| `once.html` | `OncePage.tsx` | `Once` |
| `policy.html` | `PolicyPage.tsx` | `Policy` |
| `promises.html` | `PromisesPage.tsx` | `Promises` |
| `schedule-demo.html` | `ScheduleDemoPage.tsx` | `ScheduleDemo` |
| `security.html` | `SecurityPage.tsx` | `Security` |
| `sla.html` | `SlaPage.tsx` | `Sla` |
| `terms.html` | `TermsPage.tsx` | `Terms` |
| `terms-of-enterprise-license.html` | `TermsEnterprisePage.tsx` | `TermsEnterprise` |
| `why-authgear.html` | `WhyAuthgearPage.tsx` | `WhyAuthgear` |
| `auth-toolkit.html` | `AuthToolkitPage.tsx` | `AuthToolkit` |

**For each page, do steps 1–9 from Task 1.**

- [ ] **Step 1: Convert `ciam.html` → `CiamPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 2: Commit** `feat(migrate): convert ciam page to React`
- [ ] **Step 3: Convert `data-privacy.html` → `DataPrivacyPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 4: Commit** `feat(migrate): convert data-privacy page to React`
- [ ] **Step 5: Convert `glossary.html` → `GlossaryPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 6: Commit** `feat(migrate): convert glossary page to React`
- [ ] **Step 7: Convert `migrate-to-authgear.html` → `MigrateToAuthgearPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 8: Commit** `feat(migrate): convert migrate-to-authgear page to React`
- [ ] **Step 9: Convert `once.html` → `OncePage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 10: Commit** `feat(migrate): convert once page to React`
- [ ] **Step 11: Convert `policy.html` → `PolicyPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 12: Commit** `feat(migrate): convert policy page to React`
- [ ] **Step 13: Convert `promises.html` → `PromisesPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 14: Commit** `feat(migrate): convert promises page to React`
- [ ] **Step 15: Convert `schedule-demo.html` → `ScheduleDemoPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 16: Commit** `feat(migrate): convert schedule-demo page to React`
- [ ] **Step 17: Convert `security.html` → `SecurityPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 18: Commit** `feat(migrate): convert security page to React`
- [ ] **Step 19: Convert `sla.html` → `SlaPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 20: Commit** `feat(migrate): convert sla page to React`
- [ ] **Step 21: Convert `terms.html` → `TermsPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 22: Commit** `feat(migrate): convert terms page to React`
- [ ] **Step 23: Convert `terms-of-enterprise-license.html` → `TermsEnterprisePage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 24: Commit** `feat(migrate): convert terms-of-enterprise-license page to React`
- [ ] **Step 25: Convert `why-authgear.html` → `WhyAuthgearPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 26: Commit** `feat(migrate): convert why-authgear page to React`
- [ ] **Step 27: Convert `auth-toolkit.html` → `AuthToolkitPage.tsx`** (+ messages + page.tsx update)
- [ ] **Step 28: Commit** `feat(migrate): convert auth-toolkit page to React`

---

### Task 3: Convert home page (has zh-TW variant)

The home page has `index.html` (English) and `zh-TW/index.html` (Traditional Chinese). Both must be converted to a single component using i18n.

**Files:**
- Create: `frontend/components/pages/HomePage.tsx`
- Modify: `frontend/app/[locale]/page.tsx`
- Modify: `frontend/messages/en.json` (add `Home` namespace — may already exist from Plan A Task 7)
- Modify: `frontend/messages/zh-TW.json`

- [ ] **Step 1: Read both HTML files side by side**

```bash
diff <(grep -o 'class="[^"]*"' authgear-new.webflow/index.html | sort -u) <(grep -o 'class="[^"]*"' authgear-new.webflow/zh-TW/index.html | sort -u) | head -30
```

Identify: are the two HTML files structurally identical with different text, or structurally different? If structurally similar, one component + i18n works. If different, create two components and conditionally render.

- [ ] **Step 2: Extract all zh-TW strings from `zh-TW/index.html` into `messages/zh-TW.json`**

Go through every `<h1>`, `<h2>`, button, label, tagline in `zh-TW/index.html`. Add each to `zh-TW.json` under `Home`.

- [ ] **Step 3: Create `frontend/components/pages/HomePage.tsx`**

Use en values for the JSX structure; replace strings with `t('key')`. Where zh-TW has different text, the translation system handles it.

- [ ] **Step 4: Update `frontend/app/[locale]/page.tsx`**

```typescript
import HomePage from '@/components/pages/HomePage';
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}
```

- [ ] **Step 5: Verify both `/` (en) and `/zh-TW` (zh-TW) render correctly**

```bash
cd frontend && npm run dev
```
Open http://localhost:3000 — English home.
Open http://localhost:3000/zh-TW — Chinese home.

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(migrate): convert home page to React with i18n"
```

---

### Task 4: Convert `features/` pages with shared template

19 feature pages share similar structure: hero, feature highlights, comparison table, CTA. Build one template component + data per slug.

**Files:**
- Create: `frontend/components/pages/features/FeaturePage.tsx` — shared template
- Create: `frontend/lib/features/data.ts` — typed data for all 19 slugs
- Modify: `frontend/app/[locale]/features/[slug]/page.tsx`
- Modify: `frontend/messages/en.json` (add `Features` namespace)
- Modify: `frontend/messages/zh-TW.json`

**Slugs:**
`attack-protection`, `authentication`, `authorization`, `biometric-authentication`, `biometric-login`, `customization`, `extensibility`, `identity-security`, `machine-to-machine-token`, `multi-factor-authentication`, `passkeys`, `passwordless-authentication`, `self-serve-settings-page`, `single-sign-on`, `sms-passcode`, `sms-pumping-fraud`, `social-login`, `user-management`, `whatsapp-otp`

- [ ] **Step 1: Audit 3 feature pages for structural similarity**

Read `features/authentication.html`, `features/passkeys.html`, `features/social-login.html`. Do they share the same top-level sections (hero + feature grid + CTA)? List which sections are common vs unique.

- [ ] **Step 2: Define the data type in `frontend/lib/features/data.ts`**

```typescript
export type FeaturePageData = {
  slug: string;
  title: string;          // page <title>
  metaDescription: string;
  heroHeading: string;
  heroSubtitle: string;
  heroImage: string;      // /images/... path
  // sections: add fields for each repeating content block
};

export const featuresData: Record<string, FeaturePageData> = {
  'authentication': {
    slug: 'authentication',
    title: 'Authentication - Authgear',
    // ... fill from authentication.html
  },
  // ... all 19 slugs
};
```

- [ ] **Step 3: Create `frontend/components/pages/features/FeaturePage.tsx`**

The template renders using `FeaturePageData`. Use `getTranslations('Features')` for shared UI strings (CTA labels, section headers that are the same across all feature pages).

- [ ] **Step 4: Update `frontend/app/[locale]/features/[slug]/page.tsx`**

```typescript
import { featuresData } from '@/lib/features/data';
import FeaturePage from '@/components/pages/features/FeaturePage';
import { LOCALES } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // Generate params for ALL locales, not just 'en' — otherwise zh-TW routes
  // are missing from the static build and fall back to dynamic rendering.
  return LOCALES.flatMap((locale) =>
    Object.keys(featuresData).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = featuresData[slug];
  if (!data) return {};
  return { title: data.title, description: data.metaDescription };
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const data = featuresData[slug];
  if (!data) notFound();
  return <FeaturePage data={data} locale={locale} />;
}
```

- [ ] **Step 5: Remove filesystem-based `generateStaticParams` from the old page**

The old version used `readdirSync(WEBFLOW_DIR/features)` — that goes away.

- [ ] **Step 6: Verify all 19 feature pages build**

```bash
cd frontend && npm run build 2>&1 | grep features
```
Expected: all 19 slugs appear in the route table.

- [ ] **Step 7: Commit**

```bash
git commit -m "feat(migrate): convert features pages to React template"
```

---

### Task 5: Convert `compare/` pages with shared template

4 compare pages (auth0-alternative, cognito-alternative, firebase-alternative, okta-alternative). Same approach as Task 4.

**Files:**
- Create: `frontend/components/pages/compare/ComparePage.tsx`
- Create: `frontend/lib/compare/data.ts`
- Modify: `frontend/app/[locale]/compare/[slug]/page.tsx`
- Modify: `frontend/messages/en.json` (add `Compare` namespace)
- Modify: `frontend/messages/zh-TW.json`

- [ ] **Step 1: Read all 4 compare HTML files, identify shared structure**
- [ ] **Step 2: Define `ComparePageData` type and data in `lib/compare/data.ts`**
- [ ] **Step 3: Create `ComparePage.tsx` template component**
- [ ] **Step 4: Update `app/[locale]/compare/[slug]/page.tsx`** — use `LOCALES.flatMap(...)` in `generateStaticParams` (same pattern as Task 4)
- [ ] **Step 5: Verify build — 4 compare slugs appear**
- [ ] **Step 6: Commit** `feat(migrate): convert compare pages to React template`

---

### Task 6: Convert `solutions/` pages with shared template

7 solutions pages. Same approach.

**Files:**
- Create: `frontend/components/pages/solutions/SolutionPage.tsx`
- Create: `frontend/lib/solutions/data.ts`
- Modify: `frontend/app/[locale]/solutions/[slug]/page.tsx`
- Modify: `frontend/messages/en.json`
- Modify: `frontend/messages/zh-TW.json`

**Slugs:** `b2b-saas-authentication`, `ciam-solution`, `customer-identity-and-access-management`, `enterprise-sso`, `external-identity-access-management`, `frontline-workers-identity`, `reduce-sms-otp-cost`

- [ ] **Step 1: Read 2-3 solutions pages, identify shared structure**
- [ ] **Step 2: Define `SolutionPageData` type and data**
- [ ] **Step 3: Create `SolutionPage.tsx` template**
- [ ] **Step 4: Update `app/[locale]/solutions/[slug]/page.tsx`** — use `LOCALES.flatMap(...)` in `generateStaticParams` (same pattern as Task 4)
- [ ] **Step 5: Verify build**
- [ ] **Step 6: Commit** `feat(migrate): convert solutions pages to React template`

---

### Task 7: Convert `go/` landing pages (one component each)

8 pages, each is a unique ad/landing page. Convert individually — no shared template needed.

**Files:**
- Create: `frontend/components/pages/go/<slug>.tsx` (8 files)
- Modify: `frontend/app/[locale]/go/[slug]/page.tsx`
- Modify: `frontend/messages/en.json`, `zh-TW.json`

**Slugs:** `auth0-alternative`, `authgear-developer-focused-simplicity`, `authgear-strong-hong-kong-localized-support`, `authgear-strong-singapore-localized-support`, `authgear-vs-auth0-cht`, `authgear-vs-auth0`, `authgear-vs-okta-cht`, `authgear-vs-okta`

> **Note on `-cht` pages:** These are Chinese variants of existing pages (`authgear-vs-auth0-cht`, `authgear-vs-okta-cht`). Do NOT silently remove them — they may have inbound links or ad traffic. Decision criteria: check Google Search Console or server analytics for these URLs. **Regardless of traffic, keep them as separate slugs** in the `pageMap` to avoid 404s. Optionally, add a permanent redirect in `next.config.ts` from the `-cht` slug to the `/zh-TW/go/<base-slug>` equivalent if you want to canonicalize them. Do not merge them into the zh-TW locale of a base slug without first setting up the redirect.

- [ ] **Step 1: Convert `go/auth0-alternative.html` → `frontend/components/pages/go/Auth0AlternativePage.tsx`**
- [ ] **Step 2: Commit** `feat(migrate): convert go/auth0-alternative page`
- [ ] **Step 3: Convert remaining 7 `go/` pages individually, committing after each**
- [ ] **Step 4: Update `app/[locale]/go/[slug]/page.tsx` to dispatch to per-slug components**

```typescript
import { notFound } from 'next/navigation';
import { LOCALES } from '@/lib/i18n';

const pageMap: Record<string, React.ComponentType<{ locale: string }>> = {
  'auth0-alternative': Auth0AlternativePage,
  // ...
};

export async function generateStaticParams() {
  // Include all locales — same pattern as features/compare/solutions
  return LOCALES.flatMap((locale) =>
    Object.keys(pageMap).map((slug) => ({ locale, slug }))
  );
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const Component = pageMap[slug];
  if (!Component) notFound();
  return <Component locale={locale} />;
}
```

- [ ] **Step 5: Verify build**
- [ ] **Step 6: Commit** `feat(migrate): wire go/ page router`

---

### Task 8: Convert `events/` and `campaign/` pages

5 pages total. Convert individually.

**Files:**
- Create: `frontend/components/pages/events/<slug>.tsx` (3 files)
- Create: `frontend/components/pages/campaign/<slug>.tsx` (2 files)
- Modify: `frontend/app/[locale]/events/[slug]/page.tsx`
- Modify: `frontend/app/[locale]/campaign/[slug]/page.tsx`

**Event slugs:** `authgear-x-identityweek-sso-workshop-archived`, `promotion`, `sso-how-to-seminar`
**Campaign slugs:** `authgear-once`, `once`

- [ ] **Step 1: Convert each event page individually**

For each:
1. Read HTML file
2. Create component in `components/pages/events/<slug>.tsx`
3. Add namespace to messages
4. Commit

- [ ] **Step 2: Convert each campaign page individually** (same process)

- [ ] **Step 3: Wire `events/[slug]` page router** (same pattern as go/ task above)
- [ ] **Step 4: Wire `campaign/[slug]` page router**
- [ ] **Step 5: Verify build**
- [ ] **Step 6: Commit** `feat(migrate): convert events and campaign pages`

---

### Task 9: Convert `tools/` pages

9 interactive tool pages. These are special — they contain embedded JavaScript (JWT debugger, TOTP generator, etc.). The JS must be preserved.

**Files:**
- Create: `frontend/components/pages/tools/<slug>.tsx` (9 files)
- Modify: `frontend/app/[locale]/tools/[slug]/page.tsx`

**Slugs:** `base64-decode-encode`, `hmac-signature-generator-verifier`, `jwk-generator`, `jwt-jwe-debugger`, `oidc-discovery-endpoint`, `password-hash-generator`, `ssl-checker`, `totp-authenticator`, `uuidv7-generator`

> **Important:** These pages use heavy inline JavaScript for interactive tools. Read each HTML file before converting. The strategy:
> 1. Convert HTML/CSS structure to JSX normally
> 2. Preserve all `<script>` tag contents in a `pageScripts` array (passed to `PageScripts` component)
> 3. Do NOT try to convert the tool JS to React state — just keep it as vanilla JS via `PageScripts`
> 4. Mark any global variable references (e.g., `window.someLib`) — ensure those libraries are loaded before the page script runs (add to root layout if needed, or load via `<Script strategy="beforeInteractive">` in the tool component's parent page)

- [ ] **Step 1: Audit tool script dependencies**

```bash
grep -h "src=" authgear-new.webflow/tools/*.html | grep script | sort -u
```

List every external script these pages load. Check if any are NOT already in root layout. If not in layout, do **not** use `next/head` (it does not exist in the App Router). Instead, either:
- Add the script to a new `frontend/app/[locale]/tools/layout.tsx` (create if it doesn't exist) using `next/script` with `strategy="beforeInteractive"`, or
- Load it dynamically from the tool page component using `next/script`

Never add tool-specific external scripts to the root layout — that would load them on every page.

- [ ] **Step 2: Convert each tool page individually**

For each tool page:
1. Read the HTML — identify: (a) layout HTML, (b) page-specific script blocks
2. Create `components/pages/tools/<slug>.tsx`:
   - Layout in JSX
   - Script content in `pageScripts` array
   - `<PageScripts scripts={pageScripts} />`
3. Add metadata to messages
4. Commit

- [ ] **Step 3: Wire `tools/[slug]` page router**
- [ ] **Step 4: Verify all 9 tool pages work interactively**

```bash
cd frontend && npm run dev
```
Open http://localhost:3000/tools/jwt-jwe-debugger — test the tool functionality.

- [ ] **Step 5: Commit** `feat(migrate): convert tools pages to React`

---

### Task 10: Remove Webflow infrastructure

Only run this task after ALL previous tasks are complete and the build is green.

**Files:**
- Delete: `frontend/components/StaticWebflowPage.tsx`
- Delete: `frontend/components/PageScripts.tsx` (only if no longer needed — check usages first)
- Delete: `frontend/lib/webflow-page.ts`
- Delete: `authgear-new.webflow/` (entire directory)
- Modify: `frontend/app/[locale]/*.tsx` — remove any remaining `StaticWebflowPage` imports
- Modify: `CLAUDE.md` — remove Webflow page model section

- [ ] **Step 1: Confirm no remaining StaticWebflowPage imports**

```bash
grep -r "StaticWebflowPage" frontend/app/ frontend/components/ --include="*.tsx" --include="*.ts"
```
Expected: no output.

- [ ] **Step 2: Confirm no remaining webflow-page imports**

```bash
grep -r "webflow-page" frontend/ --include="*.tsx" --include="*.ts"
```
Expected: no output.

- [ ] **Step 3: Delete `frontend/lib/webflow-page.ts`**

```bash
rm frontend/lib/webflow-page.ts
```

- [ ] **Step 4: Delete `frontend/components/StaticWebflowPage.tsx`**

```bash
rm frontend/components/StaticWebflowPage.tsx
```

- [ ] **Step 5: Check PageScripts is still used**

```bash
grep -r "PageScripts" frontend/ --include="*.tsx" | grep -v "PageScripts.tsx"
```
If used by tool pages, keep it. If not, delete it.

- [ ] **Step 6: Final build check**

```bash
cd frontend && npm run build
```
Expected: BUILD succeeded, no references to deleted files.

- [ ] **Step 7: Delete `authgear-new.webflow/` directory**

```bash
rm -rf authgear-new.webflow/
```

- [ ] **Step 8: Build again to confirm no runtime filesystem reads of deleted directory**

```bash
cd frontend && npm run build
```
Expected: BUILD succeeded.

- [ ] **Step 9: Update CLAUDE.md**

Remove the "Webflow HTML files" section from `CLAUDE.md`. Update the architecture overview to reflect native React pages only.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(migrate): remove Webflow dependency entirely"
```

---

## Post-migration checklist

After Task 10:
- [ ] Verify all routes in `npm run build` output match the expected URL list
- [ ] Check `docker compose up --build` still works (no WEBFLOW_DIR filesystem reads)
- [ ] Update `README.md` — remove Webflow export references
- [ ] Update `DEPLOY.md` if it mentions Webflow assets
- [ ] Remove `authgear-new.webflow` from `.gitignore` if present
- [ ] Remove `authgear-new.webflow` from `.dockerignore`
