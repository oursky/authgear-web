# Contact Form Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace ~25 duplicated Webflow form blocks (and their vanilla-JS PageScripts initialization) with a single `ContactForm` React client component that submits via `/api/contact` and uses `intl-tel-input`'s React component for the phone field with GeoIP auto-selection.

**Architecture:** One `'use client'` component (`ContactForm`) owns all form state, validation, and fetch submission. It wraps `useSearchParams` in a `<Suspense>` boundary (Next.js requirement) so it can read URL params for autofill and UTM tracking. Every page that previously duplicated the form block simply renders `<ContactForm />` in place of the old `div.form-block.w-form` block.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `intl-tel-input` v23 npm package (React component + CSS), `/api/contact` route (already exists, accepts JSON).

---

## Context: what exists today

- **`frontend/app/api/contact/route.ts`** — already handles `POST` with JSON body. Accepts: `Name`, `Email`, `Phone`, `Country`, `Company`, `how-hear`, `Use-Case`, `utm_source`, `utm_medium`, `utm_campaign`. Returns `{ success: true }`. **Do not change this file.**
- **`frontend/components/PageScripts.tsx`** — client component that runs vanilla JS strings after hydration. Used solely for intl-tel-input initialization and minor form tweaks. Will be deleted when all form pages are migrated.
- **`frontend/app/layout.tsx`** — loads `intlTelInput.min.js` from CDN as a `beforeInteractive` Script. Remove this once the npm package is used.
- **25 page components** each contain an identical `<div className="form-block w-form">` block plus a `<PageScripts scripts={pageScripts} />` at the bottom. The form block always looks like:

```tsx
<div id="wf-form-Authgear-Talk-with-Us" className="form-block w-form">
  <form id="wf-form-Authgear-Talk-with-Us-2" name="..." method="post" className="contact-form">
    {/* 6 fields */}
    <div className="w-form-formrecaptcha g-recaptcha ..."></div>
    <div className="margin-vertical margin-medium"><input type="submit" .../></div>
  </form>
  <div className="success-message w-form-done"><div>Thank you!...</div></div>
  <div className="error-message w-form-fail"><div>Oops!...</div></div>
</div>
```

---

## File Map

| Action | Path |
|--------|------|
| **Create** | `frontend/components/ContactForm.tsx` |
| **Modify** | `frontend/app/layout.tsx` — remove CDN intl-tel-input Script |
| **Modify** | `frontend/components/pages/ScheduleDemoPage.tsx` |
| **Modify** | `frontend/components/pages/HomePage.tsx` |
| **Modify** | `frontend/components/pages/OncePage.tsx` |
| **Modify** | `frontend/components/pages/WhyAuthgearPage.tsx` |
| **Modify** | `frontend/components/pages/MigrateToAuthgearPage.tsx` |
| **Modify** | `frontend/components/pages/AboutPage.tsx` — remove empty PageScripts |
| **Modify** | `frontend/components/pages/solutions/EnterpriseSsoPage.tsx` |
| **Modify** | `frontend/components/pages/solutions/FrontlineWorkersIdentityPage.tsx` |
| **Modify** | `frontend/components/pages/solutions/B2bSaasAuthenticationPage.tsx` |
| **Modify** | `frontend/components/pages/solutions/CiamSolutionPage.tsx` |
| **Modify** | `frontend/components/pages/solutions/ReduceSmsOtpCostPage.tsx` |
| **Modify** | `frontend/components/pages/solutions/CustomerIdentityAndAccessManagementPage.tsx` |
| **Modify** | `frontend/components/pages/solutions/ExternalIdentityAccessManagementPage.tsx` |
| **Modify** | `frontend/components/pages/features/BiometricAuthenticationPage.tsx` |
| **Modify** | `frontend/components/pages/features/BiometricLoginPage.tsx` |
| **Modify** | `frontend/components/pages/features/IdentitySecurityPage.tsx` |
| **Modify** | `frontend/components/pages/features/MachineToMachineTokenPage.tsx` |
| **Modify** | `frontend/components/pages/features/PasskeysPage.tsx` |
| **Modify** | `frontend/components/pages/features/PasswordlessAuthenticationPage.tsx` |
| **Modify** | `frontend/components/pages/features/SingleSignOnPage.tsx` |
| **Modify** | `frontend/components/pages/features/SmsPasscodePage.tsx` |
| **Modify** | `frontend/components/pages/features/SmsPumpingFraudPage.tsx` |
| **Modify** | `frontend/components/pages/features/SocialLoginPage.tsx` |
| **Delete** | `frontend/components/PageScripts.tsx` |

