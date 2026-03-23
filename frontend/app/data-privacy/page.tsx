import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DataPrivacyPage from '@/components/pages/DataPrivacyPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'DataPrivacy' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <DataPrivacyPage locale="en" />;
}
