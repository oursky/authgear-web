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
      setError(t('errorEncode') + ' — ' + (e instanceof Error ? e.message : String(e)));
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
      setError(t('errorDecode') + ' — ' + (e instanceof Error ? e.message : String(e)));
    }
  }, [encoded, opts, t]);

  return (
    <div
      data-testid="base64-widget"
      className="w-full max-w-2xl mx-auto flex flex-col gap-3 text-slate-800"
    >
      <textarea
        value={plain}
        onChange={(e) => setPlain(e.target.value)}
        placeholder={t('plainTextPlaceholder')}
        rows={4}
        spellCheck={false}
        aria-label={t('plainTextLabel')}
        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-700">
        <button
          type="button"
          onClick={handleEncode}
          disabled={!plain}
          className={
            'inline-flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-semibold border ' +
            'transition-colors duration-100 ease-out ' +
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ' +
            (!plain
              ? 'bg-white border-slate-300 text-slate-400 cursor-not-allowed'
              : 'bg-white border-blue-600 text-blue-700 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-800 active:bg-blue-100')
          }
        >
          {t('buttonEncode')} <span aria-hidden="true">↓</span>
        </button>
        <button
          type="button"
          onClick={handleDecode}
          disabled={!encoded}
          className={
            'inline-flex items-center gap-1 px-3.5 py-2 rounded-md text-sm font-semibold border ' +
            'transition-colors duration-100 ease-out ' +
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ' +
            (!encoded
              ? 'bg-white border-slate-300 text-slate-400 cursor-not-allowed'
              : 'bg-white border-blue-600 text-blue-700 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-800 active:bg-blue-100')
          }
        >
          <span aria-hidden="true">↑</span> {t('buttonDecode')}
        </button>

        <span className="ml-auto flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
          <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
            <span>{t('charsetLabel')}</span>
            <select
              value={charset}
              onChange={(e) => setCharset(e.target.value as Charset)}
              className="px-1.5 py-0.5 text-xs bg-white border border-slate-300 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {CHARSETS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="inline-flex items-center gap-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
            />
            {t('urlSafeLabel')}
          </label>
          <label className="inline-flex items-center gap-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={withoutPadding}
              onChange={(e) => setWithoutPadding(e.target.checked)}
            />
            {t('withoutPaddingLabel')}
          </label>
        </span>
      </div>

      <textarea
        value={encoded}
        onChange={(e) => setEncoded(e.target.value)}
        placeholder={t('base64Placeholder')}
        rows={4}
        spellCheck={false}
        aria-label={t('base64Label')}
        className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {error && (
        <div role="alert" className="text-xs text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
