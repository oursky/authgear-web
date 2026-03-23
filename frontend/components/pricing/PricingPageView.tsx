import { localizedPath } from '@/lib/i18n';
import { getPricingCopy } from '@/lib/pricing/getCopy';
import PricingPageClient from './PricingPageClient';

export default function PricingPageView({ locale }: { locale: string }) {
  const copy = getPricingCopy(locale);
  const contactPath = localizedPath(locale, '/schedule-demo');
  const whatsappPath = localizedPath(locale, '/features/whatsapp-otp');
  return (
    <PricingPageClient
      copy={copy}
      locale={locale}
      contactPath={contactPath}
      whatsappPath={whatsappPath}
    />
  );
}
