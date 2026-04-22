# Astro Migration — Phase 2a: Core Islands + Home Parity

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `ContactForm` and `LogoMarquee` as React islands, port `/api/contact` as an Astro endpoint, and replace the Phase 1 home-page placeholder divs so the home page reaches full visual + functional parity with the Next.js site.

**Architecture:** Two React islands live under `src/components/islands/`. `ContactForm` hydrates `client:load` (above-the-fold on schedule-demo pages, also used on home). `LogoMarquee` hydrates `client:idle` (CSS-driven, JS only for pause-on-hover — low-priority). `/api/contact` is an Astro endpoint with `prerender = false`, serving as the form's POST target. Islands import the existing Phase 1 `trackEvent()` helper for Plausible; no `next-plausible` dependency.

**Tech Stack:** Astro 5 React islands, `intl-tel-input/react`, `@astrojs/react`, Vitest for endpoint tests, Playwright for browser-level smoke tests.

**Reference:** `docs/ARCHITECTURE-ASTRO.md`, `docs/superpowers/plans/2026-04-21-astro-migration-foundation.md` (Phase 1).

**What this phase does NOT do:** port any page other than `HomePage.astro` updates (ScheduleDemo, which also uses ContactForm, is Phase 2b). Other islands (`SmsCostCalculator`, `OnceSdkCode`, `PricingPageView`, etc.) stay deferred to their respective phases.

**Exit criteria:**

1. `cd frontend-astro && npm run build` succeeds
2. `npm run test:unit` — vitest passes (existing 5 + new `/api/contact` tests)
3. `npm test` — Playwright passes (existing 5 + new home-parity + contact-submit tests)
4. Home page `/` and `/zh-TW/` render with real ContactForm and LogoMarquee — no more `data-placeholder` divs
5. Submitting the contact form with `CONTACT_WEBHOOK_URL` unset returns `200 {success: true}` and logs to stdout
6. Submitting with `CONTACT_WEBHOOK_URL` set POSTs to that URL with the expected payload shape

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── components/
│   │   ├── islands/
│   │   │   ├── ContactForm.tsx        # React island, client:load
│   │   │   └── LogoMarquee.tsx        # React island, client:idle
│   │   └── LogoMarquee.module.css     # Sibling CSS module (co-located per React convention)
│   ├── pages/
│   │   └── api/
│   │       └── contact.ts             # Astro endpoint, prerender = false
│   └── components/pages/
│       └── HomePage.astro             # MODIFY — replace stub divs
└── tests/
    ├── contact-api.spec.ts            # Playwright API-level tests for /api/contact
    └── home-parity.spec.ts            # Playwright smoke — home page with hydrated islands
```

---

## Task 1: `/api/contact` Astro endpoint — failing tests first

**Files:**
- Create: `frontend-astro/tests/contact-api.spec.ts`

- [ ] **Step 1: Write failing API tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/contact-api.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('/api/contact', () => {
  test('POST with valid JSON returns 200 {success:true}', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: {
        Name: 'Test User',
        Email: 'test@example.com',
        Company: 'Example Co',
        'how-hear': 'organic-search',
      },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(resp.status()).toBe(200);
    expect(await resp.json()).toEqual({ success: true });
  });

  test('POST missing Name returns 400', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: { Email: 'x@y.z' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(resp.status()).toBe(400);
  });

  test('POST missing Email returns 400', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: { Name: 'X' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(resp.status()).toBe(400);
  });

  test('POST with unsupported content-type returns 415', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: 'plain text',
      headers: { 'Content-Type': 'text/plain' },
    });
    expect(resp.status()).toBe(415);
  });

  test('POST with form-urlencoded returns 200', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      form: {
        Name: 'Form User',
        Email: 'form@example.com',
        Company: 'Example',
        'how-hear': 'github',
      },
    });
    expect(resp.status()).toBe(200);
  });

  test('GET returns 405', async ({ request }) => {
    const resp = await request.get('/api/contact');
    expect(resp.status()).toBe(405);
  });
});
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/contact-api.spec.ts --reporter=line 2>&1 | tail -10
```

Expected: 6 failures, all 404 (endpoint doesn't exist yet). This confirms the tests are wired up and hit the server.

- [ ] **Step 3: Commit the failing tests**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/contact-api.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): failing tests for /api/contact endpoint"
```

---

## Task 2: Implement `/api/contact` endpoint

**Files:**
- Create: `frontend-astro/src/pages/api/contact.ts`

- [ ] **Step 1: Write the endpoint**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/api/contact.ts`:

