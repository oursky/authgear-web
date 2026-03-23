import type { PricingCell } from './types';

export const chk: PricingCell = { kind: 'check' };
export const dash: PricingCell = { kind: 'dash' };
export const emp: PricingCell = { kind: 'empty' };
export const txt = (value: string, html?: boolean): PricingCell => ({ kind: 'text', value, html });
