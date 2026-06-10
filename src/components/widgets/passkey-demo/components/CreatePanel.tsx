import { useState } from 'react';
import Panel from './Panel';
import JsonView from './JsonView';
import ParamInfoDialog from './ParamInfoDialog';
import { bufToB64url } from '../lib/base64url';
import { buildCreationOptions, creationOptionsPreview, type CreateConfig } from '../lib/createOptions';
import { explainWebAuthnError } from '../lib/errors';
import { inspectCredential, type CredentialInspection } from '../lib/inspect';
import type { StoredCredential } from '../lib/storage';
import { useStrings } from '../StringsContext';
import type { ParamKey } from '../strings';

interface Props {
  rpId: string;
  onCreated: (record: StoredCredential, inspection: CredentialInspection) => void;
}

const INPUT_CLS = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800';

function randomBytes(n: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(n));
}

/** Field label that opens the param's explanation dialog. The ⓘ + hover colour
    signal it's clickable for more info. */
function FieldLabel({ children, onClick }: { children: string; onClick: () => void }) {
  const s = useStrings();
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1 self-start font-medium text-slate-700 hover:text-blue-600"
    >
      {children}
      <span aria-hidden="true" className="text-slate-400 group-hover:text-blue-600">ⓘ</span>
      <span className="sr-only">{s.create.whatsThis}</span>
    </button>
  );
}

export default function CreatePanel({ rpId, onCreated }: Props) {
  const s = useStrings();
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
  const [infoKey, setInfoKey] = useState<ParamKey | null>(null);

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
        throw new Error(s.create.noAttestedData);
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
      setError(explainWebAuthnError(err, 'create', s.errors));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel title={s.create.title}>
      <div className="grid gap-4 text-sm sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <FieldLabel onClick={() => setInfoKey('userName')}>{s.create.userName}</FieldLabel>
          <input
            className={INPUT_CLS}
            aria-label={s.create.userName}
            value={config.userName}
            onChange={(e) => set('userName', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel onClick={() => setInfoKey('attachment')}>{s.create.attachment}</FieldLabel>
          <select
            className={INPUT_CLS}
            aria-label={s.create.attachment}
            value={config.attachment}
            onChange={(e) => set('attachment', e.target.value as CreateConfig['attachment'])}
          >
            <option value="">{s.create.optAttachmentUnset}</option>
            <option value="platform">{s.create.optAttachmentPlatform}</option>
            <option value="cross-platform">{s.create.optAttachmentCross}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel onClick={() => setInfoKey('userVerification')}>{s.create.userVerification}</FieldLabel>
          <select
            className={INPUT_CLS}
            aria-label={s.create.userVerification}
            value={config.userVerification}
            onChange={(e) => set('userVerification', e.target.value as CreateConfig['userVerification'])}
          >
            <option value="preferred">{s.create.optPreferredDefault}</option>
            <option value="required">{s.create.optRequired}</option>
            <option value="discouraged">{s.create.optDiscouraged}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel onClick={() => setInfoKey('residentKey')}>{s.create.residentKey}</FieldLabel>
          <select
            className={INPUT_CLS}
            aria-label={s.create.residentKey}
            value={config.residentKey}
            onChange={(e) => set('residentKey', e.target.value as CreateConfig['residentKey'])}
          >
            <option value="preferred">{s.create.optPreferredDefault}</option>
            <option value="required">{s.create.optRequired}</option>
            <option value="discouraged">{s.create.optDiscouraged}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel onClick={() => setInfoKey('attestation')}>{s.create.attestation}</FieldLabel>
          <select
            className={INPUT_CLS}
            aria-label={s.create.attestation}
            value={config.attestation}
            onChange={(e) => set('attestation', e.target.value as CreateConfig['attestation'])}
          >
            <option value="none">{s.create.optNoneDefault}</option>
            <option value="direct">{s.create.optDirect}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel onClick={() => setInfoKey('algorithms')}>{s.create.algorithms}</FieldLabel>
          <select
            className={INPUT_CLS}
            aria-label={s.create.algorithms}
            value={config.includeRs256 ? 'both' : 'es256'}
            onChange={(e) => set('includeRs256', e.target.value === 'both')}
          >
            <option value="es256">{s.create.optEs256}</option>
            <option value="both">{s.create.optEs256AndRs256}</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-slate-700">{s.create.optionsHeading}</div>
        <JsonView value={creationOptionsPreview(config, challenge, userId, rpId)} clamp={false} />
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Wrapper carries the top margin: normalize.css resets `button { margin: 0 }`
          unlayered, which defeats a `mt-*` utility placed on the button itself. */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleCreate}
          disabled={busy || !config.userName.trim()}
          aria-busy={busy}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? s.create.buttonBusy : s.create.button}
        </button>
      </div>

      <ParamInfoDialog paramKey={infoKey} onClose={() => setInfoKey(null)} />
    </Panel>
  );
}
