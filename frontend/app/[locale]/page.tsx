import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StaticWebflowPage from '@/components/StaticWebflowPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const htmlFile = locale === 'zh-TW' ? 'zh-TW/index.html' : 'index.html';
  return <StaticWebflowPage htmlFile={htmlFile} />;
}
