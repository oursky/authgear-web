# Passkey Demo & WebAuthn Tester — Design Spec

**Date**: 2026-06-03
**Status**: Approved design, awaiting implementation
**New page**: `/tools/passkey-demo` (en) and `/zh-hant/tools/passkey-demo`
**Implementation pattern**: Self-hosted React island — follow **Path B** in [docs/tool-pages.md](../../tool-pages.md). No iframe.

## Why this tool exists

Tools drive ~55% of authgear.com entry traffic, and the site has nine passkey/WebAuthn blog articles but no passkey tool. This tool is the "try it live" hub for that cluster, a link-earning asset (webauthn.io became a standard reference this way), and a citation target for AI Overviews.

SEO targets (Ahrefs, US, June 2026):

| Keyword | Volume/mo | KD | Notes |
|---|---|---|---|
| passkey demo | 150 | 10 | primary — slug match |
| webauthn demo | 90 | 21 | TP 2,000 — cover in title |
| passkey test / tester | 110 | 38 | secondary |
| webauthn test / debugger | 80 | — | secondary |

Do NOT target "passkey generator" (KD 84 — password-manager giants own that SERP).

## Critical architecture decision (already made — do not revisit)

The tool runs **first-party on www.authgear.com** as a React island. It must NOT be built as an iframe widget on authgear.github.io like the older tools, because WebAuthn credentials bind to the origin that creates them. An iframe version would create passkeys for `authgear.github.io`, which would make the inspector misleading and break the demo's credibility. First-party also avoids cross-origin `publickey-credentials-create/get` permissions-policy issues (patchy in Safari).

There is no backend. All logic is client-side: challenges are generated in the browser, and signature verification is done in-browser with WebCrypto. This is a feature — the page must state plainly that nothing is transmitted or stored outside the visitor's browser, with a link to this repo as proof.

## Page anatomy

Standard tools-page shell (see `src/components/pages/tools/HmacPage.tsx` for the page-component pattern, but render the interactive island inline instead of `ToolWidget`):

1. `ToolHero` — H1 + hero description (see SEO copy below)
2. **The interactive tool** (three panels, described next)
3. Privacy/policy line — all computation in-browser, nothing leaves the device, link to source
4. `MoreDevTools`
5. "How it works" steps section
6. Supported platforms section
7. `ToolReadyTo` CTA
8. FAQ (`ToolFaq` components)
9. `ToolPopup`

## The interactive tool — three panels

### Panel 1: Create a passkey

- Button: "Create a passkey" → `navigator.credentials.create()`
- RP: `{ id: "www.authgear.com", name: "Authgear Passkey Demo" }`. User identity: an editable display name (default e.g. `demo-user`), random 16-byte user ID generated client-side.
- Options the visitor can toggle, with the resulting `PublicKeyCredentialCreationOptions` JSON rendered live as they change:
  - `authenticatorSelection.authenticatorAttachment`: unset / `platform` / `cross-platform`
  - `authenticatorSelection.userVerification`: `preferred` (default) / `required` / `discouraged`
  - `authenticatorSelection.residentKey`: `preferred` (default) / `required` / `discouraged`
  - `pubKeyCredParams`: ES256 (-7) always; RS256 (-257) toggleable
  - `attestation`: `none` (default) / `direct`
- Challenge: random 32 bytes, generated client-side, displayed in the JSON.

### Panel 2: Inspect the credential

Shown immediately after creation (and selectable for any stored credential):

- **clientDataJSON** decoded: `type`, `challenge`, `origin`
- **attestationObject** CBOR-decoded:
  - `fmt`
  - `authData` parsed: rpIdHash, flags as labelled badges (UP, UV, BE, BS, AT), signCount, AAGUID, credentialId
  - AAGUID → authenticator name lookup from a small bundled JSON list (use the community-maintained passkey-authenticator-aaguids dataset; bundle a static snapshot, no runtime fetching)
- **Public key** displayed as JWK and PEM, with a link to the [JWK Generator](/tools/jwk-generator)
- Every binary field viewable as base64url with a copy button

### Panel 3: Sign in with it

- Button: "Sign in with your passkey" → `navigator.credentials.get()` with `allowCredentials` from stored credentials (or empty for a discoverable-credential flow — offer both via a toggle)
- After assertion, render the verification steps a real server would perform, each with a pass/fail badge:
  1. `clientDataJSON.type` is `webauthn.get`
  2. challenge matches the one issued
  3. origin is `https://www.authgear.com`
  4. rpIdHash matches SHA-256 of `www.authgear.com`
  5. UP/UV flags as requested
  6. **signature verifies** against the stored public key (WebCrypto `verify`, ES256 and RS256; note ES256 WebAuthn signatures are ASN.1/DER — convert to raw r‖s for WebCrypto)
  7. signCount progression noted (with an explanation that many passkey providers always report 0)