```ts
import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactFormData {
  Name?: string;
  Email?: string;
  Phone?: string;
  Country?: string;
  Company?: string;
  'how-hear'?: string;
  'Use-Case'?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });

export const POST: APIRoute = async ({ request }) => {
  let data: ContactFormData;

  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    data = (await request.json()) as ContactFormData;
  } else if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await request.formData();
    data = Object.fromEntries(formData.entries()) as ContactFormData;
  } else {
    return new Response(JSON.stringify({ error: 'Unsupported content type' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!data.Name || !data.Email) {
    return new Response(JSON.stringify({ error: 'Name and Email are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'authgear-website-contact',
        }),
      });
      if (!res.ok) {
        console.error('Webhook delivery failed:', res.status, await res.text());
      }
    } catch (err) {
      console.error('Webhook error:', err);
    }
  } else {
    console.info('[contact-form]', JSON.stringify(data));
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

- [ ] **Step 2: Build + run tests — expect pass**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/contact-api.spec.ts --reporter=line 2>&1 | tail -10
```

Expected: 6 passed.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/api/contact.ts
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): implement /api/contact endpoint"
```

---

## Task 3: Port `LogoMarquee` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/LogoMarquee.tsx`
- Create: `frontend-astro/src/components/islands/LogoMarquee.module.css`

- [ ] **Step 1: Copy the CSS module verbatim**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/LogoMarquee.module.css \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/LogoMarquee.module.css
```

- [ ] **Step 2: Port the component**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/LogoMarquee.tsx`. The component is stateless and server-renderable; the `client:idle` directive only matters for the pause-on-hover CSS reset when JS becomes interactive. Content matches the Next version except for removing the Next-specific import nothing (the source has none — it's pure React).

```tsx
import styles from './LogoMarquee.module.css';

const DEFAULT_CUSTOMER_LOGOS = [
  { src: '/images/logo-CIMIC2x.png', alt: 'CIMIC' },
  { src: '/images/logo-HKL2x.png', alt: 'HKL' },
  { src: '/images/logo-hkpc2x.png', alt: 'HKPC' },
  { src: '/images/logo-K112x.png', alt: 'K11' },
  { src: '/images/logo-MTR2x.png', alt: 'MTR' },
  { src: '/images/logo-outback2x.png', alt: 'Outback' },
  { src: '/images/logo-cornerstone2x.png', alt: 'Cornerstone' },
  { src: '/images/logo-place2x.png', alt: 'PLACE' },
] as const;

export const ONCE_SDK_MARQUEE_LOGOS = [
  { src: '/images/once_build-for-developer-lang-01-react.svg', alt: 'React' },
  { src: '/images/once_build-for-developer-lang-02-vue.svg', alt: 'Vue.js' },
  { src: '/images/once_build-for-developer-lang-03-angular.svg', alt: 'Angular' },
  { src: '/images/once_build-for-developer-lang-06-flutter.svg', alt: 'Flutter' },
  { src: '/images/once_build-for-developer-lang-07-ios.svg', alt: 'iOS' },
  { src: '/images/once_build-for-developer-lang-08-android.svg', alt: 'Android' },
] as const;

interface Props {
  readStoryLabel?: string;
  logos?: ReadonlyArray<{ src: string; alt: string }>;
  showReadStoryCta?: boolean;
  rootClassName?: string;
  logoImgClassName?: string;
  customerStoriesHref?: string;
}

export default function LogoMarquee({
  readStoryLabel = 'Read customer story',
  logos: logosProp,
  showReadStoryCta = true,
  rootClassName = 'w-layout-hflex flex-block-85',
  logoImgClassName = 'logo',
  customerStoriesHref = '/customer-stories',
}: Props) {
  const logos = logosProp ?? DEFAULT_CUSTOMER_LOGOS;

  return (
    <div className={`${rootClassName} ${styles.root}`}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <div className={styles.logosStrip}>
            {logos.map((logo) => (
              <img
                key={logo.src}
                loading="lazy"
                src={logo.src}
                alt={logo.alt}
                className={logoImgClassName}
              />
            ))}
            {logos.map((logo, idx) => (
              <img
                key={`loop-${logo.src}-${idx}`}
                loading="lazy"
                src={logo.src}
                alt=""
                aria-hidden
                className={`${logoImgClassName} ${styles.duplicateLogo}`}
              />
            ))}
          </div>
        </div>
        {showReadStoryCta ? (
          <a
            href={customerStoriesHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-block-7 w-inline-block ${styles.ctaLink}`}
          >
            <div>{readStoryLabel}</div>
            <img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
