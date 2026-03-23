import type { Metadata } from 'next';
import { getPricingCopy } from '@/lib/pricing/getCopy';
import PricingPageView from '@/components/pricing/PricingPageView';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getPricingCopy(locale);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <PricingPageView locale={locale} />;
}
