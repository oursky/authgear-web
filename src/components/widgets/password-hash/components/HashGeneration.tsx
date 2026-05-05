import { useState } from 'react';
import type { Algorithm, HashResult, SaltEncoding } from '../types';
import { useAlgorithmConfig } from '../hooks/useAlgorithmConfig';
import { useHashGeneration } from '../hooks/useHashGeneration';
import { useSaltManagement } from '../hooks/useSaltManagement';
import { useClipboard } from '../hooks/useClipboard';
import { HASHING_ALGORITHMS, SALT_ENCODING_OPTIONS } from '../lib/constants';
import {
  showsExecutionTimeHint,
  supportsSaltFormat,
} from '../lib/algorithmUtils';

interface Props {
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (alg: Algorithm) => void;
}

const ALGORITHMS: { value: Algorithm; label: string; sub?: string; recommended?: boolean }[] = [
  { value: 'argon2id', label: 'Argon2id', sub: 'memory-hard', recommended: true },
  { value: 'scrypt', label: 'scrypt', sub: 'memory-hard' },
  { value: 'bcrypt', label: 'bcrypt', sub: 'adaptive' },
  { value: 'pbkdf2', label: 'PBKDF2', sub: 'NIST-compliant' },
];

export default function HashGeneration({ selectedAlgorithm, setSelectedAlgorithm }: Props) {
  const [saltEncoding, setSaltEncoding] = useState<SaltEncoding>('hex');

  const { parameters, warnings, handleParameterChange } = useAlgorithmConfig(selectedAlgorithm);
  const {
    saltInput,
    saltByteLength,
    handleSaltChange,
    handleGenerateSalt,
  } = useSaltManagement({ selectedAlgorithm, parameters, saltEncoding });

  const {
    password,
    isGenerating,
    result,
    error,
    validationErrors,
    handlePasswordChange,
    handleSaltChange: handleSaltChangeFromHook,
    handleGenerate,
    setResult,
  } = useHashGeneration({
    selectedAlgorithm,
    parameters,
    saltInput,
    saltEncoding,
    hashEncoding: 'hex',
  });

  const handleSaltChangeCombined = (value: string) => {
    handleSaltChange(value);
    handleSaltChangeFromHook(value);
  };

  const handleAlgorithmChange = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    setResult(null);
  };

  const algorithmConfig = HASHING_ALGORITHMS[selectedAlgorithm.toUpperCase()];
  const showSaltFormat = supportsSaltFormat(selectedAlgorithm);

  return (
    <div className="flex flex-col gap-6">
      {/* Algorithm picker */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Algorithm
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ALGORITHMS.map((alg) => {
            const active = selectedAlgorithm === alg.value;
            return (
              <button
                key={alg.value}
                type="button"
                onClick={() => handleAlgorithmChange(alg.value)}
                className={
                  'relative flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-lg border text-left transition-colors ' +
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ' +
                  (active
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50')
                }
              >
                <span className="text-sm font-semibold">{alg.label}</span>
                {alg.sub && (
                  <span className="text-[11px] text-slate-500">{alg.sub}</span>
                )}
                {alg.recommended && (
                  <span className="absolute top-1.5 right-1.5 text-[10px] font-semibold tracking-wide text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    2026
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Password */}
      <FieldGroup label="Plaintext password" error={validationErrors.password}>
        <input
          type="text"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="Enter the password to hash"
          className={inputClass(!!validationErrors.password)}
        />
      </FieldGroup>

      {/* Parameters */}
      {algorithmConfig && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Parameters
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
            {Object.keys(algorithmConfig.parameters)
              .filter((key) => key !== 'saltLength')
              .map((paramKey) => {
                const param = algorithmConfig.parameters[paramKey];
                return (
                  <div key={paramKey} className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-slate-600" title={param.label}>
                      {param.label}
                    </label>
                    <input
                      type="number"
                      value={parameters[paramKey] ?? param.default}
                      onChange={(e) => handleParameterChange(paramKey, parseInt(e.target.value, 10))}
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      className="w-full px-2.5 py-1.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    />
                  </div>
                );
              })}
          </div>
          {warnings.length > 0 && (
            <ul className="mt-2 space-y-1">
              {warnings.map((w) => (
                <li key={w} className="text-xs text-amber-700 flex items-start gap-1.5">
                  <span aria-hidden="true">⚠</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Salt */}
      <FieldGroup label="Salt" error={validationErrors.salt}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex-1 flex items-stretch border border-slate-300 rounded overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <input
              type="text"
              value={saltInput}
              onChange={(e) => handleSaltChangeCombined(e.target.value)}
              placeholder="Generated automatically"
              className="flex-1 px-3 py-2 text-sm font-mono bg-white text-slate-800 focus:outline-none"
            />
            <span className="px-2 text-xs text-slate-500 self-center bg-slate-50 border-l border-slate-200 h-full flex items-center">
              {saltByteLength} B
            </span>
            <button
              type="button"
              onClick={handleGenerateSalt}
              title="Generate new salt"
              aria-label="Generate new salt"
              className="px-3 bg-slate-50 border-l border-slate-200 hover:bg-slate-100 text-slate-700 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              ↻
            </button>
          </div>
          {showSaltFormat && (
            <div className="flex border border-slate-300 rounded overflow-hidden self-start">
              {SALT_ENCODING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSaltEncoding(opt.value)}
                  className={
                    'px-3 py-2 text-xs font-medium transition-colors ' +
                    (saltEncoding === opt.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-50')
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </FieldGroup>

      {/* Generate */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating || !password.trim() || !saltInput.trim()}
        className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        {isGenerating ? 'Generating…' : 'Generate password hash'}
      </button>

      {error && (
        <div role="alert" className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Result */}
      {result && <HashResultCard result={result} saltEncoding={saltEncoding} algorithm={selectedAlgorithm} />}
    </div>
  );
}

interface FieldGroupProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FieldGroup({ label, error, children }: FieldGroupProps) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <div className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5">
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return (
    'w-full px-3 py-2 text-sm border rounded font-mono ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ' +
    (hasError ? 'border-red-400' : 'border-slate-300')
  );
}

interface HashResultCardProps {
  result: HashResult;
  saltEncoding: SaltEncoding;
  algorithm: Algorithm;
}

function HashResultCard({ result, saltEncoding, algorithm }: HashResultCardProps) {
  const [copiedHash, copyHash] = useClipboard();
  const [copiedSalt, copySalt] = useClipboard();

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Encoded hash
          </span>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            {result.algorithm.toUpperCase()}
          </span>
        </div>
        <CopyButton copied={copiedHash} onClick={() => copyHash(result.encodedHash)} />
      </div>
      <pre className="px-4 py-3 text-xs sm:text-sm font-mono text-slate-800 whitespace-pre-wrap break-all overflow-x-auto">
        {result.encodedHash}
      </pre>
      <div className="px-4 py-3 border-t border-slate-200 bg-white grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="font-medium text-slate-500 uppercase tracking-wide text-[10px] mb-0.5">
            Execution time
          </div>
          <div className="font-mono text-slate-800">{result.executionTime} ms</div>
          {showsExecutionTimeHint(algorithm) && (
            <div className="mt-1 text-[11px] text-slate-500 leading-snug">
              Tune memory and iterations to land near 250–500 ms on production hardware.
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <span className="font-medium text-slate-500 uppercase tracking-wide text-[10px]">
              Salt ({saltEncoding.toUpperCase()})
            </span>
            <CopyButton copied={copiedSalt} onClick={() => copySalt(result.salt)} />
          </div>
          <div className="font-mono text-slate-800 break-all">{result.salt}</div>
        </div>
      </div>
    </div>
  );
}

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
}

function CopyButton({ copied, onClick }: CopyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'text-xs font-medium px-2 py-1 rounded transition-colors ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ' +
        (copied
          ? 'text-emerald-700 bg-emerald-50'
          : 'text-blue-700 hover:bg-blue-50')
      }
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
