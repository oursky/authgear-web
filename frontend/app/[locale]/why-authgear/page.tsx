import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import WhyAuthgearPage from '@/components/pages/WhyAuthgearPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WhyAuthgear' });
  return { title: t('title'), description: t('description') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <WhyAuthgearPage locale={locale} />;
}
