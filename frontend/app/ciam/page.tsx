import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CiamPage from '@/components/pages/CiamPage';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Ciam' });
  return { title: t('title'), description: t('description') };
}

export default async function Page() {
  return <CiamPage locale="en" />;
}
