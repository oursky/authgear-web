// src/components/widgets/passkey-demo/components/InspectPanel.tsx
import type { ReactNode } from 'react';
import Panel from './Panel';
import JsonView from './JsonView';
import CopyField from './CopyField';
import FlagBadges from './FlagBadges';
import type { CredentialInspection } from '../lib/inspect';

interface Props {
  inspection: CredentialInspection | null;
  error: string | null;
}

function Row({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="w-28 shrink-0 font-medium text-slate-600">{name}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

export default function InspectPanel({ inspection, error }: Props) {
  return (
    <Panel step={2} title="Inspect the credential">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
      {!inspection && !error && (
        <p className="text-sm text-slate-500">
          Create a passkey above — or pick one from "Your demo passkeys" below — and the decoded credential
          shows up here.
        </p>
      )}
      {inspection && (
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="mb-1 text-sm font-semibold text-slate-900">clientDataJSON (decoded)</h4>
            <JsonView value={inspection.clientData} />
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">attestationObject (CBOR-decoded)</h4>
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
              <h4 className="mb-1 text-sm font-semibold text-slate-900">
                Public key (JWK{inspection.alg !== null && <> — COSE alg {inspection.alg}</>})
              </h4>
              <JsonView value={inspection.publicKeyJwk} />
              {inspection.publicKeyPem && (
                <>
                  <h4 className="mb-1 mt-3 text-sm font-semibold text-slate-900">Public key (PEM)</h4>
                  <JsonView value={inspection.publicKeyPem} />
                </>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Want to generate and convert keys like this?{' '}
                <a className="underline" href="/tools/jwk-generator">
                  Try our JWK Generator
                </a>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
