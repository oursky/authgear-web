import { useMemo, useRef, useState, type CSSProperties } from 'react';
import type { PricingCell, PricingCopy, PricingNodeVariant } from '@/lib/pricing/types';
import { PricingFaqItem } from '@/components/islands/pricing/PricingFaqItem';
import { trackEvent } from '@/lib/plausible';
import './PricingPlanFinder.css';

const APPS_MEMBERS_SLIDER_MAX = 9;
/** Slider index 0..8 → 1..9; index 9 → 10+ (numeric 10 for limits). */
const APPS_MEMBERS_PLUS_NUMERIC = 10;

const MAU_STEPS = [15_000, 20_000, 25_000, 30_000, 35_000, 40_000, 45_000] as const;
/** Max range index; values `0..MAU_STEPS.length-1` map to `MAU_STEPS[i]`, index `MAU_STEPS.length` is the 50K+ tier. */
const MAU_RANGE_MAX = MAU_STEPS.length;
/** Numeric MAU used for 50K+ slider position (plan logic, competitor compare). */
const MAU_FIFTY_K_PLUS_NUMERIC = 50_000;

/** Half of range thumb width (see `PricingPlanFinder.css`); tick centers use the same inset as native range thumb travel. */
const RANGE_THUMB_INSET_PX = 10;

type PlanFinderLabels = {
  heading: string;
  labelApplications: string;
  labelProjectMembers: string;
  labelMaus: string;
  labelSmsWhatsapp: string;
  labelLogRetention: string;
  logRetention1Day: string;
  logRetention60Days: string;
  logRetention180Days: string;
  toggleYes: string;
  toggleNo: string;
  recommendedHeading: string;
  appsTenPlus: string;
  mauThirtyKPlus: string;
  mauScaleLast: string;
  mauUnlimitedValue: string;
  compareTitle: string;
  compareDisclaimer: string;
  priceFree: string;
  priceFrom: string;
  or: string;
  enterpriseTitle: string;
  enterpriseBody: string;
  enterpriseFeatures: string[];
  /** CTA label for Developers / Business in the recommended-plan summary (e.g. "Get Started"). */
  ctaGetStarted: string;
};

type Props = {
  copy: PricingCopy;
  locale: string;
  contactPath: string;
  whatsappPath: string;
  month: string;
  planFinder: PlanFinderLabels;
};

function appsMembersNumericFromSliderIndex(idx: number): number {
  return idx >= APPS_MEMBERS_SLIDER_MAX ? APPS_MEMBERS_PLUS_NUMERIC : idx + 1;
}

function formatCountDisplay(idx: number, plusLabel: string): string {
  return idx >= APPS_MEMBERS_SLIDER_MAX ? plusLabel : String(idx + 1);
}

