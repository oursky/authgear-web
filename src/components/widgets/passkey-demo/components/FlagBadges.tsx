import type { AuthDataFlags } from '../lib/authData';

// 'ed' (extension data) is deliberately omitted — extensions are plumbing, not teaching material.
type FlagKey = keyof Omit<AuthDataFlags, 'raw' | 'ed'>;

const FLAGS: Array<{ key: FlagKey; label: string; title: string }> = [
  { key: 'up', label: 'UP', title: 'User Present — someone interacted with the authenticator' },
  { key: 'uv', label: 'UV', title: 'User Verified — biometric or PIN check passed' },
  { key: 'be', label: 'BE', title: 'Backup Eligible — the credential can sync between devices (a passkey)' },
  { key: 'bs', label: 'BS', title: 'Backup State — the credential is currently backed up' },
  { key: 'at', label: 'AT', title: 'Attested credential data is included' },
];

export default function FlagBadges({ flags }: { flags: AuthDataFlags }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {FLAGS.map(({ key, label, title }) => (
        <span
          key={label}
          title={title}
          aria-label={`${label}: ${title}`}
          className={`rounded border px-2 py-0.5 font-mono text-xs ${
            flags[key]
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-400 line-through'
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
