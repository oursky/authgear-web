import { getTranslations } from 'next-intl/server';
import type { PricingCopy } from './types';
import { pricingCopyEn } from './copy-en';
import { pricingCopyZhTw } from './copy-zh-tw';

export async function getPricingCopy(locale: string): Promise<PricingCopy> {
  const t = await getTranslations({ locale, namespace: 'Pricing' });
  const planData = locale === 'zh-TW' ? pricingCopyZhTw : pricingCopyEn;
  return {
    ...planData,
    meta: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
    tabs: {
      cloud: t('tabCloud'),
      once: t('tabOnce'),
    },
    cloud: {
      ...planData.cloud,
      titleLine1: t('cloudTitleLine1'),
      titleHighlight: t('cloudTitleHighlight'),
      titleLine2: t('cloudTitleLine2'),
      subtitle: t('cloudSubtitle'),
      intro: t('cloudIntro'),
      introStrong: t('cloudIntroStrong'),
      introRest: t('cloudIntroRest'),
      expandComparison: t('cloudExpandComparison'),
      fullPlanTitle: t('cloudFullPlanTitle'),
    },
    once: {
      ...planData.once,
      titleLine1: t('onceTitleLine1'),
      titleHighlight: t('onceTitleHighlight'),
      titleLine2: t('onceTitleLine2'),
      subtitle: t('onceSubtitle'),
      intro: t('onceIntro'),
      coreTitle: t('onceCoreTitle'),
      enterpriseContactSuffix: t('onceEnterpriseContactSuffix'),
    },
    cta: {
      ...planData.cta,
      title: t('ctaTitle'),
      subtitle: t('ctaSubtitle'),
      button: t('ctaButton'),
    },
    faq: {
      ...planData.faq,
      heading: t('faqHeading'),
    },
  };
}
