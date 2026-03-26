# Plausible next-plausible Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace CSS-class-based Plausible event tracking with the `next-plausible` package's programmatic `usePlausible()` hook across all components.

**Architecture:** Install `next-plausible`, create two small `'use client'` helper components (`PlausibleLink` and `PlausibleButton`), migrate every `plausible-event-name--*` CSS class to programmatic `onClick` handlers, and only then replace the raw `<Script>` with `<PlausibleProvider>` in the last task. This order ensures the existing CSS-class tracking (which requires the current custom Plausible script) keeps firing throughout the migration — the script swap happens only after every CSS class is gone.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `next-plausible`

---

## File Map

| Action | File |
|--------|------|
| Modify | `frontend/package.json` |
| Modify | `frontend/app/layout.tsx` |
| Create | `frontend/components/PlausibleLink.tsx` |
| Create | `frontend/components/PlausibleButton.tsx` |
| Modify | `frontend/components/ContactForm.tsx` |
| Modify | `frontend/components/layout/SiteNav.tsx` |
| Modify | `frontend/components/pages/HomePage.tsx` |
| Modify | `frontend/components/tools/ToolPopup.tsx` |
| Modify | `frontend/components/tools/ToolWidget.tsx` |
| Modify | `frontend/components/pages/solutions/ReduceSmsOtpCostPage.tsx` |

---

### Task 1: Install next-plausible

**Files:**
- Modify: `frontend/package.json`

- [ ] **Step 1: Install the package**

```bash
cd frontend
npm install next-plausible
```

Expected output: `added 1 package` (or similar — no errors)

- [ ] **Step 2: Verify it compiled**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors (the package ships types)

- [ ] **Step 3: Commit**

```bash
git add frontend/package.json frontend/package-lock.json
git commit -m "chore: install next-plausible"
```

---

### Task 2: Create `PlausibleLink` and `PlausibleButton` client helper components

**Files:**
- Create: `frontend/components/PlausibleLink.tsx`
- Create: `frontend/components/PlausibleButton.tsx`

These are tiny `'use client'` wrappers. They let server components include tracked elements by importing a client component — valid in Next.js App Router.

- [ ] **Step 1: Create `PlausibleLink.tsx`**

Create `frontend/components/PlausibleLink.tsx`:

```tsx
'use client';

import { usePlausible } from 'next-plausible';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'a'> {
  eventName: string;
}

export default function PlausibleLink({ eventName, onClick, ...props }: Props) {
  const plausible = usePlausible();
  return (
    <a
      {...props}
      onClick={(e) => {
        plausible(eventName);
        onClick?.(e);
      }}
    />
  );
}
```

- [ ] **Step 2: Create `PlausibleButton.tsx`**

Create `frontend/components/PlausibleButton.tsx`:

```tsx
'use client';

import { usePlausible } from 'next-plausible';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
  eventName: string;
}

export default function PlausibleButton({ eventName, onClick, ...props }: Props) {
  const plausible = usePlausible();
  return (
    <button
      {...props}
      onClick={(e) => {
        plausible(eventName);
        onClick?.(e);
      }}
    />
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add frontend/components/PlausibleLink.tsx frontend/components/PlausibleButton.tsx
git commit -m "feat: add PlausibleLink and PlausibleButton client helper components"
```

---

### Task 3: Update `ContactForm.tsx` — fire event programmatically in `handleSubmit`

**Files:**
- Modify: `frontend/components/ContactForm.tsx`

`ContactForm` is already a `'use client'` component, so `usePlausible()` can be used directly. The event currently fires on submit button click via CSS class; we fire it at the top of `handleSubmit` to match that behaviour.

- [ ] **Step 1: Add `usePlausible` import and call**

1. Add import (alongside existing imports):
```tsx
import { usePlausible } from 'next-plausible';
```

2. Inside `ContactFormInner`, add the hook call at the top of the function body (alongside existing `useState` calls):
```tsx
const plausible = usePlausible();
```

3. At the start of `handleSubmit`, before validation, add:
```tsx
plausible('contact-form-submit');
```

So `handleSubmit` begins:
```tsx
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  plausible('contact-form-submit');
  if (phone && !phoneValid) return;
  setStatus('submitting');
  // ... rest unchanged
```

4. On the submit `<input>`, remove `plausible-event-name--contact-form-submit` from className. Change:
```tsx
className="getdemo-submit plausible-event-name--contact-form-submit w-button"
```
To:
```tsx
className="getdemo-submit w-button"
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add frontend/components/ContactForm.tsx
git commit -m "feat: use usePlausible hook in ContactForm instead of CSS class tracking"
```

---

### Task 4: Update `SiteNav.tsx` — replace tracked `<a>` elements with `PlausibleLink`

