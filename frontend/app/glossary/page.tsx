import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import GlossaryPage from '@/components/pages/GlossaryPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Glossary' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <GlossaryPage locale="en" />;
}
