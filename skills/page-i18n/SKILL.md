---
name: page-i18n
description: Workflow for adding i18n translations to a hardcoded-English page component in the authgear-web Astro site. Use when the user asks to "prepare [page] for i18n", "add translations to [page]", "i18n the [page] page", or "make [page] support Traditional Chinese". Covers extracting strings, adding namespaces to src/i18n/en.json + zh-TW.json, and updating the .astro component to use the t(locale, key) helper.
---

# Page i18n Workflow

Converts a hardcoded-English **`.astro` page component** (Astro 5) to use the project's `t(locale, key)` helper, supporting English (`en`, unprefixed URLs) and Traditional Chinese (`zh-TW`, `/zh-TW/...` prefix).

For file paths, the `t` helper signature, namespace conventions, shared strings already in the JSON files, and **zh-TW typography rules**, read `references/codebase.md` first.

## Scope

- **In scope:** marketing/feature/solution pages under `src/components/pages/**/*.astro` whose text is hardcoded English.
- **Out of scope:** content-collection pages (blog posts, customer stories, login gallery, what's-new, integrations). Those ship per-locale markdown under `src/content/<collection>/{en,zh-TW}/…` and fall back to `en` by slug automatically — no i18n JSON work required.
- **Also out of scope:** nav and footer (already fully i18n'd via `src/i18n/*.json` and `src/lib/navigation-data.ts`).

## Workflow

### 1. Explore the component

Read the target `.astro` file in full. Identify every user-visible string in the template:
- Headings, subheads, paragraph body, button labels, link text, eyebrows, card titles/descriptions, footer CTAs.
- Check for strings already in the **shared `Features` namespace** (`startForFree`, `getDemo`, `scheduleDemo`, `freePlanDescription`) — reuse instead of duplicating.
- Leave as-is: `class`, `href`, `src`, `srcset`, `alt=""` (decorative), `aria-hidden`, `loading`, `target`, inline SVG markup.
- Translate `alt` only when it's meaningful, not decorative.

### 2. Design the namespace

- **Name:** PascalCase matching the page concept — e.g. `AttackProtection`, `SingleSignOn`, `Passkeys`, `EnterpriseSso`, `FrontlineWorkersIdentity`, `About`, `Promises`.
- **Keys:** descriptive camelCase — `heroTitle`, `heroSubhead`, `heroCta1`, `heroCta2`, `whyTitle`, `whyP1`, `principles1Title`, `principles1Desc`, `footerTitle`, `footerBody`.
- If a sentence has inline emphasis (e.g. "Free plan includes **unlimited MAUs**"), split into `freePlanIncludes` + `unlimitedMAUs` so the component can render the bold `<span>` separately. Don't stuff HTML into JSON values.
- Title + meta description also live here as `title` and `description` (used by the route file for `<BaseLayout title={…} description={…}>`).

### 3. Add the namespace to both JSON files

Insert the new namespace block into `src/i18n/en.json` and `src/i18n/zh-TW.json` in the same position (the files mirror each other). See `references/codebase.md` for the insertion point and validation command.

### 4. Update the component

Replace hardcoded strings with `t(locale, 'Namespace.key')` calls. See the "Component pattern" section below.

### 5. Update the route files

Every localized page is served by two route files: `src/pages/<slug>.astro` (English) and `src/pages/zh-TW/<slug>.astro` (Traditional Chinese). Both thin-wrap the component and pass `locale`. Make sure both use `t(locale, 'Namespace.title')` / `'Namespace.description'` for the document head:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import MyPage from '@/components/pages/MyPage.astro';

const locale = 'en';           // or 'zh-TW' in the zh-TW copy of this file
const title = t(locale, 'MyPage.title');
const description = t(locale, 'MyPage.description');
---
<BaseLayout locale={locale} title={title} description={description}>
  <MyPage locale={locale} />
</BaseLayout>
```

### 6. Verify

- `node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json'))" && node -e "JSON.parse(require('fs').readFileSync('src/i18n/zh-TW.json'))" && echo OK`
- `npm run build` — Astro's build validates content collections and type-checks the frontmatter.
- `npm run dev` — visit `http://localhost:4321/<slug>` (English) and `http://localhost:4321/zh-TW/<slug>` (Traditional Chinese), spot-check both.

## Component pattern

Target shape for any `src/components/pages/**/*.astro` file:

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';

interface Props { locale: string }
const { locale } = Astro.props;
---

<section class="ds-hero-banner--dark">
  <div class="ds-container ds-container--hero">
    <h1 class="ds-hero-banner__title">{t(locale, 'MyPage.heroTitle')}</h1>
    <p class="ds-hero-banner__description">{t(locale, 'MyPage.heroSubhead')}</p>
    <a href={localizedPath(locale, '/schedule-demo')} class="ds-btn ds-btn-secondary">
      {t(locale, 'Features.getDemo')}
    </a>
  </div>
</section>
```

### Rules

- `t` is called **in the template expression** (`{t(locale, 'X.y')}`). It's not a hook — no top-level binding needed.
- Always import `t` from `@/i18n`. Do not import locale JSON directly.
- Always derive URLs via `localizedPath(locale, '/path')` (imported from `@/lib/i18n`) so `/zh-TW/...` prefixes are handled. Exception: external URLs and anchors (`#foo`) — use them verbatim.
- Inline emphasis pattern: `<span>{t(locale, 'X.lede')}</span> <span class="bold">{t(locale, 'X.ledeBold')}</span>` — never `set:html` just to get a `<span>` inside a translated string.
- For arrays (e.g. a bulleted list) use either numbered keys (`item1`, `item2`, `item3`) or build the array in the frontmatter: `const items = [t(locale, 'X.item1'), t(locale, 'X.item2'), …]`.

## When to use superpowers

For a single small page, do the edits inline — it's three files (two JSON + one `.astro`) and maybe two route wrappers. Use `superpowers:writing-plans` + `superpowers:subagent-driven-development` only when:
- The page has 30+ strings, or
- Multiple pages are being i18n'd in one sweep, or
- You want traceable per-task commits.

If you do use the superpowers flow, the task breakdown is:
1. Add new namespace to `src/i18n/en.json` (haiku)
2. Add same namespace to `src/i18n/zh-TW.json` with translations (haiku)
3. Rewrite the `.astro` component to use `t(locale, …)` (sonnet — judgement needed on what's a string vs attribute)
4. Update the two route files to pull title + description from the namespace (haiku)
5. Build + dev spot-check + commit (haiku)