function mauNumericForLogic(mauIdx: number): number {
  if (mauIdx >= MAU_STEPS.length) return MAU_FIFTY_K_PLUS_NUMERIC;
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

type LogRetentionDays = 1 | 60 | 180;

/** First plan-finder control touched; sent once per page view with `pricing-plan-finder-interact`. */
type PlanFinderFirstAction = 'sms' | 'log-retention' | 'apps' | 'members' | 'mau';

function PlanFinderLogRetentionToggle({
  id,
  label,
  value,
  onChange,
  option1Day,
  option60Days,
  option180Days,
}: {
  id: string;
  label: string;
  value: LogRetentionDays;
  onChange: (next: LogRetentionDays) => void;
  option1Day: string;
  option60Days: string;
  option180Days: string;
}) {
  const options: { days: LogRetentionDays; text: string }[] = [
    { days: 1, text: option1Day },
    { days: 60, text: option60Days },
    { days: 180, text: option180Days },
  ];

  return (
    <div className="plan-finder__field plan-finder__field--toggle">
      <span className="plan-finder__label" id={id}>
        {label}
      </span>
      <div className="plan-finder__yes-no plan-finder__yes-no--triple" role="radiogroup" aria-labelledby={id}>
        {options.map(({ days, text }) => (
          <button
            key={days}
            type="button"
            role="radio"
            aria-checked={value === days}
            className={`plan-finder__yes-no-btn${value === days ? ' plan-finder__yes-no-btn--active' : ''}`}
            onClick={() => onChange(days)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function PlanFinderYesNoToggle({
  id,
  label,
  value,
  onChange,
  yesLabel,
  noLabel,
}: {
  id: string;
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <div className="plan-finder__field plan-finder__field--toggle">
      <span className="plan-finder__label" id={id}>
        {label}
      </span>
      <div className="plan-finder__yes-no" role="group" aria-labelledby={id}>
        <button
          type="button"
          className={`plan-finder__yes-no-btn${value ? ' plan-finder__yes-no-btn--active' : ''}`}
          aria-pressed={value}
          onClick={() => onChange(true)}
        >
          {yesLabel}
        </button>
        <button
          type="button"
          className={`plan-finder__yes-no-btn${!value ? ' plan-finder__yes-no-btn--active' : ''}`}
          aria-pressed={!value}
          onClick={() => onChange(false)}
        >
          {noLabel}
        </button>
      </div>
    </div>
  );
}

const SLIDER_GESTURE_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
]);

function RangeWithTicks({
  labelledBy,
  value,
  max,
  onChange,
  onSliderGestureStart,
  onSliderGestureEnd,
  tickLabels,
  ariaValueText,
  ariaValueNow,
  disabled = false,
}: {
  labelledBy: string;
  value: number;
  max: number;
  onChange: (next: number) => void;
  onSliderGestureStart?: () => void;
  onSliderGestureEnd?: () => void;
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
        onPointerDown={disabled ? undefined : onSliderGestureStart}
        onPointerUp={disabled ? undefined : onSliderGestureEnd}
        onPointerCancel={disabled ? undefined : onSliderGestureEnd}
        onKeyDown={
          disabled
            ? undefined
            : (e) => {
                if (SLIDER_GESTURE_KEYS.has(e.key)) onSliderGestureStart?.();
              }
        }
        onKeyUp={
          disabled
            ? undefined
            : (e) => {
                if (SLIDER_GESTURE_KEYS.has(e.key)) onSliderGestureEnd?.();
              }
        }
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

const CLOUD_PLAN_INDEX_FREE = 0;
const CLOUD_PLAN_INDEX_DEVELOPERS = 1;
const CLOUD_PLAN_INDEX_BUSINESS = 2;
const CLOUD_PLAN_INDEX_ENTERPRISE = 3;

type PlanFinderSignupPlan = 'free' | 'developers' | 'business' | 'enterprise';

function planFinderSignupPlan(planIndex: number): PlanFinderSignupPlan {
  switch (planIndex) {
    case CLOUD_PLAN_INDEX_DEVELOPERS:
      return 'developers';
    case CLOUD_PLAN_INDEX_BUSINESS:
      return 'business';
    case CLOUD_PLAN_INDEX_ENTERPRISE:
      return 'enterprise';
    default:
      return 'free';
  }
}

type PlanFinderInputs = {
  appsIdx: number;
  membersIdx: number;
  mauIdx: number;
  needsSmsWhatsapp: boolean;
  logRetentionDays: LogRetentionDays;
};

function computePlanFinderPlanIndex(inputs: PlanFinderInputs): number {
  const scaleSlidersDisabled = inputs.logRetentionDays === 180;
  const appsIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : inputs.appsIdx;
  const membersIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : inputs.membersIdx;
  const appsN = appsMembersNumericFromSliderIndex(appsIdxEffective);
  const membersN = appsMembersNumericFromSliderIndex(membersIdxEffective);
  return resolveRecommendedPlanIndex(
    appsN,
    membersN,
    inputs.mauIdx,
    inputs.needsSmsWhatsapp,
    inputs.logRetentionDays,
  );
}

function planFinderResultMauValue(inputs: PlanFinderInputs): number | string {
  const planIndex = computePlanFinderPlanIndex(inputs);
  const scaleSlidersDisabled = inputs.logRetentionDays === 180;
  const appsIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : inputs.appsIdx;
  const membersIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : inputs.membersIdx;
  const appsOrMembersTenPlus =
    appsIdxEffective >= APPS_MEMBERS_SLIDER_MAX || membersIdxEffective >= APPS_MEMBERS_SLIDER_MAX;
  const mauSliderLocked =
    planIndex === CLOUD_PLAN_INDEX_FREE || planIndex === CLOUD_PLAN_INDEX_DEVELOPERS;
  const mauSliderDisabled = mauSliderLocked || scaleSlidersDisabled || appsOrMembersTenPlus;
  if (mauSliderDisabled) return 'unlimited';
  return mauNumericForLogic(inputs.mauIdx);
}

function trackPlanFinderResult(inputs: PlanFinderInputs): void {
  const planIndex = computePlanFinderPlanIndex(inputs);
  const scaleSlidersDisabled = inputs.logRetentionDays === 180;
  const appsIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : inputs.appsIdx;
  const membersIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : inputs.membersIdx;

  trackEvent('pricing-plan-finder-result', {
    recommended_plan: planFinderSignupPlan(planIndex),
    sms: inputs.needsSmsWhatsapp ? 'yes' : 'no',
    log_retention: String(inputs.logRetentionDays),
    apps: appsMembersNumericFromSliderIndex(appsIdxEffective),
    members: appsMembersNumericFromSliderIndex(membersIdxEffective),
    mau: planFinderResultMauValue(inputs),
  });
}

function maybeTrackPlanFinderResult(beforePlanIndex: number, inputs: PlanFinderInputs): void {
  const afterPlanIndex = computePlanFinderPlanIndex(inputs);
  if (beforePlanIndex !== afterPlanIndex) {
    trackPlanFinderResult(inputs);
  }
}

const BUSINESS_BASE_USD = 500;
const BUSINESS_MAU_INCLUDED = 25_000;
const BUSINESS_MAU_BUCKET = 5_000;
const BUSINESS_MAU_BUCKET_USD = 50;
const BUSINESS_EXTRA_APP_USD = 100;
const BUSINESS_EXTRA_MEMBER_USD = 50;
const DEVELOPERS_BASE_USD = 50;
const DEVELOPERS_EXTRA_APP_USD = 100;
const DEVELOPERS_EXTRA_MEMBER_USD = 50;

function qualifiesForFreePlan(
  apps: number,
  members: number,
  needsSmsWhatsapp: boolean,
  logRetentionDays: LogRetentionDays,
): boolean {
  return !needsSmsWhatsapp && logRetentionDays === 1 && apps <= 2 && members <= 2;
}

function qualifiesForDevelopersPlan(needsSmsWhatsapp: boolean, logRetentionDays: LogRetentionDays): boolean {
  return needsSmsWhatsapp && logRetentionDays === 1;
}

function qualifiesForBusinessPlan(logRetentionDays: LogRetentionDays): boolean {
  return logRetentionDays === 60;
}

function developersPlanFinderMonthlyUsd(apps: number, members: number): number {
  const extraApps = Math.max(0, apps - 2) * DEVELOPERS_EXTRA_APP_USD;
  const extraMembers = Math.max(0, members - 2) * DEVELOPERS_EXTRA_MEMBER_USD;
  return DEVELOPERS_BASE_USD + extraApps + extraMembers;
}

/** Business: +$50 per 5,000 MAUs above 25,000. */
function businessMauOverageUsd(mauN: number): number {
  if (mauN <= BUSINESS_MAU_INCLUDED) return 0;
  return Math.ceil((mauN - BUSINESS_MAU_INCLUDED) / BUSINESS_MAU_BUCKET) * BUSINESS_MAU_BUCKET_USD;
}

function businessPlanFinderMonthlyUsd(apps: number, members: number, mauIdx: number): number {
  const extraApps = Math.max(0, apps - 5) * BUSINESS_EXTRA_APP_USD;
  const extraMembers = Math.max(0, members - 5) * BUSINESS_EXTRA_MEMBER_USD;
  const mauOverage = businessMauOverageUsd(mauNumericForLogic(mauIdx));
  return BUSINESS_BASE_USD + extraApps + extraMembers + mauOverage;
}

function qualifiesForEnterprisePlan(
  apps: number,
  members: number,
  mauIdx: number,
  needsSmsWhatsapp: boolean,
  logRetentionDays: LogRetentionDays,
): boolean {
  if (apps >= APPS_MEMBERS_PLUS_NUMERIC || members >= APPS_MEMBERS_PLUS_NUMERIC) return true;
  if (logRetentionDays === 180) return true;
  const mauSliderUnlocked =
    !qualifiesForFreePlan(apps, members, needsSmsWhatsapp, logRetentionDays) &&
    !qualifiesForDevelopersPlan(needsSmsWhatsapp, logRetentionDays);
  return mauSliderUnlocked && mauIdx >= MAU_STEPS.length;
}

/** Maps needs to cloud plan index: 0 Free, 1 Developers, 2 Business, 3 Enterprise (aligned to copy.cloud.plans). */
function resolveRecommendedPlanIndex(
  apps: number,
  members: number,
  mauIdx: number,
  needsSmsWhatsapp: boolean,
  logRetentionDays: LogRetentionDays,
): number {
  if (qualifiesForEnterprisePlan(apps, members, mauIdx, needsSmsWhatsapp, logRetentionDays)) {
    return CLOUD_PLAN_INDEX_ENTERPRISE;
  }
  if (qualifiesForFreePlan(apps, members, needsSmsWhatsapp, logRetentionDays)) return CLOUD_PLAN_INDEX_FREE;
  if (qualifiesForBusinessPlan(logRetentionDays)) return CLOUD_PLAN_INDEX_BUSINESS;
  if (qualifiesForDevelopersPlan(needsSmsWhatsapp, logRetentionDays)) return CLOUD_PLAN_INDEX_DEVELOPERS;
  return CLOUD_PLAN_INDEX_DEVELOPERS;
}

function formatAuthgearPlanFinderPriceLine(
  usd: number,
  month: string,
  planIndex: number,
  priceFrom: string,
): string {
  const amount = usd.toLocaleString('en-US');
  const fromPrefix =
    planIndex === CLOUD_PLAN_INDEX_DEVELOPERS || planIndex === CLOUD_PLAN_INDEX_BUSINESS
      ? `${priceFrom} `
      : '';
  const gap = month.startsWith('/') || month.startsWith('／') ? '' : ' ';
  return `${fromPrefix}$${amount}${gap}${month}`;
}

function isFreeTierPlan(plan: PricingCopy['cloud']['plans'][0]): boolean {
  if (plan.enterprise) return false;
  return authgearMonthlyUsd(plan) === 0;
}

const COMPARISON_PLAN_COLUMN_CLASSES = [
  'free-plan',
  'developers-plan',
  'business-plan',
  'enterprise-plan',
] as const;

const COMPETITOR_ORDER = ['auth0', 'frontegg'] as const;

const COMPETITOR_DISPLAY_NAME: Record<(typeof COMPETITOR_ORDER)[number], string> = {
  auth0: 'Auth0',
  frontegg: 'Frontegg',
};

/** Auth0 plan-finder estimate: $0.07 per MAU (50K MAU → $3,500). */
const AUTH0_USD_PER_MAU = 0.07;

/**
 * Frontegg plan-finder estimate: $250 @10K MAU, then +$100 per 1,000 MAU
 * (15K→$750, 20K→$1,250, 25K→$1,750, 30K→$2,250, 35K→$2,750, 50K→$4,250).
 * ≤8K MAU free; linear ramp from 8K→10K up to $250.
 */
const FRONTEGG_FREE_MAU = 8_000;
const FRONTEGG_BASE_MAU = 10_000;
const FRONTEGG_BASE_USD = 250;
/** $100 per 1,000 MAU above 10K (= $0.10 per MAU). */
const FRONTEGG_USD_PER_MAU_ABOVE_BASE = 0.1;
/** MAU basis for Auth0 / Frontegg when the plan finder shows Unlimited MAUs (Free, Developers). */
const COMPETITOR_COMPARE_MAU_WHEN_UNLIMITED = 50_000;

function compareMauNumeric(mauIdx: number, mauSliderLocked: boolean): number {
  return mauSliderLocked ? COMPETITOR_COMPARE_MAU_WHEN_UNLIMITED : mauNumericForLogic(mauIdx);
}

function formatCompareDisclaimerMau(mauN: number, locale: string): string {
  const loc = locale === 'zh-Hant' ? 'zh-Hant' : 'en-US';
  return new Intl.NumberFormat(loc).format(mauN);
}

function formatCompareDisclaimer(template: string, mauN: number, locale: string): string {
  return template.replace('{mau}', formatCompareDisclaimerMau(mauN, locale));
}

function auth0MonthlyUsd(mauN: number): number {
  return mauN * AUTH0_USD_PER_MAU;
}

function fronteggMonthlyUsd(mauN: number): number {
  if (mauN <= FRONTEGG_FREE_MAU) return 0;
  if (mauN <= FRONTEGG_BASE_MAU) {
    return (FRONTEGG_BASE_USD * (mauN - FRONTEGG_FREE_MAU)) / (FRONTEGG_BASE_MAU - FRONTEGG_FREE_MAU);
  }
  return FRONTEGG_BASE_USD + (mauN - FRONTEGG_BASE_MAU) * FRONTEGG_USD_PER_MAU_ABOVE_BASE;
}

function authgearMonthlyUsd(plan: PricingCopy['cloud']['plans'][0]): number | null {
  if (plan.enterprise) return null;
  const m = plan.priceLine.match(/\$[\d,]+/);
  if (!m) return null;
  return Number(m[0].replace(/[$,]/g, ''));
}

function authgearPlanFinderMonthlyUsd(
  plan: PricingCopy['cloud']['plans'][0],
  planIndex: number,
  mauIdx: number,
  appsN: number,
  membersN: number,
): number | null {
  if (planIndex === CLOUD_PLAN_INDEX_DEVELOPERS) {
    return developersPlanFinderMonthlyUsd(appsN, membersN);
  }
  if (planIndex === CLOUD_PLAN_INDEX_BUSINESS) {
    return businessPlanFinderMonthlyUsd(appsN, membersN, mauIdx);
  }
  const base = authgearMonthlyUsd(plan);
  if (base === null) return null;
  return base;
}

function formatCompetitorEstimateUsd(
  usd: number,
  locale: string,
  priceFrom: string,
  month: string,
): string {
  const rounded = Math.round(usd).toLocaleString('en-US');
  if (locale === 'zh-Hant') {
    return `${priceFrom} US$${rounded}／月`;
  }
  const gap = month.startsWith('/') || month.startsWith('／') ? '' : ' ';
  return `${priceFrom} $${rounded}${gap}${month}`;
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
  priceFrom: string,
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
      priceLine: formatCompetitorEstimateUsd(usd, locale, priceFrom, month),
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
      priceLine: formatAuthgearPlanFinderPriceLine(0, month, CLOUD_PLAN_INDEX_FREE, priceFrom),
      barBasis: 0,
      highlight: true,
    };
  } else {
    const usd = authgearPlanFinderMonthlyUsd(plan, planIndex, mauIdx, appsN, membersN);
    const priceLine =
      usd !== null
        ? formatAuthgearPlanFinderPriceLine(usd, month, planIndex, priceFrom)
        : plan.priceLine;
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
  labels: Pick<PlanFinderLabels, 'compareTitle' | 'compareDisclaimer' | 'priceFrom'>;
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
        labels.priceFrom,
        starterTier,
        appsN,
        membersN,
        mauIdx,
        mauSliderLocked,
      ),
    [
      plan,
      planIndex,
      month,
      locale,
      labels.priceFrom,
      starterTier,
      appsN,
      membersN,
      mauIdx,
      mauSliderLocked,
    ],
  );
  const maxBasis = useMemo(() => Math.max(1, ...rows.map((r) => r.barBasis)), [rows]);
  const disclaimer = useMemo(
    () =>
      formatCompareDisclaimer(
        labels.compareDisclaimer,
        compareMauNumeric(mauIdx, mauSliderLocked),
        locale,
      ),
    [labels.compareDisclaimer, mauIdx, mauSliderLocked, locale],
  );

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
        <p className="plan-finder-compare__disclaimer">{disclaimer}</p>
      </div>
    </div>
  );
}

function PlanFinderEnterpriseIcon() {
  return (
    <svg
      className="plan-finder__enterprise-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={42}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M6.5 41.8221H42.5"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.181 34.9416V10.2448C35.181 7.99718 33.3596 6.17578 31.114 6.17578H17.8893C15.6417 6.17578 13.8203 7.99718 13.8203 10.2448V41.8196"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.845 27.5546L27.849 27.5746M21.1484 27.5546L21.1522 27.5746"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.845 20.9668L27.849 20.9868M21.1484 20.9668L21.1522 20.9868"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.845 14.2324L27.849 14.2524M21.1484 14.2324L21.1522 14.2524"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4609 36.6056C20.4609 35.7612 21.1555 35.0664 22.0001 35.0664H27.0089C27.8515 35.0664 28.5463 35.7612 28.5463 36.6056V41.8208"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.1797 18.0156H37.6939C39.2701 18.0156 40.5643 19.2922 40.5643 20.8858V41.8224"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.67188 41.8224V20.8858C8.67188 19.2922 9.96592 18.0156 11.5421 18.0156H13.8111"
        stroke="#2E2E2E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanFinderPlanSummary({
  plan,
  planIndex,
  month,
  contactPath,
  labels,
  appsN,
  membersN,
  mauIdx,
}: {
  plan: PricingCopy['cloud']['plans'][0];
  planIndex: number;
  month: string;
  contactPath: string;
  labels: PlanFinderLabels;
  appsN: number;
  membersN: number;
  mauIdx: number;
}) {
  if (planIndex === CLOUD_PLAN_INDEX_ENTERPRISE) {
    return (
      <div className="plan-finder__summary plan-finder__summary--enterprise">
        <PlanFinderEnterpriseIcon />
        <h3 className="plan-finder__enterprise-title">{labels.enterpriseTitle}</h3>
        <p className="plan-finder__enterprise-body">{labels.enterpriseBody}</p>
        <div className="plan-finder__enterprise-features">
          {labels.enterpriseFeatures.map((feature) => (
            <div key={feature} className="price-feature">
              <img src="/images/pricing_CLOUD_plans_check.svg" loading="lazy" alt="" width={20} height={20} />
              <div className="plan-finder__enterprise-feature">{feature}</div>
            </div>
          ))}
        </div>
        <div className="plan-finder__cta-wrap">
          <PlanCta
            plan={plan}
            contactPath={contactPath}
            label={planFinderCtaLabel(planIndex, labels)}
            signupTracking={{ location: 'plan-finder', plan: planFinderSignupPlan(planIndex) }}
          />
        </div>
      </div>
    );
  }

  const authgearUsd = authgearPlanFinderMonthlyUsd(plan, planIndex, mauIdx, appsN, membersN);
  const showPriceFrom =
    planIndex === CLOUD_PLAN_INDEX_DEVELOPERS || planIndex === CLOUD_PLAN_INDEX_BUSINESS;
  return (
    <div className="plan-finder__summary">
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
      ) : isFreeTierPlan(plan) ? (
        <div className="plan-finder__price-line">
          <span className="plan-finder__currency">$</span>
          <span className="plan-finder__price-amount">0</span>
          <span className="plan-finder__price-period">{month}</span>
        </div>
      ) : (
        <div className="plan-finder__price-line">
          {showPriceFrom ? <span className="plan-finder__price-from">{labels.priceFrom}</span> : null}
          <span className="plan-finder__currency">$</span>
          <span className="plan-finder__price-amount">
            {authgearUsd !== null ? authgearUsd.toLocaleString('en-US') : plan.priceLine.replace(/^\$/, '')}
          </span>
          <span className="plan-finder__price-period">{month}</span>
        </div>
      )}
      <div className="plan-finder__cta-wrap">
        <PlanCta
          plan={plan}
          contactPath={contactPath}
          label={planFinderCtaLabel(planIndex, labels)}
          signupTracking={{ location: 'plan-finder', plan: planFinderSignupPlan(planIndex) }}
        />
      </div>
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
  const [mauIdx, setMauIdx] = useState(0);
  const [needsSmsWhatsapp, setNeedsSmsWhatsapp] = useState(false);
  const [logRetentionDays, setLogRetentionDays] = useState<LogRetentionDays>(1);

  const interactedRef = useRef(false);
  const markInteract = (action: PlanFinderFirstAction) => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    trackEvent('pricing-plan-finder-interact', { first_action: action });
  };

  const finderStateRef = useRef<PlanFinderInputs>({
    appsIdx,
    membersIdx,
    mauIdx,
    needsSmsWhatsapp,
    logRetentionDays,
  });
  finderStateRef.current = { appsIdx, membersIdx, mauIdx, needsSmsWhatsapp, logRetentionDays };

  const sliderDragPlanIndexRef = useRef<number | null>(null);

  const beginSliderGesture = () => {
    sliderDragPlanIndexRef.current = computePlanFinderPlanIndex(finderStateRef.current);
  };

  const endSliderGesture = () => {
    if (sliderDragPlanIndexRef.current === null) return;
    const beforePlanIndex = sliderDragPlanIndexRef.current;
    sliderDragPlanIndexRef.current = null;
    maybeTrackPlanFinderResult(beforePlanIndex, finderStateRef.current);
  };

  const scaleSlidersDisabled = logRetentionDays === 180;
  const appsIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : appsIdx;
  const membersIdxEffective = scaleSlidersDisabled ? APPS_MEMBERS_SLIDER_MAX : membersIdx;
  const appsN = appsMembersNumericFromSliderIndex(appsIdxEffective);
  const membersN = appsMembersNumericFromSliderIndex(membersIdxEffective);
  const appsOrMembersTenPlus =
    appsIdxEffective >= APPS_MEMBERS_SLIDER_MAX || membersIdxEffective >= APPS_MEMBERS_SLIDER_MAX;
  const planIndex = resolveRecommendedPlanIndex(appsN, membersN, mauIdx, needsSmsWhatsapp, logRetentionDays);
  const isEnterprisePlan = planIndex === CLOUD_PLAN_INDEX_ENTERPRISE;
  const plan = copy.cloud.plans[planIndex];
  const mauSliderLocked =
    planIndex === CLOUD_PLAN_INDEX_FREE || planIndex === CLOUD_PLAN_INDEX_DEVELOPERS;
  const mauSliderDisabled = mauSliderLocked || scaleSlidersDisabled || appsOrMembersTenPlus;
  const mauSliderValue = mauSliderDisabled ? MAU_RANGE_MAX : mauIdx;
  const mauAriaValueText = mauSliderDisabled
    ? labels.mauUnlimitedValue
    : formatMauDisplay(mauIdx, locale, labels.mauThirtyKPlus);
  const mauAriaValueNow = mauSliderDisabled ? undefined : mauNumericForLogic(mauIdx);
  const appsTicks = appsMembersTickLabels(labels.appsTenPlus);
  const mauTicks = mauTickLabels(labels.mauScaleLast);

  return (
    <div className="plan-finder">
      <div className="plan-finder__grid">
        <div className="plan-finder__controls">
          <PlanFinderYesNoToggle
            id="plan-finder-sms-label"
            label={labels.labelSmsWhatsapp}
            value={needsSmsWhatsapp}
            onChange={(next) => {
              markInteract('sms');
              const beforePlanIndex = computePlanFinderPlanIndex(finderStateRef.current);
              finderStateRef.current = { ...finderStateRef.current, needsSmsWhatsapp: next };
              setNeedsSmsWhatsapp(next);
              maybeTrackPlanFinderResult(beforePlanIndex, finderStateRef.current);
            }}
            yesLabel={labels.toggleYes}
            noLabel={labels.toggleNo}
          />
          <PlanFinderLogRetentionToggle
            id="plan-finder-log-retention-label"
            label={labels.labelLogRetention}
            value={logRetentionDays}
            onChange={(next) => {
              markInteract('log-retention');
              const beforePlanIndex = computePlanFinderPlanIndex(finderStateRef.current);
              finderStateRef.current = { ...finderStateRef.current, logRetentionDays: next };
              setLogRetentionDays(next);
              maybeTrackPlanFinderResult(beforePlanIndex, finderStateRef.current);
            }}
            option1Day={labels.logRetention1Day}
            option60Days={labels.logRetention60Days}
            option180Days={labels.logRetention180Days}
          />
          <div className="plan-finder__field">
            <div className="plan-finder__label-row">
              <span className="plan-finder__label" id="plan-finder-apps-label">
                {labels.labelApplications}
              </span>
              <span className="plan-finder__value" aria-live="polite">
                {formatCountDisplay(appsIdxEffective, labels.appsTenPlus)}
              </span>
            </div>
            <RangeWithTicks
              labelledBy="plan-finder-apps-label"
              value={appsIdxEffective}
              max={APPS_MEMBERS_SLIDER_MAX}
              onChange={(next) => {
                markInteract('apps');
                finderStateRef.current = { ...finderStateRef.current, appsIdx: next };
                setAppsIdx(next);
              }}
              onSliderGestureStart={beginSliderGesture}
              onSliderGestureEnd={endSliderGesture}
              tickLabels={appsTicks}
              ariaValueNow={appsN}
              ariaValueText={formatCountDisplay(appsIdxEffective, labels.appsTenPlus)}
              disabled={scaleSlidersDisabled}
            />
          </div>
          <div className="plan-finder__field">
            <div className="plan-finder__label-row">
              <span className="plan-finder__label" id="plan-finder-members-label">
                {labels.labelProjectMembers}
              </span>
              <span className="plan-finder__value" aria-live="polite">
                {formatCountDisplay(membersIdxEffective, labels.appsTenPlus)}
              </span>
            </div>
            <RangeWithTicks
              labelledBy="plan-finder-members-label"
              value={membersIdxEffective}
              max={APPS_MEMBERS_SLIDER_MAX}
              onChange={(next) => {
                markInteract('members');
                finderStateRef.current = { ...finderStateRef.current, membersIdx: next };
                setMembersIdx(next);
              }}
              onSliderGestureStart={beginSliderGesture}
              onSliderGestureEnd={endSliderGesture}
              tickLabels={appsTicks}
              ariaValueNow={membersN}
              ariaValueText={formatCountDisplay(membersIdxEffective, labels.appsTenPlus)}
              disabled={scaleSlidersDisabled}
            />
          </div>
          <div className="plan-finder__field">
            <div className="plan-finder__label-row">
              <span className="plan-finder__label" id="plan-finder-mau-label">
                {labels.labelMaus}
              </span>
              <span className="plan-finder__value" aria-live="polite">
                {mauSliderDisabled ? labels.mauUnlimitedValue : formatMauDisplay(mauIdx, locale, labels.mauThirtyKPlus)}
              </span>
            </div>
            <RangeWithTicks
              labelledBy="plan-finder-mau-label"
              value={mauSliderValue}
              max={MAU_RANGE_MAX}
              onChange={(next) => {
                markInteract('mau');
                finderStateRef.current = { ...finderStateRef.current, mauIdx: next };
                setMauIdx(next);
              }}
              onSliderGestureStart={mauSliderDisabled ? undefined : beginSliderGesture}
              onSliderGestureEnd={mauSliderDisabled ? undefined : endSliderGesture}
              tickLabels={mauTicks}
              ariaValueNow={mauAriaValueNow}
              ariaValueText={mauAriaValueText}
              disabled={mauSliderDisabled}
            />
          </div>
        </div>
        <div
          className={`plan-finder__result${isEnterprisePlan ? ' plan-finder__result--enterprise' : ''}`}
        >
          {!isEnterprisePlan ? (
            <div className="plan-finder__result-heading">{labels.recommendedHeading}</div>
          ) : null}
          <PlanFinderPlanSummary
            plan={plan}
            planIndex={planIndex}
            month={month}
            contactPath={contactPath}
            labels={labels}
            appsN={appsN}
            membersN={membersN}
            mauIdx={mauIdx}
          />
          {!isEnterprisePlan ? (
            <div className="plan-finder__result-tail">
              <hr className="plan-finder__recommend-divider" />
              <PlanFinderCompetitorCompare
                labels={labels}
                plan={plan}
                planIndex={planIndex}
                month={month}
                locale={locale}
                starterTier={isFreeTierPlan(plan)}
                appsN={appsN}
                membersN={membersN}
                mauIdx={mauIdx}
                mauSliderLocked={mauSliderLocked}
              />
            </div>
          ) : null}
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
    case 'whatsappOtpMeteredSeePricing':
      return (
        <>
          <a href={whatsappPath} className="comparison-link comparison-link--btn">
            {isZhHant ? '請參閱定價' : 'See Pricing'}
          </a>
          <br />
          {isZhHant ? '或自訂閘道' : 'Or custom gateway'}
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
    default:
      return null;
  }
}

function ComparisonCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M15.8327 5.98962L7.81185 14.0105L4.16602 10.3646"
        stroke="#2E2E2E"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
    return <ComparisonCheckIcon />;
  }
  if (cell.kind === 'dash') return <>-</>;
  if (cell.kind === 'empty') return null;
  if (cell.kind === 'nodeVariant') {
    return <NodeVariantCell variant={cell.variant} whatsappPath={whatsappPath} locale={locale} />;
  }
  if (cell.value.includes('\n')) {
    return <span className="whitespace-pre-line">{cell.value}</span>;
  }
  return <>{cell.value}</>;
}

