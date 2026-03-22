import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCustomerStories, strapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Customer Stories',
  description: 'See how companies use Authgear to power their identity and access management.',
};

export default async function CustomerStoriesPage() {
  const res = await getCustomerStories({ pagination: { pageSize: 50 } });
  const stories = res.data ?? [];

  return (
    <div className="page-wrapper">
      <div className="section">
        <div className="container-default w-container">
          <div className="top-content">
            <h1 className="heading">Customer Stories</h1>
            <p className="paragraph">See how companies use Authgear to power their identity and access management.</p>
          </div>

          {stories.length === 0 ? (
            <div className="empty-state w-dyn-empty">
              <div>No customer stories yet. Add content in the Strapi admin panel.</div>
            </div>
          ) : (
            <div role="list" className="case-study-list w-dyn-items">
              {stories.map((story) => {
                const { title, slug, excerpt, companyLogo, coverImage } = story.attributes;
                const logoUrl = strapiImageUrl(companyLogo);
                const coverUrl = strapiImageUrl(coverImage);
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
                      {logoUrl ? (
                        <Image src={logoUrl} alt="" width={200} height={64} className="image company-logo" style={{ maxHeight: 48, width: 'auto', height: 'auto' }} />
                      ) : null}
                      <div className="case-study-featured-content-top">
                        <div className="case-study-title">{title}</div>
                        {excerpt ? <p className="case-study-featured-content-excerpt">{excerpt}</p> : null}
                      </div>
                      <div className="case-study-item-cta">Read story →</div>
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
