// src/components/widgets/passkey-demo/components/PasskeyList.tsx
import { useState } from 'react';
import PasskeyRow from './PasskeyRow';
import UserVerificationModal from './UserVerificationModal';
import ForgetAllDialog from './ForgetAllDialog';
import ForgetPasskeyDialog from './ForgetPasskeyDialog';
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
  const [forgetTarget, setForgetTarget] = useState<StoredCredential | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [verifications, setVerifications] = useState<Record<string, AssertionVerification>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null); // a credentialId, or DISCOVERABLE
  const [discoverableError, setDiscoverableError] = useState<string | null>(null);
  const [matchedId, setMatchedId] = useState<string | null>(null); // last successfully-signed-in row

  // Newest first so a just-created passkey shows at the top, near Create.
  const sorted = [...credentials].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const toggleInspect = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const dropKey = <T,>(map: Record<string, T>, id: string): Record<string, T> => {
    const next = { ...map };
    delete next[id];
    return next;
  };
  const dismissError = (id: string) => setErrors((prev) => dropKey(prev, id));
  const dismissVerification = (id: string) => setVerifications((prev) => dropKey(prev, id));

  // Run navigator.credentials.get() and verify. `target` is the credential to
  // allow, or 'discoverable' for an empty allow-list. Writes results/errors
  // into state; throws are handled by callers.
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
        'This page has no record of that passkey, so its signature can’t be verified. Create one above first.',
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
    setMatchedId(credentialId); // highlight the row that just signed in (esp. discoverable)
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
    if (busyId !== null) return; // one sign-in ceremony at a time
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
    if (busyId !== null) return; // one sign-in ceremony at a time
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div role="heading" aria-level={3} className="text-lg font-semibold text-slate-900">
          Your passkeys
        </div>
        <button
          type="button"
          onClick={() => setUvOpen(true)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
        >
          User verification: <span className="font-medium text-slate-900">{uv}</span>
        </button>
      </div>

      {credentials.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-7 w-7" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </div>
          <div className="text-base font-semibold text-slate-700">No passkeys yet</div>
          <div className="mx-auto mt-1 max-w-[20rem] text-sm text-slate-500">
            Create one above to inspect it and sign in.
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {sorted.map((c) => (
            <PasskeyRow
              key={c.credentialId}
              credential={c}
              highlight={c.credentialId === highlightId || c.credentialId === matchedId}
              expanded={expanded.has(c.credentialId)}
              busy={busyId === c.credentialId}
              verification={verifications[c.credentialId] ?? null}
              error={errors[c.credentialId] ?? null}
              onToggleInspect={() => toggleInspect(c.credentialId)}
              onSignIn={() => signIn(c)}
              onDelete={() => setForgetTarget(c)}
              onDismissError={() => dismissError(c.credentialId)}
              onDismissVerification={() => dismissVerification(c.credentialId)}
            />
          ))}
        </ul>
      )}

      {credentials.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-6 text-center">
          <button
            type="button"
            onClick={signInDiscoverable}
            disabled={busyId !== null}
            aria-busy={busyId === DISCOVERABLE}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
            {busyId === DISCOVERABLE ? 'Waiting…' : 'Sign in with any passkey'}
          </button>
          <div className="mx-auto mt-2 max-w-[26rem] text-xs text-balance text-slate-400">
            The browser offers any passkey saved for this site.
          </div>
          {discoverableError && (
            <div className="mt-3 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-left text-sm text-red-700">
              <span>{discoverableError}</span>
              <button
                type="button"
                onClick={() => setDiscoverableError(null)}
                aria-label="Dismiss"
                className="shrink-0 text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      {credentials.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-4 text-center">
          <button
            type="button"
            onClick={() => setForgetOpen(true)}
            className="text-xs font-medium text-slate-400 hover:text-red-600"
          >
            Forget all passkeys
          </button>
        </div>
      )}

      <UserVerificationModal open={uvOpen} value={uv} onChange={setUv} onClose={() => setUvOpen(false)} />
      <ForgetAllDialog open={forgetOpen} onConfirm={onClear} onClose={() => setForgetOpen(false)} />
      <ForgetPasskeyDialog
        open={forgetTarget !== null}
        userName={forgetTarget?.userName ?? ''}
        onConfirm={() => {
          if (forgetTarget) onDelete(forgetTarget.credentialId);
        }}
        onClose={() => setForgetTarget(null)}
      />
    </section>
  );
}
