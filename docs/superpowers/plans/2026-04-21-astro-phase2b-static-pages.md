# Astro Migration — Phase 2b: Simple Static Marketing Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port 13 static marketing pages (About, Why Authgear, Promises, Data Privacy, Auth Toolkit, Migrate to Authgear, Glossary, Schedule Demo, Terms, Terms Enterprise, Policy, Security, SLA) from Next.js to Astro. All pure `.astro` ports — no new islands (ScheduleDemo reuses the Phase 2a ContactForm island).

**Architecture:** One task per page. Each task ports one `components/pages/XPage.tsx` → `src/components/pages/XPage.astro` and adds two route files (`src/pages/<slug>.astro` + `src/pages/zh-TW/<slug>.astro`). Pages get prerendered (`export const prerender = true`) since they have no runtime dependencies. Translation namespaces already exist in both `en.json` and `zh-TW.json` (verified pre-plan).

**Tech Stack:** Same as Phase 1/2a — Astro 5, React 19 islands (only ContactForm on ScheduleDemo), Playwright smoke tests.

**References:**
- `docs/ARCHITECTURE-ASTRO.md` — target design
- `docs/superpowers/plans/2026-04-21-astro-migration-foundation.md` — Phase 1 patterns
- `docs/superpowers/plans/2026-04-21-astro-phase2a-islands.md` — Phase 2a islands

**What this phase does NOT do:** features/solutions/compare subtrees (Phase 2c), tools (Phase 2d), Once/Pricing (Phase 2e), CMS routes (Phase 3).

**Exit criteria:**

1. `cd frontend-astro && npm run build` — succeeds; dist contains prerendered HTML for all 13 slugs in both locales (26 files)
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — at least 23 passed (17 from Phase 1+2a + 6 new phase-2b smoke assertions; see Task 15)
4. Every one of the 13 pages returns 200 at `/slug` and `/zh-TW/slug` with correct `<html lang>` attribute

---

## Standard Conversion Rules (canonical reference — consult for every port task)

These rules are the same ones used in Phase 1 for HomePage/SiteNav/SiteFooter/etc. Apply mechanically:

### JSX → Astro

| Before (JSX/Next) | After (Astro) |
|---|---|
| `className=` | `class=` |
| `<Link href={x}>` | `<a href={x}>` |
| `import Link from 'next/link'` | delete |
| `import Image from 'next/image'` | delete; use plain `<img>` |
| `'use client'` at top | delete |
| `getTranslations({ locale, namespace: 'X' })` then `{t('key')}` | `import { t } from '@/i18n'`, call `t(locale, 'X.key')` |
| `<PlausibleLink eventName="x" href="y" className="z">…</PlausibleLink>` | `<a href="y" class="z plausible-event-name--x">…</a>` |
| React fragment `<>…</>` | omit; use plain markup |
| `{cond && <>…</>}` | `{cond && (<>…</>)}` — works in Astro |
| `style={{ display: 'none' }}` | `style="display:none"` OR `style={{display:'none'}}` (both valid) |
| `dangerouslySetInnerHTML={{ __html: x }}` | `set:html={x}` |

### SVG attribute kebab-case conversion (React-camelCase → HTML)

- `strokeWidth` → `stroke-width`
- `fillRule` → `fill-rule`
- `clipRule` → `clip-rule`
- `strokeLinecap` → `stroke-linecap`
- `strokeLinejoin` → `stroke-linejoin`
- `strokeMiterlimit` → `stroke-miterlimit`
- `xmlnsXlink` → `xmlns:xlink`
- `xlinkHref` → `xlink:href`
- `viewBox` stays as-is (special-cased in React too)

### Required Astro frontmatter for every page body component

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';

interface Props { locale: string }
const { locale } = Astro.props;
---
```

### Required route wrapper shape (one per slug per locale)

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import XPage from '@/components/pages/XPage.astro';

const locale = 'en';  // or 'zh-TW' for the zh-TW route file
const title = t(locale, 'X.title');
const description = t(locale, 'X.description');
---

<BaseLayout locale={locale} title={title} description={description}>
  <XPage locale={locale} />
</BaseLayout>
```

### Preserve verbatim

- Every Webflow class (`.container-1440`, `.section`, `.w-container`, `.button-primary`, `.w-button`, `.w-inline-block`, etc.)
- Every `plausible-event-name--*` class on CTAs
- Every `id`, `data-*` attribute, inline SVG path, and alt text

