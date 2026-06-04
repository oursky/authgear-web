// src/components/widgets/passkey-demo/components/UserVerificationModal.tsx
import Modal from './Modal';

const OPTIONS: { value: UserVerificationRequirement; label: string; tag?: string; desc: string }[] = [
  {
    value: 'preferred',
    label: 'Preferred',
    tag: 'default',
    desc: "Verify with biometric or PIN if the device supports it, but still allow sign-in if it can't. Sensible default for most apps.",
  },
  {
    value: 'required',
    label: 'Required',
    desc: "The user must be verified (Face ID / Touch ID / Windows Hello / PIN). If the authenticator can't, the sign-in fails. Use for sensitive actions.",
  },
  {
    value: 'discouraged',
    label: 'Discouraged',
    desc: 'Skip verification — only confirm someone is present (a tap). Fastest, lowest assurance.',
  },
];

interface Props {
  open: boolean;
  value: UserVerificationRequirement;
  onChange: (v: UserVerificationRequirement) => void;
  onClose: () => void;
}

export default function UserVerificationModal({ open, value, onChange, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="User verification">
      <p className="mb-3 text-xs leading-relaxed text-slate-500">
        How strongly the authenticator must confirm it's really you during sign-in. Sets the{' '}
        <code className="rounded bg-slate-100 px-1 py-0.5">userVerification</code> field on{' '}
        <code className="rounded bg-slate-100 px-1 py-0.5">navigator.credentials.get()</code> — watch the UV
        flag change in the verification steps.
      </p>
      <div role="radiogroup" aria-label="User verification" className="flex flex-col gap-2">
        {OPTIONS.map((o) => {
          const selected = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.value)}
              className={`flex gap-3 rounded-lg border p-3 text-left ${
                selected ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span
                className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 ${
                  selected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                }`}
              />
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-900">
                  {o.label}
                  {o.tag && (
                    <span className="rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-700">
                      {o.tag}
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-500">{o.desc}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-400">Applies to both "Sign in" and "Sign in with any passkey".</span>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
