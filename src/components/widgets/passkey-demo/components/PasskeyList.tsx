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
          disabled={busyId !== null}
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
              highlight={c.credentialId === highlightId || c.credentialId === matchedId}
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
