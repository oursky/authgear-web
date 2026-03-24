import { getTranslations } from 'next-intl/server';
import { localizedPath } from '@/lib/i18n';
import { pricingCopyEn } from '@/lib/pricing/copy-en';
import PricingPageClient from './PricingPageClient';

export default async function PricingPageView({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Pricing' });
  const contactPath = localizedPath(locale, '/schedule-demo');
  const whatsappPath = localizedPath(locale, '/features/whatsapp-otp');
  const copy = {
    ...pricingCopyEn,
    meta: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
    tabs: {
      cloud: t('tabCloud'),
      once: t('tabOnce'),
    },
    cloud: {
      ...pricingCopyEn.cloud,
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
      ...pricingCopyEn.once,
      titleLine1: t('onceTitleLine1'),
      titleHighlight: t('onceTitleHighlight'),
      titleLine2: t('onceTitleLine2'),
      subtitle: t('onceSubtitle'),
      intro: t('onceIntro'),
      coreTitle: t('onceCoreTitle'),
      enterpriseContactSuffix: t('onceEnterpriseContactSuffix'),
    },
    cta: {
      ...pricingCopyEn.cta,
      title: t('ctaTitle'),
      subtitle: t('ctaSubtitle'),
      button: t('ctaButton'),
    },
    faq: {
      ...pricingCopyEn.faq,
      heading: t('faqHeading'),
    },
  };
  return (
    <PricingPageClient
      copy={copy}
      locale={locale}
      contactPath={contactPath}
      whatsappPath={whatsappPath}
      month={t('month')}
      onceSuffix={t('onceSuffix')}
      enterpriseContactLabel={t('enterpriseContactLabel')}
    />
  );
}
