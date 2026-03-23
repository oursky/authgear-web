import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MigrateToAuthgearPage from '@/components/pages/MigrateToAuthgearPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'MigrateToAuthgear' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <MigrateToAuthgearPage locale="en" />;
}
