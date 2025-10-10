'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Post } from '@/types';
import { PostCard } from './PostCard';

const PAGE_SIZE = 6;

export function PostsSection({ selectedTag }: { selectedTag?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const reqIdRef = useRef(0);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);

  const hasMore = posts.length < total;

  const buildUrl = useCallback(
    (nextOffset: number) => {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(nextOffset),
      });
      if (selectedTag) params.set('tag', selectedTag);
      return `/api/posts?${params.toString()}`;
    },
    [selectedTag],
  );

  const loadData = useCallback(
    async (nextOffset: number, replace = false) => {
      setLoading(true);
      try {
        const id = ++reqIdRef.current;
        const res = await fetch(buildUrl(nextOffset), { cache: 'no-store' });
        if (!res.ok) throw new Error('failed');
        if (id !== reqIdRef.current) return;

        const data = await res.json();

        setPosts((prev: Post[]) =>
          replace || nextOffset === 0 ? data.posts : [...prev, ...data.posts],
        );
        setTotal(
          (prev) =>
            data.total ??
            (replace || nextOffset === 0
              ? data.posts.length
              : prev + data.posts.length),
        );
        setOffset(nextOffset);
      } catch {
        setPosts([]);
        setTotal(0);
        setOffset(nextOffset);
      } finally {
        setLoading(false);
      }
    },
    [buildUrl, selectedTag],
  );

  useEffect(() => {
    loadData(0, true);
  }, [loadData, selectedTag]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !loading &&
          hasMore &&
          !fetchingRef.current
        ) {
          fetchingRef.current = true;
          loadData(offset + PAGE_SIZE).finally(() => {
            fetchingRef.current = false;
          });
        }
      },
      { root: null, rootMargin: '200px 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading, offset, loadData]);

  return (
    <div>
      {loading && offset === 0 ? (
        <div className="flex justify-center py-24">
          <Spinner size={24} />
        </div>
      ) : (
        <ul className="masonry">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} />
          ))}
        </ul>
      )}
      {!loading && posts.length === 0 && (
        <div className="text-muted-foreground pt-24 text-center text-xl font-semibold">
          해당 태그의 게시물이 없어요 😅
        </div>
      )}
      {hasMore && (
        <div ref={loadMoreRef} className="mt-6 flex justify-center py-4">
          {loading && offset > 0 ? <Spinner size={20} /> : null}
        </div>
      )}
    </div>
  );
}
