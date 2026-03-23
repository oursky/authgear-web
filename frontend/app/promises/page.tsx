import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PromisesPage from '@/components/pages/PromisesPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Promises' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <PromisesPage locale="en" />;
}
