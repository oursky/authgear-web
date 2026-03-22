import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, strapiImageUrl } from '@/lib/strapi';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const res = await getBlogPosts({ pagination: { pageSize: 200 } });
    return (res.data ?? []).map((p) => ({ slug: p.attributes.slug }));
  } catch (error) {
    // During Docker build, Strapi may not be available
    // Return empty array to allow build to succeed (pages will be generated on-demand)
    console.warn('[blog] Failed to generate static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.attributes.title,
    description: post.attributes.excerpt,
    openGraph: {
      title: post.attributes.title,
      description: post.attributes.excerpt ?? '',
      images: strapiImageUrl(post.attributes.thumbnail) ? [strapiImageUrl(post.attributes.thumbnail)] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const { title, excerpt, body, thumbnail, category, author, publishedAt, publishedAtOverride } = post.attributes;
  const imgUrl = strapiImageUrl(thumbnail);
  const catName = category?.data?.attributes?.name ?? '';
  const catSlug = category?.data?.attributes?.slug ?? '';
  const authorName = author?.data?.attributes?.name ?? '';
  const authorRole = author?.data?.attributes?.role ?? '';
  const authorImg = strapiImageUrl(author?.data?.attributes?.photo ?? null);
  const displayDate = publishedAtOverride ?? publishedAt;
  const date = displayDate
    ? new Date(displayDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  // Fetch recent posts for "Latest articles" section
  const latestRes = await getBlogPosts({ pagination: { pageSize: 3 } });
  const latestPosts = (latestRes.data ?? []).filter((p) => p.attributes.slug !== slug);

  return (
    <div className="page-wrapper">
      {/* Blog post header */}
      <div className="section blog-post">
        <div className="container-default blog-banner w-container">
          <div className="blog-post-top-content-wrapper">
            <div className="animation-div">
              {catName && (
                <Link href={`/blog?category=${catSlug}`} className="badge blog-post-category w-inline-block">
                  <div className="blog-category-text">{catName}</div>
                </Link>
              )}
            </div>
            <h1 className="blog-h1">{title}</h1>
            {excerpt && <p className="paragraph-large blog-post-excerpt">{excerpt}</p>}
            <div className="blog-post-about-wrapper">
              {authorName && (
                <Link href="#" className="blog-post-author-wrapper w-inline-block">
                  <div className="image-wrapper blog-post-author">
                    {authorImg && (
                      <Image src={authorImg} alt={authorName} width={40} height={40} className="image blog-post-author" />
                    )}
                  </div>
                  <div className="blog-post-author-about">
                    <div className="blog-post-author-name">{authorName}</div>
                    <div className="blog-post-author-rol">{authorRole}</div>
                  </div>
                </Link>
              )}
              {date && (
                <div className="blog-post-about-content">
                  <div className="blog-post-about-content-label">Last updated: </div>
                  <div className="text-block-82">{date}</div>
                </div>
              )}
            </div>
          </div>
          {imgUrl && (
            <Image
              src={imgUrl}
              alt={title}
              width={1200}
              height={630}
              className="image blog-post"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </div>
      </div>

      {/* Blog post body */}
      <div>
        <div className="container-default w-container">
          <div className="w-layout-grid blog-content">
            <div className="div-block-29">
              <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="link-block-4 w-inline-block">
                <Image src="/images/blog-discoard-community2x.jpg" loading="lazy" alt="Discord Community" width={300} height={200} className="image-92" />
              </a>
              <div className="div-block-32">
                <div>Star us on GitHub and stay updated</div>
              </div>
            </div>
            <div className="div-block-28">
              {body ? (
                <div
                  className="blog-rich-text w-richtext"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              ) : (
                <p>No content yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Latest articles */}
      {latestPosts.length > 0 && (
        <div className="section blog-post-latest-articles">
          <div className="container-default w-container">
            <div className="top-content blog-post-latest-artticles">
              <div className="title blog-post-latest-articles">Latest articles</div>
            </div>
            <div role="list" className="section-blog-post-grid w-dyn-items">
              {latestPosts.map((lp) => (
                <div key={lp.id} role="listitem" className="blog-post w-dyn-item">
                  <Link href={`/blog/${lp.attributes.slug}`} className="card blog-post w-inline-block">
                    <div className="image-wrapper card-blog-post">
                      {strapiImageUrl(lp.attributes.thumbnail) && (
                        <Image
                          src={strapiImageUrl(lp.attributes.thumbnail)}
                          alt={lp.attributes.title}
                          width={400}
                          height={250}
                          className="image card-blog-post"
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      )}
                    </div>
                    <div className="card-blog-post-content">
                      <h3 className="latest-articles-title">{lp.attributes.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
