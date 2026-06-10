// src/components/widgets/passkey-demo/components/PasskeyRow.tsx
import { useEffect, useState } from 'react';
import CredentialDetails from './CredentialDetails';
import JargonLabel from './JargonLabel';
import VerificationSteps from './VerificationSteps';
import { inspectCredential, type CredentialInspection } from '../lib/inspect';
import type { AssertionVerification } from '../lib/verifyAssertion';
import type { StoredCredential } from '../lib/storage';
import { useStrings } from '../StringsContext';

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
  onDismissError: () => void;
  onDismissVerification: () => void;
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
  onDismissError,
  onDismissVerification,
}: Props) {
  const s = useStrings();
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
    // Depend on the stable stored blobs, not the credential object — its identity
    // changes when the store updates signCount after a sign-in, which would
    // otherwise re-trigger a redundant decode mid-flight.
  }, [expanded, inspection, inspectError, credential.attestationObject, credential.clientDataJSON]);

  return (
    <li className={`rounded-lg border p-4 ${highlight ? 'border-blue-400 ring-2 ring-blue-400/30' : 'border-slate-200'}`}>
      <div className="flex flex-wrap items-center gap-3">
        {/* The whole name block is the Inspect toggle (chevron is the affordance),
            so the row needs only two explicit action buttons. */}
        <button
          type="button"
          onClick={onToggleInspect}
          aria-expanded={expanded}
          className="-m-1 flex min-w-0 flex-1 items-center gap-2.5 rounded-md p-1 text-left hover:bg-slate-50"
        >
          <span className="shrink-0 text-xs text-slate-400">{expanded ? '▾' : '▸'}</span>
          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-medium text-slate-900">
              {credential.userName}
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600">
                {algLabel(credential.alg)}
              </span>
            </span>
            <span className="mt-0.5 block truncate text-xs text-slate-500">
              {s.row.createdAt(new Date(credential.createdAt).toLocaleString(s.bcp47))}
            </span>
          </span>
        </button>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onSignIn}
            disabled={busy}
            aria-busy={busy}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {busy ? s.row.waiting : s.row.signIn}
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={s.row.forgetAria(credential.userName)}
            className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            {s.row.forget}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={onDismissError}
            aria-label={s.list.dismiss}
            className="shrink-0 text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      {expanded && (
        <div className="mt-3 flex flex-col gap-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div>
            <div role="heading" aria-level={4} className="mb-2 text-sm font-semibold text-slate-900">{s.row.regOptions}</div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-4">
              <div>
                <dt className="text-slate-400">
                  <JargonLabel text={s.row.regUvTip}>{s.row.regUv}</JargonLabel>
                </dt>
                <dd className="mt-0.5 text-slate-700">{credential.options.userVerification}</dd>
              </div>
              <div>
                <dt className="text-slate-400">
                  <JargonLabel text={s.row.regRkTip}>{s.row.regRk}</JargonLabel>
                </dt>
                <dd className="mt-0.5 text-slate-700">{credential.options.residentKey}</dd>
              </div>
              <div>
                <dt className="text-slate-400">
                  <JargonLabel text={s.row.regAttestationTip}>{s.row.regAttestation}</JargonLabel>
                </dt>
                <dd className="mt-0.5 text-slate-700">{credential.options.attestation}</dd>
              </div>
              <div>
                <dt className="text-slate-400">
                  <JargonLabel text={s.row.regTransportsTip}>{s.row.regTransports}</JargonLabel>
                </dt>
                <dd className="mt-0.5 text-slate-700">{credential.transports.join(', ') || 'n/a'}</dd>
              </div>
            </dl>
          </div>
          {inspectError && <p className="text-sm text-red-700">{inspectError}</p>}
          {!inspection && !inspectError && <p className="text-sm text-slate-500">{s.row.decoding}</p>}
          {inspection && <CredentialDetails inspection={inspection} />}
        </div>
      )}

      {verification && (
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/40 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">{s.row.lastVerification}</div>
            <button
              type="button"
              onClick={onDismissVerification}
              aria-label={s.row.dismissVerification}
              className="shrink-0 text-blue-400 hover:text-blue-600"
            >
              ✕
            </button>
          </div>
          <VerificationSteps verification={verification} />
        </div>
      )}
    </li>
  );
}