function PlanCta({
  plan,
  contactPath,
  label,
  signupTracking,
}: {
  plan: PricingCopy['cloud']['plans'][0];
  contactPath: string;
  label?: string;
  signupTracking?: { location: string; plan: PlanFinderSignupPlan };
}) {
  const href = resolveHref(plan.cta.href, contactPath);
  const displayLabel = label ?? plan.cta.label;
  const cls = `pricing-buy-now w-button${plan.highlight ? ' developers-bg' : ''}${plan.enterprise ? ' enterprise' : ''}`;

  const handleClick = () => {
    if (signupTracking) {
      // The Enterprise CTA leads to the demo/contact flow, not portal
      // signup, so it counts toward the get-demo goal instead.
      trackEvent(plan.enterprise ? 'get-demo' : 'signup', {
        location: signupTracking.location,
        plan: signupTracking.plan,
      });
    }
  };

  if (plan.cta.external) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
        onClick={signupTracking ? handleClick : undefined}
      >
        {displayLabel}
      </a>
    );
  }
  return (
    <a href={href} className={cls} onClick={signupTracking ? handleClick : undefined}>
      {displayLabel}
    </a>
  );
}

function planFinderCtaLabel(planIndex: number, labels: PlanFinderLabels): string | undefined {
  if (planIndex === CLOUD_PLAN_INDEX_DEVELOPERS || planIndex === CLOUD_PLAN_INDEX_BUSINESS) {
    return labels.ctaGetStarted;
  }
  return undefined;
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
  planFinder,
}: Props) {
  const [comparisonPlanIndex, setComparisonPlanIndex] = useState(0);

  return (
    <div className="page-wrapper">
      <section id="cards-section" className="section pricing-new cloud pricing-info">
        <div className="new-pricing-h1-container">
          <h1 className="title pricing-h1">
            {copy.cloud.titleLine1}
            <span className="pricing-sepcial">{copy.cloud.titleHighlight}</span>
            {copy.cloud.titleLine1Suffix}
            {copy.cloud.titleLine2 ? (
              <>
                <br />
                {copy.cloud.titleLine2}
              </>
            ) : null}
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
            <div className="full-plan" id="plan-finder-heading">
              {planFinder.heading}
            </div>
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

      <section className="cloud pricing-info">
        <div className="container-default expand-section">
          <div className="comparison static-table">
            <div className="full-plan">{copy.cloud.fullPlanTitle}</div>
            <div className="comparison-row comprison-header">
              <div className="w-layout-blockcontainer empty w-container" />
              {copy.comparison.planNames.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  className={`comparison-column comparison-plan plan-option${
                    comparisonPlanIndex === i ? ' default' : ''
                  }`}
                  aria-pressed={comparisonPlanIndex === i}
                  onClick={() => setComparisonPlanIndex(i)}
                >
                  {name}
                </button>
              ))}
            </div>
            {copy.comparison.rows.map((row, rowIndex) => {
                if (row.kind === 'section') {
                  return (
                    <div key={`section-${row.title}`} className="comparison-row comparison-row--section">
                      <div className="comparison-column comparison-section-title">{row.title}</div>
                    </div>
                  );
                }
                return (
                  <div key={`${row.label}-${rowIndex}`} className="comparison-row">
                    <div className="comparison-column first-column whitespace-pre-line">{row.label}</div>
                    {row.cells.map((cell, i) => (
                      <div
                        key={i}
                        className={`comparison-column plan-data ${COMPARISON_PLAN_COLUMN_CLASSES[i]}${
                          comparisonPlanIndex === i ? ' comparison-plan-col--active' : ''
                        }`}
                      >
                        <CellContent cell={cell} whatsappPath={whatsappPath} locale={locale} />
                      </div>
                    ))}
                  </div>
                );
            })}
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
