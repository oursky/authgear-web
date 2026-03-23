import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PolicyPage from '@/components/pages/PolicyPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Policy' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <PolicyPage locale="en" />;
}
