import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TermsPage from '@/components/pages/TermsPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Terms' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <TermsPage locale="en" />;
}
