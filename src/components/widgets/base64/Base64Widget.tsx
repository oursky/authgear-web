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
    <div data-testid="base64-widget">
      <div className="b64-chrome">
        <span className="b64-dot b64-dot--r" aria-hidden="true"></span>
        <span className="b64-dot b64-dot--y" aria-hidden="true"></span>
        <span className="b64-dot b64-dot--g" aria-hidden="true"></span>
        <span className="b64-chrome__path">authgear · base64 · encode-decode</span>
      </div>

      <div className="b64-body">
        <div className="b64-row">
          <span className="b64-kv-label">{t('charsetLabel')}</span>
          <select
            className="b64-select"
            value={charset}
            onChange={(e) => setCharset(e.target.value as Charset)}
            aria-label={t('charsetLabel')}
          >
            {CHARSETS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <ToggleRow
          label={t('urlSafeLabel')}
          checked={urlSafe}
          onChange={setUrlSafe}
        />
        <ToggleRow
          label={t('withoutPaddingLabel')}
          checked={withoutPadding}
          onChange={setWithoutPadding}
        />

        <Panel
          label={t('plainTextLabel')}
          panelKind="input"
          value={plain}
          onChange={setPlain}
          placeholder={t('plainTextPlaceholder')}
          actionLabel={t('buttonEncode')}
          actionGlyph="↓"
          onAction={handleEncode}
          actionDisabled={!plain}
          copyLabel={t('buttonCopy')}
          copiedLabel={t('buttonCopied')}
          clearLabel={t('buttonClear')}
        />

        <Panel
          label={t('base64Label')}
          panelKind="output"
          value={encoded}
          onChange={setEncoded}
          placeholder={t('base64Placeholder')}
          actionLabel={t('buttonDecode')}
          actionGlyph="↑"
          onAction={handleDecode}
          actionDisabled={!encoded}
          copyLabel={t('buttonCopy')}
          copiedLabel={t('buttonCopied')}
          clearLabel={t('buttonClear')}
        />

        {error && (
          <div role="alert" className="b64-error">
            {error}
          </div>
        )}

        <div style={{ display: 'flex' }}>
          <button type="button" className="b64-btn b64-btn--reset" onClick={handleReset}>
            {t('buttonReset')}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <div className="b64-row">
      <label className="b64-toggle-label">
        <span className="b64-kv-label">{label}</span>
      </label>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className="b64-switch"
        onClick={() => onChange(!checked)}
      />
    </div>
  );
}

interface PanelProps {
  label: string;
  panelKind: 'input' | 'output';
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  actionLabel: string;
  actionGlyph: string;
  onAction: () => void;
  actionDisabled: boolean;
  copyLabel: string;
  copiedLabel: string;
  clearLabel: string;
}

function Panel({
  label,
  panelKind,
  value,
  onChange,
  placeholder,
  actionLabel,
  actionGlyph,
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
    <div className="b64-panel">
      <div className="b64-panel__header">
        <span className="b64-panel__title">
          <span className="b64-panel__title-prefix">{panelKind === 'input' ? '>' : '<'}</span>
          {label}
        </span>
        <div className="b64-panel__actions">
          <button
            type="button"
            className="b64-btn b64-btn--icon"
            onClick={handleCopy}
            disabled={!value}
            data-state={copied ? 'copied' : undefined}
          >
            {copied ? copiedLabel : copyLabel}
          </button>
          <button
            type="button"
            className="b64-btn b64-btn--icon"
            onClick={() => onChange('')}
            disabled={!value}
          >
            {clearLabel}
          </button>
        </div>
      </div>
      <textarea
        className="b64-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        spellCheck={false}
      />
      <div className="b64-panel__footer">
        <button
          type="button"
          className="b64-btn b64-btn--primary"
          onClick={onAction}
          disabled={actionDisabled}
        >
          <span aria-hidden="true">{actionGlyph}</span>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
