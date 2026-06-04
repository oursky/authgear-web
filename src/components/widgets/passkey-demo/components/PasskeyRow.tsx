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
