import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ScheduleDemoPage from '@/components/pages/ScheduleDemoPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'ScheduleDemo' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <ScheduleDemoPage locale="en" />;
}
