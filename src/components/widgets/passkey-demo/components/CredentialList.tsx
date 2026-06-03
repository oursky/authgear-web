// src/components/widgets/passkey-demo/components/CredentialList.tsx
import type { StoredCredential } from '../lib/storage';

interface Props {
  credentials: StoredCredential[];
  onInspect: (credential: StoredCredential) => void;
  onDelete: (credentialId: string) => void;
  onClearAll: () => void;
}

function algLabel(alg: number): string {
  return alg === -7 ? 'ES256' : alg === -257 ? 'RS256' : `COSE ${alg}`;
}

export default function CredentialList({ credentials, onInspect, onDelete, onClearAll }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Your demo passkeys</h3>
        {credentials.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            Clear all
          </button>
        )}
      </div>

      {credentials.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No demo passkeys yet — create one in panel 1.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {credentials.map((c) => (
            <li
              key={c.credentialId}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-slate-900">
                  {c.userName}{' '}
                  <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-600">
                    {algLabel(c.alg)}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-xs text-slate-500">
                  created {new Date(c.createdAt).toLocaleString()} · uv={c.options.userVerification} · rk=
                  {c.options.residentKey} · transports: {c.transports.join(', ') || 'n/a'}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onInspect(c)}
                  className="rounded border border-slate-300 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
                >
                  Inspect
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(c.credentialId)}
                  className="rounded border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Deleting here removes only this page's record (kept in your browser's localStorage). The passkey itself
        stays in your keychain or password manager until you remove it there — see the FAQ below for per-OS
        instructions.
      </p>
    </section>
  );
}
