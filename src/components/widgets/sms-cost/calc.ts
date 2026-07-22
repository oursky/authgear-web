/**
 * Pure cost math for the SMS Cost Calculator. No React, no i18n — kept
 * separate so it can be unit-tested in isolation (see calc.test.ts).
 */

export interface SmsCostInput {
  /** Monthly OTP / verification volume. */
  volume: number;
  /** Per-message SMS rate (USD) for the selected provider + country. */
  smsPrice: number;
  /** Per-message WhatsApp authentication rate (USD) for the country. */
  whatsappPrice: number;
  /** Share of OTPs delivered over WhatsApp, 0–100. The rest fall back to SMS. */
  waAdoptionPct: number;
  /** Extra SMS volume from pumping fraud, 0–100. Defaults to 0. */
  pumpingPct?: number;
}

export interface SmsCostResult {
  /** Effective billable SMS sends per month, including pumping inflation. */
  smsVolume: number;
  smsCostMonthly: number;
  smsCostAnnual: number;
  blendedCostMonthly: number;
  blendedCostAnnual: number;
  savingsMonthly: number;
  savingsAnnual: number;
  /** Savings as a percentage of the SMS-only cost, 0–100. */
  savingsPct: number;
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function computeSmsCost(input: SmsCostInput): SmsCostResult {
  const volume = Math.max(0, Number.isFinite(input.volume) ? input.volume : 0);
  const smsPrice = Math.max(0, Number.isFinite(input.smsPrice) ? input.smsPrice : 0);
  const whatsappPrice = Math.max(0, Number.isFinite(input.whatsappPrice) ? input.whatsappPrice : 0);
  const wa = clamp(input.waAdoptionPct, 0, 100) / 100;
  const pump = clamp(input.pumpingPct ?? 0, 0, 100) / 100;

  // SMS-only baseline. Pumping fraud inflates the number of billable SMS sends.
  const smsVolume = volume * (1 + pump);
  const smsCostMonthly = smsVolume * smsPrice;

  // WhatsApp OTP path. App-based delivery resists pumping, so the blended model
  // bills legitimate volume only: WhatsApp for the adopted share, SMS fallback
  // for the remainder.
  const blendedCostMonthly = volume * (wa * whatsappPrice + (1 - wa) * smsPrice);

  const savingsMonthly = smsCostMonthly - blendedCostMonthly;
  const savingsPct = smsCostMonthly > 0 ? (savingsMonthly / smsCostMonthly) * 100 : 0;

  return {
    smsVolume,
    smsCostMonthly,
    smsCostAnnual: smsCostMonthly * 12,
    blendedCostMonthly,
    blendedCostAnnual: blendedCostMonthly * 12,
    savingsMonthly,
    savingsAnnual: savingsMonthly * 12,
    savingsPct,
  };
}