### Large-file strategy (files > 300 LOC)

To avoid the 32k output token limit hit during Phase 1 HomePage port, do NOT write the full .astro in a single Write call. Instead:

1. `Write` the frontmatter + an empty `<div class="page-wrapper">` scaffold
2. Use a series of `Edit` calls to insert each top-level `<div class="section …">` block, one at a time
3. Never echo/quote the full file contents in your response text

This applies to `WhyAuthgearPage` (312 LOC), `GlossaryPage` (458 LOC), and `AuthToolkitPage` (237 LOC — borderline, use chunked approach to be safe).

---

## Task 1: Port `PromisesPage` (71 LOC — smallest; establishes the pattern)

**Files:**
- Read: `frontend/components/pages/PromisesPage.tsx`
- Create: `frontend-astro/src/components/pages/PromisesPage.astro`
- Create: `frontend-astro/src/pages/promises.astro`
- Create: `frontend-astro/src/pages/zh-TW/promises.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/PromisesPage.tsx
```

- [ ] **Step 2: Port the body**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/PromisesPage.astro` by applying the Standard Conversion Rules from the top of this document. Start with the standard frontmatter (`import { t }`, `interface Props`, `const { locale }`), then port every JSX section verbatim with:

- `className` → `class`
- `<Link>` → `<a>`, drop the import
- `t('key')` → `t(locale, 'Promises.key')`
- SVG attrs kebab-cased
- Webflow classes preserved

- [ ] **Step 3: Create the en route**

Write `/Users/fung/dev/authgear-web/frontend-astro/src/pages/promises.astro`:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import PromisesPage from '@/components/pages/PromisesPage.astro';

const locale = 'en';
const title = t(locale, 'Promises.title');
const description = t(locale, 'Promises.description');
---

<BaseLayout locale={locale} title={title} description={description}>
  <PromisesPage locale={locale} />
</BaseLayout>
```

- [ ] **Step 4: Create the zh-TW route**

Write `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/promises.astro`:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import PromisesPage from '@/components/pages/PromisesPage.astro';

const locale = 'zh-TW';
const title = t(locale, 'Promises.title');
const description = t(locale, 'Promises.description');
---

<BaseLayout locale={locale} title={title} description={description}>
  <PromisesPage locale={locale} />
</BaseLayout>
```

- [ ] **Step 5: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Expected: build succeeds; output shows `promises/index.html` prerendered for both `/` and `/zh-TW/`.

- [ ] **Step 6: Verify**

```bash
ls /Users/fung/dev/authgear-web/frontend-astro/dist/client/promises/index.html \
   /Users/fung/dev/authgear-web/frontend-astro/dist/client/zh-TW/promises/index.html
```

Both files must exist.

- [ ] **Step 7: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/PromisesPage.astro \
                                        frontend-astro/src/pages/promises.astro \
                                        frontend-astro/src/pages/zh-TW/promises.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port PromisesPage + routes"
```

---

## Task 2: Port `ScheduleDemoPage` (58 LOC — reuses Phase 2a ContactForm)

**Files:**
- Read: `frontend/components/pages/ScheduleDemoPage.tsx`
- Create: `frontend-astro/src/components/pages/ScheduleDemoPage.astro`
- Create: `frontend-astro/src/pages/schedule-demo.astro`
- Create: `frontend-astro/src/pages/zh-TW/schedule-demo.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/ScheduleDemoPage.tsx
```

- [ ] **Step 2: Port the body**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/ScheduleDemoPage.astro`. Apply the Standard Conversion Rules. **The one special case:** `<ContactForm>` usages become a real React island import.

In the frontmatter add:

```ts
import ContactForm from '@/components/islands/ContactForm';
```

In the body, wherever the Next source uses `<ContactForm />` (likely without props, since the island takes none required), replace with:

```astro
<ContactForm client:load />
```

- [ ] **Step 3: Create the en and zh-TW route files**

Use the standard route wrapper pattern from the Standard Conversion Rules. Namespace is `ScheduleDemo`. Slug is `schedule-demo`.

Write both:
- `/Users/fung/dev/authgear-web/frontend-astro/src/pages/schedule-demo.astro`
- `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/schedule-demo.astro`

Each follows the wrapper shape from the rules block at the top, substituting `ScheduleDemoPage` / `ScheduleDemo` / `schedule-demo` appropriately. Locale differs between the two.

- [ ] **Step 4: Build + verify files exist**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
ls dist/client/schedule-demo/index.html dist/client/zh-TW/schedule-demo/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/ScheduleDemoPage.astro \
                                        frontend-astro/src/pages/schedule-demo.astro \
                                        frontend-astro/src/pages/zh-TW/schedule-demo.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port ScheduleDemoPage + routes (reuses ContactForm island)"
```

