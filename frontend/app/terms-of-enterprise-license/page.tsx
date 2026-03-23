import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TermsEnterprisePage from '@/components/pages/TermsEnterprisePage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'TermsEnterprise' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <TermsEnterprisePage locale="en" />;
}
