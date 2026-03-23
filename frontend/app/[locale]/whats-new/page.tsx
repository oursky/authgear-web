import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { localizedPath, pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getWhatsNewItems, strapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: "What's New",
  description: 'Latest updates, releases, and improvements from the Authgear team.',
};

type Props = { params: Promise<{ locale: string }> };

export default async function WhatsNewPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WhatsNew' });
  const res = await getWhatsNewItems({ pagination: { pageSize: 50 }, locale: pathLocaleToStrapiLocale(locale) });
  const items = res.data ?? [];

  return (
    <div className="page-wrapper">
      <div className="section whats-new">
        <div className="container-default w-container">
          <h1 className="heading">{t('title')}</h1>
          <p className="paragraph">{t('subtitle')}</p>

          {items.length === 0 ? (
            <div className="empty-state w-dyn-empty">
              <div>{t('noUpdatesYet')}</div>
            </div>
          ) : (
            <div role="list" className="whats-new-list w-dyn-items">
              {items.map((item) => {
                const { title, slug, excerpt, coverImage, publishedAt } = item.attributes;
                const imgUrl = strapiImageUrl(coverImage);
                const date = publishedAt
                  ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : '';
                return (
                  <div key={item.id} role="listitem" className="whats-new-item w-dyn-item">
                    <Link
                      href={localizedPath(locale, `/whats-new/${slug}`)}
                      className="card whats-new w-inline-block"
                    >
                      {imgUrl && (
                        <Image src={imgUrl} alt={title} width={600} height={300} style={{ width: '100%', height: 'auto' }} />
                      )}
                      <div className="whats-new-content">
                        {date && <div className="whats-new-date">{date}</div>}
                        <h3>{title}</h3>
                        {excerpt && <p className="paragraph-small">{excerpt}</p>}
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
