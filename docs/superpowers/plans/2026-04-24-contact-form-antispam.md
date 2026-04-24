# Contact-form Antispam Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add honeypot + Cloudflare Turnstile antispam to the `/api/contact` endpoint and every `ContactForm` mount point, without breaking local dev.

**Architecture:** Two layers verified server-side at `/api/contact`: (1) a hidden `website` honeypot field; (2) a Cloudflare Turnstile widget (managed mode) whose token is POSTed with the form and verified against `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Verification is factored into pure helpers so the endpoint stays thin and the helpers are unit-testable under vitest. Existing Playwright `/api/contact` tests are extended rather than replaced.

**Tech Stack:** Astro 5 SSR endpoint, React 19 island, vitest (unit), Playwright (E2E), `@marsidev/react-turnstile` (new dep).

**Spec:** [`docs/superpowers/specs/2026-04-24-contact-form-antispam-design.md`](../specs/2026-04-24-contact-form-antispam-design.md)

---

## File structure

**New:**
- `src/pages/api/_contact-helpers.ts` — pure helpers: `isHoneypotFilled`, `verifyTurnstile`, `stripOperationalFields`. The `_` prefix keeps Astro from treating it as a route.
- `src/pages/api/_contact-helpers.test.ts` — vitest unit tests for the helpers.

**Modified:**
- `src/pages/api/contact.ts` — wire helpers in; env-gate behaviour.
- `src/components/islands/ContactForm.tsx` — add honeypot input + Turnstile widget.
- `.env.example` — document `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- `playwright.config.ts` — pass Turnstile test keys to the webServer build.
- `tests/contact-api.spec.ts` — existing cases must send `cfTurnstileToken: 'test-ok'`; add reject-path cases.
- `package.json` — add `@marsidev/react-turnstile` dep.

---

### Task 1: Env vars + dependency install

**Files:**
- Modify: `.env.example`
- Modify: `package.json` + `package-lock.json` (via npm)

- [ ] **Step 1: Add env-var docs to `.env.example`**

Append after the existing `PUBLIC_GOOGLE_SITE_VERIFICATION` block:

```env

# Cloudflare Turnstile (contact-form antispam).
# Create a site in your Cloudflare dashboard → Turnstile. Copy the site key
# (public, baked into the browser bundle) and secret key (server-only, kept
# out of the bundle).
#
# When both are unset: in dev, the server logs a warning and skips
# verification so local form submits still work. In production, the server
# returns 503 until the secret is set — fail closed.
#
# Always-pass test keys for CI / smoke tests (documented by Cloudflare):
#   PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
#   TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

- [ ] **Step 2: Install the React Turnstile wrapper**

Run: `npm install @marsidev/react-turnstile`
Expected: exit 0, one new dependency added.

- [ ] **Step 3: Commit**

```bash
git add .env.example package.json package-lock.json
git commit -m "chore(antispam): add Turnstile env vars + react wrapper dep"
```

---

### Task 2: Helper module skeleton

**Files:**
- Create: `src/pages/api/_contact-helpers.ts`
- Create: `src/pages/api/_contact-helpers.test.ts`

- [ ] **Step 1: Create the helper file with stub exports**

File `src/pages/api/_contact-helpers.ts`:

```ts
/**
 * Antispam helpers for /api/contact. Kept separate from the route so
 * they're unit-testable under vitest without booting Astro.
 */

export interface TurnstileVerifyResult {
  ok: boolean;
  /** Present only on failure. Cloudflare's error-codes array, or a single string for local errors. */
  errorCodes?: string[];
  /** True when the local verify call itself failed (network/timeout), not a Cloudflare reject. */
  transportError?: boolean;
}

/**
 * Return true if the honeypot `website` field is non-empty on the submitted payload.
 * Real users never fill it — the input is off-screen, tabIndex=-1, aria-hidden.
 */
export function isHoneypotFilled(data: Record<string, unknown>): boolean {
  const v = data['website'];
  return typeof v === 'string' && v.trim().length > 0;
}

/**
 * Verify a Turnstile token with Cloudflare's siteverify endpoint.
 * Uses AbortController to cap the call at 5s.
 */
