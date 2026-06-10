// src/components/widgets/passkey-demo/PasskeyDemoWidget.tsx
import { useEffect, useRef, useState } from 'react';
import CreatePanel from './components/CreatePanel';
import PasskeyList from './components/PasskeyList';
import Tooltip from './components/Tooltip';
import { useCredentialStore } from './hooks/useCredentialStore';
import { useFeatureDetection } from './hooks/useFeatureDetection';
import type { StoredCredential } from './lib/storage';
import { StringsProvider, useStrings } from './StringsContext';
import { stringsForLocale } from './strings';
import './passkey-demo.css';

interface Props {
  /** Site locale ('en' or 'zh-Hant'); selects the widget string catalog. */
  locale?: string;
}

export default function PasskeyDemoWidget({ locale = 'en' }: Props) {
  return (
    <StringsProvider value={stringsForLocale(locale)}>
      <PasskeyDemo />
    </StringsProvider>
  );
}

function PasskeyDemo() {
  const s = useStrings();
  const features = useFeatureDetection();
  const store = useCredentialStore();
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
    },
    [],
  );

  // CreatePanel calls onCreated(record, inspection); we only need the record.
  const handleCreated = (record: StoredCredential) => {
    store.add(record);
    setHighlightId(record.credentialId);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setHighlightId(null), 2500);
  };

  // SSR and pre-mount: render a stable placeholder so hydration is clean.
  if (!features.checked) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl p-8 text-center font-sans text-sm text-slate-500"
      >
        {s.widget.checkingSupport}
      </div>
    );
  }

  if (!features.webauthn) {
    return (
      <div
        data-testid="passkey-demo-widget"
        className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 font-sans text-slate-800"
      >
        <div role="heading" aria-level={3} className="mb-2 text-lg font-semibold">
          {s.widget.unsupportedTitle}
        </div>
        <p className="text-sm text-slate-600">
          {s.widget.unsupportedBeforeCode}
          <code>window.PublicKeyCredential</code>
          {s.widget.unsupportedAfterCode}
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
        <FeatureBadge
          label={s.widget.platformAuthLabel}
          state={features.platformAuthenticator}
          tooltip={s.widget.platformAuthTip}
        />
        <FeatureBadge
          label={s.widget.condMediationLabel}
          state={features.conditionalMediation}
          tooltip={s.widget.condMediationTip}
        />
      </div>
      <CreatePanel rpId={rpId} onCreated={handleCreated} />
      <PasskeyList
        rpId={rpId}
        credentials={store.credentials}
        highlightId={highlightId}
        onDelete={store.remove}
        onClear={store.clear}
        onUpdateSignCount={store.updateSignCount}
      />
    </div>
  );
}

function FeatureBadge({
  label,
  state,
  tooltip,
}: {
  label: string;
  state: boolean | null;
  tooltip: string;
}) {
  const s = useStrings();
  const cls =
    state === true
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : state === null
        ? 'border-amber-200 bg-amber-50 text-amber-600'
        : 'border-slate-200 bg-slate-50 text-slate-500';
  const stateText =
    state === null ? s.widget.stateUnknown : state ? s.widget.stateAvailable : s.widget.stateUnavailable;
  return (
    <Tooltip text={tooltip}>
      <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 ${cls}`}>
        {label}: {stateText}
        <span aria-hidden="true" className="font-semibold opacity-60">
          ⓘ
        </span>
      </span>
    </Tooltip>
  );
}