---

## Task 3: Port `TermsPage` (66 LOC)

**Files:**
- Read: `frontend/components/pages/TermsPage.tsx`
- Create: `frontend-astro/src/components/pages/TermsPage.astro`
- Create: `frontend-astro/src/pages/terms.astro`
- Create: `frontend-astro/src/pages/zh-TW/terms.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/TermsPage.tsx
```

- [ ] **Step 2: Port the body**

Create `frontend-astro/src/components/pages/TermsPage.astro` using the Standard Conversion Rules. Namespace: `Terms`.

- [ ] **Step 3: Create the en and zh-TW route files**

Route wrapper shape per the rules block. Slug: `terms`. Namespace: `Terms`.

Write:
- `frontend-astro/src/pages/terms.astro`
- `frontend-astro/src/pages/zh-TW/terms.astro`

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/terms/index.html dist/client/zh-TW/terms/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/TermsPage.astro \
                                        frontend-astro/src/pages/terms.astro \
                                        frontend-astro/src/pages/zh-TW/terms.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port TermsPage + routes"
```

---

## Task 4: Port `PolicyPage` (81 LOC)

**Files:**
- Read: `frontend/components/pages/PolicyPage.tsx`
- Create: `frontend-astro/src/components/pages/PolicyPage.astro`
- Create: `frontend-astro/src/pages/policy.astro`
- Create: `frontend-astro/src/pages/zh-TW/policy.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/PolicyPage.tsx
```

- [ ] **Step 2: Port the body**

Use Standard Conversion Rules. Namespace: `Policy`.

- [ ] **Step 3: Create route files**

Wrapper shape per rules. Slug: `policy`. Namespace: `Policy`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/policy/index.html dist/client/zh-TW/policy/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/PolicyPage.astro \
                                        frontend-astro/src/pages/policy.astro \
                                        frontend-astro/src/pages/zh-TW/policy.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port PolicyPage + routes"
```

---

## Task 5: Port `SlaPage` (104 LOC)

**Files:**
- Read: `frontend/components/pages/SlaPage.tsx`
- Create: `frontend-astro/src/components/pages/SlaPage.astro`
- Create: `frontend-astro/src/pages/sla.astro`
- Create: `frontend-astro/src/pages/zh-TW/sla.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/SlaPage.tsx
```

- [ ] **Step 2: Port the body**

Use Standard Conversion Rules. Namespace: `Sla` (note: capitalized this way in the translation JSON — not `SLA`).

- [ ] **Step 3: Create route files**

Slug: `sla`. Namespace: `Sla`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/sla/index.html dist/client/zh-TW/sla/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/SlaPage.astro \
                                        frontend-astro/src/pages/sla.astro \
                                        frontend-astro/src/pages/zh-TW/sla.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SlaPage + routes"
```

---

## Task 6: Port `SecurityPage` (109 LOC)

**Files:**
- Read: `frontend/components/pages/SecurityPage.tsx`
- Create: `frontend-astro/src/components/pages/SecurityPage.astro`
- Create: `frontend-astro/src/pages/security.astro`
- Create: `frontend-astro/src/pages/zh-TW/security.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/SecurityPage.tsx
```

- [ ] **Step 2: Port the body**

Use Standard Conversion Rules. Namespace: `Security`.

- [ ] **Step 3: Create route files**

Slug: `security`. Namespace: `Security`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/security/index.html dist/client/zh-TW/security/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/SecurityPage.astro \
                                        frontend-astro/src/pages/security.astro \
                                        frontend-astro/src/pages/zh-TW/security.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SecurityPage + routes"
```

---

## Task 7: Port `TermsEnterprisePage` (103 LOC)

**Files:**
- Read: `frontend/components/pages/TermsEnterprisePage.tsx`
- Create: `frontend-astro/src/components/pages/TermsEnterprisePage.astro`
- Create: `frontend-astro/src/pages/terms-of-enterprise-license.astro`
- Create: `frontend-astro/src/pages/zh-TW/terms-of-enterprise-license.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/TermsEnterprisePage.tsx
```

- [ ] **Step 2: Port the body**

