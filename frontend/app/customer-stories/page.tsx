import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCustomerStories, strapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Customer Stories',
  description:
    "Power ambitious teams to build faster. Authgear's drop-in authentication handles the hard security work while your developers ship what matters.",
};

export default async function CustomerStoriesPage() {
  const res = await getCustomerStories({ pagination: { pageSize: 50 } });
  const stories = res.data ?? [];

  return (
    <div className="page-wrapper">
      <section className="ds-section ds-bg-white ds-customer-stories-index">
        <header className="ds-customer-stories-index__header">
          <div className="ds-container">
            <div className="title-content">
              <h1 className="heading-on-light">Customer Stories</h1>
              <p className="section-lede-on-light">
                Power ambitious teams to build faster. Authgear&apos;s drop-in authentication handles the hard security
                work while your developers ship what matters.
              </p>
            </div>
          </div>
        </header>

        <div className="ds-customer-stories-index__main">
          <div className="ds-container">
            {stories.length === 0 ? (
              <div className="empty-state w-dyn-empty">
                <div>No customer stories yet. Add content in the Strapi admin panel.</div>
              </div>
            ) : (
              <div role="list" className="case-study-list w-dyn-items">
                {stories.map((story) => {
                  const { title, slug, thumbnail } = story.attributes;
                  const coverUrl = strapiImageUrl(thumbnail);
                  return (
                    <div key={story.id} role="listitem" className="case-study-item-wrap w-dyn-item">
                      <Link href={`/customer-stories/${slug}`} className="case-study-featured-image-wrap w-inline-block">
                        {coverUrl ? (
                          <Image
                            src={coverUrl}
                            alt={title}
                            width={600}
                            height={400}
                            className="case-study-featured-image"
                            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                          />
                        ) : (
                          <div className="case-study-featured-image w-dyn-bind-empty" aria-hidden />
                        )}
                      </Link>
                      <Link href={`/customer-stories/${slug}`} className="case-study-content-wrap w-inline-block">
                        <div className="case-study-featured-content-top">
                          <div className="case-study-title">{title}</div>
                        </div>
                        <div className="case-study-item-cta">Read Story</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
