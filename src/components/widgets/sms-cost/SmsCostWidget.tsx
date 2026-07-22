import { t as tFn } from '@/i18n';
import type { CSSProperties } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './SmsCostWidget.css';
import { computeSmsCost } from './calc';
import { PROVIDERS, RATES_AS_OF, SMS_COST_DATA, type Provider, type SmsCountryRow } from './data';

interface Props { locale: string }

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

function fmtUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1000) return `$${Math.round(n).toLocaleString('en-US')}`;
  return `$${n.toFixed(n < 100 ? 2 : 0)}`;
}

const PRESETS = [
  { label: '10K', val: 10000 },
  { label: '100K', val: 100000 },
  { label: '500K', val: 500000 },
  { label: '1M', val: 1000000 },
];

const defaultCountry = SMS_COST_DATA.find((d) => d.iso === 'HK') ?? SMS_COST_DATA[0];

export default function SmsCostWidget({ locale }: Props) {
  const t = (key: string, vars?: Record<string, string | number>): string => {
    const s = tFn(locale, `Tools.smsCost.widget.${key}`);
    return vars ? interpolate(s, vars) : s;
  };

  const [country, setCountry] = useState<SmsCountryRow>(defaultCountry);
  const [searchQuery, setSearchQuery] = useState(defaultCountry.country);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [provider, setProvider] = useState<Provider>('twilio');
  const [volume, setVolume] = useState(100000);
  const [waPct, setWaPct] = useState(80);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [pumpEnabled, setPumpEnabled] = useState(false);
  const [pumpPct, setPumpPct] = useState(10);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { popular, others, merged } = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const pop = SMS_COST_DATA.filter((d) => d.popular && (!q || d.country.toLowerCase().includes(q)));
    const oth = SMS_COST_DATA.filter((d) => !d.popular && (!q || d.country.toLowerCase().includes(q)));
    return { popular: pop, others: oth, merged: q.length > 0 };
  }, [searchQuery]);

  const selectCountry = useCallback((item: SmsCountryRow) => {
    setCountry(item);
    setSearchQuery(item.country);
    setDropdownOpen(false);
  }, []);

  const smsPrice = country.providers[provider];
  const result = useMemo(
    () =>
      computeSmsCost({
        volume,
        smsPrice,
        whatsappPrice: country.whatsapp_price,
        waAdoptionPct: waPct,
        pumpingPct: pumpEnabled ? pumpPct : 0,
      }),
    [volume, smsPrice, country.whatsapp_price, waPct, pumpEnabled, pumpPct],
  );

  const noResults = merged && popular.length === 0 && others.length === 0;
  const countryOptions = merged ? [...popular, ...others] : null;

  const renderOption = (item: SmsCountryRow) => (
    <div
      key={item.iso}
      className="sc-option"
      role="option"
      aria-selected={item.iso === country.iso}
      tabIndex={0}
      onMouseDown={(e) => {
        e.preventDefault();
        selectCountry(item);
      }}
    >
      {item.country}
    </div>
  );

  return (
    <div className="sc-calc">
      <div className="sc-card">
        <div className="sc-controls">
          <div className="sc-country-group">
            <label className="sc-label" htmlFor="sc-country-search">{t('countryLabel')}</label>
            <div className="sc-country-wrap">
              <input
                type="text"
                id="sc-country-search"
                className="sc-country-input"
                placeholder={t('countryPlaceholder')}
                aria-label={t('countryLabel')}
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setDropdownOpen(true); }}
                onFocus={(e) => {
                  if (blurTimer.current) clearTimeout(blurTimer.current);
                  setSearchQuery('');
                  e.target.select();
                  setDropdownOpen(true);
                }}
                onBlur={() => {
                  blurTimer.current = setTimeout(() => {
                    setDropdownOpen(false);
                    setSearchQuery((q) => (q ? q : country.country));
                  }, 150);
                }}
              />
              <div className={`sc-dropdown${dropdownOpen ? ' open' : ''}`} role="listbox">
                {noResults ? (
                  <div className="sc-option" style={{ color: '#8888aa' }}>{t('countryNoResults')}</div>
                ) : countryOptions ? (
                  countryOptions.map(renderOption)
                ) : (
                  <>
                    {popular.map(renderOption)}
                    {popular.length > 0 && others.length > 0 ? <hr className="sc-divider" /> : null}
                    {others.map(renderOption)}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="sc-provider-group">
            <label className="sc-label" htmlFor="sc-provider">{t('providerLabel')}</label>
            <select
              id="sc-provider"
              className="sc-provider-select"
              value={provider}
              onChange={(e) => setProvider(e.target.value as Provider)}
            >
              {PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="sc-volume-group">
            <label className="sc-label" htmlFor="sc-volume">{t('volumeLabel')}</label>
            <div className="sc-volume-wrap">
              <input
                type="number"
                id="sc-volume"
                className="sc-volume-input"
                value={volume}
                min={0}
                max={100000000}
                onChange={(e) => setVolume(parseInt(e.target.value, 10) || 0)}
              />
              <span className="sc-volume-unit">{t('volumeUnit')}</span>
            </div>
            <div className="sc-presets">
              {PRESETS.map((p) => (
                <button
                  key={p.val}
                  type="button"
                  className={`sc-preset-btn${volume === p.val ? ' active' : ''} plausible-event-name--calculator-preset`}
                  onClick={() => setVolume(p.val)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sc-result">
          <div className="sc-result-label">{t('resultLabel')}</div>
          <div className="sc-result-primary">{t('perMonth', { value: fmtUsd(result.smsCostMonthly) })}</div>
          <div className="sc-result-secondary">{t('perYear', { value: fmtUsd(result.smsCostAnnual) })}</div>
          <div className="sc-result-note">{t('resultNote', { date: RATES_AS_OF })}</div>
        </div>

        <div className="sc-savings">
          <div className="sc-savings-head">
            <span className="sc-savings-title">{t('savingsTitle')}</span>
            <span className="sc-savings-figure">
              <span className="sc-savings-cost">{t('perMonth', { value: fmtUsd(result.blendedCostMonthly) })}</span>
              <span className="sc-savings-pct">{t('savingsPct', { pct: result.savingsPct.toFixed(0) })}</span>
            </span>
          </div>
          <div className="sc-savings-annual">{t('savingsAnnual', { value: fmtUsd(result.savingsAnnual) })}</div>

          <div className="sc-slider-group">
            <div className="sc-slider-head">
              <span>{t('waLabel')}</span>
              <span className="sc-slider-val">{waPct}%</span>
            </div>
            <input
              type="range"
              className="sc-slider"
              min={0}
              max={100}
              value={waPct}
              style={{ '--val': `${waPct}%` } as CSSProperties}
              onChange={(e) => setWaPct(parseInt(e.target.value, 10))}
              aria-label={t('waLabel')}
            />
            <p className="sc-hint">{t('waHint')}</p>
          </div>
        </div>

        <div className="sc-advanced">
          <button
            type="button"
            className="sc-advanced-toggle"
            aria-expanded={advancedOpen}
            onClick={() => setAdvancedOpen((v) => !v)}
          >
            {advancedOpen ? '▾ ' : '▸ '}{t('advancedLabel')}
          </button>
          {advancedOpen && (
            <div className="sc-advanced-body">
              <label className="sc-checkbox-row">
                <input type="checkbox" checked={pumpEnabled} onChange={(e) => setPumpEnabled(e.target.checked)} />
                {t('pumpLabel')}
              </label>
              {pumpEnabled && (
                <>
                  <div className="sc-pump-slider-wrap">
                    <input
                      type="range"
                      className="sc-pump-slider"
                      min={0}
                      max={50}
                      value={pumpPct}
                      style={{ '--val': `${(pumpPct / 50) * 100}%` } as CSSProperties}
                      onChange={(e) => setPumpPct(parseInt(e.target.value, 10))}
                      aria-label={t('pumpLabel')}
                    />
                    <span className="sc-pump-val">{pumpPct}%</span>
                  </div>
                  <p className="sc-hint" style={{ color: '#8888aa' }}>{t('pumpHint')}</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="sc-cta-row">
          <a className="sc-cta-btn sc-cta-primary plausible-event-name--signup-calculator" href="https://accounts.portal.authgear.com/signup">
            {t('ctaStartFree')}
          </a>
          <a className="sc-cta-btn sc-cta-secondary plausible-event-name--sms-solutions-click" href="/solutions/reduce-sms-otp-cost/">
            {t('ctaSeeHow')}
          </a>
        </div>
      </div>
    </div>
  );
}
