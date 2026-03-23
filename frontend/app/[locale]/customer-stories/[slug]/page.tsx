import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getCustomerStories, getCustomerStoryBySlug, strapiImageUrl } from '@/lib/strapi';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await getCustomerStories({ pagination: { pageSize: 200 } });
    return (res.data ?? []).map((s) => ({ locale: 'en', slug: s.attributes.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = await getCustomerStoryBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!story) return { title: 'Story Not Found' };
  return { title: story.attributes.title, description: story.attributes.excerpt };
}

export default async function CustomerStoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const story = await getCustomerStoryBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!story) notFound();

  const { title, body, companyLogo, coverImage, companyInfoLines } = story.attributes;
  const logoUrl = strapiImageUrl(companyLogo);
  const coverUrl = strapiImageUrl(coverImage);

  return (
    <div className="page-wrapper">
      <div className="section case-study-post">
        <div className="container-default w-container">
          <div className="case-study-post-header">
            {logoUrl && <Image src={logoUrl} alt={title} width={180} height={60} className="case-study-post-company-logo" />}
            <h1 className="case-study-post-title">{title}</h1>
            {coverUrl && (
              <Image src={coverUrl} alt={title} width={1200} height={630} className="case-study-post-image" style={{ width: '100%', height: 'auto' }} />
            )}
          </div>

          <div className="w-layout-grid case-study-content">
            {companyInfoLines && (
              <div className="case-study-company-info">
                {companyInfoLines.split('\n').map((line, i) => (
                  <div key={i} className="case-study-company-info-line-item">{line}</div>
                ))}
              </div>
            )}
            {body ? (
              <div className="case-study-rich-text w-richtext" dangerouslySetInnerHTML={{ __html: body }} />
            ) : (
              <p>No content yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