```

**Notable changes from the Next version:**
- Added `customerStoriesHref` prop (default `/customer-stories`). Why: the Next version hardcoded the path, but we need to pass `localizedPath(locale, '/customer-stories')` from the .astro parent so the zh-TW home link goes to `/zh-TW/customer-stories`. Prop default preserves existing behavior if omitted.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/LogoMarquee.tsx frontend-astro/src/components/islands/LogoMarquee.module.css
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port LogoMarquee as React island"
```

---

## Task 4: Port `ContactForm` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/ContactForm.tsx`

- [ ] **Step 1: Ensure intl-tel-input is available**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm install intl-tel-input
```

Note: the Next project has this pinned; grab the same major version to avoid surprises.

```bash
grep intl-tel-input /Users/fung/dev/authgear-web/frontend/package.json
```

Use the version shown (likely `^26.8.1`).

- [ ] **Step 2: Write the island**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/ContactForm.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import IntlTelInput from 'intl-tel-input/react';
import type { IntlTelInputRef } from 'intl-tel-input/react';
import type { Iso2 } from 'intl-tel-input/data';
import 'intl-tel-input/build/css/intlTelInput.css';
import { trackEvent } from '@/lib/plausible';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Props {
  /** Optional: override the POST target (default `/api/contact`). */
  action?: string;
}

function getQueryParam(key: string): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get(key) ?? '';
}

export default function ContactForm({ action = '/api/contact' }: Props) {
  // Pre-fill name / email from query string (e.g. ?name=…&email=…) — match Next behavior
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [howHear, setHowHear] = useState('');
  const [useCase, setUseCase] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const itiRef = useRef<IntlTelInputRef | null>(null);

  useEffect(() => {
    setName(getQueryParam('name'));
    setEmail(getQueryParam('email'));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackEvent('contact-form-submit');
    if (phone && !phoneValid) return;
    setStatus('submitting');
    try {
      const res = await fetch(action, {
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
          utm_source: getQueryParam('utm_source') || undefined,
          utm_medium: getQueryParam('utm_medium') || undefined,
          utm_campaign: getQueryParam('utm_campaign') || undefined,
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
                    success((data.country_code ?? 'hk') as Iso2)
                  )
                  .catch(() => failure());
              },
              countryOrder: (['hk', 'sg', 'au'] as const) as unknown as Iso2[],
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
            className="getdemo-submit w-button"
            value={status === 'submitting' ? 'Please wait...' : 'Submit'}
            disabled={status === 'submitting'}
          />
        </div>
      </form>
    </div>
  );
}
```

**Key differences from the Next version:**
- `useSearchParams` from `next/navigation` → `getQueryParam()` helper reading `window.location.search` inside a `useEffect` (avoids SSR mismatch; runs only in the browser).
- `usePlausible` from `next-plausible` → `trackEvent` from `@/lib/plausible` (Phase 1 helper).
- Removed the `<Suspense>` wrapper — it existed in the Next version because `useSearchParams` requires suspense during SSR. Astro's React islands only render client-side; no suspense needed.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/ContactForm.tsx frontend-astro/package.json frontend-astro/package-lock.json
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port ContactForm as React island"
```

---

## Task 5: Wire real islands into HomePage.astro

**Files:**
- Modify: `frontend-astro/src/components/pages/HomePage.astro`

- [ ] **Step 1: Find the placeholders**

```bash
grep -n "data-placeholder" /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/HomePage.astro
```

Expected: two matches — one `ContactForm` stub, one `LogoMarquee` stub.

- [ ] **Step 2: Add imports to the frontmatter**

Edit `frontend-astro/src/components/pages/HomePage.astro`. In the frontmatter block (between the `---` fences at the top), add these imports after the existing ones:

```ts
import ContactForm from '@/components/islands/ContactForm';
import LogoMarquee from '@/components/islands/LogoMarquee';
```

- [ ] **Step 3: Replace the LogoMarquee placeholder**

Find this line in HomePage.astro:

```astro
<div data-placeholder="LogoMarquee" aria-label="Logo marquee (pending port)"></div>
```

Replace with:

```astro
<LogoMarquee
  client:idle
  customerStoriesHref={localizedPath(locale, '/customer-stories')}
  readStoryLabel={t(locale, 'Home.readCustomerStory')}
