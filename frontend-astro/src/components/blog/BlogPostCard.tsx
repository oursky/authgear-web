import { localizedPath } from '@/lib/i18n';
import { blogPostDisplayPublishedAt, strapiImageUrl, type BlogPostEntry } from '@/lib/strapi';

type Props = {
  post: BlogPostEntry;
  /** App Router `[locale]` param (`en` or `zh-TW`). */
  locale: string;
};

export function BlogPostCard({ post, locale }: Props) {
  const { title, slug, excerpt, thumbnail, category, author } = post.attributes;
  const imgUrl = strapiImageUrl(thumbnail);
  const catName = category?.data?.attributes?.name ?? '';
  const authorName = author?.data?.attributes?.name ?? '';
  const authorImg = strapiImageUrl(author?.data?.attributes?.photo ?? null);
  const displayDate = blogPostDisplayPublishedAt(post.attributes);
  const date = displayDate
    ? new Date(displayDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <div role="listitem" className="blog-post w-dyn-item">
      <a href={localizedPath(locale, `/blog/${slug}`)} className="card blog-post w-inline-block">
        <div className="image-wrapper card-blog-post">
          {imgUrl && (
            <img
              src={imgUrl}
              alt={title}
              width={400}
              height={250}
              className="image card-blog-post"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              loading="lazy"
            />
          )}
        </div>
        <div className="card-blog-post-content">
          {catName && (
            <div className="badge blog-post-category">
              <div className="blog-category-text">{catName}</div>
            </div>
          )}
          <h3 className="gallery-blog-title">{title}</h3>
          {excerpt && <p className="paragraph-17">{excerpt}</p>}
          <div className="card-blog-post-about">
            {authorName && (
              <div className="card-blog-post-about-author-wrapper">
                {authorImg && (
                  <div className="image-wrapper card-blog-post-author">
                    <img src={authorImg} alt={authorName} width={32} height={32} className="image card-blog-post-author" loading="lazy" />
                  </div>
                )}
                <div className="card-blog-post-name">{authorName}</div>
              </div>
            )}
            {date && <div className="card-blog-post-date">{date}</div>}
          </div>
        </div>
      </a>
    </div>
  );
}
