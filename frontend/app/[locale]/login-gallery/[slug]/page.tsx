import type { Metadata } from 'next';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import LoginGalleryDetailLayout, {
  buildLoginGalleryDetailLabels,
} from '@/components/login-gallery/LoginGalleryDetailLayout';
import { localizedPath, pathLocaleToStrapiLocale } from '@/lib/i18n';
import {
  getLoginGalleryItems,
  getLoginGalleryItemBySlug,
  type LoginGalleryItem,
} from '@/lib/strapi';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await getLoginGalleryItems({ pagination: { pageSize: 200 } });
    return (res.data ?? []).map((i) => ({ locale: 'en', slug: i.attributes.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getLoginGalleryItemBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!item) return { title: 'Gallery Item Not Found' };
  const { title, industry, description, excerpt } = item.attributes as LoginGalleryItem & {
    excerpt?: string | null;
  };
  const desc = [industry, description, excerpt].find((s) => s && String(s).trim()) ?? undefined;
  return { title, description: desc };
}

export default async function LoginGalleryItemPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'LoginGalleryDetail' });
  const item = await getLoginGalleryItemBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!item) notFound();

  const attrs = item.attributes;
  const {
    title,
    content,
    body,
    webImage,
    mobileImage,
    mainImage,
    industry,
    socialLogin,
    loginMethodsTech,
  } = attrs;

  const labels = buildLoginGalleryDetailLabels((key) => t(key));

  return (
    <LoginGalleryDetailLayout
      galleryIndexHref={localizedPath(locale, '/login-gallery')}
      title={title}
      content={content as BlocksContent | null | undefined}
      bodyHtml={body}
      webImage={webImage}
      mobileImage={mobileImage}
      mainImage={mainImage}
      industry={industry}
      socialLogin={socialLogin}
      loginMethodsTech={loginMethodsTech}
      labels={labels}
    />
  );
}
