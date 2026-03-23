import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogPostInfiniteGrid } from '@/components/blog/BlogPostInfiniteGrid';
import { BLOG_LIST_PAGE_SIZE, getBlogCategories, getBlogPostsSlice } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Blog - Resource Center',
  description: 'Stay updated with the latest best practices, product updates, and expert tips on building secure, seamless user experiences with Authgear.',
};

export default async function BlogPage() {
  const [{ data: posts, hasMore }, catsRes] = await Promise.all([
    getBlogPostsSlice(undefined, 0, BLOG_LIST_PAGE_SIZE),
    getBlogCategories(),
  ]);

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
              <Link href="/blog" className="button-blog-category all w-button w--current">All</Link>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/blog?category=${cat.attributes.slug}`} className="button-blog-category w-button">
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
            <BlogPostInfiniteGrid initialPosts={posts} initialHasMore={hasMore} locale="en" />
          )}
        </div>
      </div>
    </div>
  );
}
