import type { PricingCell } from './types';

export const chk: PricingCell = { kind: 'check' };
export const dash: PricingCell = { kind: 'dash' };
export const emp: PricingCell = { kind: 'empty' };
export const txt = (value: string): PricingCell => ({ kind: 'text', value });

/** Add-on price on the first line, unit label on the second (full comparison table). */
export const addonPrice = (price: string, unit: string): PricingCell =>
  txt(`${price}\n${unit}`);

export const smsOtpMeteredEn: PricingCell = txt('US/Canada: $0.02\nOthers: $0.1');
export const smsOtpMeteredZh: PricingCell = txt('美國/加拿大：$0.02\n其他：$0.1');
export const smsOtpMeteredOrGatewayEn: PricingCell = txt('US/Canada: $0.02\nOthers: $0.1\nOr custom gateway');
export const smsOtpMeteredOrGatewayZh: PricingCell = txt('美國/加拿大：$0.02\n其他：$0.1\n或自訂閘道');
export const smsOtpFreeQuotaEn: PricingCell = txt('100/month\n(SMS + WhatsApp OTP)');
export const smsOtpFreeQuotaZh: PricingCell = txt('每月 100 則\n(SMS + WhatsApp OTP)');
export const whatsappOtpFreeIncludedEn: PricingCell = txt('Included in shared quota');
export const whatsappOtpFreeIncludedZh: PricingCell = txt('含於上述合計配額');
export const whatsappOtpMeteredSeePricing: PricingCell = {
  kind: 'nodeVariant',
  variant: 'whatsappOtpMeteredSeePricing',
};
export const othersBusiness: PricingCell = { kind: 'nodeVariant', variant: 'othersBusiness' };
export const othersEnterprise: PricingCell = { kind: 'nodeVariant', variant: 'othersEnterprise' };
