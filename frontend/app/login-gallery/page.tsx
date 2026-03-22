import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getLoginGalleryItems, strapiImageUrl } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Login Gallery',
  description: 'Browse beautiful and secure login UI examples built with Authgear.',
};

export default async function LoginGalleryPage() {
  const res = await getLoginGalleryItems({ pagination: { pageSize: 100 } });
  const items = res.data ?? [];

  return (
    <div className="page-wrapper">
      <div className="section login-gallery">
        <div className="container-default w-container">
          <div className="top-content">
            <h1 className="heading">Login Gallery</h1>
            <p className="paragraph">Browse beautiful and secure login UI examples built with Authgear.</p>
          </div>
          {items.length === 0 ? (
            <div className="empty-state w-dyn-empty">
              <div>No gallery items yet. Add content in the Strapi admin panel.</div>
            </div>
          ) : (
            <div role="list" className="login-gallery-grid w-dyn-items">
              {items.map((item) => {
                const { title, slug, description, previewImage } = item.attributes;
                const imgUrl = strapiImageUrl(previewImage);
                return (
                  <div key={item.id} role="listitem" className="w-dyn-item">
                    <Link href={`/login-gallery/${slug}`} className="login-gallery-card w-inline-block">
                      {imgUrl && (
                        <Image src={imgUrl} alt={title} width={400} height={300} className="login-gallery-preview" style={{ objectFit: 'cover', width: '100%' }} />
                      )}
                      <div className="login-gallery-card-content">
                        <h3>{title}</h3>
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
