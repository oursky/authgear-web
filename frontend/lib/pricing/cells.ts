import type { ReactNode } from 'react';
import type { PricingCell } from './types';

export const chk: PricingCell = { kind: 'check' };
export const dash: PricingCell = { kind: 'dash' };
export const emp: PricingCell = { kind: 'empty' };
export const txt = (value: string): PricingCell => ({ kind: 'text', value });
export const nod = (render: (whatsappPath: string) => ReactNode): PricingCell => ({ kind: 'node', render });