Use Standard Conversion Rules. Namespace: `TermsEnterprise`.

- [ ] **Step 3: Create route files**

Slug: `terms-of-enterprise-license` (note: longer slug — matches existing Next.js route). Namespace: `TermsEnterprise`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/terms-of-enterprise-license/index.html dist/client/zh-TW/terms-of-enterprise-license/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/TermsEnterprisePage.astro \
                                        frontend-astro/src/pages/terms-of-enterprise-license.astro \
                                        frontend-astro/src/pages/zh-TW/terms-of-enterprise-license.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port TermsEnterprisePage + routes"
```

---

## Task 8: Port `DataPrivacyPage` (87 LOC)

**Files:**
- Read: `frontend/components/pages/DataPrivacyPage.tsx`
- Create: `frontend-astro/src/components/pages/DataPrivacyPage.astro`
- Create: `frontend-astro/src/pages/data-privacy.astro`
- Create: `frontend-astro/src/pages/zh-TW/data-privacy.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/DataPrivacyPage.tsx
```

- [ ] **Step 2: Port the body**

Use Standard Conversion Rules. Namespace: `DataPrivacy`.

- [ ] **Step 3: Create route files**

Slug: `data-privacy`. Namespace: `DataPrivacy`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/data-privacy/index.html dist/client/zh-TW/data-privacy/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/DataPrivacyPage.astro \
                                        frontend-astro/src/pages/data-privacy.astro \
                                        frontend-astro/src/pages/zh-TW/data-privacy.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port DataPrivacyPage + routes"
```

---

## Task 9: Port `AboutPage` (129 LOC)

**Files:**
- Read: `frontend/components/pages/AboutPage.tsx`
- Create: `frontend-astro/src/components/pages/AboutPage.astro`
- Create: `frontend-astro/src/pages/about.astro`
- Create: `frontend-astro/src/pages/zh-TW/about.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/AboutPage.tsx
```

- [ ] **Step 2: Port the body**

Use Standard Conversion Rules. Namespace: `About`. Check whether AboutPage uses `<LogoMarquee>` (About pages often do). If yes, import it as a React island per Phase 2a pattern:

```ts
import LogoMarquee from '@/components/islands/LogoMarquee';
```

And in the body:

```astro
<LogoMarquee
  client:idle
  customerStoriesHref={localizedPath(locale, '/customer-stories')}
/>
```

If the original uses `readStoryLabel={t('…')}`, pass that through.

- [ ] **Step 3: Create route files**

Slug: `about`. Namespace: `About`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/about/index.html dist/client/zh-TW/about/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/AboutPage.astro \
                                        frontend-astro/src/pages/about.astro \
                                        frontend-astro/src/pages/zh-TW/about.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port AboutPage + routes"
```

---

## Task 10: Port `MigrateToAuthgearPage` (137 LOC)

**Files:**
- Read: `frontend/components/pages/MigrateToAuthgearPage.tsx`
- Create: `frontend-astro/src/components/pages/MigrateToAuthgearPage.astro`
- Create: `frontend-astro/src/pages/migrate-to-authgear.astro`
- Create: `frontend-astro/src/pages/zh-TW/migrate-to-authgear.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/MigrateToAuthgearPage.tsx
```

- [ ] **Step 2: Port the body**

Use Standard Conversion Rules. Namespace: `MigrateToAuthgear`.

- [ ] **Step 3: Create route files**

Slug: `migrate-to-authgear`. Namespace: `MigrateToAuthgear`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/migrate-to-authgear/index.html dist/client/zh-TW/migrate-to-authgear/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/MigrateToAuthgearPage.astro \
                                        frontend-astro/src/pages/migrate-to-authgear.astro \
                                        frontend-astro/src/pages/zh-TW/migrate-to-authgear.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port MigrateToAuthgearPage + routes"
```

---

## Task 11: Port `AuthToolkitPage` (237 LOC — use chunked Edit strategy)

**Files:**
- Read: `frontend/components/pages/AuthToolkitPage.tsx`
- Create: `frontend-astro/src/components/pages/AuthToolkitPage.astro`
- Create: `frontend-astro/src/pages/auth-toolkit.astro`
- Create: `frontend-astro/src/pages/zh-TW/auth-toolkit.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/AuthToolkitPage.tsx
```

- [ ] **Step 2: Port the body — use the large-file strategy**

The file is near the threshold for single-Write safety. Do NOT echo the full file in your response text.

