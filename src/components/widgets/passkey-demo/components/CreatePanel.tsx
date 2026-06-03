import { useState } from 'react';
import Panel from './Panel';
import JsonView from './JsonView';
import { bufToB64url } from '../lib/base64url';
import { buildCreationOptions, creationOptionsPreview, type CreateConfig } from '../lib/createOptions';
import { explainWebAuthnError } from '../lib/errors';
import { inspectCredential, type CredentialInspection } from '../lib/inspect';
import type { StoredCredential } from '../lib/storage';

interface Props {
  rpId: string;
  onCreated: (record: StoredCredential, inspection: CredentialInspection) => void;
}

const INPUT_CLS = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800';

function randomBytes(n: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(n));
}

export default function CreatePanel({ rpId, onCreated }: Props) {
  const [config, setConfig] = useState<CreateConfig>({
    userName: 'demo-user',
    attachment: '',
    userVerification: 'preferred',
    residentKey: 'preferred',
    includeRs256: false,
    attestation: 'none',
  });
  // Fresh randomness per registration attempt; regenerated after each success
  const [challenge, setChallenge] = useState<Uint8Array>(() => randomBytes(32));
  const [userId, setUserId] = useState<Uint8Array>(() => randomBytes(16));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof CreateConfig>(key: K, value: CreateConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const handleCreate = async () => {
    setBusy(true);
    setError(null);
    try {
      const options = buildCreationOptions(config, challenge, userId, rpId);
      const rawCred = await navigator.credentials.create({ publicKey: options });
      if (!rawCred) throw new DOMException('The authenticator returned nothing.', 'NotAllowedError');
      const cred = rawCred as PublicKeyCredential;
      const resp = cred.response as AuthenticatorAttestationResponse;
      const attestationObject = bufToB64url(new Uint8Array(resp.attestationObject));
      const clientDataJSON = bufToB64url(new Uint8Array(resp.clientDataJSON));
      const inspection = await inspectCredential(attestationObject, clientDataJSON);
      if (!inspection.publicKeyJwk || !inspection.credentialId || inspection.alg === null) {
        throw new Error('The authenticator returned no attested credential data.');
      }
      const record: StoredCredential = {
        credentialId: inspection.credentialId,
        userName: config.userName,
        alg: inspection.alg,
        publicKeyJwk: inspection.publicKeyJwk,
        transports: resp.getTransports?.() ?? [],
        createdAt: new Date().toISOString(),
        signCount: inspection.signCount,
        attestationObject,
        clientDataJSON,
        options: {
          attachment: config.attachment || 'unset',
          userVerification: config.userVerification,
          residentKey: config.residentKey,
          attestation: config.attestation,
        },
      };
      onCreated(record, inspection);
      setChallenge(randomBytes(32));
      setUserId(randomBytes(16));
    } catch (err) {
      setError(explainWebAuthnError(err, 'create'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel step={1} title="Create a passkey">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">User name</span>
          <input
            className={INPUT_CLS}
            value={config.userName}
            onChange={(e) => set('userName', e.target.value)}
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Authenticator attachment</span>
          <select
            className={INPUT_CLS}
            value={config.attachment}
            onChange={(e) => set('attachment', e.target.value as CreateConfig['attachment'])}
          >
            <option value="">unset (any authenticator)</option>
            <option value="platform">platform (this device)</option>
            <option value="cross-platform">cross-platform (security key / phone)</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">User verification</span>
          <select
            className={INPUT_CLS}
            value={config.userVerification}
            onChange={(e) => set('userVerification', e.target.value as CreateConfig['userVerification'])}
          >
            <option value="preferred">preferred (default)</option>
            <option value="required">required</option>
            <option value="discouraged">discouraged</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Resident key (discoverable)</span>
          <select
            className={INPUT_CLS}
            value={config.residentKey}
            onChange={(e) => set('residentKey', e.target.value as CreateConfig['residentKey'])}
          >
            <option value="preferred">preferred (default)</option>
            <option value="required">required</option>
            <option value="discouraged">discouraged</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Attestation</span>
          <select
            className={INPUT_CLS}
            value={config.attestation}
            onChange={(e) => set('attestation', e.target.value as CreateConfig['attestation'])}
          >
            <option value="none">none (default)</option>
            <option value="direct">direct</option>
          </select>
        </label>
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={config.includeRs256}
            onChange={(e) => set('includeRs256', e.target.checked)}
          />
          Also offer RS256 (−257) — ES256 (−7) is always included
        </label>
      </div>

      <details className="mt-4" open>
        <summary className="cursor-pointer select-none text-sm font-medium text-slate-700">
          PublicKeyCredentialCreationOptions (updates live)
        </summary>
        <JsonView value={creationOptionsPreview(config, challenge, userId, rpId)} />
      </details>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="button"
        onClick={handleCreate}
        disabled={busy || !config.userName.trim()}
        aria-busy={busy}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {busy ? 'Waiting for your authenticator…' : 'Create a passkey'}
      </button>
    </Panel>
  );
}
