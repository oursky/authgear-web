// src/components/widgets/passkey-demo/components/SignInPanel.tsx
import { useState } from 'react';
import Panel from './Panel';
import { b64urlToBuf, bufToB64url } from '../lib/base64url';
import { explainWebAuthnError } from '../lib/errors';
import { verifyAssertion, type AssertionVerification } from '../lib/verifyAssertion';
import type { StoredCredential } from '../lib/storage';

interface Props {
  rpId: string;
  credentials: StoredCredential[];
  onVerified: (credentialId: string, newSignCount: number) => void;
}

const INPUT_CLS = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800';

export default function SignInPanel({ rpId, credentials, onVerified }: Props) {
  const [discoverable, setDiscoverable] = useState(false);
  const [userVerification, setUserVerification] = useState<UserVerificationRequirement>('preferred');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ verification: AssertionVerification; userName: string } | null>(null);

  const handleSignIn = async () => {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      const rawAssertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId,
          userVerification,
          allowCredentials: discoverable
            ? []
            : credentials.map((c) => ({ type: 'public-key' as const, id: b64urlToBuf(c.credentialId) as BufferSource })),
          timeout: 60000,
        },
      });
      if (!rawAssertion) throw new DOMException('The authenticator returned nothing.', 'NotAllowedError');
      const assertion = rawAssertion as PublicKeyCredential;
      const resp = assertion.response as AuthenticatorAssertionResponse;
      const credentialId = bufToB64url(new Uint8Array(assertion.rawId));
      // `credentials` is the render-time snapshot; a credential created while this
      // prompt was open won't be found — acceptable for a demo, surfaced by the
      // teaching error below.
      const credential = credentials.find((c) => c.credentialId === credentialId);
      if (!credential) {
        throw new Error(
          'You signed in with a passkey this page has no record of — it was probably created in another browser session, or its record was cleared. Without the stored public key the signature cannot be verified. Create a new passkey above and try again.',
        );
      }
      const verification = await verifyAssertion({
        expectedChallenge: bufToB64url(challenge),
        expectedOrigin: window.location.origin,
        expectedRpId: rpId,
        requestedUserVerification: userVerification,
        clientDataJSON: new Uint8Array(resp.clientDataJSON),
        authenticatorData: new Uint8Array(resp.authenticatorData),
        signature: new Uint8Array(resp.signature),
        credential,
      });
      onVerified(credentialId, verification.newSignCount);
      setResult({ verification, userName: credential.userName });
    } catch (err) {
      setError(
        err instanceof DOMException
          ? explainWebAuthnError(err, 'get')
          : err instanceof Error
            ? err.message
            : String(err),
      );
    } finally {
      setBusy(false);
    }
  };

  const disabled = busy || (!discoverable && credentials.length === 0);

  return (
    <Panel step={3} title="Sign in with it">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Credential selection</span>
          <select
            className={INPUT_CLS}
            value={discoverable ? 'discoverable' : 'allow-list'}
            onChange={(e) => setDiscoverable(e.target.value === 'discoverable')}
          >
            <option value="allow-list">allowCredentials from this page's stored passkeys</option>
            <option value="discoverable">empty allowCredentials (discoverable-credential flow)</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">User verification</span>
          <select
            className={INPUT_CLS}
            value={userVerification}
            onChange={(e) => setUserVerification(e.target.value as UserVerificationRequirement)}
          >
            <option value="preferred">preferred (default)</option>
            <option value="required">required</option>
            <option value="discouraged">discouraged</option>
          </select>
        </label>
      </div>

      {!discoverable && credentials.length === 0 && (
        <p className="mt-3 text-sm text-slate-500">
          No stored demo passkeys yet — create one in panel 1, or switch to the discoverable-credential flow.
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSignIn}
        disabled={disabled}
        aria-busy={busy}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {busy ? 'Waiting for your authenticator…' : 'Sign in with your passkey'}
      </button>

      {result && (
        <div className="mt-5">
          <p className="text-sm text-slate-700">
            Signed in as <strong>{result.userName}</strong>. Here is each check a real server would run:
          </p>
          <ul aria-label="Server verification steps" className="mt-3 flex flex-col gap-2">
            {result.verification.steps.map((s) => (
              <li key={s.id} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
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
        </div>
      )}
    </Panel>
  );
}