export async function verifyTurnstile(
  token: string | undefined,
  secret: string,
  remoteip: string | undefined,
  fetchImpl: typeof fetch = fetch
): Promise<TurnstileVerifyResult> {
  if (!token) {
    return { ok: false, errorCodes: ['missing-input-response'] };
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteip) body.set('remoteip', remoteip);
    const res = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
    });
    if (!res.ok) {
      return { ok: false, transportError: true, errorCodes: [`http-${res.status}`] };
    }
    const json = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (json.success === true) return { ok: true };
    return { ok: false, errorCodes: json['error-codes'] ?? ['unknown-failure'] };
  } catch (err) {
    return {
      ok: false,
      transportError: true,
      errorCodes: [err instanceof Error ? err.name : 'unknown-error'],
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Return a copy of `data` with operational fields (`website`, `cfTurnstileToken`)
 * removed. Used before forwarding to the webhook so they don't leak into CRM.
 */
export function stripOperationalFields<T extends Record<string, unknown>>(data: T): Partial<T> {
  const { website: _w, cfTurnstileToken: _t, ...rest } = data as Record<string, unknown>;
  return rest as Partial<T>;
}
```

- [ ] **Step 2: Create the empty test file (tests added per helper in following tasks)**

File `src/pages/api/_contact-helpers.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('_contact-helpers', () => {
  it('file loads', () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 3: Run the test file to confirm wiring**

Run: `npx vitest run src/pages/api/_contact-helpers.test.ts`
Expected: 1 passed.

- [ ] **Step 4: Commit**

```bash
git add src/pages/api/_contact-helpers.ts src/pages/api/_contact-helpers.test.ts
git commit -m "feat(antispam): add contact-form helper module skeleton"
```

---

### Task 3: Honeypot helper (TDD)

**Files:**
- Test: `src/pages/api/_contact-helpers.test.ts`
- (helper already exists from Task 2; this task locks it in with tests)

- [ ] **Step 1: Add failing tests for `isHoneypotFilled`**

Replace the placeholder test with:

```ts
import { describe, it, expect } from 'vitest';
import { isHoneypotFilled } from './_contact-helpers';

describe('isHoneypotFilled', () => {
  it('returns false when `website` is absent', () => {
    expect(isHoneypotFilled({ Name: 'A', Email: 'a@b.co' })).toBe(false);
  });

  it('returns false when `website` is an empty string', () => {
    expect(isHoneypotFilled({ website: '' })).toBe(false);
  });

  it('returns false when `website` is whitespace-only', () => {
    expect(isHoneypotFilled({ website: '   ' })).toBe(false);
  });

  it('returns false when `website` is a non-string (e.g. number)', () => {
    expect(isHoneypotFilled({ website: 0 as unknown as string })).toBe(false);
  });

  it('returns true when `website` is a non-empty string', () => {
    expect(isHoneypotFilled({ website: 'http://bot.example' })).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests**

Run: `npx vitest run src/pages/api/_contact-helpers.test.ts`
Expected: 5 passed (helper already implemented in Task 2).

- [ ] **Step 3: Commit**

```bash
git add src/pages/api/_contact-helpers.test.ts
git commit -m "test(antispam): honeypot helper"
```

---

### Task 4: Turnstile verify helper (TDD)

**Files:**
- Test: `src/pages/api/_contact-helpers.test.ts`

- [ ] **Step 1: Append failing tests for `verifyTurnstile`**

Add at the bottom of `src/pages/api/_contact-helpers.test.ts`:

```ts
import { verifyTurnstile } from './_contact-helpers';

function okResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('verifyTurnstile', () => {
  it('returns ok:false with missing-input-response when token is undefined', async () => {
    const fetchSpy = async () => okResponse({ success: true });
    const result = await verifyTurnstile(undefined, 'secret', '1.2.3.4', fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.errorCodes).toEqual(['missing-input-response']);
  });

  it('returns ok:true when Cloudflare says success', async () => {
    const fetchSpy = async () => okResponse({ success: true });
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(true);
  });

  it('returns ok:false and passes through error-codes on Cloudflare reject', async () => {
    const fetchSpy = async () => okResponse({ success: false, 'error-codes': ['invalid-input-response'] });
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.errorCodes).toEqual(['invalid-input-response']);
    expect(result.transportError).toBeUndefined();
  });

  it('returns transportError:true on non-2xx Cloudflare response', async () => {
    const fetchSpy = async () => new Response('', { status: 502 });
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.transportError).toBe(true);
    expect(result.errorCodes).toEqual(['http-502']);
  });

  it('returns transportError:true when fetch throws', async () => {
    const fetchSpy = async () => {
      throw new Error('boom');
    };
    const result = await verifyTurnstile('tok', 'secret', undefined, fetchSpy as unknown as typeof fetch);
    expect(result.ok).toBe(false);
    expect(result.transportError).toBe(true);
  });

  it('POSTs the expected form body to the Cloudflare endpoint', async () => {
    let captured: { url?: string; init?: RequestInit } = {};
    const fetchSpy = async (url: string, init?: RequestInit) => {
      captured = { url, init };
      return okResponse({ success: true });
    };
    await verifyTurnstile('tok-123', 'secret-abc', '8.8.8.8', fetchSpy as unknown as typeof fetch);
    expect(captured.url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    const body = captured.init?.body as URLSearchParams;
    expect(body.get('secret')).toBe('secret-abc');
    expect(body.get('response')).toBe('tok-123');
    expect(body.get('remoteip')).toBe('8.8.8.8');
  });
});
```

- [ ] **Step 2: Run the tests**

Run: `npx vitest run src/pages/api/_contact-helpers.test.ts`
Expected: all tests passed (helper already implemented in Task 2).

- [ ] **Step 3: Commit**

```bash
git add src/pages/api/_contact-helpers.test.ts
git commit -m "test(antispam): Turnstile verify helper"
```

---

### Task 5: `stripOperationalFields` helper (TDD)

**Files:**
- Test: `src/pages/api/_contact-helpers.test.ts`

- [ ] **Step 1: Append failing tests**

Append at the bottom of the test file:

```ts
import { stripOperationalFields } from './_contact-helpers';

describe('stripOperationalFields', () => {
  it('removes website and cfTurnstileToken, keeps everything else', () => {
    const input = {
      Name: 'A',
      Email: 'a@b.co',
      website: 'spam',
      cfTurnstileToken: 'abc',
      utm_source: 'x',
    };
    const result = stripOperationalFields(input);
    expect(result).toEqual({ Name: 'A', Email: 'a@b.co', utm_source: 'x' });
  });

  it('is a no-op when neither field is present', () => {
    const input = { Name: 'A', Email: 'a@b.co' };
    expect(stripOperationalFields(input)).toEqual(input);
  });
});
```

- [ ] **Step 2: Run the tests**

Run: `npx vitest run src/pages/api/_contact-helpers.test.ts`
Expected: all tests passed.

- [ ] **Step 3: Commit**

```bash
git add src/pages/api/_contact-helpers.test.ts
git commit -m "test(antispam): stripOperationalFields helper"
```

---

### Task 6: Wire helpers into `/api/contact.ts`

**Files:**
- Modify: `src/pages/api/contact.ts`

- [ ] **Step 1: Rewrite the route to use the helpers and env-gate behaviour**

Replace `src/pages/api/contact.ts` with:

```ts
import type { APIRoute } from 'astro';
import { isHoneypotFilled, verifyTurnstile, stripOperationalFields } from './_contact-helpers';

export const prerender = false;

interface ContactFormData {
  Name?: string;
  Email?: string;
  Phone?: string;
  Country?: string;
  Company?: string;
  'how-hear'?: string;
  'Use-Case'?: string;
  formType?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  /** Path + search of the page the submission came from (e.g. "/zh-Hant/about"). */
  page?: string;
  /** UI locale the form was rendered in ("en" or "zh-Hant"). */
  locale?: string;
  /** Honeypot — must be empty. */
  website?: string;
  /** Cloudflare Turnstile token. */
  cfTurnstileToken?: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
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
    return json({ error: 'Unsupported content type' }, 415);
  }

  // 1. Honeypot — silent 200 to avoid tipping off bots.
  if (isHoneypotFilled(data as Record<string, unknown>)) {
    console.info('[contact-form] spam: honeypot', JSON.stringify(data));
    return json({ success: true }, 200);
  }

  // 2. Turnstile verify (env-gated).
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const result = await verifyTurnstile(data.cfTurnstileToken, turnstileSecret, clientAddress);
    if (!result.ok) {
      if (result.transportError) {
        console.error('[contact-form] turnstile verify error:', result.errorCodes);
        return json({ error: 'Please retry in a moment.' }, 503);
      }
      console.info('[contact-form] reject: turnstile', result.errorCodes);
      return json({ error: 'Verification failed, please retry.' }, 400);
    }
  } else if (process.env.NODE_ENV === 'production') {
    console.error('[contact-form] missing TURNSTILE_SECRET_KEY in production');
    return json({ error: 'Please retry in a moment.' }, 503);
  } else {
    console.warn('[contact-form] TURNSTILE_SECRET_KEY unset — skipping verification (dev only)');
  }

  // 3. Existing field validation.
  if (!data.Email) {
    return json({ error: 'Email is required.' }, 400);
  }
  if (!data.formType && !data.Name) {
    return json({ error: 'Name and Email are required.' }, 400);
  }

  // 4. Forward to webhook (strip operational fields).
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const forwardBody = stripOperationalFields(data as Record<string, unknown>);
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...forwardBody,
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
    console.info('[contact-form]', JSON.stringify(forwardBody));
  }

  return json({ success: true }, 200);
};
```

- [ ] **Step 2: Verify the build still compiles**

Run: `npm run build`
Expected: `[build] Complete!` with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/api/contact.ts
git commit -m "feat(antispam): wire honeypot + Turnstile into /api/contact"
```

---

### Task 7: Client honeypot field

**Files:**
- Modify: `src/components/islands/ContactForm.tsx`

- [ ] **Step 1: Add honeypot state and input**

In `ContactForm.tsx`, add a state hook near the other `useState` calls (around line 87):

```tsx
const [honeypot, setHoneypot] = useState('');
```

Add the body of the request to include `website: honeypot || undefined`:

Find the `body: JSON.stringify({ ... })` block starting around line 105 and add the honeypot line. The edit is to the object literal — add this one line among the existing fields:

```tsx
          website: honeypot || undefined,
```

Add the hidden input inside the form, immediately after the opening `<form>` element (look for the existing `handleSubmit` binding). The input must be off-screen, not `display:none`:

```tsx
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: `[build] Complete!`

- [ ] **Step 3: Commit**

```bash
git add src/components/islands/ContactForm.tsx
git commit -m "feat(antispam): add honeypot field to ContactForm"
```

---

### Task 8: Client Turnstile widget

**Files:**
- Modify: `src/components/islands/ContactForm.tsx`

- [ ] **Step 1: Import the Turnstile component + site key**

Near the top of `ContactForm.tsx`, add:

```tsx
import { Turnstile } from '@marsidev/react-turnstile';
```

- [ ] **Step 2: Add Turnstile state and render the widget**

Add alongside the other state hooks:

```tsx
const [turnstileToken, setTurnstileToken] = useState('');
const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '';
```

In `handleSubmit`, before the existing `phoneValid` check, block submit when the widget is configured but has no token yet:

```tsx
  if (turnstileSiteKey && !turnstileToken) {
    setStatus('error');
    return;
  }
```

In the body JSON (same place as honeypot insertion), add:

```tsx
          cfTurnstileToken: turnstileToken || undefined,
```

Just above the submit `<button>` inside the form JSX, add the widget:

```tsx
        {turnstileSiteKey && (
          <div className="ds-form__turnstile" style={{ marginTop: 12 }}>
            <Turnstile
              siteKey={turnstileSiteKey}
              onSuccess={(t) => setTurnstileToken(t)}
              onExpire={() => setTurnstileToken('')}
              onError={() => setTurnstileToken('')}
            />
          </div>
        )}
```

After a successful submit, reset the token so a second submit requires a new challenge. Find the existing `setStatus(res.ok ? 'success' : 'error')` call and replace it with:

```tsx
      setStatus(res.ok ? 'success' : 'error');
      setTurnstileToken('');
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: `[build] Complete!`

- [ ] **Step 4: Commit**

```bash
git add src/components/islands/ContactForm.tsx
git commit -m "feat(antispam): render Turnstile widget in ContactForm"
```

---

### Task 9: Playwright webServer + existing test updates

**Files:**
- Modify: `playwright.config.ts`
- Modify: `tests/contact-api.spec.ts`

- [ ] **Step 1: Add Turnstile test keys to the Playwright webServer env**

In `playwright.config.ts`, change the `webServer.command` from:

```ts
    command: `PUBLIC_GTM_ID=GTM-TEST0000 npm run build && PORT=${PORT} npm start`,
```

to:

```ts
    command:
      `PUBLIC_GTM_ID=GTM-TEST0000 ` +
      `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA ` +
      `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA ` +
      `npm run build && ` +
      `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA ` +
      `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA ` +
      `PORT=${PORT} npm start`,
```

The secrets must be present both at build and at runtime because the site key is inlined by Vite at build and the secret is read from `process.env` at request time.

- [ ] **Step 2: Add a test helper for the valid-token payload**

At the top of `tests/contact-api.spec.ts`, just after the imports:

```ts
// Cloudflare's always-pass test secret accepts any token string.
const VALID_TOKEN = 'test-ok';
```

Add `cfTurnstileToken: VALID_TOKEN` to the `data:` block of every existing test that expects a 200 or 400 from a validation-layer concern. Specifically:

- "POST with valid JSON returns 200 {success:true}" → add `cfTurnstileToken: VALID_TOKEN`
- "POST missing Name returns 400" → add `cfTurnstileToken: VALID_TOKEN`
- "POST missing Email returns 400" → add `cfTurnstileToken: VALID_TOKEN`
- "POST with form-urlencoded returns 200" → add `cfTurnstileToken: VALID_TOKEN` in the `form:` block.

The unsupported-content-type test does not need a token — it fails before the honeypot/Turnstile checks.

- [ ] **Step 3: Run the existing tests to confirm green**

Run: `npx playwright test tests/contact-api.spec.ts`
Expected: all existing cases pass.

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts tests/contact-api.spec.ts
git commit -m "test(antispam): thread Turnstile test keys + token through contact API tests"
```

---

### Task 10: New Playwright reject-path tests

**Files:**
- Modify: `tests/contact-api.spec.ts`

- [ ] **Step 1: Add honeypot + Turnstile reject tests**

Append inside the existing `test.describe('/api/contact', …)` block:

```ts
  test('POST with filled honeypot returns 200 but does not forward (silent)', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: {
        Name: 'Spam Bot',
        Email: 'spam@bot.example',
        website: 'http://bot.example',
        cfTurnstileToken: VALID_TOKEN,
      },
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    });
    // Silent pass-through: bot sees success, webhook not called.
    expect(resp.status()).toBe(200);
    expect(await resp.json()).toEqual({ success: true });
  });

  test('POST missing Turnstile token returns 400', async ({ request }) => {
    const resp = await request.post('/api/contact', {
      data: { Name: 'X', Email: 'x@y.z' },
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    });
    expect(resp.status()).toBe(400);
    const body = await resp.json();
    expect(body.error).toMatch(/Verification failed/i);
  });