/>
```

If `Home.readCustomerStory` doesn't exist in the message JSON, fall back to the hardcoded default by omitting the `readStoryLabel` prop. Check first:

```bash
grep -n "readCustomerStory" /Users/fung/dev/authgear-web/frontend-astro/src/i18n/en.json
```

If missing, use `<LogoMarquee client:idle customerStoriesHref={localizedPath(locale, '/customer-stories')} />` and the component default will apply.

- [ ] **Step 4: Replace the ContactForm placeholder**

Find this line:

```astro
<div data-placeholder="ContactForm" data-locale={locale} aria-label="Contact form (pending port)"></div>
```

Replace with:

```astro
<ContactForm client:load />
```

The `locale` prop isn't needed — the form is label-hardcoded in English per the Next source. When Phase 2b adds translated form labels, we'll update here.

- [ ] **Step 5: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Expected: build succeeds. `/` and `/zh-TW/` prerender cleanly.

- [ ] **Step 6: Verify no placeholders remain**

```bash
grep -n "data-placeholder" /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/HomePage.astro || echo "clean"
```

Expected: `clean`.

- [ ] **Step 7: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/HomePage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): wire real ContactForm + LogoMarquee islands into HomePage"
```

---

## Task 6: Playwright smoke tests for home parity

**Files:**
- Create: `frontend-astro/tests/home-parity.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/home-parity.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('home page parity — islands hydrate', () => {
  test('LogoMarquee renders customer logos', async ({ page }) => {
    await page.goto('/');
    // Eight customer logos + 8 duplicated for loop = 16 <img> with class "logo"
    const logos = page.locator('img.logo');
    await expect(logos.first()).toBeVisible();
    expect(await logos.count()).toBeGreaterThanOrEqual(8);
  });

  test('LogoMarquee CTA links to customer stories', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a.link-block-7').first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/customer-stories');
  });

  test('LogoMarquee CTA on zh-TW links to localized path', async ({ page }) => {
    await page.goto('/zh-TW/');
    const cta = page.locator('a.link-block-7').first();
    await expect(cta).toHaveAttribute('href', '/zh-TW/customer-stories');
  });

  test('ContactForm hydrates — fields are interactive', async ({ page }) => {
    await page.goto('/');
    // Wait for client:load hydration — the Name input is the first form field
    const nameInput = page.locator('input[name="Name"]').first();
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Hydration Test');
    await expect(nameInput).toHaveValue('Hydration Test');
  });

  test('no placeholder divs remain', async ({ page }) => {
    await page.goto('/');
    const placeholders = page.locator('[data-placeholder]');
    expect(await placeholders.count()).toBe(0);
  });
});

test.describe('contact form submits end-to-end', () => {
  test('submitting valid form reaches /api/contact and shows success', async ({ page }) => {
    await page.goto('/');

    await page.locator('input[name="Name"]').first().fill('E2E User');
    await page.locator('input[name="Email"]').first().fill('e2e@example.com');
    await page.locator('input[name="Company"]').first().fill('Example');
    await page.locator('select[name="how-hear"]').first().selectOption('github');

    // Phone field uses intl-tel-input — skip for this smoke test by NOT filling it.
    // The form treats Phone as required via IntlTelInput's HTML required attr, which
    // will prevent submission. To bypass in tests, remove `required` via JS:
    await page.evaluate(() => {
      const phoneInput = document.querySelector('input[name="Phone"]') as HTMLInputElement | null;
      if (phoneInput) phoneInput.removeAttribute('required');
    });

    const responsePromise = page.waitForResponse('**/api/contact');
    await page.locator('input[type="submit"]').first().click();
    const resp = await responsePromise;

    expect(resp.status()).toBe(200);
    await expect(page.getByText('Thank you! Your submission has been received!')).toBeVisible();
  });
});
```

- [ ] **Step 2: Run tests — expect pass**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/home-parity.spec.ts --reporter=line 2>&1 | tail -20
```

Expected: 6 passed. If the contact-form E2E test fails because of intl-tel-input's extra validation, read the failure and adjust the `page.evaluate` block — some versions of intl-tel-input attach a hidden validation input that also needs bypassing. Report DONE_WITH_CONCERNS if it's not straightforward.

- [ ] **Step 3: Run the full test suite — ensure nothing regressed**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -15
```

Expected: 17 passed (5 existing + 6 contact-api + 6 home-parity).

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/home-parity.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for home page parity + contact submit"
```

---

## Task 7: Update docs

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README phase status**

In `/Users/fung/dev/authgear-web/frontend-astro/README.md`, find the "Phase status" section and update:

```markdown
## Phase status

