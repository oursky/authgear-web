import type { PricingCell } from './types';

export const chk: PricingCell = { kind: 'check' };
export const dash: PricingCell = { kind: 'dash' };
export const emp: PricingCell = { kind: 'empty' };
export const txt = (value: string): PricingCell => ({ kind: 'text', value });

export const smsWhatsappBusiness: PricingCell = { kind: 'nodeVariant', variant: 'smsWhatsappBusiness' };
export const smsWhatsappDevelopers: PricingCell = { kind: 'nodeVariant', variant: 'smsWhatsappDevelopers' };
export const othersBusiness: PricingCell = { kind: 'nodeVariant', variant: 'othersBusiness' };
export const othersEnterprise: PricingCell = { kind: 'nodeVariant', variant: 'othersEnterprise' };
export const addonsDevelopers: PricingCell = { kind: 'nodeVariant', variant: 'addonsDevelopers' };
export const addonsBusiness: PricingCell = { kind: 'nodeVariant', variant: 'addonsBusiness' };
