---
name: page-i18n
description: Workflow for adding next-intl i18n translations to a hardcoded-string page component in the authgear-web frontend. Use when the user asks to "prepare [page] for i18n", "add translations to [page]", "i18n the [page] page", or "make [page] support Traditional Chinese". Covers extracting strings, adding namespaces to en.json and zh-TW.json, and updating the component to use useTranslations.
---

# Page i18n Workflow

Converts a hardcoded-English page component to use `next-intl` translations, supporting English (`en`) and Traditional Chinese (`zh-TW`).

For project-specific file locations, namespace conventions, existing shared strings, and zh-TW translation tips, read `references/codebase.md`.

## Workflow

### 1. Explore the component

Read the target component in full. Identify every user-visible string:
- Headings, labels, descriptions, button text, CTA copy
- Check which strings are already in the **shared `Features` namespace** (see `references/codebase.md`) — don't duplicate them
- Leave as-is: CSS class names, `href` URLs, image `src`/`srcSet`, `alt=""`, `loading="lazy"`, `target="_blank"`

### 2. Design the namespace

- Name: PascalCase matching the page concept (e.g. `AttackProtection`, `SingleSignOn`, `Passkeys`)
- Use descriptive keys: `heroTitle`, `heroDescription`, `feature1Title`, `feature1Description`, `ctaTitle`, etc.
- For "Free plan includes **unlimited MAUs**" split into `freePlanIncludes` + `unlimitedMAUs` to preserve the `<span>` bold

### 3. Plan with `/superpowers:writing-plans`

Provide this spec:

> Prepare `[ComponentName].tsx` for i18n using next-intl.
>
> Task 1: Add `[Namespace]` namespace to `frontend/messages/en.json` — insert after the `Features` block, before `Compare`. Keys and English values: [full list].
>
> Task 2: Add `[Namespace]` namespace to `frontend/messages/zh-TW.json` — same position. Traditional Chinese translations: [full list].
>
> Task 3: Update `frontend/components/pages/[path]/[ComponentName].tsx` — import `useTranslations` from `'next-intl'`, add `const t = useTranslations('[Namespace]')` and `const tFeatures = useTranslations('Features')`, replace all hardcoded strings with `t(...)` / `tFeatures(...)` calls. Keep all `className`, `href`, `src`, HTML structure unchanged. Run `npx tsc --noEmit` to verify.
>
> Task 4: Verify dev server renders `/[slug]` (English) and `/zh-TW/[slug]` (zh-TW), push.

### 4. Execute with `/superpowers:subagent-driven-development`

Model selection:
- Tasks 1 & 2 (JSON-only) → `haiku`
- Task 3 (TSX update) → `sonnet`
- Task 4 (push) → `haiku`

### 5. Verify

- `http://localhost:3000/[slug]` — should render English
- `http://localhost:3000/zh-TW/[slug]` — should render Traditional Chinese

## Component update pattern

```tsx
import { useTranslations } from 'next-intl';

interface Props { locale: string; }

export default function MyPage(_props: Props) {
  const t = useTranslations('MyNamespace');
  const tFeatures = useTranslations('Features');
  return (
    <>
      <h1>{t('heroTitle')}</h1>
      <a href="https://portal.authgear.com/...">{tFeatures('startForFree')}</a>
      <p>{t('freePlanIncludes')} <span className="bold">{t('unlimitedMAUs')}</span></p>
    </>
  );
}
```

Key rules:
- Call `useTranslations` at the **top level** of the component (works in RSC — no `async` needed)
- Keep `_props: Props` — the `locale` prop is structurally required by all feature pages; `useTranslations` reads locale from the `x-locale` header automatically
