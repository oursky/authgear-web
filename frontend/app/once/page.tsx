import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import OncePage from '@/components/pages/OncePage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Once' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <OncePage locale="en" />;
}
