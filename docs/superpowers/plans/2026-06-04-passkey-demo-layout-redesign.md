# Passkey Demo — Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-compose the `/tools/passkey-demo` widget into an app-like flow — create a passkey → it appears in a "Your passkeys" list immediately → click *Inspect* to decode it inline → click *Sign in* to run the ceremony and see the 7 verification steps inline — replacing the old three numbered panels (Create / Inspect / Sign in) + bottom list.

**Architecture:** Pure UI re-composition. All `lib/` crypto/decoding logic is reused unchanged. The standalone `InspectPanel`/`SignInPanel`/`CredentialList` are replaced by a `PasskeyList` (orchestration: per-row + discoverable sign-in, user-verification setting, verification results, forget-all) composed of `PasskeyRow`s (each with an inline `CredentialDetails` accordion and a `VerificationSteps` block). A small reusable `Modal` backs the user-verification picker and the forget-all confirm dialog.

**Tech Stack:** Astro 6, React 19, TypeScript (strict), Tailwind 4 utilities, WebCrypto/WebAuthn. Widget internals are English-only (per `docs/tool-pages.md`).

**Branch:** `feat/passkey-demo-tool` (current). The spec is committed at `docs/superpowers/specs/2026-06-04-passkey-demo-layout-redesign-design.md`.

**Testing note:** The widget's interactive pieces call browser-only APIs (`navigator.credentials`, WebCrypto) that aren't available in the Vitest/node environment, so — consistent with how this widget's UI was originally built — **UI tasks gate on `npm run check` (typecheck), not unit tests.** The pure `lib/` logic already has full unit tests and is untouched here. The final task adds a Playwright assertion, a production build, and a manual checklist.

**Cascade-layer reminder (this codebase):** Tailwind utilities live in a cascade layer; the site's `normalize.css` (and Webflow globals) are unlayered and beat layered utilities on bare elements. The widget already handles this — `pre`/`code` font-size and `label` margins are re-asserted in `passkey-demo.css`, headings use `div role="heading"`, and button top-margins live on wrapper `<div>`s. Follow those same patterns; don't put a `mt-*` directly on a `<button>` and expect it to win.

---

## File structure

```
src/components/widgets/passkey-demo/
├── PasskeyDemoWidget.tsx          # MODIFY — render CreatePanel + PasskeyList; drop Inspect/SignIn panels
├── passkey-demo.css               # unchanged
├── components/
│   ├── Panel.tsx                  # MODIFY — make `step` optional (title-only section)
│   ├── CreatePanel.tsx            # MODIFY (1 line) — drop the step number
│   ├── CredentialDetails.tsx      # CREATE — inline decoded-credential block (from InspectPanel body)
│   ├── VerificationSteps.tsx      # CREATE — the PASS/FAIL/INFO list (from SignInPanel body)
│   ├── Modal.tsx                  # CREATE — accessible dialog primitive
│   ├── UserVerificationModal.tsx  # CREATE — UV picker (uses Modal)
│   ├── ForgetAllDialog.tsx        # CREATE — confirm dialog (uses Modal)
│   ├── PasskeyRow.tsx             # CREATE — one passkey row (lazy inspect + verification)
│   ├── PasskeyList.tsx            # CREATE — header + discoverable + rows + orchestration
│   ├── InspectPanel.tsx           # DELETE
│   ├── SignInPanel.tsx            # DELETE
│   ├── CredentialList.tsx         # DELETE
│   ├── JsonView.tsx               # unchanged (reused)
│   ├── CopyField.tsx              # unchanged (reused)
│   ├── FlagBadges.tsx             # unchanged (reused)
│   └── Tooltip.tsx                # unchanged (reused)
├── hooks/                         # unchanged (reused)
└── lib/                           # unchanged (reused)
tests/phase2d2-tools.spec.ts       # MODIFY — assert the "Your passkeys" section renders
```

Run typecheck with `npm run check` (expect `0 errors, 0 warnings` plus pre-existing hints). Run the lib unit suite (should stay green, untouched) with `npm run test:unit`.

---

