import { useState } from 'react';
import { useHashVerification } from '../hooks/useHashVerification';

const SUPPORTED_FORMATS: { name: string; example: string }[] = [
  { name: 'Argon2id', example: '$argon2id$v=19$m=19456,t=2,p=1$…' },
  { name: 'scrypt', example: '$scrypt$ln=14,r=8,p=1$…' },
  { name: 'bcrypt', example: '$2b$12$…' },
  { name: 'PBKDF2', example: '$pbkdf2-sha256$600000$…' },
];

export default function HashVerification() {
  const [formatsOpen, setFormatsOpen] = useState(false);
  const {
    encodedHash,
    candidatePassword,
    isVerifying,
    verificationResult,
    error,
    handleEncodedHashChange,
    handleCandidatePasswordChange,
    handleVerify,
  } = useHashVerification();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Encoded hash
          </label>
          <button
            type="button"
            onClick={() => setFormatsOpen(!formatsOpen)}
            className="text-xs text-blue-700 hover:underline focus:outline-none focus-visible:underline"
          >
            {formatsOpen ? 'Hide formats' : 'Supported formats'}
          </button>
        </div>
        <textarea
          value={encodedHash}
          onChange={(e) => handleEncodedHashChange(e.target.value)}
          rows={3}
          placeholder="Paste an encoded password hash (e.g. $argon2id$v=19$m=19456,t=2,p=1$…)"
          className={
            'w-full px-3 py-2 text-sm font-mono border rounded resize-y ' +
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ' +
            (error ? 'border-red-400' : 'border-slate-300')
          }
        />
        {error && (
          <div className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
            <span aria-hidden="true">⚠</span>
            <span>{error}</span>
          </div>
        )}
        {formatsOpen && (
          <ul className="mt-2 grid sm:grid-cols-2 gap-1.5 p-3 rounded bg-slate-50 border border-slate-200">
            {SUPPORTED_FORMATS.map((f) => (
              <li key={f.name} className="text-xs flex flex-col">
                <span className="font-semibold text-slate-700">{f.name}</span>
                <code className="font-mono text-slate-500 break-all">{f.example}</code>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Candidate password
        </label>
        <input
          type="text"
          value={candidatePassword}
          onChange={(e) => handleCandidatePasswordChange(e.target.value)}
          placeholder="Password to verify against the hash"
          className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={isVerifying || !encodedHash.trim() || !candidatePassword.trim()}
        className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {isVerifying ? 'Verifying…' : 'Verify password'}
      </button>

      {verificationResult && (
        <div
          className={
            'rounded-xl border p-4 flex items-start gap-3 ' +
            (verificationResult.isValid
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-red-200 bg-red-50')
          }
        >
          <div
            className={
              'flex-none w-8 h-8 rounded-full flex items-center justify-center text-base font-semibold ' +
              (verificationResult.isValid
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 text-white')
            }
            aria-hidden="true"
          >
            {verificationResult.isValid ? '✓' : '✗'}
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={
                'text-sm font-semibold ' +
                (verificationResult.isValid ? 'text-emerald-900' : 'text-red-900')
              }
            >
              {verificationResult.isValid ? 'Password matches' : 'Password does not match'}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Detected algorithm: <span className="font-mono font-medium text-slate-800">{verificationResult.algorithm.toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
