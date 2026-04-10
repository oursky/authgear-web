import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LoginGalleryIndexPage from '@/components/login-gallery/LoginGalleryIndexPage';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getLoginGalleryItems } from '@/lib/strapi';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LoginGalleryIndex' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function LoginGalleryPage({ params }: Props) {
  const { locale } = await params;
  const res = await getLoginGalleryItems({
    pagination: { pageSize: 100 },
    locale: pathLocaleToStrapiLocale(locale),
  });
  const items = res.data ?? [];

  return (
    <div className="page-wrapper">
      <LoginGalleryIndexPage locale={locale} items={items} />
    </div>
  );
}
