import { useCallback, useState } from 'react';
import type { Charset } from './types';
import { CHARSETS, DEFAULT_CHARSET } from './lib/constants';
import { decodeBase64, encodeBase64 } from './lib/codec';
import { LocaleContext, useT } from './i18n';
import './base64.css';

interface Props {
  locale?: string;
}

export default function Base64Widget({ locale = 'en' }: Props) {
  return (
    <LocaleContext.Provider value={locale}>
      <Shell />
    </LocaleContext.Provider>
  );
}

function Shell() {
  const t = useT();
  const [plain, setPlain] = useState('');
  const [encoded, setEncoded] = useState('');
  const [charset, setCharset] = useState<Charset>(DEFAULT_CHARSET);
  const [urlSafe, setUrlSafe] = useState(false);
  const [withoutPadding, setWithoutPadding] = useState(false);
  const [error, setError] = useState('');

  const opts = { charset, urlSafe, withoutPadding };

  const handleEncode = useCallback(() => {
    setError('');
    if (!plain) {
      setEncoded('');
      return;
    }
    try {
      setEncoded(encodeBase64(plain, opts));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(t('errorEncode') + ' — ' + message);
    }
  }, [plain, opts, t]);

  const handleDecode = useCallback(() => {
    setError('');
    if (!encoded) {
      setPlain('');
      return;
    }
    try {
      setPlain(decodeBase64(encoded, opts));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(t('errorDecode') + ' — ' + message);
    }
  }, [encoded, opts, t]);

  const handleReset = () => {
    setPlain('');
    setEncoded('');
    setError('');
    setCharset(DEFAULT_CHARSET);
    setUrlSafe(false);
    setWithoutPadding(false);
  };

  return (
    <div
      data-testid="base64-widget"
      className="w-full max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans text-slate-800"
    >
      <SettingsBar
        charset={charset}
        onCharsetChange={setCharset}
        urlSafe={urlSafe}
        onUrlSafeChange={setUrlSafe}
        withoutPadding={withoutPadding}
        onWithoutPaddingChange={setWithoutPadding}
        onReset={handleReset}
      />

      <div className="p-6 sm:p-8 flex flex-col gap-5">
        <Panel
          label={t('plainTextLabel')}
          value={plain}
          onChange={setPlain}
          placeholder={t('plainTextPlaceholder')}
          actionLabel={t('buttonEncode')}
          actionDirection="down"
          onAction={handleEncode}
          actionDisabled={!plain}
          copyLabel={t('buttonCopy')}
          copiedLabel={t('buttonCopied')}
          clearLabel={t('buttonClear')}
        />

        <Panel
          label={t('base64Label')}
          value={encoded}
          onChange={setEncoded}
          placeholder={t('base64Placeholder')}
          mono
          actionLabel={t('buttonDecode')}
          actionDirection="up"
          onAction={handleDecode}
          actionDisabled={!encoded}
          copyLabel={t('buttonCopy')}
          copiedLabel={t('buttonCopied')}
          clearLabel={t('buttonClear')}
        />

        {error && (
          <div role="alert" className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

interface SettingsBarProps {
  charset: Charset;
  onCharsetChange: (c: Charset) => void;
  urlSafe: boolean;
  onUrlSafeChange: (v: boolean) => void;
  withoutPadding: boolean;
  onWithoutPaddingChange: (v: boolean) => void;
  onReset: () => void;
}

function SettingsBar({
  charset,
  onCharsetChange,
  urlSafe,
  onUrlSafeChange,
  withoutPadding,
  onWithoutPaddingChange,
  onReset,
}: SettingsBarProps) {
  const t = useT();
  return (
    <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center gap-x-3 gap-y-2">
      <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <span>{t('charsetLabel')}</span>
        <select
          value={charset}
          onChange={(e) => onCharsetChange(e.target.value as Charset)}
          className="px-2 py-1.5 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {CHARSETS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <PillToggle
        active={urlSafe}
        onClick={() => onUrlSafeChange(!urlSafe)}
        label={t('urlSafeLabel')}
      />
      <PillToggle
        active={withoutPadding}
        onClick={() => onWithoutPaddingChange(!withoutPadding)}
        label={t('withoutPaddingLabel')}
      />

      <button
        type="button"
        onClick={onReset}
        className="ml-auto text-xs font-medium px-2.5 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {t('buttonReset')}
      </button>
    </div>
  );
}

interface PillToggleProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function PillToggle({ active, onClick, label }: PillToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onClick}
      className={
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ' +
        (active
          ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700'
          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100')
      }
    >
      <span
        aria-hidden="true"
        className={
          'inline-block w-3 h-3 rounded-sm border ' +
          (active ? 'bg-white border-white' : 'bg-white border-slate-300')
        }
      >
        {active && (
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-blue-600">
            <path d="M2 6 L5 9 L10 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

interface PanelProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  mono?: boolean;
  actionLabel: string;
  actionDirection: 'up' | 'down';
  onAction: () => void;
  actionDisabled: boolean;
  copyLabel: string;
  copiedLabel: string;
  clearLabel: string;
}

function Panel({
  label,
  value,
  onChange,
  placeholder,
  mono = false,
  actionLabel,
  actionDirection,
  onAction,
  actionDisabled,
  copyLabel,
  copiedLabel,
  clearLabel,
}: PanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — copy is a convenience action
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</span>
        <div className="flex gap-1">
          <IconButton onClick={handleCopy} disabled={!value} active={copied}>
            {copied ? copiedLabel : copyLabel}
          </IconButton>
          <IconButton onClick={() => onChange('')} disabled={!value}>
            {clearLabel}
          </IconButton>
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        spellCheck={false}
        className={
          'block w-full px-3 py-2.5 text-sm bg-white text-slate-800 border-0 resize-y ' +
          'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ' +
          (mono ? 'font-mono' : '')
        }
      />
      <div className="px-3 py-2 border-t border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={onAction}
          disabled={actionDisabled}
          className={
            'w-full px-4 py-2 rounded-md text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1.5 ' +
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ' +
            (actionDisabled
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700')
          }
        >
          <span aria-hidden="true">{actionDirection === 'down' ? '↓' : '↑'}</span>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

interface IconButtonProps {
  onClick: () => void;
  disabled: boolean;
  active?: boolean;
  children: React.ReactNode;
}

function IconButton({ onClick, disabled, active = false, children }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        'text-xs font-medium px-2 py-1 rounded transition-colors ' +
        'disabled:opacity-40 disabled:cursor-not-allowed ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ' +
        (active ? 'text-emerald-700 bg-emerald-50' : 'text-blue-700 hover:bg-blue-50')
      }
    >
      {children}
    </button>
  );
}
