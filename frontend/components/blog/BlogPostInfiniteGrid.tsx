'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { type BlogPostEntry } from '@/lib/strapi';
import { BlogPostCard } from './BlogPostCard';

type Props = {
  initialPosts: BlogPostEntry[];
  initialHasMore: boolean;
  /** Path locale for links (`en`, `zh-TW`). */
  locale: string;
};

export function BlogPostInfiniteGrid({ initialPosts, initialHasMore, locale }: Props) {
  const [posts, setPosts] = useState<BlogPostEntry[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef(posts);
  const hasMoreRef = useRef(initialHasMore);
  const loadingRef = useRef(false);

  postsRef.current = posts;
  hasMoreRef.current = hasMore;

  const loadMore = useCallback(async () => {
    if (!hasMoreRef.current || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const offset = postsRef.current.length;
      const res = await fetch(`/api/blog-posts?locale=${encodeURIComponent(locale)}&offset=${offset}`);
      if (!res.ok) throw new Error('Failed to load posts');
      const json = (await res.json()) as { posts: BlogPostEntry[]; hasMore: boolean };
      setPosts((prev) => [...prev, ...json.posts]);
      setHasMore(json.hasMore);
    } catch {
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { rootMargin: '480px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <>
      <div role="list" className="blog-post-grid w-dyn-items">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} style={{ height: 1, width: '100%', flexShrink: 0 }} aria-hidden />
      )}
      {loading && (
        <div className="paragraph-17 mt-8 text-center" role="status">
          Loading more posts…
        </div>
      )}
    </>
  );
}