### Task 1: Make `Panel.step` optional; drop the number on Create

**Files:**
- Modify: `src/components/widgets/passkey-demo/components/Panel.tsx`
- Modify: `src/components/widgets/passkey-demo/components/CreatePanel.tsx`

- [ ] **Step 1: Make `step` optional in Panel**

Replace the whole body of `src/components/widgets/passkey-demo/components/Panel.tsx` with:

```tsx
import type { ReactNode } from 'react';

interface Props {
  /** Optional leading step number. Omit for a plain titled section. */
  step?: number;
  title: string;
  children: ReactNode;
}

export default function Panel({ step, title, children }: Props) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* role=heading instead of <h3>: Webflow's unlayered global h3 rule
          (32px / 700 / brand color) would otherwise beat Tailwind's layered
          utilities on a bare <h3>. A <div> has no competing global rule. */}
      <div role="heading" aria-level={3} className="flex items-center gap-3 text-lg font-semibold text-slate-900 mb-4">
        {step !== undefined && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm">
            {step}
          </span>
        )}
        {title}
      </div>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Drop the step number on the Create panel**

In `src/components/widgets/passkey-demo/components/CreatePanel.tsx`, change the opening Panel tag:

```tsx
    <Panel step={1} title="Create a passkey">
```
to:
```tsx
    <Panel title="Create a passkey">
```

- [ ] **Step 3: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 4: Commit**

```bash
git add src/components/widgets/passkey-demo/components/Panel.tsx src/components/widgets/passkey-demo/components/CreatePanel.tsx
git commit -m "refactor(passkey-demo): make Panel step optional; drop number on Create"
```

---

### Task 2: Extract `CredentialDetails`

**Files:**
- Create: `src/components/widgets/passkey-demo/components/CredentialDetails.tsx`

This is the decoded-credential block lifted verbatim from `InspectPanel`'s body, turned into a component that takes a `CredentialInspection`. (InspectPanel still exists and works until Task 9 — this new component is unused for now, which compiles fine.)

- [ ] **Step 1: Create the component**

```tsx
// src/components/widgets/passkey-demo/components/CredentialDetails.tsx
import type { ReactNode } from 'react';
import JsonView from './JsonView';
import CopyField from './CopyField';
import FlagBadges from './FlagBadges';
import type { CredentialInspection } from '../lib/inspect';

