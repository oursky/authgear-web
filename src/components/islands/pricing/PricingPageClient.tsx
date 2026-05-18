import { useMemo, useState, type CSSProperties } from 'react';
import type { PricingCell, PricingCopy, PricingNodeVariant } from '@/lib/pricing/types';
import { PricingFaqItem } from '@/components/islands/pricing/PricingFaqItem';
import './PricingPlanFinder.css';

const APPS_MEMBERS_SLIDER_MAX = 9;
/** Slider index 0..8 → 1..9; index 9 → 10+ (numeric 10 for limits). */
const APPS_MEMBERS_PLUS_NUMERIC = 10;

const MAU_STEPS = [500, 1000, 2000, 3500, 5000, 7500, 10000, 15000, 20000, 25000] as const;
/** Max range index; values `0..MAU_STEPS.length-1` map to `MAU_STEPS[i]`, index `MAU_STEPS.length` is the 30K+ tier. */
const MAU_RANGE_MAX = MAU_STEPS.length;

/** Half of range thumb width (see `PricingPlanFinder.css`); tick centers use the same inset as native range thumb travel. */
const RANGE_THUMB_INSET_PX = 10;

type PlanFinderLabels = {
  heading: string;
  labelApplications: string;
  labelProjectMembers: string;
  labelMaus: string;
  recommendedHeading: string;
  appsTenPlus: string;
  mauThirtyKPlus: string;
  mauScaleLast: string;
  mauUnlimitedValue: string;
  compareTitle: string;
  compareDisclaimer: string;
  priceFree: string;
  or: string;
};

type Props = {
  copy: PricingCopy;
  locale: string;
  contactPath: string;
  whatsappPath: string;
  month: string;
  onceSuffix: string;
  enterpriseContactLabel: string;
  planFinder: PlanFinderLabels;
};

function appsMembersNumericFromSliderIndex(idx: number): number {
  return idx >= APPS_MEMBERS_SLIDER_MAX ? APPS_MEMBERS_PLUS_NUMERIC : idx + 1;
}

function formatCountDisplay(idx: number, plusLabel: string): string {
  return idx >= APPS_MEMBERS_SLIDER_MAX ? plusLabel : String(idx + 1);
}

function mauNumericForLogic(mauIdx: number): number {
  if (mauIdx >= MAU_STEPS.length) return 35_000;
  return MAU_STEPS[mauIdx];
}

function formatMauDisplay(mauIdx: number, locale: string, mauThirtyKPlus: string): string {
  if (mauIdx >= MAU_STEPS.length) return mauThirtyKPlus;
  const n = MAU_STEPS[mauIdx];
  const loc = locale === 'zh-Hant' ? 'zh-Hant' : 'en-US';
  return new Intl.NumberFormat(loc).format(n);
}

/** Short labels under the MAU slider (e.g. 500, 1K, 7.5K). */
function formatMauAxisLabel(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  const rounded = Math.round(k * 10) / 10;
  const s = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/\.0$/, '');
  return `${s}K`;
}

function appsMembersTickLabels(plusLabel: string): string[] {
  return Array.from({ length: APPS_MEMBERS_SLIDER_MAX + 1 }, (_, i) =>
    i < APPS_MEMBERS_SLIDER_MAX ? String(i + 1) : plusLabel
  );
}

function mauTickLabels(mauScaleLast: string): string[] {
  return [...MAU_STEPS.map(formatMauAxisLabel), mauScaleLast];
}

