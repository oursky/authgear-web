import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ScheduleDemoPage from '@/components/pages/ScheduleDemoPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ScheduleDemo' });
  return { title: t('title'), description: t('description') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <ScheduleDemoPage locale={locale} />;
}
