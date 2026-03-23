import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AuthToolkitPage from '@/components/pages/AuthToolkitPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'AuthToolkit' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <AuthToolkitPage locale="en" />;
}
