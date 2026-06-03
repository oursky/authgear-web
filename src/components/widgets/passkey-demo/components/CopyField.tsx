import { useClipboard } from '../hooks/useClipboard';

interface Props {
  label: string;
  /** base64url-rendered binary value. */
  value: string;
}

export default function CopyField({ label, value }: Props) {
  const { copied, copy } = useClipboard();
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-28 shrink-0 font-medium text-slate-600">{label}</span>
      <code className="min-w-0 flex-1 truncate rounded bg-slate-100 px-2 py-1 text-slate-800">{value}</code>
      <button
        type="button"
        className="shrink-0 rounded border border-slate-300 px-2 py-1 text-slate-600 hover:bg-slate-50"
        onClick={() => copy(label, value)}
      >
        {copied === label ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
