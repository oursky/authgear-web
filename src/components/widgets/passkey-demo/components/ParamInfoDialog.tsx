// src/components/widgets/passkey-demo/components/ParamInfoDialog.tsx
import Modal from './Modal';
import { useStrings } from '../StringsContext';
import type { ParamKey } from '../strings';

// Re-export so existing imports keep working.
export type { ParamKey };

interface Props {
  paramKey: ParamKey | null;
  onClose: () => void;
}

export default function ParamInfoDialog({ paramKey, onClose }: Props) {
  const s = useStrings();
  const info = paramKey ? s.paramInfo[paramKey] : null;
  return (
    <Modal open={info !== null} onClose={onClose} title={info?.title ?? ''}>
      {info && (
        <>
          <div className="text-sm leading-relaxed text-slate-600">{info.description}</div>
          {info.options && (
            <dl className="mt-4 flex flex-col gap-3">
              {info.options.map((o) => (
                <div key={o.name}>
                  <dt className="font-mono text-xs font-semibold text-slate-900">{o.name}</dt>
                  <dd className="mt-0.5 text-sm text-slate-600">{o.desc}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {s.paramInfo.gotIt}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