```

- [ ] **Step 2: Run the new tests**

Run: `npx playwright test tests/contact-api.spec.ts`
Expected: all tests pass (existing + the two new ones).

- [ ] **Step 3: Commit**

```bash
git add tests/contact-api.spec.ts
git commit -m "test(antispam): add honeypot + missing-token reject paths"
```

---

### Task 11: Final verification + PR

**Files:**
- No changes; verification only.

- [ ] **Step 1: Run unit tests**

Run: `npm run test:unit -- src/pages/api/_contact-helpers.test.ts`
Expected: all tests pass.

- [ ] **Step 2: Run Playwright suite**

Run: `npx playwright test tests/contact-api.spec.ts tests/smoke.spec.ts`
Expected: all tests pass.

- [ ] **Step 3: Manual sanity check (local)**

```bash
PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA \
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA \
npm run dev
```

Open http://localhost:4321/schedule-demo, fill + submit the form, confirm the Turnstile widget renders and submission succeeds.

- [ ] **Step 4: Push and open PR**

```bash
git push -u origin feat/contact-form-antispam-spec
gh pr create --title "feat(antispam): honeypot + Cloudflare Turnstile on /api/contact" \
  --body-file docs/superpowers/specs/2026-04-24-contact-form-antispam-design.md
```

The PR description should also note the ops action: **prod must set `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Fly before merge, or `/api/contact` will 503.**

---

## Self-review notes

- **Spec coverage:** honeypot (Tasks 3, 7, 10), Turnstile verify (Tasks 4, 6, 8, 9, 10), env-gate / fail-closed / fail-open (Task 6), env-var docs (Task 1), payload stripping (Tasks 5, 6), test strategy unit + E2E (Tasks 3–5 + 9–10).
- **Placeholders:** none. Every code block is complete.
- **Type consistency:** `TurnstileVerifyResult` shape used identically in tests (Task 4) and route (Task 6). Body field names (`website`, `cfTurnstileToken`) consistent across client, server, tests. Honeypot value check: `trim().length > 0` in helper (Task 2) matches tests' whitespace-only case (Task 3).
- **Deferred:** IP rate limiting — explicitly out of scope per spec.