---

## Task 1: Install `intl-tel-input` npm package

**Files:**
- Modify: `frontend/package.json`

- [ ] **Step 1: Install the package**

```bash
cd frontend
npm install intl-tel-input
```

- [ ] **Step 2: Verify it installed**

```bash
ls node_modules/intl-tel-input/react.js
ls node_modules/intl-tel-input/build/css/intlTelInput.css
```

Both files must exist.

- [ ] **Step 3: Commit**

```bash
cd ..
git add frontend/package.json frontend/package-lock.json
git commit -m "chore: add intl-tel-input npm package for React phone field"
```

---

## Task 2: Create the `ContactForm` component

**Files:**
- Create: `frontend/components/ContactForm.tsx`

This is the core deliverable. It is a `'use client'` component. `useSearchParams` must be wrapped in `<Suspense>` or the build will fail (Next.js enforces this).

- [ ] **Step 1: Create `frontend/components/ContactForm.tsx`**

```tsx
'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import IntlTelInput from 'intl-tel-input/react';
import type { IntlTelInputRef } from 'intl-tel-input/react';
import 'intl-tel-input/build/css/intlTelInput.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') ?? '');
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [howHear, setHowHear] = useState('');
  const [useCase, setUseCase] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const itiRef = useRef<IntlTelInputRef | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phone && !phoneValid) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone || undefined,
          Country: country || undefined,
          Company: company,
          'how-hear': howHear,
          'Use-Case': useCase || undefined,
          utm_source: searchParams.get('utm_source') ?? undefined,
          utm_medium: searchParams.get('utm_medium') ?? undefined,
          utm_campaign: searchParams.get('utm_campaign') ?? undefined,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="success-message w-form-done" style={{ display: 'block' }}>
        <div>Thank you! Your submission has been received!</div>
      </div>
    );
  }

  return (
    <div className="form-block w-form">
      <form onSubmit={handleSubmit} className="contact-form">
        {/* Full Name */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Full Name<span className="text-span-7">*</span>
          </label>
          <input
            className="getdemo-field w-input"
            maxLength={256}
            name="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Work Email */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Work Email<span className="text-span-8">*</span>
          </label>
          <input
            className="getdemo-field w-input"
            maxLength={256}
            name="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number with country picker */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Phone Number<span className="text-span-9">*</span>
          </label>
          <IntlTelInput
            ref={itiRef}
            initOptions={{
              initialCountry: 'auto',
              geoIpLookup: (success, failure) => {
                fetch('https://ipapi.co/json')
                  .then((r) => r.json())
                  .then((data: { country_code?: string }) =>
                    success(data.country_code ?? 'hk')
                  )
                  .catch(() => failure());
              },
              countryOrder: ['hk', 'sg', 'au'],
              placeholderNumberType: 'MOBILE',
              nationalMode: true,
            }}
            onChangeNumber={setPhone}
            onChangeValidity={setPhoneValid}
            onChangeCountry={() => {
              const data = itiRef.current?.getInstance()?.getSelectedCountryData();
              setCountry(data?.name ?? '');
            }}
            inputProps={{
              className: 'getdemo-field w-input',
              required: true,
              name: 'Phone',
            }}
          />
          {phone && !phoneValid && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem' }}>
              Invalid phone number
            </span>
          )}
        </div>

        {/* Company Name */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            Company Name<span className="text-span-10">*</span>
          </label>
          <input
            className="getdemo-field w-input"
            maxLength={256}
            name="Company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* How did you hear */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">
            How did you hear about us?<span className="text-span-10">*</span>
          </label>
          <select
            name="how-hear"
            required
            className="getdemo-field w-select"
            value={howHear}
            onChange={(e) => setHowHear(e.target.value)}
          >
            <option value="" disabled>Select one</option>
            <option value="organic-search">Search Engine</option>
            <option value="llm">AI Tools (e.g. ChatGPT, Gemini, etc)</option>
            <option value="github">GitHub</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Anything else */}
        <div className="margin-vertical margin-small">
          <label className="getdemo-label">Anything else?</label>
          <textarea
            placeholder="Tell us more about your project, needs, timeline"
            maxLength={500}
            name="Use-Case"
            className="get-demo-form-field w-input"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
          />
        </div>

        {status === 'error' && (
          <div className="error-message w-form-fail" style={{ display: 'block' }}>
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        )}

        <div className="margin-vertical margin-medium">
          <input
            type="submit"
            className="getdemo-submit plausible-event-name--contact-form-submit w-button"
            value={status === 'submitting' ? 'Please wait...' : 'Submit'}
            disabled={status === 'submitting'}
          />
        </div>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}
```

