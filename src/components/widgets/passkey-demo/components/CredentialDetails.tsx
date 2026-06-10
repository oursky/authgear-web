// src/components/widgets/passkey-demo/components/CredentialDetails.tsx
import type { ReactNode } from 'react';
import JsonView from './JsonView';
import CopyField from './CopyField';
import FlagBadges from './FlagBadges';
import JargonLabel from './JargonLabel';
import { ZERO_AAGUID } from '../lib/aaguid';
import type { CredentialInspection } from '../lib/inspect';
import { useStrings } from '../StringsContext';

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
  const s = useStrings();
  const aaguidLabel =
    inspection.aaguidName ??
    (inspection.aaguid === ZERO_AAGUID ? s.details.aaguidNotProvided : s.details.unknownAuthenticator);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div role="heading" aria-level={4} className="mb-1 text-sm font-semibold text-slate-900">
          <JargonLabel text={s.details.clientDataTip}>clientDataJSON</JargonLabel>{' '}
          {s.details.clientDataSuffix}
        </div>
        <JsonView value={inspection.clientData} />
      </div>

      <div>
        <div role="heading" aria-level={4} className="mb-2 text-sm font-semibold text-slate-900">
          <JargonLabel text={s.details.attObjTip}>attestationObject</JargonLabel>{' '}
          {s.details.attObjSuffix}
        </div>
        <dl className="flex flex-col gap-2 text-sm">
          <Row name="fmt" tip={s.details.fmtTip}>
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.fmt}</code>
            <span className="ml-2 text-xs text-slate-500">{s.details.fmtNote}</span>
          </Row>
          <Row name="flags" tip={s.details.flagsTip}>
            <FlagBadges flags={inspection.flags} />
          </Row>
          <Row name="signCount" tip={s.details.signCountTip}>
            {inspection.signCount}
          </Row>
          <Row name="AAGUID" tip={s.details.aaguidTip}>
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{inspection.aaguid ?? 'n/a'}</code>
            {inspection.aaguid && <span className="ml-2 text-xs text-slate-500">{aaguidLabel}</span>}
          </Row>
        </dl>
        <div className="mt-3 flex flex-col gap-2">
          <CopyField label="rpIdHash" tip={s.details.rpIdHashTip} value={inspection.rpIdHash} />
          {inspection.credentialId && (
            <CopyField label="credentialId" tip={s.details.credentialIdTip} value={inspection.credentialId} />
          )}
        </div>
      </div>

      {inspection.publicKeyJwk && (
        <div>
          <div role="heading" aria-level={4} className="mb-1 text-sm font-semibold text-slate-900">
            {s.details.publicKeyJwk(inspection.alg)}
          </div>
          <JsonView value={inspection.publicKeyJwk} />
          {inspection.publicKeyPem && (
            <>
              <div role="heading" aria-level={4} className="mb-1 mt-4 text-sm font-semibold text-slate-900">
                {s.details.publicKeyPem}
              </div>
              <JsonView value={inspection.publicKeyPem} />
            </>
          )}
          <div className="mt-3 text-xs text-slate-500">
            {s.details.jwkPromo}{' '}
            <a className="underline" href={s.details.jwkPromoHref}>
              {s.details.jwkPromoLink}
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
}
