import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AuthToolkitPage from '@/components/pages/AuthToolkitPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AuthToolkit' });
  return { title: t('title'), description: t('description') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <AuthToolkitPage locale={locale} />;
}
