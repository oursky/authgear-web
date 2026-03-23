import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutPage from '@/components/pages/AboutPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'About' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <AboutPage locale="en" />;
}
