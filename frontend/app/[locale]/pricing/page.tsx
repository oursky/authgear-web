import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PricingPageView from '@/components/pricing/PricingPageView';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pricing' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <PricingPageView locale={locale} />;
}
