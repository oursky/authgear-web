import { describe, expect, it } from 'vitest';
import { computeSmsCost } from './calc';

// Hong Kong on Twilio: 100k OTPs, SMS $0.0682, WhatsApp $0.0313.
describe('computeSmsCost', () => {
  it('computes the SMS-only baseline cost', () => {
    const r = computeSmsCost({ volume: 100000, smsPrice: 0.0682, whatsappPrice: 0.0313, waAdoptionPct: 80 });
    expect(r.smsCostMonthly).toBeCloseTo(6820, 5);
    expect(r.smsCostAnnual).toBeCloseTo(81840, 5);
  });

  it('blends WhatsApp + SMS fallback at the given adoption rate', () => {
    const r = computeSmsCost({ volume: 100000, smsPrice: 0.0682, whatsappPrice: 0.0313, waAdoptionPct: 80 });
    // 100000 * (0.8*0.0313 + 0.2*0.0682) = 3868
    expect(r.blendedCostMonthly).toBeCloseTo(3868, 5);
    expect(r.savingsMonthly).toBeCloseTo(2952, 5);
    expect(r.savingsPct).toBeCloseTo(43.28, 1);
  });

  it('reaches the full-switch savings at 100% adoption', () => {
    const r = computeSmsCost({ volume: 100000, smsPrice: 0.0682, whatsappPrice: 0.0313, waAdoptionPct: 100 });
    expect(r.blendedCostMonthly).toBeCloseTo(3130, 5);
    expect(r.savingsPct).toBeCloseTo(54.11, 1);
  });

  it('inflates only the SMS baseline when pumping is included (WhatsApp resists it)', () => {
    const r = computeSmsCost({ volume: 100000, smsPrice: 0.0682, whatsappPrice: 0.0313, waAdoptionPct: 80, pumpingPct: 20 });
    expect(r.smsVolume).toBeCloseTo(120000, 5);
    expect(r.smsCostMonthly).toBeCloseTo(8184, 5); // 120000 * 0.0682
    expect(r.blendedCostMonthly).toBeCloseTo(3868, 5); // unchanged by pumping
    expect(r.savingsMonthly).toBeCloseTo(4316, 5);
  });

  it('returns zeros and 0% savings for zero volume', () => {
    const r = computeSmsCost({ volume: 0, smsPrice: 0.0682, whatsappPrice: 0.0313, waAdoptionPct: 80 });
    expect(r.smsCostMonthly).toBe(0);
    expect(r.savingsMonthly).toBe(0);
    expect(r.savingsPct).toBe(0);
  });

  it('clamps out-of-range and non-finite inputs', () => {
    const over = computeSmsCost({ volume: 100000, smsPrice: 0.05, whatsappPrice: 0.02, waAdoptionPct: 150 });
    const at100 = computeSmsCost({ volume: 100000, smsPrice: 0.05, whatsappPrice: 0.02, waAdoptionPct: 100 });
    expect(over.blendedCostMonthly).toBeCloseTo(at100.blendedCostMonthly, 5);

    const nan = computeSmsCost({ volume: NaN, smsPrice: 0.05, whatsappPrice: 0.02, waAdoptionPct: 80 });
    expect(nan.smsCostMonthly).toBe(0);
  });
});
