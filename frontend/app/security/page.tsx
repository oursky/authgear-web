import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SecurityPage from '@/components/pages/SecurityPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Security' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <SecurityPage locale="en" />;
}