**Files:**
- Modify: `frontend/components/layout/SiteNav.tsx`

`SiteNav` is a server component (uses `getTranslations` from `next-intl/server`). It has four tracked elements: two login links and two signup links (mobile + desktop variants). We replace these raw `<a>` tags with `<PlausibleLink>`.

Event names:
- `plausible-event-name--login` → `'login'`
- `plausible-event-name--signup` → `'signup'`

- [ ] **Step 1: Add `PlausibleLink` import**

At the top of `frontend/components/layout/SiteNav.tsx`, add:
```tsx
import PlausibleLink from '@/components/PlausibleLink';
```

- [ ] **Step 2: Replace mobile login `<a>` (line ~214)**

Change:
```tsx
<a
  href="https://portal.authgear.com/"
  target="_blank"
  className="nav-button login plausible-event-name--login mobile w-inline-block"
>
  <div className="text-block-32">{t('loginMobile')}</div>
</a>
```
To:
```tsx
<PlausibleLink
  href="https://portal.authgear.com/"
  target="_blank"
  className="nav-button login mobile w-inline-block"
  eventName="login"
>
  <div className="text-block-32">{t('loginMobile')}</div>
</PlausibleLink>
```

- [ ] **Step 3: Replace mobile signup `<a>` (line ~220)**

Change:
```tsx
<a
  href="https://portal.authgear.com/"
  className="button-primary header-button-mobile signup plausible-event-name--signup w-button"
>
  {t('signupMobile')}
</a>
```
To:
```tsx
<PlausibleLink
  href="https://portal.authgear.com/"
  className="button-primary header-button-mobile signup w-button"
  eventName="signup"
>
  {t('signupMobile')}
</PlausibleLink>
```

- [ ] **Step 4: Replace desktop login `<a>` (line ~239)**

Change:
```tsx
<a
  href="https://portal.authgear.com/"
  target="_blank"
  className="nav-button login plausible-event-name--login w-inline-block"
```
To:
```tsx
<PlausibleLink
  href="https://portal.authgear.com/"
  target="_blank"
  className="nav-button login w-inline-block"
  eventName="login"
```

(Keep the children of this element unchanged.)

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add frontend/components/layout/SiteNav.tsx
git commit -m "feat: use PlausibleLink in SiteNav instead of CSS class tracking"
```

---

### Task 5: Update `HomePage.tsx` — replace tracked `<a>` with `PlausibleLink`

**Files:**
- Modify: `frontend/components/pages/HomePage.tsx`

One tracked element: the hero CTA signup button (line ~50).

Event name: `plausible-event-name--signup` → `'signup'`

- [ ] **Step 1: Add `PlausibleLink` import**

```tsx
import PlausibleLink from '@/components/PlausibleLink';
```

- [ ] **Step 2: Replace the tracked `<a>` (line ~50)**

Change:
```tsx
<a href="https://portal.authgear.com/?utm_source=landing-page&utm_medium=link&utm_campaign=login_button" target="_blank" rel="noopener noreferrer" className="button-primary home-hero new-home radius-16 plausible-event-name--signup w-button">{t('heroCtaGetStarted')}</a>
```
To:
```tsx
<PlausibleLink href="https://portal.authgear.com/?utm_source=landing-page&utm_medium=link&utm_campaign=login_button" target="_blank" rel="noopener noreferrer" className="button-primary home-hero new-home radius-16 w-button" eventName="signup">{t('heroCtaGetStarted')}</PlausibleLink>
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add frontend/components/pages/HomePage.tsx
git commit -m "feat: use PlausibleLink in HomePage hero CTA instead of CSS class tracking"
```

---

### Task 6: Update `ToolPopup.tsx` — replace all three tracked elements

**Files:**
- Modify: `frontend/components/tools/ToolPopup.tsx`

Three tracked elements:
- `plausible-event-name--tool-popup-signup-click` → `'tool-popup-signup-click'`
- `plausible-event-name--tool-github-click` → `'tool-github-click'`
- `plausible-event-name--popup-close-click` → `'popup-close-click'`

- [ ] **Step 1: Add `PlausibleLink` import**

```tsx
import PlausibleLink from '@/components/PlausibleLink';
```

- [ ] **Step 2: Replace all three tracked elements**

Replace the entire file content with:

```tsx
import PlausibleLink from '@/components/PlausibleLink';

