import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getWhatsNewItems, getWhatsNewItemBySlug, strapiImageUrl } from '@/lib/strapi';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await getWhatsNewItems({ pagination: { pageSize: 200 } });
    return (res.data ?? []).map((i) => ({ locale: 'en', slug: i.attributes.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getWhatsNewItemBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!item) return { title: 'Update Not Found' };
  return { title: item.attributes.title, description: item.attributes.excerpt };
}

export default async function WhatsNewItemPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'WhatsNew' });
  const item = await getWhatsNewItemBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!item) notFound();

  const { title, body, coverImage, publishedAt } = item.attributes;
  const imgUrl = strapiImageUrl(coverImage);
  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className="page-wrapper">
      <div className="section whats-new-post">
        <div className="container-default w-container">
          {date && <div className="whats-new-date">{date}</div>}
          <h1>{title}</h1>
          {imgUrl && (
            <Image src={imgUrl} alt={title} width={1200} height={600} style={{ width: '100%', height: 'auto' }} />
          )}
          {body ? (
            <div className="whats-new-rich-text w-richtext" dangerouslySetInnerHTML={{ __html: body }} />
          ) : (
            <p>{t('noContentYet')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
