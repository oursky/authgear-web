import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getIntegrations, getIntegrationCategories, strapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Explore Authgear integrations with popular frameworks, identity providers, and third-party services.',
};

type Props = { params: Promise<{ locale: string }> };

export default async function IntegrationsPage({ params }: Props) {
  const { locale } = await params;
  const strapiLocale = pathLocaleToStrapiLocale(locale);
  const [intRes, catRes] = await Promise.all([
    getIntegrations({ pagination: { pageSize: 100 }, locale: strapiLocale }),
    getIntegrationCategories({ locale: strapiLocale }),
  ]);
  const integrations = intRes.data ?? [];
  const categories = catRes.data ?? [];

  return (
    <div className="page-wrapper">
      <div className="section integrations">
        <div className="container-default w-container">
          <div className="top-content">
            <h1 className="heading">Integrations</h1>
            <p className="paragraph">Connect Authgear with your existing tools and services.</p>
          </div>

          {categories.length > 0 && (
            <div className="integration-categories">
              {categories.map((cat) => (
                <span key={cat.id} className="badge integration-category">{cat.attributes.name}</span>
              ))}
            </div>
          )}

          {integrations.length === 0 ? (
            <div className="empty-state w-dyn-empty">
              <div>No integrations yet. Add content in the Strapi admin panel.</div>
            </div>
          ) : (
            <div role="list" className="integrations-grid w-dyn-items">
              {integrations.map((integration) => {
                const { name, slug, description, logo } = integration.attributes;
                const logoUrl = strapiImageUrl(logo);
                return (
                  <div key={integration.id} role="listitem" className="w-dyn-item">
                    <Link href={`/${locale}/integrations/${slug}`} className="integration-card w-inline-block">
                      {logoUrl && <Image src={logoUrl} alt={name} width={60} height={60} className="integration-logo" />}
                      <div className="integration-card-content">
                        <h3 className="integration-name">{name}</h3>
                        {description && <p className="paragraph-small">{description}</p>}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