export default function ToolPopup() {
  return (
    <div className="tool-popup">
      <h1 className="dev-tool-popup-heading">This Dev Tool is crafted by Authgear</h1>
      <p className="paragraph-20">Open source Auth0/Clerk/Firebase alternative. Passkeys, SSO, MFA, passwordless, biometric login.</p>
      <div className="tool-popup-wrapper">
        <PlausibleLink href="https://portal.authgear.com/" target="_blank" className="tool-popup-button w-inline-block" eventName="tool-popup-signup-click">
          <div>Start building for Free</div>
        </PlausibleLink>
        <PlausibleLink href="https://github.com/authgear/authgear-server" target="_blank" className="tool-popup-button secondary w-inline-block" eventName="tool-github-click">
          <div>Star us on</div>
          <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
        </PlausibleLink>
      </div>
      <div className="tool-popup-close-button-wrapper">
        <PlausibleLink href="#" className="tool-popup-close-button w-button" eventName="popup-close-click">Close</PlausibleLink>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add frontend/components/tools/ToolPopup.tsx
git commit -m "feat: use PlausibleLink in ToolPopup instead of CSS class tracking"
```

---

### Task 7: Update `ToolWidget.tsx` — replace tracked links

**Files:**
- Modify: `frontend/components/tools/ToolWidget.tsx`

Three tracked elements:
- `plausible-event-name--tool-tag-click` on a `<Link href="/">` → convert to `<PlausibleLink>` `'tool-tag-click'`
- `plausible-event-name--tool-banner-click` on a `<Link href="/">` → `'tool-banner-click'`
- `plausible-event-name--tool-github-tag-click` on a `<a>` → `'tool-github-tag-click'`

Note: The two `Link` components use `href="/"` with `target="_blank"` (placeholder links). Since they open in a new tab, there's no client-side navigation benefit — replace with `<PlausibleLink>` `<a>` and drop the `Link` import if no longer needed.

- [ ] **Step 1: Update imports**

Replace:
```tsx
import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
```
With:
```tsx
import type { CSSProperties, ReactNode } from 'react';
import PlausibleLink from '@/components/PlausibleLink';
```

- [ ] **Step 2: Replace tracked `<Link>` at line ~34**

Change:
```tsx
<Link href="/" target="_blank" className="tools-authgear-tag plausible-event-name--tool-tag-click">
  This tool is crafted by Authgear
</Link>
```
To:
```tsx
<PlausibleLink href="/" target="_blank" className="tools-authgear-tag" eventName="tool-tag-click">
  This tool is crafted by Authgear
</PlausibleLink>
```

- [ ] **Step 3: Replace tracked `<Link>` at line ~38**

Change:
```tsx
<Link href="/" target="_blank" className="tools-banner plausible-event-name--tool-banner-click w-inline-block">
```
To:
```tsx
<PlausibleLink href="/" target="_blank" className="tools-banner w-inline-block" eventName="tool-banner-click">
```

(Keep all children `<img>` tags unchanged, close with `</PlausibleLink>`.)

- [ ] **Step 4: Replace tracked `<a>` at line ~57**

Change:
```tsx
<a href="https://github.com/authgear/authgear-server" target="_blank" className="tools-github-tag plausible-event-name--tool-github-tag-click w-inline-block">
```
To:
```tsx
<PlausibleLink href="https://github.com/authgear/authgear-server" target="_blank" className="tools-github-tag w-inline-block" eventName="tool-github-tag-click">
```

(Keep children, close with `</PlausibleLink>`.)

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add frontend/components/tools/ToolWidget.tsx
git commit -m "feat: use PlausibleLink in ToolWidget instead of CSS class tracking"
```

---

### Task 8: Update `ReduceSmsOtpCostPage.tsx` — replace all tracked elements

**Files:**
- Modify: `frontend/components/pages/solutions/ReduceSmsOtpCostPage.tsx`

Six tracked elements:
- `plausible-event-name--signup-calculator` (link, line ~16) → `'signup-calculator'`
- `plausible-event-name--signup-hero` (link, line ~17) → `'signup-hero'`
- `plausible-event-name--calculator-preset` (4 buttons, lines ~160–163) → `'calculator-preset'`
- `plausible-event-name--signup-calculator` (link, line ~233) → `'signup-calculator'`

- [ ] **Step 1: Add imports**

```tsx
import PlausibleLink from '@/components/PlausibleLink';
import PlausibleButton from '@/components/PlausibleButton';
```

- [ ] **Step 2: Replace the two hero CTA tracked links (lines ~16–17)**

Change:
```tsx
<a href="#Saving-Calculator" className="button-primary feature-hero-btn-v2 plausible-event-name--signup-calculator w-button">Calculate My Savings</a>
<a href="https://portal.authgear.com/?utm_source=solutions-enterprise-sso&utm_medium=link&utm_campaign=sign-up" className="features-sign-up-cta link-white plausible-event-name--signup-hero">Get Started Free →</a>
```
To:
```tsx
<PlausibleLink href="#Saving-Calculator" className="button-primary feature-hero-btn-v2 w-button" eventName="signup-calculator">Calculate My Savings</PlausibleLink>
<PlausibleLink href="https://portal.authgear.com/?utm_source=solutions-enterprise-sso&utm_medium=link&utm_campaign=sign-up" className="features-sign-up-cta link-white" eventName="signup-hero">Get Started Free →</PlausibleLink>
```

- [ ] **Step 3: Replace the four calculator preset buttons (lines ~160–163)**

Change:
```tsx
<button className="ag-preset-btn plausible-event-name--calculator-preset">10K</button>
<button className="ag-preset-btn plausible-event-name--calculator-preset active">100K</button>
<button className="ag-preset-btn plausible-event-name--calculator-preset">500K</button>
<button className="ag-preset-btn plausible-event-name--calculator-preset">1M</button>
```
To:
```tsx
<PlausibleButton className="ag-preset-btn" eventName="calculator-preset">10K</PlausibleButton>
<PlausibleButton className="ag-preset-btn active" eventName="calculator-preset">100K</PlausibleButton>
<PlausibleButton className="ag-preset-btn" eventName="calculator-preset">500K</PlausibleButton>
<PlausibleButton className="ag-preset-btn" eventName="calculator-preset">1M</PlausibleButton>
```

- [ ] **Step 4: Replace the bottom CTA tracked link (line ~233)**

Change:
```tsx
<a className="ag-cta-btn plausible-event-name--signup-calculator" href="https://portal.authgear.com">
  Start Saving Now — Free to Get Started →
</a>
```
To:
```tsx
<PlausibleLink className="ag-cta-btn" href="https://portal.authgear.com" eventName="signup-calculator">
  Start Saving Now — Free to Get Started →
</PlausibleLink>
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
cd frontend
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add frontend/components/pages/solutions/ReduceSmsOtpCostPage.tsx
git commit -m "feat: use PlausibleLink/PlausibleButton in ReduceSmsOtpCostPage instead of CSS class tracking"
```

---

### Task 9: Replace raw Plausible `<Script>` with `<PlausibleProvider>` in layout

**Files:**
- Modify: `frontend/app/layout.tsx`

All CSS classes are now gone. The existing custom Plausible script (`pa-sIydDP09Pb5q-XyCWR6Rj.js`) can be replaced. The domain is read from `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — empty string by default for local dev (events fire but Plausible drops them without a matching domain).

- [ ] **Step 1: Add `PlausibleProvider` import**

In `frontend/app/layout.tsx`, add after existing imports:
```tsx
import PlausibleProvider from 'next-plausible';
```

- [ ] **Step 2: Remove the raw Plausible `<Script>` block**

Delete these lines:
```tsx
<Script
  async
  src="https://plausible.io/js/pa-sIydDP09Pb5q-XyCWR6Rj.js"
  strategy="afterInteractive"
/>
```

- [ ] **Step 3: Wrap body content with `<PlausibleProvider>`**

Replace:
```tsx
<body className="bg-neutral-200">
  <NextIntlClientProvider messages={messages}>
```
With:
```tsx
<body className="bg-neutral-200">
  <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? ''}>
    <NextIntlClientProvider messages={messages}>
```

And close `</PlausibleProvider>` just before `</body>`:
```tsx
    </NextIntlClientProvider>
  </PlausibleProvider>
</body>
```

- [ ] **Step 4: Full build check**

```bash
cd frontend
npm run build
```

Expected: build succeeds with no errors

- [ ] **Step 5: Verify script tag in page source**

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000`, view source. You should see a `<script>` tag injected by `next-plausible` with `data-domain=""`. The old `pa-sIydDP09Pb5q-XyCWR6Rj.js` script should be gone.

- [ ] **Step 6: Commit**

```bash
git add frontend/app/layout.tsx
git commit -m "feat: replace raw Plausible script with PlausibleProvider in layout"
```

---

## Spec Coverage Check

- [x] Install `next-plausible` — Task 1
- [x] PlausibleLink and PlausibleButton helpers — Task 2
- [x] `contact-form-submit` event (ContactForm) — Task 3
- [x] `login`, `signup` events (SiteNav) — Task 4
- [x] `signup` event (HomePage) — Task 5
- [x] `tool-popup-signup-click`, `tool-github-click`, `popup-close-click` (ToolPopup) — Task 6
- [x] `tool-tag-click`, `tool-banner-click`, `tool-github-tag-click` (ToolWidget) — Task 7
- [x] `signup-calculator`, `signup-hero`, `calculator-preset` (ReduceSmsOtpCostPage) — Task 8
- [x] PlausibleProvider replaces raw `<Script>` — Task 9 (last, after all CSS classes removed)
- [x] Domain left unset (reads from `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, defaults to `''`) — Task 9
- [x] All `plausible-event-name--*` CSS classes removed — covered per task, script replaced only after
