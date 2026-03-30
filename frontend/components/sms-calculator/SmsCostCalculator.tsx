'use client';

import PlausibleButton from '@/components/PlausibleButton';
import PlausibleLink from '@/components/PlausibleLink';
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

export default function SmsCostCalculator() {
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
            <p className="ag-col-title">Your Details</p>

            <div className="ag-form-group">
              <label className="ag-label" htmlFor="ag-country-search">
                Country / Market
              </label>
              <div className="ag-country-wrap" id="ag-country-wrap">
                <input
                  type="text"
                  id="ag-country-search"
                  className="ag-country-input"
                  placeholder="Search country…"
                  autoComplete="off"
                  aria-label="Search country"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => {
                    if (blurTimer.current) clearTimeout(blurTimer.current);
                    setDropdownOpen(true);
                  }}
                  onBlur={() => {
                    blurTimer.current = setTimeout(() => setDropdownOpen(false), 150);
                  }}
                />
                <div className={`ag-dropdown${dropdownOpen ? ' open' : ''}`} id="ag-dropdown">
                  {noResults ? (
                    <div className="ag-option" style={{ color: '#8888aa' }}>
                      No results
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
                Monthly OTP Volume
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
                <span className="ag-volume-unit">OTPs / mo</span>
              </div>
              <div className="ag-presets">
                {PRESETS.map((p) => (
                  <PlausibleButton
                    key={p.val}
                    type="button"
                    className={`ag-preset-btn${volume === p.val ? ' active' : ''}`}
                    eventName="calculator-preset"
                    onClick={() => setVolume(p.val)}
                  >
                    {p.label}
                  </PlausibleButton>
                ))}
              </div>
            </div>

            <div className="ag-form-group">
              <label className="ag-label">WhatsApp Adoption Rate</label>
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
              <p className="ag-hint">Users without WhatsApp automatically receive SMS fallback</p>
            </div>

            <div className="ag-form-group">
              <label className="ag-label">SMS Pumping Attack Rate</label>
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
              <p className="ag-hint">
                Estimated % of your SMS volume from fraudulent attacks. Authgear&apos;s Fraud Protection blocks ~20% of
                these.
              </p>
            </div>

            <div className="ag-form-group">
              <label className="ag-label">Biometric Login Adoption Rate in 6 month+</label>
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
              <p className="ag-hint">Returning users who switch to biometric / passkey login — no OTP sent</p>
            </div>
          </div>

          <div className="ag-outputs">
            <p className="ag-col-title">Your Projected Savings</p>

            <div className="ag-annual-box">
              <div className="ag-annual-label">Annual Savings</div>
              <div className="ag-annual-val" id="ag-out-annual">
                {fmt(outputs.annualSavings)}
              </div>
              <div className="ag-annual-sub" id="ag-out-annual-pct">
                {outputs.savingsPct.toFixed(0)}% savings vs. SMS-only
              </div>
            </div>

            <div className="ag-bar-wrap">
              <div className="ag-bar-labels">
                <span>0%</span>
                <span id="ag-bar-pct-label">{outputs.savingsPct.toFixed(0)}% saved</span>
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
              <span className="ag-output-label">Current SMS cost / mo</span>
              <span className="ag-output-val" id="ag-out-sms">
                {fmt(outputs.smsCost)}/mo
              </span>
            </div>
            <div className="ag-output-row">
              <span className="ag-output-label">With Authgear / mo</span>
              <div style={{ textAlign: 'right' }}>
                <div className="ag-output-val" id="ag-out-wa">
                  {fmt(outputs.blendedCost)}/mo
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#27ae60' }} id="ag-out-monthly-sub">
                  saving {fmt(outputs.savings)} / mo
                </div>
              </div>
            </div>
            <div className="ag-output-row">
              <span className="ag-output-label">
                Month 6+ Cost
                <br />
                <span style={{ fontSize: '11px', fontWeight: 400, color: '#8888aa' }} id="ag-out-projected-sub">
                  After {outputs.bioPctRounded}% biometric adoption
                </span>
              </span>
              <div style={{ textAlign: 'right' }}>
                <div className="ag-output-val" id="ag-out-projected">
                  {fmt(outputs.projectedCost)}/mo
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#27ae60' }} id="ag-out-projected-saving-sub">
                  saving {fmt(outputs.projectedSavings)} / mo
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ag-cta-row">
          <PlausibleLink className="ag-cta-btn" href="https://portal.authgear.com" eventName="signup-calculator">
            Start Saving Now — Free to Get Started →
          </PlausibleLink>
        </div>
      </div>
    </div>
  );
}
