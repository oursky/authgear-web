import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getWhatsNewItems, strapiImageUrl, type StrapiLocale } from '@/lib/strapi';

export const metadata: Metadata = {
  title: "What's New",
  description: 'Latest updates, releases, and improvements from the Authgear team.',
};

type Props = { params: Promise<{ locale: string }> };

export default async function WhatsNewPage({ params }: Props) {
  const { locale } = await params;
  const res = await getWhatsNewItems({ pagination: { pageSize: 50 }, locale: locale as StrapiLocale });
  const items = res.data ?? [];

  return (
    <div className="page-wrapper">
      <div className="section whats-new">
        <div className="container-default w-container">
          <h1 className="heading">What&apos;s New</h1>
          <p className="paragraph">Latest updates, releases, and improvements from the Authgear team.</p>

          {items.length === 0 ? (
            <div className="empty-state w-dyn-empty">
              <div>No updates yet. Add content in the Strapi admin panel.</div>
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
                    <Link href={`/${locale}/whats-new/${slug}`} className="card whats-new w-inline-block">
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