function RangeWithTicks({
  labelledBy,
  value,
  max,
  onChange,
  tickLabels,
  ariaValueText,
  ariaValueNow,
  disabled = false,
}: {
  labelledBy: string;
  value: number;
  max: number;
  onChange: (next: number) => void;
  tickLabels: string[];
  ariaValueText: string;
  ariaValueNow?: number;
  disabled?: boolean;
}) {
  const denom = max > 0 ? max : 1;
  const fillPct = max <= 0 ? 50 : (value / max) * 100;
  const rangeStyle = { '--range-fill-pct': `${fillPct}%` } as CSSProperties;

  return (
    <div className={`plan-finder__slider-shell${disabled ? ' plan-finder__slider-shell--disabled' : ''}`}>
      <input
        type="range"
        className="plan-finder__range"
        min={0}
        max={max}
        step={1}
        value={value}
        disabled={disabled}
        style={rangeStyle}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-labelledby={labelledBy}
        {...(ariaValueNow !== undefined ? { 'aria-valuenow': ariaValueNow } : {})}
        aria-valuetext={ariaValueText}
        aria-disabled={disabled}
      />
      <div className="plan-finder__ticks" aria-hidden>
        {tickLabels.map((text, i) => {
          const left =
            max === 0
              ? '50%'
              : `calc(${RANGE_THUMB_INSET_PX}px + (100% - ${2 * RANGE_THUMB_INSET_PX}px) * ${i / denom})`;
          const isActive = i === value;
          return (
            <span
              key={i}
              className={`plan-finder__tick${isActive ? ' plan-finder__tick--active' : ''}`}
              style={{ left, transform: 'translateX(-50%)' }}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const CLOUD_PLAN_INDEX_BUSINESS = 2;
const BUSINESS_MAU_30K_PLUS_USD = 550;

/** Maps needs to cloud plan index: 0 Free, 1 Developers, 2 Business, 3 Enterprise (aligned to copy.cloud.plans). */
function resolveRecommendedPlanIndex(apps: number, members: number): number {
  if (apps > 5 || members > 5) return 3;
  if (apps > 2 || members > 2) return 2;
  return 1;
}

/** Free + Developers share the same starter tier (unlimited MAU; seats ≤ 2). */
function isStarterTier(apps: number, members: number): boolean {
  return apps <= 2 && members <= 2;
}

function isFreeTierPlan(plan: PricingCopy['cloud']['plans'][0]): boolean {
  if (plan.enterprise) return false;
  return authgearMonthlyUsd(plan) === 0;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

const COMPETITOR_ORDER = ['auth0', 'frontegg'] as const;

const COMPETITOR_DISPLAY_NAME: Record<(typeof COMPETITOR_ORDER)[number], string> = {
  auth0: 'Auth0',
  frontegg: 'Frontegg',
};

/** Auth0 MAU → monthly USD (linear between anchors; capped at 30K+ = $2,100). */
const AUTH0_MAU_PRICE_ANCHORS: readonly [mau: number, usd: number][] = [
  [500, 35],
  [1000, 70],
  [2500, 175],
  [5000, 350],
  [7500, 525],
  [10_000, 700],
  [20_000, 1400],
  [30_000, 2100],
];

/**
 * Frontegg (piecewise): free ≤8K MAU; ramps to $250 @10K; then $100/1K MAU ($750 @15K).
 */
const FRONTEGG_FREE_MAU = 8_000;
const FRONTEGG_ANCHOR_MAU_10K = 10_000;
const FRONTEGG_ANCHOR_USD_10K = 250;
const FRONTEGG_ANCHOR_MAU_15K = 15_000;
const FRONTEGG_ANCHOR_USD_15K = 750;
const FRONTEGG_USD_PER_MAU_ABOVE_10K =
  (FRONTEGG_ANCHOR_USD_15K - FRONTEGG_ANCHOR_USD_10K) / (FRONTEGG_ANCHOR_MAU_15K - FRONTEGG_ANCHOR_MAU_10K);

function compareMauNumeric(mauIdx: number, mauSliderLocked: boolean): number {
  return mauSliderLocked ? 12_000 : mauNumericForLogic(mauIdx);
}

function auth0MonthlyUsd(mauN: number): number {
  const [, capUsd] = AUTH0_MAU_PRICE_ANCHORS[AUTH0_MAU_PRICE_ANCHORS.length - 1];
  const [minMau] = AUTH0_MAU_PRICE_ANCHORS[0];
  if (mauN >= AUTH0_MAU_PRICE_ANCHORS[AUTH0_MAU_PRICE_ANCHORS.length - 1][0]) return capUsd;
  if (mauN <= minMau) {
    const [, minUsd] = AUTH0_MAU_PRICE_ANCHORS[0];
    return (minUsd / minMau) * mauN;
  }
  for (let i = 0; i < AUTH0_MAU_PRICE_ANCHORS.length - 1; i++) {
    const [m0, p0] = AUTH0_MAU_PRICE_ANCHORS[i];
    const [m1, p1] = AUTH0_MAU_PRICE_ANCHORS[i + 1];
    if (mauN <= m1) return p0 + ((p1 - p0) * (mauN - m0)) / (m1 - m0);
  }
  return capUsd;
}

function fronteggMonthlyUsd(mauN: number): number {
  if (mauN <= FRONTEGG_FREE_MAU) return 0;
  if (mauN <= FRONTEGG_ANCHOR_MAU_10K) {
    return (FRONTEGG_ANCHOR_USD_10K * (mauN - FRONTEGG_FREE_MAU)) / (FRONTEGG_ANCHOR_MAU_10K - FRONTEGG_FREE_MAU);
  }
  return FRONTEGG_ANCHOR_USD_10K + (mauN - FRONTEGG_ANCHOR_MAU_10K) * FRONTEGG_USD_PER_MAU_ABOVE_10K;
}

function authgearMonthlyUsd(plan: PricingCopy['cloud']['plans'][0]): number | null {
  if (plan.enterprise) return null;
  const m = plan.priceLine.match(/\$[\d,]+/);
  if (!m) return null;
  return Number(m[0].replace(/[$,]/g, ''));
}

function isMauThirtyKPlusTier(mauIdx: number, mauSliderLocked: boolean): boolean {
  return !mauSliderLocked && mauIdx >= MAU_STEPS.length;
}

function authgearPlanFinderMonthlyUsd(
  plan: PricingCopy['cloud']['plans'][0],
  planIndex: number,
  mauIdx: number,
  mauSliderLocked: boolean,
): number | null {
  const base = authgearMonthlyUsd(plan);
  if (base === null) return null;
  if (planIndex === CLOUD_PLAN_INDEX_BUSINESS && isMauThirtyKPlusTier(mauIdx, mauSliderLocked)) {
    return BUSINESS_MAU_30K_PLUS_USD;
  }
  return base;
}

function formatCompetitorEstimateUsd(usd: number, locale: string): string {
  const rounded = Math.round(usd);
  if (locale === 'zh-Hant') {
    return `約 US$${rounded.toLocaleString('en-US')}／月`;
  }
  return `~$${rounded.toLocaleString('en-US')}/mo`;
}

type PlanFinderCompareRow = {
  id: string;
  name: string;
  priceLine: string;
  barBasis: number;
  highlight?: boolean;
};

function buildPlanFinderCompareRows(
  plan: PricingCopy['cloud']['plans'][0],
  planIndex: number,
  month: string,
  locale: string,
  priceFree: string,
  starterTier: boolean,
  appsN: number,
  membersN: number,
  mauIdx: number,
  mauSliderLocked: boolean,
): PlanFinderCompareRow[] {
  const mauN = compareMauNumeric(mauIdx, mauSliderLocked);
  const competitors: PlanFinderCompareRow[] = COMPETITOR_ORDER.map((id) => {
    const usd = id === 'frontegg' ? fronteggMonthlyUsd(mauN) : auth0MonthlyUsd(mauN);
    return {
      id,
      name: COMPETITOR_DISPLAY_NAME[id],
      priceLine: formatCompetitorEstimateUsd(usd, locale),
      barBasis: usd,
      highlight: false,
    };
  });

  let authRow: PlanFinderCompareRow;
  if (plan.enterprise) {
    const maxComp = Math.max(1, ...competitors.map((c) => c.barBasis));
    authRow = {
      id: 'authgear',
      name: 'Authgear',
      priceLine: plan.priceLine,
      barBasis: maxComp * 0.88,
      highlight: true,
    };
  } else if (starterTier || isFreeTierPlan(plan)) {
    authRow = {
      id: 'authgear',
      name: 'Authgear',
      priceLine: priceFree,
      barBasis: 0,
      highlight: true,
    };
  } else {
    const usd = authgearPlanFinderMonthlyUsd(plan, planIndex, mauIdx, mauSliderLocked);
    const amount = usd !== null ? usd.toLocaleString('en-US') : plan.priceLine.replace(/^\$/, '');
    const priceLine =
      usd !== null ? `$${amount}${month.startsWith('/') || month.startsWith('／') ? '' : ' '}${month}` : plan.priceLine;
    authRow = {
      id: 'authgear',
      name: 'Authgear',
      priceLine,
      barBasis: usd ?? 0,
      highlight: true,
    };
  }

  return [authRow, ...competitors];
}

function PlanFinderCompetitorCompare({
  labels,
  plan,
  planIndex,
  month,
  locale,
  starterTier,
  appsN,
  membersN,
  mauIdx,
  mauSliderLocked,
}: {
  labels: Pick<PlanFinderLabels, 'compareTitle' | 'compareDisclaimer' | 'priceFree'>;
  plan: PricingCopy['cloud']['plans'][0];
  planIndex: number;
  month: string;
  locale: string;
  starterTier: boolean;
  appsN: number;
  membersN: number;
  mauIdx: number;
  mauSliderLocked: boolean;
}) {
  const rows = useMemo(
    () =>
      buildPlanFinderCompareRows(
        plan,
        planIndex,
        month,
        locale,
        labels.priceFree,
        starterTier,
        appsN,
        membersN,
        mauIdx,
        mauSliderLocked,
      ),
    [plan, planIndex, month, locale, labels.priceFree, starterTier, appsN, membersN, mauIdx, mauSliderLocked],
  );
  const maxBasis = useMemo(() => Math.max(1, ...rows.map((r) => r.barBasis)), [rows]);

  return (
    <div className="plan-finder-compare">
      <h3 className="plan-finder-compare__heading">{labels.compareTitle}</h3>
      <div className="plan-finder-compare__panel">
        <ul className="plan-finder-compare__list" aria-live="polite">
          {rows.map((row) => {
            const pct = Math.min(100, Math.round((row.barBasis / maxBasis) * 100));
            return (
              <li
                key={row.id}
                className={`plan-finder-compare__row${row.highlight ? '' : ' plan-finder-compare__row--competitor'}`}
              >
                <span className="plan-finder-compare__name">{row.name}</span>
                <div className="plan-finder-compare__bar-track" aria-hidden>
                  <div
                    className={`plan-finder-compare__bar${
                      row.highlight ? ' plan-finder-compare__bar--authgear' : ' plan-finder-compare__bar--other'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span
                  className={`plan-finder-compare__price${
                    row.highlight ? ' plan-finder-compare__price--authgear' : ''
                  }`}
                >
                  {row.priceLine}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="plan-finder-compare__disclaimer">{labels.compareDisclaimer}</p>
      </div>
    </div>
  );
}

function PlanFinderPlanSummary({
  plan,
  planIndex,
  freePlan,
  developersPlan,
  starterTier,
  month,
  contactPath,
  labels,
  locale,
  appsN,
  membersN,
  mauIdx,
  mauSliderLocked,
}: {
  plan: PricingCopy['cloud']['plans'][0];
  planIndex: number;
  freePlan: PricingCopy['cloud']['plans'][0];
  developersPlan: PricingCopy['cloud']['plans'][0];
  starterTier: boolean;
  month: string;
  contactPath: string;
  labels: PlanFinderLabels;
  locale: string;
  appsN: number;
  membersN: number;
  mauIdx: number;
  mauSliderLocked: boolean;
}) {
  const authgearUsd = authgearPlanFinderMonthlyUsd(plan, planIndex, mauIdx, mauSliderLocked);
  return (
    <div className="plan-finder__summary">
      {starterTier ? (
        <>
          <div className="plan-finder__plan-name plan-finder__plan-name--solo plan-finder__plan-name--starter">
            {freePlan.name} {labels.or} {developersPlan.name}
          </div>
          <p className="plan-finder__price-custom plan-finder__price-line--starter">
            {labels.priceFree} {labels.or} {developersPlan.priceLine}
            <span className="plan-finder__price-period">{month}</span>
          </p>
          <div className="plan-finder__cta-wrap">
            <PlanCta plan={freePlan} contactPath={contactPath} />
          </div>
        </>
      ) : (
        <>
          {plan.badge && !plan.highlight ? (
            <div className="plan-finder__name-row">
              <span className="plan-finder__plan-name">{plan.name}</span>
              <span className="plan-finder__pill">{plan.badge}</span>
            </div>
          ) : (
            <div className="plan-finder__plan-name plan-finder__plan-name--solo">{plan.name}</div>
          )}
          {plan.enterprise ? (
            <p className="plan-finder__price-custom">{plan.priceLine}</p>
          ) : (
            <div className="plan-finder__price-line">
              <span className="plan-finder__currency">$</span>
              <span className="plan-finder__price-amount">
                {authgearUsd !== null ? authgearUsd.toLocaleString('en-US') : plan.priceLine.replace(/^\$/, '')}
              </span>
              <span className="plan-finder__price-period">{month}</span>
            </div>
          )}
          <div className="plan-finder__cta-wrap">
            <PlanCta plan={plan} contactPath={contactPath} />
          </div>
        </>
      )}
      <hr className="plan-finder__recommend-divider" />
      <PlanFinderCompetitorCompare
        labels={labels}
        plan={plan}
        planIndex={planIndex}
        month={month}
        locale={locale}
        starterTier={starterTier}
        appsN={appsN}
        membersN={membersN}
        mauIdx={mauIdx}
        mauSliderLocked={mauSliderLocked}
      />
    </div>
  );
}

function PlanFinderBlock({
  labels,
  locale,
  copy,
  contactPath,
  month,
}: {
  labels: PlanFinderLabels;
  locale: string;
  copy: PricingCopy;
  contactPath: string;
  month: string;
}) {
  const [appsIdx, setAppsIdx] = useState(1);
  const [membersIdx, setMembersIdx] = useState(1);
  const [mauIdx, setMauIdx] = useState(3);

  const appsN = appsMembersNumericFromSliderIndex(appsIdx);
  const membersN = appsMembersNumericFromSliderIndex(membersIdx);
  const starterTier = isStarterTier(appsN, membersN);
  const planIndex = resolveRecommendedPlanIndex(appsN, membersN);
  const plan = copy.cloud.plans[planIndex];
  const freePlan = copy.cloud.plans[0];
  const developersPlan = copy.cloud.plans[1];
  const mauSliderLocked = starterTier;
  const mauSliderValue = mauSliderLocked ? MAU_RANGE_MAX : mauIdx;
  const mauAriaValueText = mauSliderLocked ? labels.mauUnlimitedValue : formatMauDisplay(mauIdx, locale, labels.mauThirtyKPlus);
  const mauAriaValueNow = mauSliderLocked ? undefined : mauNumericForLogic(mauIdx);
  const appsTicks = appsMembersTickLabels(labels.appsTenPlus);
  const mauTicks = mauTickLabels(labels.mauScaleLast);

  return (
    <div className="plan-finder">
      <div className="plan-finder__grid">
        <div className="plan-finder__controls">
          <h2 className="plan-finder__title" id="plan-finder-heading">
            {labels.heading}
          </h2>
          <div className="plan-finder__field">
            <div className="plan-finder__label-row">
              <span className="plan-finder__label" id="plan-finder-apps-label">
                {labels.labelApplications}
              </span>
              <span className="plan-finder__value" aria-live="polite">
                {formatCountDisplay(appsIdx, labels.appsTenPlus)}
              </span>
            </div>
            <RangeWithTicks
              labelledBy="plan-finder-apps-label"
              value={appsIdx}
              max={APPS_MEMBERS_SLIDER_MAX}
              onChange={setAppsIdx}
              tickLabels={appsTicks}
              ariaValueNow={appsN}
              ariaValueText={formatCountDisplay(appsIdx, labels.appsTenPlus)}
            />
          </div>
          <div className="plan-finder__field">
            <div className="plan-finder__label-row">
              <span className="plan-finder__label" id="plan-finder-members-label">
                {labels.labelProjectMembers}
              </span>
              <span className="plan-finder__value" aria-live="polite">
                {formatCountDisplay(membersIdx, labels.appsTenPlus)}
              </span>
            </div>
            <RangeWithTicks
              labelledBy="plan-finder-members-label"
              value={membersIdx}
              max={APPS_MEMBERS_SLIDER_MAX}
              onChange={setMembersIdx}
              tickLabels={appsTicks}
              ariaValueNow={membersN}
              ariaValueText={formatCountDisplay(membersIdx, labels.appsTenPlus)}
            />
          </div>
          <div className="plan-finder__field">
            <div className="plan-finder__label-row">
              <span className="plan-finder__label" id="plan-finder-mau-label">
                {labels.labelMaus}
              </span>
              <span className="plan-finder__value" aria-live="polite">
                {mauSliderLocked ? labels.mauUnlimitedValue : formatMauDisplay(mauIdx, locale, labels.mauThirtyKPlus)}
              </span>
            </div>
            <RangeWithTicks
              labelledBy="plan-finder-mau-label"
              value={mauSliderValue}
              max={MAU_RANGE_MAX}
              onChange={setMauIdx}
              tickLabels={mauTicks}
              ariaValueNow={mauAriaValueNow}
              ariaValueText={mauAriaValueText}
              disabled={mauSliderLocked}
            />
          </div>
        </div>
        <div className="plan-finder__result">
          <div className="plan-finder__result-heading">{labels.recommendedHeading}</div>
          <PlanFinderPlanSummary
            plan={plan}
            planIndex={planIndex}
            freePlan={freePlan}
            developersPlan={developersPlan}
            starterTier={starterTier}
            month={month}
            contactPath={contactPath}
            labels={labels}
            locale={locale}
            appsN={appsN}
            membersN={membersN}
            mauIdx={mauIdx}
            mauSliderLocked={mauSliderLocked}
          />
        </div>
      </div>
    </div>
  );
}

function resolveHref(href: string, contactPath: string): string {
  if (href === '__CONTACT__') return contactPath;
  return href;
}

function NodeVariantCell({
  variant,
  whatsappPath,
  locale,
}: {
  variant: PricingNodeVariant;
  whatsappPath: string;
  locale: string;
}) {
  const isZhHant = locale === 'zh-Hant';
  switch (variant) {
    case 'smsWhatsappBusiness':
      return (
        <>
          <div className="plan-data-sub-row">
            <strong>SMS</strong>
            <br />
            {isZhHant ? '美國/加拿大：$0.02' : 'US/Canada: $0.02'}
            <br />
            {isZhHant ? '其他：$0.1' : 'Others: $0.1'}
          </div>
          <div className="plan-data-sub-row">
            <strong>WhatsApp</strong>
            <br />
            <a href={whatsappPath} className="comparison-label">
              {isZhHant ? '請參閱定價' : 'See Pricing'}
            </a>
          </div>
          <div className="plan-data-sub-row">{isZhHant ? '或自訂閘道' : 'Or Custom Gateway'}</div>
        </>
      );
    case 'smsWhatsappDevelopers':
      return (
        <>
          <strong>{isZhHant ? 'SMS 及 WhatsApp' : 'SMS and WhatsApp'}</strong>
          <br />
          {isZhHant ? '美國/加拿大：$0.02' : 'US/Canada: $0.02'}
          <br />
          {isZhHant ? '其他：$0.1' : 'Others: $0.1'}
        </>
      );
    case 'othersBusiness':
      return (
        <>
          {isZhHant ? '包含所有功能' : 'All Features Included'}
          <br />
          <br />
          {isZhHant ? '自帶' : 'Bring your own'}
          <br />
          {isZhHant ? 'SMS 與 WhatsApp 閘道' : 'SMS & WhatsApp Gateway'}
        </>
      );
    case 'othersEnterprise':
      return (
        <>
          {isZhHant ? '自帶' : 'Bring your own'}
          <br />
          {isZhHant ? 'SMS/WhatsApp / 電子郵件閘道' : 'SMS/WhatsApp / Email Gateway'}
          <br />
          <br />
          {isZhHant ? '客製化 SLA' : 'Tailored SLA'}
          <br />
          <br />
          {isZhHant ? '私有雲選項' : 'Private Cloud Option'}
          <br />
          <br />
          {isZhHant ? '資料駐留' : 'Data Residency'}
        </>
      );
    case 'addonsDevelopers':
      return (
        <>
          {isZhHant ? '每個環境 $100' : '$100/Environment'}
          <br />
          {isZhHant ? '每個應用程式 $100' : '$100/Applications'}
          <br />
          {isZhHant ? '每位專案成員 $50' : '$50/Project Member'}
        </>
      );
    case 'addonsBusiness':
      return (
        <>
          {isZhHant ? '每個環境 $100' : '$100/Environment'}
          <br />
          {isZhHant ? '每個應用程式 $100' : '$100/Applications'}
          <br />
          {isZhHant ? '每位專案成員 $50' : '$50/Project Member'}
          <br />
          {isZhHant ? '每 5,000 額外 MAU $50' : '$50/5,000 additional MAU'}
        </>
      );
    default:
      return null;
  }
}

function CellContent({
  cell,
  whatsappPath,
  locale,
}: {
  cell: PricingCell;
  whatsappPath: string;
  locale: string;
}) {
  if (cell.kind === 'check') {
    return <img src="/images/pricing_CLOUD_full_comparison_check.svg" loading="lazy" alt="" width={20} height={20} />;
  }
  if (cell.kind === 'dash') return <>-</>;
  if (cell.kind === 'empty') return null;
  if (cell.kind === 'nodeVariant') {
    return <NodeVariantCell variant={cell.variant} whatsappPath={whatsappPath} locale={locale} />;
  }
  return <>{cell.value}</>;
}

function OnceCoreValue({ value }: { value: PricingCell | string }) {
  if (typeof value === 'string') {
    if (value.includes('\n')) {
      return <span className="whitespace-pre-line">{value}</span>;
    }
    return <>{value}</>;
  }
  if (value.kind === 'check') {
    return (
      <img src="/images/pricing_CLOUD_full_comparison_check.svg" loading="lazy" alt="" width={20} height={20} />
    );
  }
  return null;
}

function PlanCta({
  plan,
  contactPath,
}: {
  plan: PricingCopy['cloud']['plans'][0];
  contactPath: string;
}) {
  const href = resolveHref(plan.cta.href, contactPath);
  const cls = `pricing-buy-now w-button${plan.highlight ? ' developers-bg' : ''}${plan.enterprise ? ' enterprise' : ''}`;
  if (plan.cta.external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {plan.cta.label}
      </a>
    );
  }
  return (
    <a href={href} className={cls}>
      {plan.cta.label}
    </a>
  );
}

function PlanCardInner({
  plan,
  month,
  contactPath,
}: {
  plan: PricingCopy['cloud']['plans'][0];
  month: string;
  contactPath: string;
}) {
  return (
    <>
      <div className="plan-div">
        {plan.badge ? (
          <div className="free-div">
            <div className="plan pricing-sepcial">{plan.name}</div>
            <div className="most-popular">
              <img src="/images/pricing_CLOUD_most_popular.svg" loading="lazy" alt="" />
              <div className="most-popular-content">{plan.badge}</div>
            </div>
          </div>
        ) : (
          <div className={`plan${plan.enterprise ? ' enterprise' : ''}`}>{plan.name}</div>
        )}
        {plan.enterprise ? (
          <div className="plan custom">{plan.priceLine}</div>
        ) : (
          <div className={`price-content${plan.highlight ? ' free' : ''}`}>
            $<span className="price">{plan.priceLine.replace(/^\$/, '')}</span>
            {month}
          </div>
        )}
      </div>
      <PlanCta plan={plan} contactPath={contactPath} />
      <div className="divider-pricing" />
      <div className="pricing-features">
        {plan.features.map((f) => (
          <div key={f} className="price-feature">
            <img src="/images/pricing_CLOUD_plans_check.svg" loading="lazy" alt="" />
            <div className={`p-feature${plan.enterprise ? ' enterprise' : ''}`}>{f}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function PricingPageClient({
  copy,
  locale,
  contactPath,
  whatsappPath,
  month,
  onceSuffix,
  enterpriseContactLabel,
  planFinder,
}: Props) {
  const [tab, setTab] = useState(0);

  const enterpriseLink = useMemo(() => {
    return (
      <>
        <a href={contactPath} className="comparison-label">
          {enterpriseContactLabel}
        </a>
        {copy.once.enterpriseContactSuffix}
      </>
    );
  }, [contactPath, copy.once.enterpriseContactSuffix, enterpriseContactLabel]);

  return (
    <div className="page-wrapper">
      <div className="w-layout-hflex tab-background">
        <button
          type="button"
          className={`tab-switcher cloud-tab${tab === 0 ? ' active-tab' : ''}`}
          onClick={() => setTab(0)}
        >
          <div className="code-embed-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path fillRule="evenodd" clipRule="evenodd" d="M5.53093 4.98208C6.93198 3.67788 8.86593 3 11.0358 3H21.632C23.8031 3 25.7368 3.68155 27.1373 4.98691C28.5456 6.29955 29.3337 8.16888 29.3337 10.3761V16.4332C29.3337 16.9855 28.886 17.4332 28.3337 17.4332C27.7815 17.4332 27.3337 16.9855 27.3337 16.4332V10.3761C27.3337 8.66433 26.7345 7.34559 25.7736 6.44992C24.8049 5.54699 23.3877 5 21.632 5H11.0358C9.2787 5 7.86176 5.54481 6.89364 6.44599C5.93362 7.33964 5.33398 8.65784 5.33398 10.3761V21.6211C5.33398 23.3401 5.9337 24.6589 6.89381 25.5531C7.86194 26.4547 9.27885 26.9997 11.0358 26.9997H12.2578C12.8101 26.9997 13.2578 27.4475 13.2578 27.9997C13.2578 28.552 12.8101 28.9997 12.2578 28.9997H11.0358C8.86578 28.9997 6.9318 28.3215 5.53077 27.0167C4.1217 25.7045 3.33398 23.834 3.33398 21.6211V10.3761C3.33398 8.16369 4.12178 6.29381 5.53093 4.98208Z" fill="#2E2E2E" />
              <path fillRule="evenodd" clipRule="evenodd" d="M3.36523 16C3.36523 15.4477 3.81294 15 4.36523 15H16.6272C17.1794 15 17.6272 15.4477 17.6272 16C17.6272 16.5523 17.1794 17 16.6272 17H4.36523C3.81294 17 3.36523 16.5523 3.36523 16Z" fill="#2E2E2E" />
              <path fillRule="evenodd" clipRule="evenodd" d="M9.15039 21.5131C9.15039 20.9608 9.59811 20.5131 10.1504 20.5131H10.847C11.3993 20.5131 11.847 20.9608 11.847 21.5131C11.847 22.0653 11.3993 22.5131 10.847 22.5131H10.1504C9.59811 22.5131 9.15039 22.0653 9.15039 21.5131Z" fill="#2E2E2E" />
              <path fillRule="evenodd" clipRule="evenodd" d="M9.15039 10.487C9.15039 9.93469 9.59811 9.48697 10.1504 9.48697H10.847C11.3993 9.48697 11.847 9.93469 11.847 10.487C11.847 11.0393 11.3993 11.487 10.847 11.487H10.1504C9.59811 11.487 9.15039 11.0393 9.15039 10.487ZM15.4683 10.487C15.4683 9.93469 15.916 9.48697 16.4683 9.48697H22.5136C23.0659 9.48697 23.5136 9.93469 23.5136 10.487C23.5136 11.0393 23.0659 11.487 22.5136 11.487H16.4683C15.916 11.487 15.4683 11.0393 15.4683 10.487Z" fill="#2E2E2E" />
              <path fillRule="evenodd" clipRule="evenodd" d="M18.417 19.7139C19.1082 18.8004 20.2219 18.0703 21.7978 18.0703C23.3736 18.0703 24.4872 18.8004 25.1786 19.7139C25.604 20.276 25.8731 20.9097 26.0107 21.4937C26.6736 21.6397 27.2874 21.9484 27.7838 22.4223C28.5026 23.1085 28.9079 24.0776 28.9079 25.2064C28.9079 26.7509 27.9916 28.0855 26.6684 28.6837C26.6551 28.6897 26.6415 28.6955 26.6279 28.7009C26.0868 28.9173 25.5487 28.9995 25.12 28.9995H18.4702C18.037 28.9995 17.5003 28.9131 16.9662 28.6968C16.9539 28.6917 16.9416 28.6865 16.9296 28.6811C15.6088 28.084 14.6875 26.7536 14.6875 25.2064C14.6875 24.0776 15.0928 23.1085 15.8118 22.4223C16.3082 21.9484 16.9219 21.6397 17.5847 21.4937C17.7223 20.9097 17.9915 20.276 18.417 19.7139ZM20.0118 20.9208C19.6236 21.4337 19.4728 22.0513 19.4728 22.3952C19.4728 22.9439 19.0307 23.3901 18.482 23.3952C17.9318 23.4003 17.4898 23.5853 17.1927 23.8689C16.9043 24.1443 16.6875 24.5736 16.6875 25.2064C16.6875 25.9331 17.115 26.5617 17.7358 26.8505C18.015 26.9605 18.2875 26.9995 18.4702 26.9995H25.12C25.307 26.9995 25.5823 26.9616 25.8643 26.8523C26.4816 26.564 26.9079 25.9349 26.9079 25.2064C26.9079 24.5736 26.6912 24.1443 26.4027 23.8689C26.1058 23.5853 25.6636 23.4003 25.1134 23.3952C24.5648 23.3901 24.1227 22.9439 24.1227 22.3952C24.1227 22.0513 23.9719 21.4337 23.5838 20.9208C23.2264 20.4487 22.6776 20.0703 21.7978 20.0703C20.9179 20.0703 20.369 20.4487 20.0118 20.9208Z" fill="#2E2E2E" />
            </svg>
          </div>
          <div className={`text-block-62${tab === 0 ? ' active-tab-text' : ''}`}>{copy.tabs.cloud}</div>
        </button>
        <button
          type="button"
          className={`tab-switcher once-tab${tab === 1 ? ' active-tab' : ''}`}
          onClick={() => setTab(1)}
        >
          <div className="code-embed-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M16 27.8844H24.7477C26.6535 27.8844 28 26.6921 28 24.7904V21.8831C28 19.9748 26.6535 18.7891 24.7477 18.7891H7.25232C5.3466 18.7891 4 19.9748 4 21.8831V24.7904C4 26.6973 5.3466 27.8844 7.25232 27.8844H11.6262" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21.7129 27.875V22.1902" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.7832 23.3385H10.0818" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 4.11459H7.25232C5.3466 4.11459 4 5.30681 4 7.20865V10.1159C4 12.0229 5.3466 13.2099 7.25232 13.2099H24.7477C26.6535 13.2099 28 12.0229 28 10.1159V7.20865C28 5.30162 26.6535 4.11459 24.7477 4.11459H20.3739" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21.7129 13.2095V8.00259" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.7832 8.66147H10.0818" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={`text-block-62${tab === 1 ? ' active-tab-text' : ''}`}>{copy.tabs.once}</div>
        </button>
      </div>

      <section
        id="cards-section"
        className="section pricing-new cloud pricing-info"
        style={{ display: tab === 0 ? 'flex' : 'none' }}
      >
        <div className="new-pricing-h1-container">
          <h1 className="title pricing-h1">
            {copy.cloud.titleLine1}
            <span className="pricing-sepcial">{copy.cloud.titleHighlight}</span>
            <br />
            {copy.cloud.titleLine2}
          </h1>
          <p className="pricing-sub">{copy.cloud.subtitle}</p>
        </div>
        <div className="w-layout-blockcontainer w-container">
          <p className="pricing-content">
            {copy.cloud.intro}
            <span className="blue-strong">{copy.cloud.introStrong}</span>
            {copy.cloud.introRest}
          </p>
        </div>
        <div className="w-layout-blockcontainer pricing w-container">
          <div className="w-layout-hflex pricing-cards">
            {copy.cloud.plans.map((plan) =>
              plan.highlight ? (
                <div key={plan.name} className="pricing-outer">
                  <div className="pricing-card developers-bg">
                    <PlanCardInner plan={plan} month={month} contactPath={contactPath} />
                  </div>
                </div>
              ) : (
                <div key={plan.name} className={`pricing-card${plan.enterprise ? ' enterprise' : ''}`}>
                  <PlanCardInner plan={plan} month={month} contactPath={contactPath} />
                </div>
              )
            )}
          </div>
          <div className="plan-finder-section">
            <PlanFinderBlock
              labels={planFinder}
              locale={locale}
              copy={copy}
              contactPath={contactPath}
              month={month}
            />
          </div>
        </div>
      </section>

      <section className="cloud pricing-info" style={{ display: tab === 0 ? 'flex' : 'none' }}>
        <div className="container-default expand-section">
          <div className="comparison static-table">
            <div className="full-plan">{copy.cloud.fullPlanTitle}</div>
            <div className="comparison-row comprison-header">
              <div className="w-layout-blockcontainer empty w-container" />
              {copy.comparison.planNames.map((name, i) => (
                <div
                  key={name}
                  className={`comparison-column comparison-plan plan-option${i === 0 ? ' default' : ''}`}
                >
                  {name}
                </div>
              ))}
            </div>
            {copy.comparison.rows.map((row) => (
              <div key={row.label} className={`comparison-row${row.odd ? ' odd' : ''}`}>
                <div className="comparison-column first-column">{row.label}</div>
                {row.cells.map((cell, i) => (
                  <div
                    key={i}
                    className={`comparison-column plan-data ${['free-plan', 'developers-plan', 'business-plan', 'enterprise-plan'][i]}`}
                  >
                    <CellContent cell={cell} whatsappPath={whatsappPath} locale={locale} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section pricing-new once pricing-info"
        style={{ display: tab === 1 ? 'flex' : 'none' }}
      >
        <div className="new-pricing-h1-container">
          <h1 className="title pricing-h1">
            {copy.once.titleLine1}
            <span className="pricing-sepcial">{copy.once.titleHighlight}</span>
            {copy.once.titleLine2 ? (
              <>
                <br />
                {copy.once.titleLine2}
              </>
            ) : (
              <br />
            )}
          </h1>
          <p className="pricing-sub">{copy.once.subtitle}</p>
        </div>
        <div className="w-layout-blockcontainer w-container">
          <p className="pricing-content whitespace-pre-line">{copy.once.intro}</p>
        </div>
        <div className="w-layout-blockcontainer pricing w-container">
          <div className="w-layout-hflex pricing-cards once-pricing">
            <div className="pricing-outer once-pricing-width">
              <div className="pricing-card developers-bg">
                <div className="plan-div">
                  <div className="plan">{copy.once.plans[0].name}</div>
                  <div className="price-content free">
                    $<span className="price">{copy.once.plans[0].priceLine.replace(/^\$/, '')}</span>
                    {onceSuffix}
                  </div>
                </div>
                <PlanCta plan={copy.once.plans[0]} contactPath={contactPath} />
                <div className="divider-pricing" />
                <div className="pricing-features">
                  {copy.once.plans[0].features.map((f) => (
                    <div key={f} className="price-feature">
                      <img src="/images/pricing_CLOUD_plans_check.svg" loading="lazy" alt="" />
                      <div className="p-feature">{f}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pricing-card enterprise once-pricing-width">
              <div className="plan-div">
                <div className="plan enterprise">{copy.once.plans[1].name}</div>
                <div className="plan custom">{copy.once.plans[1].priceLine}</div>
              </div>
              <PlanCta plan={copy.once.plans[1]} contactPath={contactPath} />
              <div className="divider-pricing" />
              <div className="pricing-features">
                {copy.once.plans[1].features.map((f) => (
                  <div key={f} className="price-feature">
                    <img src="/images/pricing_CLOUD_plans_check.svg" loading="lazy" alt="" />
                    <div className="p-feature enterprise">{f}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="once pricing-info" style={{ display: tab === 1 ? 'flex' : 'none' }}>
        <div className="container-default expand-section">
          <div className="comparison static-table">
            <div className="full-plan">{copy.once.coreTitle}</div>
            {copy.once.coreRows.map((row, idx) => (
              <div key={row.label} className={`comparison-row once-row${idx % 2 === 1 ? ' odd' : ''}`}>
                <div className="comparison-column first-column whitespace-pre-line">{row.label}</div>
                <div className="comparison-column plan-data free-plan">
                  {typeof row.value === 'string' && row.value === '__ENTERPRISE_CONTACT__' ? (
                    enterpriseLink
                  ) : (
                    <OnceCoreValue value={row.value} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-default looking">
          <div className="looking-div">
            <div className="looking-header">{copy.cta.title}</div>
            <div className="looking-sub">{copy.cta.subtitle}</div>
            <a href={resolveHref(copy.cta.href, contactPath)} className="looking-btn w-button">
              {copy.cta.button}
            </a>
          </div>
        </div>
      </section>

      <section className="ds-pricing-faq-section" aria-labelledby="pricing-faq-heading">
        <div className="ds-pricing-faq">
          <h2 id="pricing-faq-heading" className="ds-pricing-faq__heading">
            {copy.faq.heading}
          </h2>
          <div className="ds-pricing-faq__list">
            {copy.faq.items.map((item) => (
              <PricingFaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
