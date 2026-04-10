import type { Metadata } from 'next';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import LoginGalleryDetailLayout, {
  buildLoginGalleryDetailLabels,
} from '@/components/login-gallery/LoginGalleryDetailLayout';
import { DEFAULT_LOCALE, localizedPath } from '@/lib/i18n';
import {
  getLoginGalleryItems,
  getLoginGalleryItemBySlug,
  type LoginGalleryItem,
} from '@/lib/strapi';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await getLoginGalleryItems({ pagination: { pageSize: 200 } });
    return (res.data ?? []).map((i) => ({ slug: i.attributes.slug }));
  } catch (error) {
    // During Docker build, Strapi may not be available
    // Return empty array to allow build to succeed (pages will be generated on-demand)
    console.warn('[login-gallery] Failed to generate static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getLoginGalleryItemBySlug(slug);
  if (!item) return { title: 'Gallery Item Not Found' };
  const { title, industry, description, excerpt } = item.attributes as LoginGalleryItem & {
    excerpt?: string | null;
  };
  const desc = [industry, description, excerpt].find((s) => s && String(s).trim()) ?? undefined;
  return { title, description: desc };
}

export default async function LoginGalleryItemPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations({ locale: DEFAULT_LOCALE, namespace: 'LoginGalleryDetail' });
  const item = await getLoginGalleryItemBySlug(slug);
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
      galleryIndexHref={localizedPath(DEFAULT_LOCALE, '/login-gallery')}
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
