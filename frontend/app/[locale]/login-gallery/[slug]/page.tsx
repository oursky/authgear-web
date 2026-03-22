import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLoginGalleryItems, getLoginGalleryItemBySlug, strapiImageUrl, type StrapiLocale } from '@/lib/strapi';

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
  const item = await getLoginGalleryItemBySlug(slug, locale as StrapiLocale);
  if (!item) return { title: 'Gallery Item Not Found' };
  return { title: item.attributes.title, description: item.attributes.description };
}

export default async function LoginGalleryItemPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = await getLoginGalleryItemBySlug(slug, locale as StrapiLocale);
  if (!item) notFound();

  const { title, description, body, previewImage } = item.attributes;
  const imgUrl = strapiImageUrl(previewImage);

  return (
    <div className="page-wrapper">
      <div className="section login-gallery-detail">
        <div className="container-default w-container">
          {imgUrl && (
            <Image src={imgUrl} alt={title} width={1200} height={800} style={{ width: '100%', height: 'auto' }} />
          )}
          <h1>{title}</h1>
          {description && <p className="paragraph">{description}</p>}
          {body && (
            <div className="login-rich-text w-richtext" dangerouslySetInnerHTML={{ __html: body }} />
          )}
        </div>
      </div>
    </div>
  );
}
