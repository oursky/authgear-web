import { t as tFn } from '@/i18n';
import type { CSSProperties } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import './AgSmsCalculator.css';
import { AG_DATA, type AgCountryRow } from './agSmsCalculatorData';

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `$${Math.round(n).toLocaleString('en-US')}`;
  return `$${n.toFixed(0)}`;
}

const PRESETS = [
  { label: '10K', val: 10000 },
  { label: '100K', val: 100000 },
  { label: '500K', val: 500000 },
  { label: '1M', val: 1000000 },
];

const hkDefault = AG_DATA.find((d) => d.iso === 'HK')!;

interface Props { locale: string }

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

export default function SmsCostCalculator({ locale }: Props) {
  const t = (key: string, vars?: Record<string, string | number>): string => {
    const s = tFn(locale, `SmsCostCalculator.${key}`);
    return vars ? interpolate(s, vars) : s;
  };
  const [selectedCountry, setSelectedCountry] = useState<AgCountryRow>(hkDefault);
  const [searchQuery, setSearchQuery] = useState(hkDefault.country);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [volume, setVolume] = useState(100000);
  const [waPct, setWaPct] = useState(90);
  const [pumpPct, setPumpPct] = useState(10);
  const [bioPct, setBioPct] = useState(70);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { popular, others, mergeLists } = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const pop = AG_DATA.filter((d) => d.popular && (!q || d.country.toLowerCase().includes(q)));
    const oth = AG_DATA.filter((d) => !d.popular && (!q || d.country.toLowerCase().includes(q)));
    return {
      popular: pop,
      others: oth,
      mergeLists: q.length > 0,
    };
  }, [searchQuery]);

  const selectCountry = useCallback((item: AgCountryRow) => {
    setSelectedCountry(item);
    setSearchQuery(item.country);
    setDropdownOpen(false);
  }, []);

  const outputs = useMemo(() => {
    const vol = Math.max(0, volume || 0);
    const waRate = waPct / 100;
    const pumpRate = pumpPct / 100;
    const bioRate = bioPct / 100;
    const fraudBlocked = pumpRate * 0.2;
    const effectiveVolume = vol * (1 - fraudBlocked);
    const smsPx = selectedCountry.sms_price;
    const waPx = selectedCountry.whatsapp_price;

    const smsCost = vol * smsPx;
    const blendedCost = effectiveVolume * waRate * waPx + effectiveVolume * (1 - waRate) * smsPx;
    const savings = smsCost - blendedCost;
    const savingsPct = smsCost > 0 ? (savings / smsCost) * 100 : 0;
    const annualSavings = savings * 12;
    const projectedCost = blendedCost * (1 - bioRate);
    const projectedSavings = smsCost - projectedCost;

    return {
      smsCost,
      blendedCost,
      savings,
      savingsPct,
      annualSavings,
      projectedCost,
      projectedSavings,
      bioPctRounded: Math.round(bioRate * 100),
    };
  }, [selectedCountry, volume, waPct, pumpPct, bioPct]);

  const waTrackPct = ((waPct - 50) / (100 - 50)) * 100;
  const pumpTrackPct = (pumpPct / 50) * 100;
  const bioTrackPct = bioPct;

  const noResults = mergeLists && popular.length === 0 && others.length === 0;

  return (
    <div className="ag-calc">
      <div className="ag-card">
        <div className="ag-body">
          <div className="ag-inputs">
            <p className="ag-col-title">{t('inputsTitle')}</p>

            <div className="ag-form-group">
              <label className="ag-label" htmlFor="ag-country-search">
                {t('countryLabel')}
              </label>
              <div className="ag-country-wrap" id="ag-country-wrap">
                <input
                  type="text"
                  id="ag-country-search"
                  className="ag-country-input"
                  placeholder={t('countryPlaceholder')}
                  autoComplete="off"
                  aria-label={t('countryAriaLabel')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={(e) => {
                    if (blurTimer.current) clearTimeout(blurTimer.current);
                    // Clear the search so the user sees the full country list; also select
                    // the existing text so typing over it is natural.
                    setSearchQuery('');
                    e.target.select();
                    setDropdownOpen(true);
                  }}
                  onBlur={() => {
                    blurTimer.current = setTimeout(() => {
                      setDropdownOpen(false);
                      // Restore the selected country's name if the user blurred without picking anything.
                      setSearchQuery((q) => (q ? q : selectedCountry.country));
                    }, 150);
                  }}
                />
                <div className={`ag-dropdown${dropdownOpen ? ' open' : ''}`} id="ag-dropdown">
                  {noResults ? (
                    <div className="ag-option" style={{ color: '#8888aa' }}>
                      {t('countryNoResults')}
                    </div>
                  ) : mergeLists ? (
                    [...popular, ...others].map((item) => (
                      <div
                        key={item.iso}
                        className="ag-option"
                        role="option"
                        tabIndex={0}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          selectCountry(item);
                        }}
                      >
                        {item.country}
                      </div>
                    ))
                  ) : (
                    <>
                      {popular.map((item) => (
                        <div
                          key={item.iso}
                          className="ag-option"
                          role="option"
                          tabIndex={0}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            selectCountry(item);
                          }}
                        >
                          {item.country}
                        </div>
                      ))}
                      {popular.length > 0 && others.length > 0 ? <hr className="ag-divider" /> : null}
                      {others.map((item) => (
                        <div
                          key={item.iso}
                          className="ag-option"
                          role="option"
                          tabIndex={0}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            selectCountry(item);
                          }}
                        >
                          {item.country}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="ag-form-group">
              <label className="ag-label" htmlFor="ag-volume-input">
                {t('volumeLabel')}
              </label>
              <div className="ag-volume-wrap">
                <input
                  type="number"
                  id="ag-volume-input"
                  className="ag-volume-input"
                  value={volume}
                  min={1}
                  max={100000000}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10) || 0)}
                />
                <span className="ag-volume-unit">{t('volumeUnit')}</span>
              </div>
              <div className="ag-presets">
                {PRESETS.map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    className={`ag-preset-btn${volume === p.val ? ' active' : ''} plausible-event-name--calculator-preset`}
                    onClick={() => setVolume(p.val)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ag-form-group">
              <label className="ag-label">{t('waLabel')}</label>
              <div className="ag-slider-wrap">
                <input
                  type="range"
                  id="ag-wa-slider"
                  className="ag-slider"
                  min={50}
                  max={100}
                  value={waPct}
                  style={{ '--val': `${waTrackPct}%` } as CSSProperties}
                  onChange={(e) => setWaPct(parseInt(e.target.value, 10))}
                />
                <span className="ag-slider-val" id="ag-wa-val">
                  {waPct}%
                </span>
              </div>
              <p className="ag-hint">{t('waHint')}</p>
            </div>

            <div className="ag-form-group">
              <label className="ag-label">{t('pumpLabel')}</label>
              <div className="ag-slider-wrap">
                <input
                  type="range"
                  id="ag-pump-slider"
                  className="ag-slider"
                  min={0}
                  max={50}
                  value={pumpPct}
                  style={{ '--val': `${pumpTrackPct}%` } as CSSProperties}
                  onChange={(e) => setPumpPct(parseInt(e.target.value, 10))}
                />
                <span className="ag-slider-val" id="ag-pump-val">
                  {pumpPct}%
                </span>
              </div>
              <p className="ag-hint">{t('pumpHint')}</p>
            </div>

            <div className="ag-form-group">
              <label className="ag-label">{t('bioLabel')}</label>
              <div className="ag-slider-wrap">
                <input
                  type="range"
                  id="ag-bio-slider"
                  className="ag-slider"
                  min={0}
                  max={100}
                  value={bioPct}
                  style={{ '--val': `${bioTrackPct}%` } as CSSProperties}
                  onChange={(e) => setBioPct(parseInt(e.target.value, 10))}
                />
                <span className="ag-slider-val" id="ag-bio-val">
                  {bioPct}%
                </span>
              </div>
              <p className="ag-hint">{t('bioHint')}</p>
            </div>
          </div>

          <div className="ag-outputs">
            <p className="ag-col-title">{t('outputsTitle')}</p>

            <div className="ag-annual-box">
              <div className="ag-annual-label">{t('annualSavingsLabel')}</div>
              <div className="ag-annual-val" id="ag-out-annual">
                {fmt(outputs.annualSavings)}
              </div>
              <div className="ag-annual-sub" id="ag-out-annual-pct">
                {t('annualSavingsPct', { pct: outputs.savingsPct.toFixed(0) })}
              </div>
            </div>

            <div className="ag-bar-wrap">
              <div className="ag-bar-labels">
                <span>0%</span>
                <span id="ag-bar-pct-label">{t('barSavedLabel', { pct: outputs.savingsPct.toFixed(0) })}</span>
                <span>100%</span>
              </div>
              <div className="ag-bar-track">
                <div
                  className="ag-bar-fill"
                  id="ag-savings-bar"
                  style={{ width: `${Math.min(outputs.savingsPct, 100).toFixed(1)}%` }}
                />
              </div>
            </div>

            <div className="ag-output-row">
              <span className="ag-output-label">{t('currentSmsCostLabel')}</span>
              <span className="ag-output-val" id="ag-out-sms">
                {t('valuePerMonth', { value: fmt(outputs.smsCost) })}
              </span>
            </div>
            <div className="ag-output-row">
              <span className="ag-output-label">{t('withAuthgearLabel')}</span>
              <div style={{ textAlign: 'right' }}>
                <div className="ag-output-val" id="ag-out-wa">
                  {t('valuePerMonth', { value: fmt(outputs.blendedCost) })}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#27ae60' }} id="ag-out-monthly-sub">
                  {t('savingPerMonth', { amount: fmt(outputs.savings) })}
                </div>
              </div>
            </div>
            <div className="ag-output-row">
              <span className="ag-output-label">
                {t('month6CostLabel')}
                <br />
                <span style={{ fontSize: '11px', fontWeight: 400, color: '#8888aa' }} id="ag-out-projected-sub">
                  {t('afterBioAdoption', { pct: outputs.bioPctRounded })}
                </span>
              </span>
              <div style={{ textAlign: 'right' }}>
                <div className="ag-output-val" id="ag-out-projected">
                  {t('valuePerMonth', { value: fmt(outputs.projectedCost) })}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#27ae60' }} id="ag-out-projected-saving-sub">
                  {t('savingPerMonth', { amount: fmt(outputs.projectedSavings) })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ag-cta-row">
          <a className="ag-cta-btn plausible-event-name--signup-calculator" href="https://portal.authgear.com">
            {t('ctaButton')}
          </a>
        </div>
      </div>
    </div>
  );
}
