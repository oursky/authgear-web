import type { AuthDataFlags } from '../lib/authData';
import { useStrings } from '../StringsContext';

// 'ed' (extension data) is deliberately omitted — extensions are plumbing, not teaching material.
type FlagKey = keyof Omit<AuthDataFlags, 'raw' | 'ed'>;

const FLAG_KEYS: Array<{ key: FlagKey; label: string }> = [
  { key: 'up', label: 'UP' },
  { key: 'uv', label: 'UV' },
  { key: 'be', label: 'BE' },
  { key: 'bs', label: 'BS' },
  { key: 'at', label: 'AT' },
];

export default function FlagBadges({ flags }: { flags: AuthDataFlags }) {
  const s = useStrings();
  return (
    <div className="flex flex-wrap gap-1.5">
      {FLAG_KEYS.map(({ key, label }) => (
        <span
          key={label}
          title={s.flags[key]}
          aria-label={`${label}: ${s.flags[key]}`}
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
