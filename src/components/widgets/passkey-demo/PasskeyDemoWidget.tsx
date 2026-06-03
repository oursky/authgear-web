// src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx
import { useState } from 'react';
import CreatePanel from './components/CreatePanel';
import InspectPanel from './components/InspectPanel';
import SignInPanel from './components/SignInPanel';
import CredentialList from './components/CredentialList';
import { useCredentialStore } from './hooks/useCredentialStore';
import { useFeatureDetection } from './hooks/useFeatureDetection';
import { inspectCredential, type CredentialInspection } from './lib/inspect';
import type { StoredCredential } from './lib/storage';
import './passkey-demo.css';

export default function PasskeyDemoWidget() {
  const features = useFeatureDetection();
  const store = useCredentialStore();
  const [inspection, setInspection] = useState<CredentialInspection | null>(null);
  const [inspectError, setInspectError] = useState<string | null>(null);

  const handleCreated = (record: StoredCredential, insp: CredentialInspection) => {
    store.add(record);
    setInspection(insp);
    setInspectError(null);
  };

  const handleInspectStored = async (record: StoredCredential) => {
    try {
      setInspection(await inspectCredential(record.attestationObject, record.clientDataJSON));
      setInspectError(null);
    } catch (err) {
      setInspection(null);
      setInspectError(err instanceof Error ? err.message : String(err));
    }
  };

  // SSR and pre-mount: render a stable placeholder so hydration is clean.
  if (!features.checked) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl p-8 text-center font-sans text-sm text-slate-500"
      >
        Checking WebAuthn support…
      </div>
    );
  }

  if (!features.webauthn) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 font-sans text-slate-800"
      >
        <h3 className="mb-2 text-lg font-semibold">Your browser doesn't support WebAuthn</h3>
        <p className="text-sm text-slate-600">
          This demo needs the WebAuthn API (<code>window.PublicKeyCredential</code>), which isn't available
          here. Try a current version of Chrome, Edge, Safari, or Firefox — the supported-platforms section
          below shows where passkeys work.
        </p>
      </div>
    );
  }

  const rpId = window.location.hostname;

  return (
    <div
      data-testid="passkey-demo-widget"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 font-sans text-slate-800"
    >
      <div className="flex flex-wrap gap-2 text-xs">
        <FeatureBadge label="Platform authenticator" state={features.platformAuthenticator} />
        <FeatureBadge label="Conditional mediation (autofill UI)" state={features.conditionalMediation} />
      </div>
      <CreatePanel rpId={rpId} onCreated={handleCreated} />
      <InspectPanel inspection={inspection} error={inspectError} />
      <SignInPanel rpId={rpId} credentials={store.credentials} onVerified={store.updateSignCount} />
      <CredentialList
        credentials={store.credentials}
        onInspect={handleInspectStored}
        onDelete={store.remove}
        onClearAll={store.clear}
      />
    </div>
  );
}

function FeatureBadge({ label, state }: { label: string; state: boolean | null }) {
  const cls = state === true
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : state === null
      ? 'border-amber-200 bg-amber-50 text-amber-600'
      : 'border-slate-200 bg-slate-50 text-slate-500';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${cls}`}>
      {label}: {state === null ? 'unknown' : state ? 'available' : 'unavailable'}
    </span>
  );
}
