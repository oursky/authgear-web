// src/components/widgets/passkey-demo/components/CredentialDetails.tsx
import type { ReactNode } from 'react';
import JsonView from './JsonView';
import CopyField from './CopyField';
import FlagBadges from './FlagBadges';
import JargonLabel from './JargonLabel';
import type { CredentialInspection } from '../lib/inspect';

function Row({ name, tip, children }: { name: string; tip?: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="w-28 shrink-0 font-medium text-slate-600">
        {tip ? <JargonLabel text={tip}>{name}</JargonLabel> : name}
      </dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

/** The decoded credential, shown inline under a passkey row when Inspect is open. */
export default function CredentialDetails({ inspection }: { inspection: CredentialInspection }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div role="heading" aria-level={4} className="mb-1 text-sm font-semibold text-slate-900">
          <JargonLabel text="What the browser saw during this ceremony: the request type, the challenge, and the origin. The authenticator signs over a hash of this.">
            clientDataJSON
          </JargonLabel>{' '}
          (decoded)
        </div>
        <JsonView value={inspection.clientData} />
      </div>

      <div>
        <div role="heading" aria-level={4} className="mb-2 text-sm font-semibold text-slate-900">
          <JargonLabel text="The authenticator’s signed registration response, encoded as CBOR. Decoded here into its parts.">
            attestationObject
          </JargonLabel>{' '}
          (CBOR-decoded)
        </div>
        <dl className="flex flex-col gap-2 text-sm">
          <Row name="fmt" tip="Attestation statement format, e.g. “none”, “packed”, or “fido-u2f”.">
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.fmt}</code>
            <span className="ml-2 text-xs text-slate-500">
              A real server may validate the attestation statement further; this demo displays it only.
            </span>
          </Row>
          <Row
            name="flags"
            tip="Bits the authenticator set at registration: user present (UP), user verified (UV), and whether attested key data is included."
          >
            <FlagBadges flags={inspection.flags} />
          </Row>
          <Row
            name="signCount"
            tip="A counter the authenticator can raise on each use, to help servers spot cloned credentials. Often 0 for synced passkeys."
          >
            {inspection.signCount}
          </Row>
          <Row
            name="AAGUID"
            tip="A 128-bit identifier for the authenticator’s make and model. Often all-zero for privacy."
          >
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.aaguid ?? 'n/a'}</code>
            {inspection.aaguid && (
              <span className="ml-2 text-xs text-slate-500">
                {inspection.aaguidName ?? 'Unknown authenticator'}
              </span>
            )}
          </Row>
        </dl>
        <div className="mt-3 flex flex-col gap-2">
          <CopyField
            label="rpIdHash"
            tip="SHA-256 of the relying party ID (this site’s domain), binding the passkey to this site."
            value={inspection.rpIdHash}
          />
          {inspection.credentialId && (
            <CopyField
              label="credentialId"
              tip="The unique ID of this passkey, sent at sign-in so the server knows which key to check."
              value={inspection.credentialId}
            />
          )}
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
          <div className="mt-3 text-xs text-slate-500">
            Want to generate and convert keys like this?{' '}
            <a className="underline" href="/tools/jwk-generator">
              Try our JWK Generator
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
}
