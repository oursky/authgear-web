import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HomePage from '@/components/pages/HomePage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePageRoute({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}