- [ ] **Step 2: Type-check and build-check**

```bash
cd frontend && npx tsc --noEmit 2>&1
```

Expected: no errors. If you see `Cannot find module 'intl-tel-input/react'`, the package isn't installed — re-run Task 1.

Then verify the CSS import resolves at build time:

```bash
cd frontend && npm run build 2>&1 | grep -i "intl-tel-input\|css\|error" | head -20
```

If you see `Package path ./build/css/intlTelInput.css is not exported from package`, fix it by adding to `frontend/next.config.ts`:

```ts
// next.config.ts
const nextConfig = {
  // ... existing config ...
  transpilePackages: ['intl-tel-input'],
};
```

Then re-run the build check to confirm it passes.

- [ ] **Step 3: Commit**

```bash
git add frontend/components/ContactForm.tsx
git commit -m "feat: add ContactForm reusable client component with intl-tel-input"
```

---

## Task 3: Replace form in `ScheduleDemoPage` and remove its `PageScripts`

**Files:**
- Modify: `frontend/components/pages/ScheduleDemoPage.tsx`

Read the file first. The surgery is:
1. Delete the `pageScripts` array (lines ~7–72)
2. Delete the `import PageScripts from '@/components/PageScripts';` line
3. Add `import ContactForm from '@/components/ContactForm';`
4. Replace the entire `<div className="w-layout-hflex getdemo-form">...</div>` block (which wraps the `form-block w-form` div) with `<ContactForm />`

- [ ] **Step 1: Read the file**

```bash
# count lines to understand scope
wc -l frontend/components/pages/ScheduleDemoPage.tsx
```

- [ ] **Step 2: Edit `ScheduleDemoPage.tsx`**

Remove the `pageScripts` constant and the `PageScripts` import. Replace the form wrapper with:

```tsx
import ContactForm from '@/components/ContactForm';

// ... inside the JSX, replace:
// <div className="w-layout-hflex getdemo-form">
//   <div id="wf-form-Authgear-Talk-with-Us" className="form-block w-form">
//     ... (the entire old form)
//   </div>
// </div>
// with:
<div className="w-layout-hflex getdemo-form">
  <ContactForm />
</div>
```

Also remove `<PageScripts scripts={pageScripts} />` from the JSX bottom.

- [ ] **Step 3: Type-check**

```bash
cd frontend && npx tsc --noEmit 2>&1
```

Expected: clean.

- [ ] **Step 4: Smoke-test in browser**

With the dev server running (`npm run dev` in `frontend/`), open `http://localhost:3000/schedule-demo`. Verify:
- Form renders with all 6 fields
- Phone field shows the country flag and auto-detects country
- Filling and submitting shows "Thank you!" message (check browser Network tab for the POST to `/api/contact` returning 200)

- [ ] **Step 5: Commit**

```bash
git add frontend/components/pages/ScheduleDemoPage.tsx
git commit -m "refactor(schedule-demo): replace Webflow form with ContactForm component"
```

---

## Task 4: Replace forms in all remaining CTA pages

**Files:** (22 pages — do all in one task, commit once at the end)

```
frontend/components/pages/HomePage.tsx
frontend/components/pages/OncePage.tsx
frontend/components/pages/WhyAuthgearPage.tsx
frontend/components/pages/MigrateToAuthgearPage.tsx
frontend/components/pages/AboutPage.tsx
frontend/components/pages/solutions/EnterpriseSsoPage.tsx
frontend/components/pages/solutions/FrontlineWorkersIdentityPage.tsx
frontend/components/pages/solutions/B2bSaasAuthenticationPage.tsx
frontend/components/pages/solutions/CiamSolutionPage.tsx
frontend/components/pages/solutions/ReduceSmsOtpCostPage.tsx
frontend/components/pages/solutions/CustomerIdentityAndAccessManagementPage.tsx
frontend/components/pages/solutions/ExternalIdentityAccessManagementPage.tsx
frontend/components/pages/features/BiometricAuthenticationPage.tsx
frontend/components/pages/features/BiometricLoginPage.tsx
frontend/components/pages/features/IdentitySecurityPage.tsx
frontend/components/pages/features/MachineToMachineTokenPage.tsx
frontend/components/pages/features/PasskeysPage.tsx
frontend/components/pages/features/PasswordlessAuthenticationPage.tsx
frontend/components/pages/features/SingleSignOnPage.tsx
frontend/components/pages/features/SmsPasscodePage.tsx
frontend/components/pages/features/SmsPumpingFraudPage.tsx
frontend/components/pages/features/SocialLoginPage.tsx
```

