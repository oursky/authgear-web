import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import WhyAuthgearPage from '@/components/pages/WhyAuthgearPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'WhyAuthgear' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <WhyAuthgearPage locale="en" />;
}
