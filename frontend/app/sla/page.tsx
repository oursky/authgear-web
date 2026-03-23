import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SlaPage from '@/components/pages/SlaPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Sla' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <SlaPage locale="en" />;
}
