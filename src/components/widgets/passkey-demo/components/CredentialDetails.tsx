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
