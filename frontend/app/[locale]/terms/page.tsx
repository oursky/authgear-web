import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TermsPage from '@/components/pages/TermsPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Terms' });
  return { title: t('title'), description: t('description') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <TermsPage locale={locale} />;
}
