# Passkey Demo — Layout Redesign Design Spec

**Date:** 2026-06-04
**Status:** Approved design, awaiting implementation plan
**Scope:** Re-compose the UI of the existing `/tools/passkey-demo` React island (`src/components/widgets/passkey-demo/`). No change to the crypto/decoding logic, the routing, or the page chrome.

## Why

The tool currently presents three rigid numbered panels — ① Create, ② Inspect, ③ Sign in — followed by a separate credential list at the bottom. That ordering doesn't match how a person actually uses it: you create a passkey, then you want to *see it*, *poke at it*, and *sign in with it*. The redesign turns the widget into an app-like flow:

> **create a passkey → it appears in the list immediately → click to inspect it inline → sign in with it**

The educational payload (the 7 server-style verification checks) is preserved — it now appears inline under the row you signed in with, instead of in a standalone panel.

## What does NOT change

- All `lib/` logic: `base64url`, `cbor`, `authData`, `coseKey`, `derSignature`, `aaguid`, `createOptions`, `storage`, `errors`, `verifyAssertion`, `inspect`. Reused verbatim. Their unit tests stay green.
- `CreatePanel` behavior (the create form, live options JSON, `navigator.credentials.create()` call, `onCreated` callback). Its option **dropdowns stay plain dropdowns** — the modal treatment is for sign-in's User verification only.
- The page chrome around the widget (`PasskeyDemoPage.tsx`): hero, "How the Passkey Demo Works" steps, Supported Platforms, CTA, FAQ.
- The widget root `data-testid="passkey-demo-widget"` (keeps the Playwright assertion valid), feature detection, and the unsupported-browser / pre-mount placeholder states.
- Widget internals remain **English-only** (per `docs/tool-pages.md` §i18n); no message-bundle changes.
- The recently-fixed styling (Webflow/normalize cascade-layer fixes in `passkey-demo.css`, the custom `Tooltip`, the heading `div role="heading"` pattern, button-wrapper margins).

## New structure (top → bottom inside the widget)

1. **Feature badges** — `Platform authenticator` / `Conditional mediation (autofill UI)`, with the existing custom `Tooltip`. Unchanged.
2. **Create a passkey** — the existing `CreatePanel`, reframed as a titled section (no "1." number). On success it adds the credential to the list and visually highlights the new row.
3. **Your passkeys** — a single section that **replaces** the old standalone Inspect panel, Sign-in panel, and bottom credential list.

The rigid `1 / 2 / 3` numbering is dropped in favor of two clear sections: **Create a passkey** and **Your passkeys**.

### "Your passkeys" section

**Header row:**
- Title **"Your passkeys"**.
- **User verification** control — a button showing the current value (e.g. "User verification: preferred") that opens the **User-verification modal** (below). Applies to all sign-ins.
- **Forget all** — opens the **Forget-all confirmation dialog** (below). Only shown when ≥1 passkey exists.

**Below the header:**
- A secondary button **"Sign in with any passkey"** (the discoverable-credential flow — empty `allowCredentials`) with a small **ⓘ** `Tooltip` carrying the technical detail ("Runs sign-in with an empty allow-list so the browser offers any discoverable passkey for this site").
- The **list** of stored passkeys, or an empty state.

**Empty state** (no stored passkeys): a short line, e.g. "No passkeys yet — create one above."

**Honest note** (always, below the list): "Deleting here removes only this page's record (kept in your browser's localStorage). The passkey itself stays in your keychain or password manager until you remove it there — see the FAQ below for per-OS instructions." (Same copy as today.)

### Passkey row

Collapsed, each row shows:
- User name + algorithm badge (`ES256` / `RS256`).
- Metadata line: `created <date> · uv=<…> · rk=<…> · transports: <…>`.
- Actions: **Sign in** (primary), **Inspect ▾** (secondary toggle), **Delete** (subtle/destructive).

**Inspect ▾ / ▴** toggles an inline **Credential details** block under the row. Contents (decoded via the existing `inspectCredential`):
- `clientDataJSON` (decoded) as a `JsonView`.
- `attestationObject`: `fmt`, flag badges (`FlagBadges`), `signCount`, `AAGUID` + resolved name.
- `rpIdHash` and `credentialId` as `CopyField`s.
- Public key as JWK (`JsonView`) and PEM (`JsonView`), plus the "Try our JWK Generator" link.

Inspect works for **any** stored passkey, including those created in a previous visit (decoded from the stored `attestationObject` / `clientDataJSON`).

**Sign in** runs `navigator.credentials.get()` scoped to that one credential (allow-list of one) using the current User-verification setting, then reveals a **Last sign-in verification** block under the same row: the 7 ordered PASS / FAIL / INFO steps from the existing `verifyAssertion`. On error, a friendly explanation (`explainWebAuthnError`) appears in the row.

The **Credential details** and **Last sign-in verification** blocks are independent — both can be open at once. Signing in does not collapse an open Inspect block.

### Sign in with any passkey (discoverable)

The header button runs `navigator.credentials.get()` with empty `allowCredentials` and the current User-verification setting. On success, the browser returns an assertion; the widget matches its `rawId` to a stored credential, then **highlights and expands that row's verification block**. If the returned credential isn't one of the page's stored demo passkeys, a friendly inline message appears near the button (the existing "no record of this passkey" explanation) — verification needs the stored public key.

