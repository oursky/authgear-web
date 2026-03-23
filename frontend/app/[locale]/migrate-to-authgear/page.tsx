import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MigrateToAuthgearPage from '@/components/pages/MigrateToAuthgearPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MigrateToAuthgear' });
  return { title: t('title'), description: t('description') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <MigrateToAuthgearPage locale={locale} />;
}
