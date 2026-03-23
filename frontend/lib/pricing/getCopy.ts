import type { PricingCopy } from './types';
import { pricingCopyEn } from './copy-en';
import { pricingCopyZhTw } from './copy-zh-tw';

export function getPricingCopy(locale: string): PricingCopy {
  if (locale === 'zh-TW') return pricingCopyZhTw;
  return pricingCopyEn;
}
