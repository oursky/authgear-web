import { getTranslations } from 'next-intl/server';
import { localizedPath } from '@/lib/i18n';
import { getPricingCopy } from '@/lib/pricing/getCopy';
import PricingPageClient from './PricingPageClient';

export default async function PricingPageView({ locale }: { locale: string }) {
  const copy = await getPricingCopy(locale);
  const t = await getTranslations({ locale, namespace: 'Pricing' });
  const contactPath = localizedPath(locale, '/schedule-demo');
  const whatsappPath = localizedPath(locale, '/features/whatsapp-otp');
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