a. `Write` the frontmatter + empty `<div class="page-wrapper"></div>` scaffold
b. Use `Edit` to insert each top-level `<div class="section …">` one at a time

Frontmatter skeleton (adapt — add imports for any other components used, e.g. LogoMarquee if present):

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';

interface Props { locale: string }
const { locale } = Astro.props;
---

<div class="page-wrapper">
</div>
```

Then section-by-section Edits.

Apply the Standard Conversion Rules. Namespace: `AuthToolkit`.

- [ ] **Step 3: Create route files**

Slug: `auth-toolkit`. Namespace: `AuthToolkit`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/auth-toolkit/index.html dist/client/zh-TW/auth-toolkit/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/AuthToolkitPage.astro \
                                        frontend-astro/src/pages/auth-toolkit.astro \
                                        frontend-astro/src/pages/zh-TW/auth-toolkit.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port AuthToolkitPage + routes"
```

---

## Task 12: Port `WhyAuthgearPage` (312 LOC — large-file strategy required)

**Files:**
- Read: `frontend/components/pages/WhyAuthgearPage.tsx`
- Create: `frontend-astro/src/components/pages/WhyAuthgearPage.astro`
- Create: `frontend-astro/src/pages/why-authgear.astro`
- Create: `frontend-astro/src/pages/zh-TW/why-authgear.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/WhyAuthgearPage.tsx
```

- [ ] **Step 2: Port the body — use the large-file strategy**

Do NOT echo file contents in your response. Work silently via Write (scaffold) + Edit (per section).

Apply Standard Conversion Rules. Namespace: `WhyAuthgear`.

Scaffold:

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';

interface Props { locale: string }
const { locale } = Astro.props;
---

<div class="page-wrapper">
</div>
```

Then insert each section with `Edit`.

- [ ] **Step 3: Create route files**

Slug: `why-authgear`. Namespace: `WhyAuthgear`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/why-authgear/index.html dist/client/zh-TW/why-authgear/index.html
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/WhyAuthgearPage.astro \
                                        frontend-astro/src/pages/why-authgear.astro \
                                        frontend-astro/src/pages/zh-TW/why-authgear.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port WhyAuthgearPage + routes"
```

---

## Task 13: Port `GlossaryPage` (458 LOC — largest; large-file strategy mandatory)

**Files:**
- Read: `frontend/components/pages/GlossaryPage.tsx`
- Create: `frontend-astro/src/components/pages/GlossaryPage.astro`
- Create: `frontend-astro/src/pages/glossary.astro`
- Create: `frontend-astro/src/pages/zh-TW/glossary.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/GlossaryPage.tsx
```

- [ ] **Step 2: Port the body — large-file strategy, chunk aggressively**

Do NOT echo file contents. Expect 5-10 sections. Use Write for scaffold, then one Edit per section.

Apply Standard Conversion Rules. Namespace: `Glossary`.

**Extra care:** Glossary pages often use anchor IDs (`<div id="a-z-index">`, `<h2 id="passkey">`). Preserve every `id` attribute exactly — anchor links within the page depend on them.

Scaffold same as Task 12.

- [ ] **Step 3: Create route files**

Slug: `glossary`. Namespace: `Glossary`.

- [ ] **Step 4: Build + verify**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -5
ls dist/client/glossary/index.html dist/client/zh-TW/glossary/index.html
```

- [ ] **Step 5: Spot-check anchor IDs survived**

```bash
grep -oE 'id="[^"]+"' /Users/fung/dev/authgear-web/frontend-astro/dist/client/glossary/index.html | sort -u | head -20
```

Output should include several term-slug `id` values (e.g. `id="passkey"`, `id="oidc"`). If absent, the port lost them — fix before commit.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/GlossaryPage.astro \
                                        frontend-astro/src/pages/glossary.astro \
                                        frontend-astro/src/pages/zh-TW/glossary.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port GlossaryPage + routes"
```

---

## Task 14: Playwright smoke tests for all Phase 2b routes

**Files:**
- Create: `frontend-astro/tests/phase2b-pages.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2b-pages.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const SLUGS = [
  'about',
  'why-authgear',
  'promises',
  'data-privacy',
  'auth-toolkit',
  'migrate-to-authgear',
  'glossary',
  'schedule-demo',
  'terms',
  'terms-of-enterprise-license',
  'policy',
  'security',
  'sla',
] as const;

test.describe('Phase 2b routes — en', () => {
  for (const slug of SLUGS) {
    test(`/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      // Every page should render the site nav and footer
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2b routes — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test('schedule-demo has a hydrated ContactForm', async ({ page }) => {
  await page.goto('/schedule-demo');
  const nameInput = page.locator('input[name="Name"]').first();
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Demo Seeker');
  await expect(nameInput).toHaveValue('Demo Seeker');
});