function Row({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="w-28 shrink-0 font-medium text-slate-600">{name}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

/** The decoded credential, shown inline under a passkey row when Inspect is open. */
export default function CredentialDetails({ inspection }: { inspection: CredentialInspection }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div role="heading" aria-level={4} className="mb-1 text-sm font-semibold text-slate-900">clientDataJSON (decoded)</div>
        <JsonView value={inspection.clientData} />
      </div>

      <div>
        <div role="heading" aria-level={4} className="mb-2 text-sm font-semibold text-slate-900">attestationObject (CBOR-decoded)</div>
        <dl className="flex flex-col gap-2 text-sm">
          <Row name="fmt">
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.fmt}</code>
            <span className="ml-2 text-xs text-slate-500">
              A real server may validate the attestation statement further; this demo displays it only.
            </span>
          </Row>
          <Row name="flags">
            <FlagBadges flags={inspection.flags} />
          </Row>
          <Row name="signCount">{inspection.signCount}</Row>
          <Row name="AAGUID">
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.aaguid ?? 'n/a'}</code>
            {inspection.aaguid && (
              <span className="ml-2 text-xs text-slate-500">
                {inspection.aaguidName ?? 'Unknown authenticator'}
              </span>
            )}
          </Row>
        </dl>
        <div className="mt-3 flex flex-col gap-2">
          <CopyField label="rpIdHash" value={inspection.rpIdHash} />
          {inspection.credentialId && <CopyField label="credentialId" value={inspection.credentialId} />}
        </div>
      </div>

      {inspection.publicKeyJwk && (
        <div>
          <div role="heading" aria-level={4} className="mb-1 text-sm font-semibold text-slate-900">
            Public key (JWK{inspection.alg !== null && <> — COSE alg {inspection.alg}</>})
          </div>
          <JsonView value={inspection.publicKeyJwk} />
          {inspection.publicKeyPem && (
            <>
              <div role="heading" aria-level={4} className="mb-1 mt-4 text-sm font-semibold text-slate-900">Public key (PEM)</div>
              <JsonView value={inspection.publicKeyPem} />
            </>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Want to generate and convert keys like this?{' '}
            <a className="underline" href="/tools/jwk-generator">
              Try our JWK Generator
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/CredentialDetails.tsx
git commit -m "refactor(passkey-demo): extract CredentialDetails block"
```

---

### Task 3: Extract `VerificationSteps`

**Files:**
- Create: `src/components/widgets/passkey-demo/components/VerificationSteps.tsx`

The PASS/FAIL/INFO list lifted from `SignInPanel`'s result rendering. Drops the "Signed in as …" intro line — the row already shows the user name and the block carries its own "Last sign-in verification" label.

- [ ] **Step 1: Create the component**

```tsx
// src/components/widgets/passkey-demo/components/VerificationSteps.tsx
import type { AssertionVerification } from '../lib/verifyAssertion';

/** The ordered server-style checks shown after a sign-in. */
export default function VerificationSteps({ verification }: { verification: AssertionVerification }) {
  return (
    <ul aria-label="Server verification steps" className="flex flex-col gap-2">
      {verification.steps.map((s) => (
        <li key={s.id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
          <span
            className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
              s.info
                ? 'bg-sky-50 text-sky-700'
                : s.pass
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
            }`}
          >
            {s.info ? 'INFO' : s.pass ? 'PASS' : 'FAIL'}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900">{s.label}</div>
            <div className="mt-0.5 text-xs text-slate-500">{s.detail}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/VerificationSteps.tsx
git commit -m "refactor(passkey-demo): extract VerificationSteps list"
```

---

### Task 4: `Modal` primitive

**Files:**
- Create: `src/components/widgets/passkey-demo/components/Modal.tsx`

Accessible dialog: dim backdrop, centered card, `role="dialog"` + `aria-modal`, close on ✕ / backdrop / Escape, focus moved in on open and restored on close.

- [ ] **Step 1: Create the component**

```tsx
// src/components/widgets/passkey-demo/components/Modal.tsx
import { useEffect, useId, useRef, type ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: Props) {
  const titleId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = (document.activeElement as HTMLElement) ?? null;
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl outline-none"
      >
        <div className="mb-2 flex items-start justify-between gap-4">
          <div id={titleId} role="heading" aria-level={2} className="text-base font-semibold text-slate-900">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/Modal.tsx
git commit -m "feat(passkey-demo): accessible Modal primitive"
```

---

### Task 5: `UserVerificationModal`

**Files:**
- Create: `src/components/widgets/passkey-demo/components/UserVerificationModal.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/widgets/passkey-demo/components/UserVerificationModal.tsx
import Modal from './Modal';

const OPTIONS: { value: UserVerificationRequirement; label: string; tag?: string; desc: string }[] = [
  {
    value: 'preferred',
    label: 'Preferred',
    tag: 'default',
    desc: 'Verify with biometric or PIN if the device supports it, but still allow sign-in if it can’t. Sensible default for most apps.',
  },
  {
    value: 'required',
    label: 'Required',
    desc: 'The user must be verified (Face ID / Touch ID / Windows Hello / PIN). If the authenticator can’t, the sign-in fails. Use for sensitive actions.',
  },
  {
    value: 'discouraged',
    label: 'Discouraged',
    desc: 'Skip verification — only confirm someone is present (a tap). Fastest, lowest assurance.',
  },
];

interface Props {
  open: boolean;
  value: UserVerificationRequirement;
  onChange: (v: UserVerificationRequirement) => void;
  onClose: () => void;
}

export default function UserVerificationModal({ open, value, onChange, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="User verification">
      <p className="mb-3 text-xs leading-relaxed text-slate-500">
        How strongly the authenticator must confirm it’s really you during sign-in. Sets the{' '}
        <code className="rounded bg-slate-100 px-1 py-0.5">userVerification</code> field on{' '}
        <code className="rounded bg-slate-100 px-1 py-0.5">navigator.credentials.get()</code> — watch the UV
        flag change in the verification steps.
      </p>
      <div role="radiogroup" aria-label="User verification" className="flex flex-col gap-2">
        {OPTIONS.map((o) => {
          const selected = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.value)}
              className={`flex gap-3 rounded-lg border p-3 text-left ${
                selected ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span
                className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${
                  selected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                }`}
              />
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  {o.label}
                  {o.tag && (
                    <span className="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-700">
                      {o.tag}
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">{o.desc}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">Applies to both “Sign in” and “Sign in with any passkey”.</span>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/UserVerificationModal.tsx
git commit -m "feat(passkey-demo): user-verification picker modal"
```

---

### Task 6: `ForgetAllDialog`

**Files:**
- Create: `src/components/widgets/passkey-demo/components/ForgetAllDialog.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/widgets/passkey-demo/components/ForgetAllDialog.tsx
import Modal from './Modal';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ForgetAllDialog({ open, onConfirm, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Forget all passkeys?">
      <p className="text-sm leading-relaxed text-slate-600">
        This removes only <strong>this page’s records</strong> of your demo passkeys (kept in your browser’s
        localStorage). The passkeys themselves stay in your device’s keychain or password manager until you
        remove them there.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Forget all
        </button>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/ForgetAllDialog.tsx
git commit -m "feat(passkey-demo): forget-all confirmation dialog"
```

---

### Task 7: `PasskeyRow`

**Files:**
- Create: `src/components/widgets/passkey-demo/components/PasskeyRow.tsx`

A presentational row: name/alg/metadata + actions (Sign in / Inspect / Delete). Inspect lazily decodes the stored credential (`inspectCredential`) and renders `CredentialDetails`; after a sign-in, the parent passes a `verification` result that renders as `VerificationSteps`. Both blocks can be open at once.

- [ ] **Step 1: Create the component**

```tsx
// src/components/widgets/passkey-demo/components/PasskeyRow.tsx
import { useEffect, useState } from 'react';
import CredentialDetails from './CredentialDetails';
import VerificationSteps from './VerificationSteps';
import { inspectCredential, type CredentialInspection } from '../lib/inspect';
import type { AssertionVerification } from '../lib/verifyAssertion';
import type { StoredCredential } from '../lib/storage';

function algLabel(alg: number): string {
  return alg === -7 ? 'ES256' : alg === -257 ? 'RS256' : `COSE ${alg}`;
}

interface Props {
  credential: StoredCredential;
  highlight: boolean;
  expanded: boolean;
  busy: boolean;
  verification: AssertionVerification | null;
  error: string | null;
  onToggleInspect: () => void;
  onSignIn: () => void;
  onDelete: () => void;
}

export default function PasskeyRow({
  credential,
  highlight,
  expanded,
  busy,
  verification,
  error,
  onToggleInspect,
  onSignIn,
  onDelete,
}: Props) {
  const [inspection, setInspection] = useState<CredentialInspection | null>(null);
  const [inspectError, setInspectError] = useState<string | null>(null);

  // Decode lazily the first time the row is expanded.
  useEffect(() => {
    if (!expanded || inspection || inspectError) return;
    let cancelled = false;
    inspectCredential(credential.attestationObject, credential.clientDataJSON)
      .then((i) => {
        if (!cancelled) setInspection(i);
      })
      .catch((e) => {
        if (!cancelled) setInspectError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [expanded, inspection, inspectError, credential]);

  return (
    <li className={`rounded-lg border p-4 ${highlight ? 'border-blue-400 ring-2 ring-blue-400/30' : 'border-slate-200'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
            {credential.userName}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600">
              {algLabel(credential.alg)}
            </span>
          </div>
          <div className="mt-1.5 truncate text-xs text-slate-500">
            created {new Date(credential.createdAt).toLocaleString()} · uv={credential.options.userVerification} · rk=
            {credential.options.residentKey} · transports: {credential.transports.join(', ') || 'n/a'}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onSignIn}
            disabled={busy}
            aria-busy={busy}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {busy ? 'Waiting…' : 'Sign in'}
          </button>
          <button
            type="button"
            onClick={onToggleInspect}
            aria-expanded={expanded}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            Inspect {expanded ? '▴' : '▾'}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {expanded && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Credential details</div>
          {inspectError && <p className="text-sm text-red-700">{inspectError}</p>}
          {!inspection && !inspectError && <p className="text-sm text-slate-500">Decoding…</p>}
          {inspection && <CredentialDetails inspection={inspection} />}
        </div>
      )}

      {verification && (
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/40 p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-700">Last sign-in verification</div>
          <VerificationSteps verification={verification} />
        </div>
      )}
    </li>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/PasskeyRow.tsx
git commit -m "feat(passkey-demo): PasskeyRow with inline inspect + verification"
```

---

### Task 8: `PasskeyList`

**Files:**
- Create: `src/components/widgets/passkey-demo/components/PasskeyList.tsx`

The "Your passkeys" section: header (title + user-verification button + Forget all), the "Sign in with any passkey" discoverable button with an ⓘ tooltip, the list of rows (newest first) or an empty state, the honest localStorage note, and the two dialogs. Owns the sign-in orchestration, the UV setting, the per-credential verification results, the expanded set, busy/error state, and dialog visibility.

- [ ] **Step 1: Create the component**

```tsx
// src/components/widgets/passkey-demo/components/PasskeyList.tsx
import { useState } from 'react';
import PasskeyRow from './PasskeyRow';
import Tooltip from './Tooltip';
import UserVerificationModal from './UserVerificationModal';
import ForgetAllDialog from './ForgetAllDialog';
import { b64urlToBuf, bufToB64url } from '../lib/base64url';
import { explainWebAuthnError } from '../lib/errors';
import { verifyAssertion, type AssertionVerification } from '../lib/verifyAssertion';
import type { StoredCredential } from '../lib/storage';

interface Props {
  rpId: string;
  credentials: StoredCredential[];
  /** credentialId of a just-created passkey to highlight briefly, or null. */
  highlightId: string | null;
  onDelete: (credentialId: string) => void;
  onClear: () => void;
  onUpdateSignCount: (credentialId: string, signCount: number) => void;
}

const DISCOVERABLE = 'discoverable';

export default function PasskeyList({
  rpId,
  credentials,
  highlightId,
  onDelete,
  onClear,
  onUpdateSignCount,
}: Props) {
  const [uv, setUv] = useState<UserVerificationRequirement>('preferred');
  const [uvOpen, setUvOpen] = useState(false);
  const [forgetOpen, setForgetOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [verifications, setVerifications] = useState<Record<string, AssertionVerification>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null); // a credentialId, or DISCOVERABLE
  const [discoverableError, setDiscoverableError] = useState<string | null>(null);

  // Newest first so a just-created passkey shows at the top, near Create.
  const sorted = [...credentials].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const toggleInspect = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /** Run navigator.credentials.get() and verify. `target` is the credential to
      allow, or 'discoverable' for an empty allow-list. Returns nothing; writes
      results/errors into state. Throws are handled by callers. */
  const runGet = async (target: StoredCredential | typeof DISCOVERABLE) => {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const rawAssertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId,
        userVerification: uv,
        allowCredentials:
          target === DISCOVERABLE
            ? []
            : [{ type: 'public-key' as const, id: b64urlToBuf(target.credentialId) as BufferSource }],
        timeout: 60000,
      },
    });
    if (!rawAssertion) throw new DOMException('The authenticator returned nothing.', 'NotAllowedError');
    const assertion = rawAssertion as PublicKeyCredential;
    const resp = assertion.response as AuthenticatorAssertionResponse;
    const credentialId = bufToB64url(new Uint8Array(assertion.rawId));
    const credential = credentials.find((c) => c.credentialId === credentialId);
    if (!credential) {
      throw new Error(
        'You signed in with a passkey this page has no record of — it was probably created in another browser session, or its record was cleared. Without the stored public key the signature cannot be verified.',
      );
    }
    const verification = await verifyAssertion({
      expectedChallenge: bufToB64url(challenge),
      expectedOrigin: window.location.origin,
      expectedRpId: rpId,
      requestedUserVerification: uv,
      clientDataJSON: new Uint8Array(resp.clientDataJSON),
      authenticatorData: new Uint8Array(resp.authenticatorData),
      signature: new Uint8Array(resp.signature),
      credential,
    });
    onUpdateSignCount(credentialId, verification.newSignCount);
    setVerifications((prev) => ({ ...prev, [credentialId]: verification }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[credentialId];
      return next;
    });
  };

  const toMessage = (err: unknown): string =>
    err instanceof DOMException
      ? explainWebAuthnError(err, 'get')
      : err instanceof Error
        ? err.message
        : String(err);

  const signIn = async (credential: StoredCredential) => {
    setBusyId(credential.credentialId);
    setDiscoverableError(null);
    try {
      await runGet(credential);
    } catch (err) {
      setErrors((prev) => ({ ...prev, [credential.credentialId]: toMessage(err) }));
    } finally {
      setBusyId(null);
    }
  };

  const signInDiscoverable = async () => {
    setBusyId(DISCOVERABLE);
    setDiscoverableError(null);
    try {
      await runGet(DISCOVERABLE);
    } catch (err) {
      setDiscoverableError(toMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="heading" aria-level={3} className="text-lg font-semibold text-slate-900">
          Your passkeys
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setUvOpen(true)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            User verification: <span className="font-medium text-slate-900">{uv}</span>
          </button>
          {credentials.length > 0 && (
            <button
              type="button"
              onClick={() => setForgetOpen(true)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
            >
              Forget all
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={signInDiscoverable}
          disabled={busyId === DISCOVERABLE}
          aria-busy={busyId === DISCOVERABLE}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {busyId === DISCOVERABLE ? 'Waiting…' : 'Sign in with any passkey'}
        </button>
        <Tooltip text="Runs sign-in with an empty allow-list (the discoverable-credential flow), so the browser offers any passkey saved for this site — you don’t pick one first.">
          <span
            aria-hidden="true"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-400"
          >
            ⓘ
          </span>
        </Tooltip>
      </div>

      {discoverableError && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{discoverableError}</p>
      )}

      {credentials.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No passkeys yet — create one above.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {sorted.map((c) => (
            <PasskeyRow
              key={c.credentialId}
              credential={c}
              highlight={c.credentialId === highlightId}
              expanded={expanded.has(c.credentialId)}
              busy={busyId === c.credentialId}
              verification={verifications[c.credentialId] ?? null}
              error={errors[c.credentialId] ?? null}
              onToggleInspect={() => toggleInspect(c.credentialId)}
              onSignIn={() => signIn(c)}
              onDelete={() => onDelete(c.credentialId)}
            />
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Deleting here removes only this page’s record (kept in your browser’s localStorage). The passkey itself
        stays in your keychain or password manager until you remove it there — see the FAQ below for per-OS
        instructions.
      </p>

      <UserVerificationModal open={uvOpen} value={uv} onChange={setUv} onClose={() => setUvOpen(false)} />
      <ForgetAllDialog open={forgetOpen} onConfirm={onClear} onClose={() => setForgetOpen(false)} />
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/passkey-demo/components/PasskeyList.tsx
git commit -m "feat(passkey-demo): PasskeyList with per-row + discoverable sign-in"
```

---

### Task 9: Rewire the widget root; remove the old panels

**Files:**
- Modify: `src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx`
- Delete: `src/components/widgets/passkey-demo/components/InspectPanel.tsx`
- Delete: `src/components/widgets/passkey-demo/components/SignInPanel.tsx`
- Delete: `src/components/widgets/passkey-demo/components/CredentialList.tsx`

- [ ] **Step 1: Rewrite the widget root**

Replace the entire contents of `src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx` with:

```tsx
// src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx
import { useEffect, useRef, useState } from 'react';
import CreatePanel from './components/CreatePanel';
import PasskeyList from './components/PasskeyList';
import Tooltip from './components/Tooltip';
import { useCredentialStore } from './hooks/useCredentialStore';
import { useFeatureDetection } from './hooks/useFeatureDetection';
import type { StoredCredential } from './lib/storage';
import './passkey-demo.css';

export default function PasskeyDemoWidget() {
  const features = useFeatureDetection();
  const store = useCredentialStore();
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
    },
    [],
  );

  // CreatePanel calls onCreated(record, inspection); we only need the record.
  const handleCreated = (record: StoredCredential) => {
    store.add(record);
    setHighlightId(record.credentialId);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setHighlightId(null), 2500);
  };

  // SSR and pre-mount: render a stable placeholder so hydration is clean.
  if (!features.checked) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl p-8 text-center font-sans text-sm text-slate-500"
      >
        Checking WebAuthn support…
      </div>
    );
  }

  if (!features.webauthn) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 font-sans text-slate-800"
      >
        <div role="heading" aria-level={3} className="mb-2 text-lg font-semibold">Your browser doesn't support WebAuthn</div>
        <p className="text-sm text-slate-600">
          This demo needs the WebAuthn API (<code>window.PublicKeyCredential</code>), which isn't available
          here. Try a current version of Chrome, Edge, Safari, or Firefox — the supported-platforms section
          below shows where passkeys work.
        </p>
      </div>
    );
  }

  const rpId = window.location.hostname;

  return (
    <div
      data-testid="passkey-demo-widget"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 font-sans text-slate-800"
    >
      <div className="flex flex-wrap gap-2 text-xs">
        <FeatureBadge
          label="Platform authenticator"
          state={features.platformAuthenticator}
          tooltip="Whether this device has a built-in authenticator — Touch ID, Face ID, or Windows Hello — that can create and store a passkey locally. “Available” means you can make a device-bound passkey right here."
        />
        <FeatureBadge
          label="Conditional mediation (autofill UI)"
          state={features.conditionalMediation}
          tooltip="Whether the browser can offer your saved passkeys directly in the sign-in field’s autofill dropdown, instead of a separate popup. “Available” means this browser supports that smoother sign-in flow."
        />
      </div>
      <CreatePanel rpId={rpId} onCreated={handleCreated} />
      <PasskeyList
        rpId={rpId}
        credentials={store.credentials}
        highlightId={highlightId}
        onDelete={store.remove}
        onClear={store.clear}
        onUpdateSignCount={store.updateSignCount}
      />
    </div>
  );
}

function FeatureBadge({
  label,
  state,
  tooltip,
}: {
  label: string;
  state: boolean | null;
  tooltip: string;
}) {
  const cls =
    state === true
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : state === null
        ? 'border-amber-200 bg-amber-50 text-amber-600'
        : 'border-slate-200 bg-slate-50 text-slate-500';
  const stateText = state === null ? 'unknown' : state ? 'available' : 'unavailable';
  return (
    <Tooltip text={tooltip}>
      <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${cls}`}>
        {label}: {stateText}
        <span aria-hidden="true" className="font-semibold opacity-60">
          ⓘ
        </span>
      </span>
    </Tooltip>
  );
}
```

- [ ] **Step 2: Delete the three obsolete panels**

```bash
git rm src/components/widgets/passkey-demo/components/InspectPanel.tsx \
       src/components/widgets/passkey-demo/components/SignInPanel.tsx \
       src/components/widgets/passkey-demo/components/CredentialList.tsx
```

- [ ] **Step 3: Typecheck**

Run: `npm run check`
Expected: 0 errors, 0 warnings. (If `check` reports an unused import or a dangling reference to a deleted file, fix it — nothing outside the widget imports these three.)

- [ ] **Step 4: Smoke-run the dev server**

Run `npm run dev`, then:
```bash
curl -s http://localhost:4321/tools/passkey-demo/ | grep -c 'passkey-demo-widget'
```
Expected: ≥ 1. Then stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx
git commit -m "feat(passkey-demo): app-like Create + Your passkeys layout

Replace the three numbered Create/Inspect/Sign-in panels and the bottom
credential list with a Create section + a Your passkeys list whose rows
inspect inline and sign in inline. Removes InspectPanel, SignInPanel,
CredentialList."
```

---

### Task 10: Test, build, verify

**Files:**
- Modify: `tests/phase2d2-tools.spec.ts`

- [ ] **Step 1: Strengthen the Playwright assertion**

In `tests/phase2d2-tools.spec.ts`, find the existing test:

```ts
test('Passkey demo renders the native widget (not iframe)', async ({ page }) => {
  await page.goto('/tools/passkey-demo');
  await expect(page.locator('h1.tools-h1').first()).toBeVisible();
  await expect(page.locator('[data-testid="passkey-demo-widget"]')).toBeVisible();
});
```

and add one line asserting the new section heading renders:

```ts
test('Passkey demo renders the native widget (not iframe)', async ({ page }) => {
  await page.goto('/tools/passkey-demo');
  await expect(page.locator('h1.tools-h1').first()).toBeVisible();
  await expect(page.locator('[data-testid="passkey-demo-widget"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your passkeys' })).toBeVisible();
});
```

- [ ] **Step 2: Run the unit suite (should be untouched/green)**

Run: `npm run test:unit`
Expected: all passing (the `lib/` tests; no UI tests). If anything fails, it indicates an accidental change to `lib/` — investigate.

- [ ] **Step 3: Production build + output checks**

Run: `npm run build`
Expected: clean build. Then:
```bash
ls dist/tools/passkey-demo/index.html dist/zh-hant/tools/passkey-demo/index.html
grep -c 'Your passkeys' dist/tools/passkey-demo/index.html
```
Expected: both files exist; the grep returns ≥ 1 (the heading is server-rendered text, even though the interactive island hydrates client-side — if it returns 0 because the section only renders post-hydration, that's acceptable; the Playwright test covers the hydrated state).

- [ ] **Step 4: Manual checklist (localhost is a secure context — no setup)**

With `npm run dev` running, on `http://localhost:4321/tools/passkey-demo/`:

1. Two feature badges render with the custom tooltips on hover/focus.
2. **Create a passkey** (no "1." number) → the new passkey appears in **Your passkeys** at the top, briefly highlighted.
3. Click **Inspect ▾** on a row → the *Credential details* block expands inline (clientDataJSON, flag badges, signCount, AAGUID + name, rpIdHash/credentialId copy fields, JWK + PEM, JWK Generator link). Click **▴** → collapses.
4. Click **Sign in** on a row → after the prompt, the *Last sign-in verification* block appears under the row with the 7 PASS/INFO steps. Inspect can stay open at the same time.
5. **Sign in with any passkey** (discoverable) → on success the matched row shows its verification; the ⓘ tooltip explains the flow. If the chosen credential isn't recorded, a friendly error shows near the button.
6. **User verification** button opens the modal; pick Required/Discouraged → the button label updates and the choice applies to the next sign-in (watch the UV flag/flags step). Esc / ✕ / backdrop all close it; focus returns to the button.
7. **Delete** removes one row (single click). **Forget all** opens the confirm dialog explaining it's local-only; *Forget all* clears the list, *Cancel* keeps it.
8. Reload → the list persists (localStorage); Inspect still works on a stored passkey.

Cross-browser before launch (per spec): repeat 2–5 in Safari, Chrome, Firefox + one mobile.

- [ ] **Step 5: Commit**

```bash
git add tests/phase2d2-tools.spec.ts
git commit -m "test(passkey-demo): assert the Your passkeys section renders"
```

---

## Post-implementation note

This redesign supersedes the in-session UI tweaks that are still uncommitted on `feat/passkey-demo-tool` (the Webflow/normalize cascade fixes, the custom `Tooltip`, heading `div role="heading"`, button-wrapper margins). Those fixes are preserved — this plan builds on the same patterns and reuses `Tooltip`, `passkey-demo.css`, `JsonView`, `CopyField`, `FlagBadges` as-is. Make sure the working tree's prior edits are present (not reverted) before starting; the plan's code assumes them.
