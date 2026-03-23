import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getIntegrations, getIntegrationBySlug, strapiImageUrl } from '@/lib/strapi';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await getIntegrations({ pagination: { pageSize: 200 } });
    return (res.data ?? []).map((i) => ({ locale: 'en', slug: i.attributes.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getIntegrationBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!item) return { title: 'Integration Not Found' };
  return {
    title: `${item.attributes.name} Integration`,
    description: item.attributes.description,
  };
}

export default async function IntegrationPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = await getIntegrationBySlug(slug, pathLocaleToStrapiLocale(locale));
  if (!item) notFound();

  const { name, description, body, heroImage, logo } = item.attributes;
  const heroUrl = strapiImageUrl(heroImage);
  const logoUrl = strapiImageUrl(logo);

  return (
    <div className="page-wrapper">
      <div className="section integration-hero">
        <div className="container-default w-container">
          {heroUrl && (
            <Image src={heroUrl} alt={name} width={1200} height={500} className="image integration-hero" style={{ width: '100%', height: 'auto' }} />
          )}
          <div className="integration-hero-content">
            {logoUrl && <Image src={logoUrl} alt={name} width={80} height={80} className="integration-logo-large" />}
            <h1 className="title integration-hero">{name}</h1>
            {description && <p className="paragraph integration-hero">{description}</p>}
          </div>
        </div>
      </div>

      {body && (
        <div className="section integration-body">
          <div className="container-default w-container">
            <div className="rich-text-integration w-richtext" dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </div>
      )}
    </div>
  );
}