### Credential storage & management

- Persist created credential metadata (credentialId, public key JWK, user display name, creation options summary, transports) in `localStorage` under one namespaced key.
- A "Your demo passkeys" list with per-item delete and a clear-all. Honest copy: deleting here removes only this page's record — the passkey itself stays in the visitor's keychain/password manager until removed there (link to per-OS instructions in the FAQ).

### Feature detection & errors

- On mount: if `window.PublicKeyCredential` is absent, replace the panels with a friendly unsupported-browser message and the supported-platforms matrix.
- Also surface (as informational badges): `isUserVerifyingPlatformAuthenticatorAvailable()`, `isConditionalMediationAvailable()`.
- Handle and explain: `NotAllowedError` (user cancelled / timeout), `InvalidStateError` (credential already exists for this account — suggest deleting or changing user name), `SecurityError`, generic fallback. Error explanations are part of the educational value — write them as teaching moments, not raw errors.

## Implementation notes

- **Follow Path B of docs/tool-pages.md exactly**: folder layout, page wiring, the mandatory CSS scoping script, webflow-collision reset, and the testing checklist there.
- Messages: `src/lib/tools/messages/en/passkeyDemo.ts` + `zh-Hant` counterpart, registered per the i18n section of tool-pages.md. zh-Hant terminology: use **通行密鑰** consistently for "passkey" (the existing blog translations mix 金鑰/通行密鑰/密鑰 — do not copy that).
- CBOR: write a minimal inline decoder (attestation objects use a small CBOR subset: maps, byte strings, text strings, ints, arrays). ~100 lines. No CBOR dependency.
- No new runtime dependencies are expected at all; WebCrypto + TextDecoder + DataView cover everything.
- WebAuthn works on `localhost` (secure-context exception) — local dev and Playwright testing need no special setup. For automated tests, Chrome DevtoolsProtocol virtual authenticator can be used if e2e coverage is wanted; manual cross-browser testing (Safari + Chrome + Firefox, plus one mobile) is the minimum bar before launch.
- Slug registration: `tools-registry.ts`, `src/pages/tools/[slug].astro`, `src/pages/zh-hant/tools/[slug].astro`. Sitemap is automatic.

## SEO copy requirements

- **metaTitle**: `Passkey Demo & WebAuthn Tester — Try Passkeys in Your Browser`
- **metaDescription**: lead with: create a real passkey, inspect the credential, verify a sign-in — all locally in the browser, nothing sent to any server.
- **Hero description** (the first crawlable text): a self-contained 2–3 sentence definition of what the tool does, naming WebAuthn, passkey creation, credential inspection, and browser-only computation. This is the AI-Overview-citable extract — same playbook as the June 2026 HMAC hero rewrite.
- "How it works" steps: 4–5 steps mirroring the three panels.
- FAQ (frontmatter-style Q&A in the messages file, rendered via ToolFaq): What is WebAuthn? Is it safe to create a passkey here? How do I delete the demo passkey from my device (per-OS)? What is an AAGUID? Why does the sign count show 0?
- Internal links **into** the tool (separate content PRs after launch): "try it live" callouts on the passkey article cluster — at minimum `passkey-vs-password-why-passkeys-are-the-future-of-security`, `how-to-implement-passkeys-developer-guide`, `passkeys-compatibility`, `what-is-fido2-complete-guide-fido-authentication`.
- Internal links **out of** the tool: how-to-implement-passkeys guide, `/features/passkeys` (the ToolReadyTo CTA), JWK Generator from the inspector panel.

## Out of scope — do not build

- No backend or server-side verification of any kind
- No account system, no email capture
- No live FIDO MDS fetching (static bundled AAGUID list only)
- No custom cross-device QR flows (the browser's native hybrid transport UI handles cross-device)
- No attestation chain validation (display `fmt` and note that real servers may validate further)

## Success criteria

- Top-5 ranking for "passkey demo" and "webauthn demo" within ~3 months of launch
- 300+ monthly entry visitors by month 3 (comparable to the OIDC Discovery Explorer trajectory)
- Tool page bounce/duration in line with other tools (≤60% bounce, ≥60s)
- Each passkey-cluster article links to the tool; the tool earns external referring domains over time