test('no data-placeholder divs remain on any phase 2b page', async ({ page }) => {
  for (const slug of SLUGS) {
    await page.goto(`/${slug}`);
    const count = await page.locator('[data-placeholder]').count();
    expect(count, `/${slug} has ${count} placeholder divs`).toBe(0);
  }
});
```

- [ ] **Step 2: Run — expect pass**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2b-pages.spec.ts --reporter=line 2>&1 | tail -30
```

Expected: 13 (en) + 13 (zh-TW) + 1 (contact-form hydration) + 1 (placeholder sweep) = 28 passed.

- [ ] **Step 3: Full suite — regression check**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -15
```

Expected: 17 existing + 28 new = 45 passed.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2b-pages.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for Phase 2b static pages"
```

---

## Task 15: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README phase status**

Use Edit on `/Users/fung/dev/authgear-web/frontend-astro/README.md` to change the Phase status list. The current state after Phase 2a is:

```markdown
- [x] Phase 1 — Foundation
- [x] Phase 2a — Core islands + home parity (ContactForm, LogoMarquee, /api/contact)
- [ ] Phase 2b — Simple static marketing pages (~13 pages)
```

Change the Phase 2b line from `- [ ]` to `- [x]`.

- [ ] **Step 2: Update ARCHITECTURE status marker**

Edit `/Users/fung/dev/authgear-web/docs/ARCHITECTURE-ASTRO.md`. Find the line starting with `**Migration status` and replace it with:

```markdown
**Migration status (2026-04-21):** Phases 1 + 2a + 2b shipped on branch `migration/nextjs-to-astro`. Home page + 13 static marketing pages live in both locales. Phase 2c plan (features/solutions/compare subtrees) pending. See `docs/superpowers/plans/`.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2b complete — static pages shipped"
```

---

## Phase 2b complete

Verification gate before Phase 2c:

1. `npm run build` — all 26 prerendered pages (13 slugs × 2 locales) appear in `dist/client/`
2. `npm run test:unit` — 5 passed
3. `npm test` — 45 passed
4. Manual spot-check: `PORT=3000 npm start`, visit at minimum:
   - `/about`, `/zh-TW/about`
   - `/schedule-demo` (submit the form end-to-end — should hit `/api/contact` and show "Thank you!")
   - `/glossary` (anchor links work — click a term in the A-Z index, page scrolls to the term)
5. Compare page bodies side-by-side with current Next.js versions at `http://localhost:3000/<slug>` vs `http://localhost:4321/<slug>` for any visible regressions

---

## Phases 2c–2e outline (detailed plans to be written after 2b ships)

### Phase 2c: Dynamic subtrees (features, solutions, compare)

- **Features**: 22 pages, use `pageMap` pattern in `src/pages/features/[slug].astro`. Port tab islands (`BiometricMethodsTabs`, `MfaOptionsTabs`, `SmsPumpingWarningFaqItem`).
- **Solutions**: 7 pages, similar `[slug]` dynamic route.
- **Compare**: 4 competitor pages (Auth0, Cognito, Firebase, Okta alternatives).
- `features/_meta.json` SEO data → typed TS module.

### Phase 2d: Tools subtree + SMS calculator

- 9 developer tools using shared `ToolHero`/`ToolFaq`/`ToolFeatureCards`/`ToolHowItWorks`/`ToolPopup`/`ToolWidget` components.
- Some tools are stateless (OIDC discovery, glossary-style) — simple `.astro` ports.
- Interactive tools (JWT debugger, base64, HMAC, password hash, TOTP) become islands.
- `SmsCostCalculator` island with its data JSON.

### Phase 2e: Once page + Pricing page

- **Once** (`OncePage.tsx` 504 LOC): framework tab switcher (`OnceSdkCode` + `OnceSdkFrameworkHarness`) + FAQ accordion (`OncePageFaq`) become islands.
- **Pricing**: comparison table + monthly/annual toggle + FAQ. Data lives in `lib/pricing/copy-en.ts` + `copy-zh-TW.ts` — port both to Astro.
