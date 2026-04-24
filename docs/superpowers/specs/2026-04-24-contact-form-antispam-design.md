# Contact-form antispam: honeypot + Cloudflare Turnstile

**Status:** Draft — pending user approval.
**Date:** 2026-04-24.

## Context

The site's contact form (`src/components/islands/ContactForm.tsx`) POSTs JSON to `/api/contact` (`src/pages/api/contact.ts`), which forwards to `CONTACT_WEBHOOK_URL`. The form is mounted on Home, About, Schedule Demo, Promises, Migrate-to-Authgear, and several feature pages. Today the endpoint validates only that `Email` is present (and `Name` for the full variant) before forwarding — there is no antispam.

Observed situation: **moderate-volume targeted spam** — plausible-looking submissions that form-stuffing bots produce. A honeypot alone will not stop this; a proper challenge is warranted.

## Goals

1. Stop the bulk of form-stuffing submissions before they reach the webhook.
2. Keep the happy path invisible for real users — no checkbox or image challenge in the common case.
3. Preserve local-dev ergonomics — devs can run the form without registering Cloudflare credentials.
4. Keep failure modes clear: unambiguous prod behaviour when env vars are missing.

## Non-goals

- IP-based rate limiting. Reserved for a later iteration if honeypot + Turnstile prove insufficient.
- Protecting endpoints other than `/api/contact` (nothing else forwards user input to a webhook today).
- Replacing the existing webhook transport.
- Bot-detection heuristics beyond honeypot + Turnstile (e.g. user-agent sniffing, timing analysis).

## Approach

Two layers, both verified server-side at `/api/contact`:

1. **Honeypot** — a hidden text input the user cannot fill. Bots that auto-fill every visible field tend to fill common honeypot names too.
2. **Cloudflare Turnstile in managed mode** — Cloudflare decides whether to challenge; invisible for users who pass their signals, a minimal widget when challenged. Server verifies the token with Cloudflare before forwarding to the webhook.

Managed mode is chosen over invisible mode: invisible relies purely on silent scoring and false-rejects more often; managed is Cloudflare's recommended default.

## Client changes (`src/components/islands/ContactForm.tsx`)

### Honeypot field

Rendered inside the form, anywhere before the submit button:

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

`position: absolute; left: -9999px` (rather than `display: none`) is used deliberately — some aggressive scrapers skip `display:none` fields, while the off-screen technique still gets filled. The field is also `aria-hidden` and out of the tab order so assistive tech and keyboard users don't encounter it.

### Turnstile widget

Using the `@marsidev/react-turnstile` wrapper (~2 KB, mirrors the official script's lifecycle):

- Site key from `import.meta.env.PUBLIC_TURNSTILE_SITE_KEY`.
- Rendered just above the submit button.
- Mode: managed (the default — no explicit `appearance` override).
- `onSuccess(token)` → `setTurnstileToken(token)`.
- `onExpire()` and `onError()` → clear the token and disable submit until a fresh token is issued.
- On form submit: include `cfTurnstileToken: turnstileToken` in the POST body; if no token yet, block submit and surface the existing generic `submitError` copy.

If `PUBLIC_TURNSTILE_SITE_KEY` is unset at build time (dev without credentials), the widget is not rendered and `cfTurnstileToken` is omitted from the payload — the server side handles this cleanly (see below).

## Server changes (`src/pages/api/contact.ts`)

Order of operations in the `POST` handler, after content-type parsing:

1. **Honeypot check.** If `data.website` is a non-empty string → log `[contact-form] spam: honeypot` with the payload, and return `200 { success: true }`. The bot sees success and does not retry; the webhook is never called.
2. **Turnstile verify.** If `TURNSTILE_SECRET_KEY` is set:
   - If `data.cfTurnstileToken` is missing → `400 { error: "Verification failed, please retry." }`.
   - POST `{ secret, response: cfTurnstileToken, remoteip }` (form-encoded) to `https://challenges.cloudflare.com/turnstile/v0/siteverify`, timeout 5 s.
   - On network/timeout error → `503 { error: "Please retry in a moment." }`; log the reason.
   - On response `success !== true` → `400` as above; log `error-codes` from the response.
3. **Env-var guard.** If `TURNSTILE_SECRET_KEY` is unset:
   - In production (`import.meta.env.PROD === true`) → `503`, log `missing TURNSTILE_SECRET_KEY`.
   - Otherwise → log a warning and continue (dev ergonomics).
4. **Existing field validation.** Unchanged (`Email` required; `Name` required when `formType` is absent).
5. **Webhook forward.** Unchanged, except `website` and `cfTurnstileToken` are stripped from the forwarded payload (they're operational, not business data).

The client-facing 400 error message is intentionally generic so it does not hint at which gate rejected the request.

## Env vars

Add to `.env.example`:

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

## Failure modes

| Scenario | Client response | Server log |
|---|---|---|
| Honeypot filled | `200 { success: true }` | `[contact-form] spam: honeypot` |
| Turnstile token missing (secret configured) | `400 "Verification failed, please retry."` | `[contact-form] reject: missing turnstile token` |
| Turnstile token invalid / expired | `400` (same) | `[contact-form] reject: turnstile error-codes=[...]` |
| Turnstile verify endpoint unreachable / timeout | `503 "Please retry in a moment."` | `[contact-form] turnstile verify error: <reason>` |
| `TURNSTILE_SECRET_KEY` unset in prod | `503` | `[contact-form] missing TURNSTILE_SECRET_KEY in production` |
| `TURNSTILE_SECRET_KEY` unset in dev | continues to webhook | `[contact-form] TURNSTILE_SECRET_KEY unset — skipping verification (dev only)` |

## Testing

- **Unit (`vitest`, new file `src/pages/api/contact.test.ts`).** Mock `fetch` to stub the Cloudflare verify endpoint.
  - Honeypot non-empty → returns 200; webhook `fetch` not called.
  - Turnstile secret set, token missing → 400.
  - Token invalid (stubbed `success: false`) → 400, webhook not called.
  - Token valid → webhook called once with expected payload; `website` and `cfTurnstileToken` absent from the forwarded body.
  - Verify endpoint rejects (500) → 503.
  - Prod + secret unset → 503.
  - Dev + secret unset → 200 (with warning log asserted).
- **E2E (`playwright`, extend `tests/smoke.spec.ts`).** Playwright's webServer build already sets `PUBLIC_GTM_ID=GTM-TEST0000`; extend that command to also set the Turnstile test keys (`PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` and `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA`). Fill the contact form, submit, assert a success response.

## Dependencies

- `@marsidev/react-turnstile` (new runtime dep, MIT, ~2 KB).
- No new dev deps.

## Rollout plan

1. Land the change behind env vars. Prod already has `CONTACT_WEBHOOK_URL` in Fly secrets; add `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` alongside.
2. If either var is missing in Fly at merge time, prod starts returning 503 on `POST /api/contact` — so secrets must be set **before** merging. This parallels the GTM and Google-Site-Verification pattern already established.
3. Observe spam levels for a week. If honeypot catches are high and Turnstile blocks are low, the honeypot is doing the work. If Turnstile blocks dominate, we know targeted spam is the real threat.
4. Follow-up (separate design if warranted): IP rate limiting via a shared in-memory store or Fly's built-in edge rate limit, plus request-size limit middleware.

## Open questions

None at this time.
