import { POSTS as MOCK_POSTS } from './mock';
import { getSupabaseClient } from './supabase';
import type { ListPostsParams, Post } from './types';

export async function listPosts({
  tag,
  limit = 10,
  offset = 0,
}: ListPostsParams) {
  const supabase = await getSupabaseClient();

  if (!supabase) {
    const filteredMockPosts = tag
      ? MOCK_POSTS.filter((p) => p.tags.includes(tag))
      : MOCK_POSTS;
    return {
      posts: filteredMockPosts.slice(offset, offset + limit),
      total: filteredMockPosts.length,
      source: 'mock' as const,
    };
  }

  const baseQuery = supabase
    .from<'posts', Post>('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });
  const query = tag ? baseQuery.contains('tags', [tag]) : baseQuery;

  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) {
    const filtered = tag
      ? MOCK_POSTS.filter((p) => p.tags.includes(tag))
      : MOCK_POSTS;
    return {
      posts: filtered.slice(offset, offset + limit),
      total: filtered.length,
      source: 'mock',
      error: error.message,
    };
  }

  return {
    posts: data ?? [],
    total: count ?? data?.length ?? 0,
    source: 'supabase',
  };
}