The same pattern applies to every file:

**What to find and replace in each file:**

1. Remove `import PageScripts from '@/components/PageScripts';`
2. Remove the entire `pageScripts` / `pageScript` constant declaration (could be named `pageScripts` or `pageScript` — search to confirm)
3. Add `import ContactForm from '@/components/ContactForm';`
4. Replace the `<div id="wf-form-Authgear-Talk-with-Us" className="form-block w-form">...</div>` block (including the success/error divs inside) with `<ContactForm />`
5. Remove `<PageScripts scripts={pageScripts} />` (or `pageScript`) from the JSX

**`AboutPage.tsx` special case:** It has `PageScripts` but its `pageScripts` array is empty and there is no form. Just remove the import and the `<PageScripts>` call — no `ContactForm` needed.

- [ ] **Step 1: Process each file one by one**

For each file: read → edit → verify it has no leftover `pageScripts` references.

Use this pattern to check after editing:
```bash
grep -l "PageScripts\|pageScripts\|form-block w-form\|wf-form-Authgear" \
  frontend/components/pages/*.tsx \
  frontend/components/pages/**/*.tsx 2>/dev/null
```

Expected: no matches (all replaced).

- [ ] **Step 2: Type-check everything**

```bash
cd frontend && npx tsc --noEmit 2>&1
```

Expected: clean. Fix any type errors before continuing.

- [ ] **Step 3: Commit**

```bash
git add frontend/components/pages/
git commit -m "refactor: replace duplicated Webflow form blocks with ContactForm on all CTA pages"
```

---

## Task 5: Remove CDN script and delete `PageScripts`

**Files:**
- Modify: `frontend/app/layout.tsx`
- Delete: `frontend/components/PageScripts.tsx`

- [ ] **Step 1: Verify `PageScripts` has no remaining imports**

```bash
grep -r "PageScripts" frontend/ --include="*.tsx" --include="*.ts"
```

Expected: zero results. If any remain, go back to Task 4 and fix them.

- [ ] **Step 2: Remove the CDN intl-tel-input script from `layout.tsx`**

In `frontend/app/layout.tsx`, find and delete this block:

```tsx
{/* Load before page scripts: Webflow inline scripts use intlTelInput via PageScripts */}
<Script
  src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/intlTelInput.min.js"
  strategy="beforeInteractive"
/>
```

- [ ] **Step 3: Delete `PageScripts.tsx`**

```bash
rm frontend/components/PageScripts.tsx
```

- [ ] **Step 4: Type-check**

```bash
cd frontend && npx tsc --noEmit 2>&1
```

Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add frontend/app/layout.tsx
git add frontend/components/PageScripts.tsx   # git will see it as deleted
git commit -m "chore: remove intl-tel-input CDN script and delete PageScripts"
```

---

## Task 6: Final verification and push

- [ ] **Step 1: Full type-check**

```bash
cd frontend && npx tsc --noEmit 2>&1
```

Expected: clean.

- [ ] **Step 2: Build check**

```bash
cd frontend && npm run build 2>&1 | tail -20
```

Expected: build completes without errors.

- [ ] **Step 3: Manual smoke-test**

Visit these pages in the dev server and verify the form renders and submits:
- `http://localhost:3000/schedule-demo`
- `http://localhost:3000/` (home page CTA section)
- One solutions page, e.g. `http://localhost:3000/solutions/enterprise-sso`
- One features page, e.g. `http://localhost:3000/features/passkeys`

Check in each:
- Phone field loads with flag + GeoIP auto-selection
- Submitting the form POSTs to `/api/contact` (Network tab) with JSON body
- Success message appears after submit

- [ ] **Step 4: Push**

```bash
git push
```
