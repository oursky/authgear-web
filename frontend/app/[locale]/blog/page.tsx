import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import {
  getBlogPosts,
  getBlogCategories,
  strapiImageUrl,
  type BlogPost,
} from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Blog - Resource Center',
  description: 'Stay updated with the latest best practices, product updates, and expert tips on building secure, seamless user experiences with Authgear.',
};

type Props = { params: Promise<{ locale: string }> };

function BlogCard({ post, locale }: { post: { id: number; attributes: BlogPost }; locale: string }) {
  const { title, slug, excerpt, thumbnail, category, author, publishedAt, publishedAtOverride } = post.attributes;
  const imgUrl = strapiImageUrl(thumbnail);
  const catName = category?.data?.attributes?.name ?? '';
  const authorName = author?.data?.attributes?.name ?? '';
  const authorImg = strapiImageUrl(author?.data?.attributes?.photo ?? null);
  const displayDate = publishedAtOverride ?? publishedAt;
  const date = displayDate ? new Date(displayDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  return (
    <div role="listitem" className="blog-post w-dyn-item">
      <Link href={`/${locale}/blog/${slug}`} className="card blog-post w-inline-block">
        <div className="image-wrapper card-blog-post">
          {imgUrl && (
            <Image
              src={imgUrl}
              alt={title}
              width={400}
              height={250}
              className="image card-blog-post"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                    <Image src={authorImg} alt={authorName} width={32} height={32} className="image card-blog-post-author" />
                  </div>
                )}
                <div className="card-blog-post-name">{authorName}</div>
              </div>
            )}
            {date && <div className="card-blog-post-date">{date}</div>}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const strapiLocale = pathLocaleToStrapiLocale(locale);

  const [postsRes, catsRes] = await Promise.all([
    getBlogPosts({ pagination: { pageSize: 50 }, locale: strapiLocale }),
    getBlogCategories({ locale: strapiLocale }),
  ]);

  const posts = postsRes.data ?? [];
  const categories = catsRes.data ?? [];

  return (
    <div className="page-wrapper">
      <div className="section blog-gallery">
        <div className="container-default blog-gallery-feature w-container">
          <h1 className="blog-gallery-h1">Resource Center</h1>
          <div className="text-block-83">
            Stay updated with the latest best practices, product updates, and expert tips on building secure, seamless user experiences with Authgear.
          </div>
        </div>
      </div>

      <div className="section all-posts">
        <div className="container-default w-container">
          <div className="top-content latest-posts">
            <div className="split-content top-latest-posts-left">
              <h2 className="heading-32">All posts</h2>
            </div>
            <div className="split-content top-latest-posts-left">
              <Link href={`/${locale}/blog`} className="button-blog-category all w-button w--current">All</Link>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/${locale}/blog?category=${cat.attributes.slug}`} className="button-blog-category w-button">
                  {cat.attributes.name}
                </Link>
              ))}
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="empty-state w-dyn-empty">
              <div>No posts yet. Add content in the Strapi admin panel.</div>
            </div>
          ) : (
            <div role="list" className="blog-post-grid w-dyn-items">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