## Modals & dialog

A small reusable **`Modal`** primitive (new) backs both overlays:
- Centered card over a dimmed backdrop; `role="dialog"`, `aria-modal="true"`, labelled by its title.
- Closes on: the ✕ button, backdrop click, and `Escape`.
- Focus moves into the dialog on open and is restored to the trigger on close.
- Rendered within the widget (no portal needed); high `z-index`; scoped Tailwind styling consistent with the widget.

**`UserVerificationModal`** (uses `Modal`): title "User verification", a one-line explanation that it sets `userVerification` on `navigator.credentials.get()` and is reflected in the UV flag of the verification steps, then three selectable option cards:
- **Preferred** (tagged *default*) — "Verify with biometric or PIN if the device supports it, but still allow sign-in if it can't. Sensible default for most apps."
- **Required** — "The user must be verified (Face ID / Touch ID / Windows Hello / PIN). If the authenticator can't, the sign-in fails. Use for sensitive actions."
- **Discouraged** — "Skip verification — only confirm someone is present (a tap). Fastest, lowest assurance."
Selecting an option updates the setting; a "Done" button closes. Footer note: "Applies to both Sign in and Sign in with any passkey."

**`ForgetAllDialog`** (uses `Modal`): title "Forget all passkeys?", body explaining it only removes this page's local records and that the device keeps the actual passkeys, then **Cancel** / **Forget all** (destructive) buttons. Confirming clears the store.

Per-row **Delete** stays a single click (no per-item dialog) — it's a single, easily-recreated record; the bulk "Forget all" is the destructive action worth confirming.

## State & component breakdown

State ownership (lifted to the "Your passkeys" orchestration — `PasskeyDemoWidget` or a `usePasskeyList` hook):
- `credentials` — existing `useCredentialStore` (load/add/remove/clear/updateSignCount).
- `userVerification` — the current `UserVerificationRequirement`, applied to all sign-ins.
- `verifications` — map of `credentialId → AssertionVerification` (last result per credential), so both per-row and discoverable sign-ins write to one place.
- `expanded` — set of `credentialId`s with Inspect open.
- `busy` / `error` — for the in-flight sign-in and discoverable flow.
- `uvModalOpen`, `forgetAllOpen` — overlay visibility.

Components:
- **`PasskeyList`** — renders the header (User-verification button → `UserVerificationModal`; Forget all → `ForgetAllDialog`), the "Sign in with any passkey" button + ⓘ tooltip, the rows or empty state, and the honest note. Owns/receives the orchestration handlers.
- **`PasskeyRow`** (presentational) — name/metadata/actions; renders the inline **Credential details** (computed via `inspectCredential`, lazily when expanded) and the **Last sign-in verification** block when a verification result exists for it. Props: the credential, inspect-open flag, this row's verification result (if any), and callbacks (`onToggleInspect`, `onSignIn`, `onDelete`).
- **`Modal`** — the dialog primitive.
- **`UserVerificationModal`**, **`ForgetAllDialog`** — content components built on `Modal`.
- **`CreatePanel`** — unchanged.
- **Removed:** `InspectPanel.tsx`, `SignInPanel.tsx` (their logic moves into `PasskeyRow` + the orchestration). `Panel.tsx` may remain if still used by Create; otherwise removed.
- **Reused:** `JsonView`, `CopyField`, `FlagBadges`, `Tooltip`, all `lib/`, `useCredentialStore`, `useFeatureDetection`, `useClipboard`.

## Accessibility

- Inspect toggle: a `<button>` with `aria-expanded` reflecting state.
- Sign-in / Delete / Forget-all / discoverable: real `<button>`s with `aria-busy` during in-flight work.
- Modal/dialog: `role="dialog"`, `aria-modal`, focus in on open / restore on close, `Escape` to close, labelled by title.
- The User-verification option cards: a radiogroup (`role="radio"` / `aria-checked`) or native radios.
- Verification steps keep the existing PASS/FAIL/INFO semantics and the list `aria-label`.

## Testing

- **Unit:** unchanged `lib/` suite stays green (logic untouched).
- **Playwright** (`tests/phase2d2-tools.spec.ts`): the existing `passkey-demo` route + `[data-testid="passkey-demo-widget"]` assertions still hold. Add a light assertion that the "Your passkeys" section renders.
- **Manual** (localhost is a secure context): create → new row appears highlighted → Inspect expands decoded details → Sign in shows the 7 verification steps inline → "Sign in with any passkey" highlights the matched row → User-verification modal opens/explains/applies → Forget-all dialog confirms and clears. Cross-browser (Safari/Chrome/Firefox + one mobile) remains the pre-launch bar.

## Out of scope

- No change to `lib/` logic, the AAGUID snapshot, routing/registry, or SEO copy.
- No modal treatment for the Create-panel dropdowns (attachment / UV / resident key / attestation stay plain selects).
- No zh-Hant translation of widget internals (English-only for v1, per `docs/tool-pages.md`).
- No backend, account, MDS fetch, or attestation-chain validation (unchanged from the original spec).