- [x] Phase 1 — Foundation
- [x] Phase 2a — Core islands + home parity (ContactForm, LogoMarquee, /api/contact)
- [ ] Phase 2b — Simple static marketing pages (~13 pages)
- [ ] Phase 2c — Dynamic subtrees (features, solutions, compare — ~33 pages)
- [ ] Phase 2d — Tools subtree + SMS calculator
- [ ] Phase 2e — Once page + Pricing page
- [ ] Phase 3 — CMS-backed pages (blog, customer stories, etc.)
- [ ] Phase 4 — Fly.io deployment + cutover
```

- [ ] **Step 2: Update ARCHITECTURE-ASTRO.md status line**

In `/Users/fung/dev/authgear-web/docs/ARCHITECTURE-ASTRO.md`, find the line starting with `**Migration status`. Update it to:

```markdown
**Migration status (2026-04-21):** Phases 1 + 2a shipped on branch `migration/nextjs-to-astro`. Home page reaches full parity with Next.js (islands hydrated, form submits). Phase 2b (simple static pages) plan pending. See `docs/superpowers/plans/`.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2a complete — home parity shipped"
```

---

## Phase 2a complete

Verification gate before Phase 2b:

1. `npm run build` succeeds
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — 17 passed (5 existing + 6 contact-api + 6 home-parity)
4. Manual: `PORT=3000 npm start`, open `http://localhost:3000/` — form fields are interactive, logos animate, form submits successfully (reveals "Thank you!" message). Repeat for `/zh-TW/` — CTA link points at `/zh-TW/customer-stories`.
5. No `data-placeholder` divs anywhere in the rendered HTML.

If all pass, Phase 2b planning begins.

---

## Phases 2b–2e outline (detailed plans to be written after 2a ships)

### Phase 2b: Simple static marketing pages

Port these components + their routes. All pure `.astro` ports — no islands, no API.

| Route | Source component |
|---|---|
| `/about` | `AboutPage.tsx` |
| `/why-authgear` | `WhyAuthgearPage.tsx` |
| `/promises` | `PromisesPage.tsx` |
| `/data-privacy` | `DataPrivacyPage.tsx` |
| `/auth-toolkit` | `AuthToolkitPage.tsx` |
| `/migrate-to-authgear` | `MigrateToAuthgearPage.tsx` |
| `/glossary` | `GlossaryPage.tsx` |
| `/schedule-demo` | `ScheduleDemoPage.tsx` (uses ContactForm — already done in 2a) |
| `/terms` | `TermsPage.tsx` |
| `/terms-of-enterprise-license` | `TermsEnterprisePage.tsx` |
| `/policy` | `PolicyPage.tsx` |
| `/security` | `SecurityPage.tsx` |
| `/sla` | `SlaPage.tsx` |

Each gets two route files: `src/pages/<slug>.astro` (en) and `src/pages/zh-TW/<slug>.astro`. Same one-liner pattern as home.

### Phase 2c: Dynamic subtrees (features, solutions, compare)

33 pages total, all using the dynamic `[slug]` route pattern. Key files to port:
- `src/pages/features/[slug].astro` + zh-TW mirror
- `src/pages/solutions/[slug].astro` + zh-TW mirror
- `src/pages/compare/[slug].astro` + zh-TW mirror
- Each uses `getStaticPaths()` to enumerate slugs
- Each imports the corresponding `<FeatureXyzPage>`/`<SolutionXyzPage>`/`<CompareXyzPage>` component
- Shared tab components (`BiometricMethodsTabs`, `MfaOptionsTabs`) become React islands
- `features/_meta.json` (SEO title/description per slug) — port to a typed data file

### Phase 2d: Tools subtree + SMS calculator

9 developer tool pages + the SMS calculator. Most tools use shared components (`ToolHero`, `ToolFaq`, `ToolFeatureCards`, `ToolHowItWorks`, `ToolPopup`, `ToolWidget`). The actual tool logic (`ToolWidget`) varies per tool — some are pure presentational, some are interactive islands (base64, JWT debugger, etc.).

### Phase 2e: Once page + Pricing page

Two big interactive pages:
- **Once** (`OncePage.tsx`, 504 lines) uses `OnceSdkCode`, `OnceSdkFrameworkHarness`, `OncePageFaq` — framework tab switcher + FAQ accordion. All become islands.
- **Pricing** (`PricingPageClient.tsx` + `PricingPageView.tsx` + `PricingFaqAccordion.tsx`) uses structured copy data in `lib/pricing/copy-en.ts` + `copy-zh-TW.ts`. Port the data verbatim; the toggle + accordion become islands.
