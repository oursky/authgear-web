// src/components/widgets/passkey-demo/components/VerificationSteps.tsx
import type { AssertionVerification } from '../lib/verifyAssertion';

/** The ordered server-style checks shown after a sign-in. */
export default function VerificationSteps({ verification }: { verification: AssertionVerification }) {
  return (
    <ul aria-label="Server verification steps" className="flex flex-col gap-2">
      {verification.steps.map((s) => (
        <li key={s.id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
          <span
            className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${
              s.info
                ? 'bg-sky-50 text-sky-700'
                : s.pass
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
            }`}
          >
            {s.info ? 'INFO' : s.pass ? 'PASS' : 'FAIL'}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900">{s.label}</div>
            <div className="mt-0.5 text-xs text-slate-500">{s.detail}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
