import { POSTS as MOCK_POSTS } from './mock';
import { getSupabaseClient } from './supabase';
import type { ListPostsParams } from './types';

export async function listPosts({
  tag,
  limit = 10,
  offset = 0,
}: ListPostsParams) {
  const supabase = await getSupabaseClient();

  if (!supabase) {
    const filteredMockPosts = (
      tag ? MOCK_POSTS.filter((p) => p.tags.includes(tag)) : MOCK_POSTS
    ).filter((p) => (p.status ? p.status === 'published' : true));
    return {
      posts: filteredMockPosts.slice(offset, offset + limit),
      total: filteredMockPosts.length,
      source: 'mock' as const,
    };
  }

  let query = supabase
    .from('posts')
    .select('id,title,description,author,tags,created_at,updated_at,status', {
      count: 'exact',
    })
    .order('created_at', { ascending: false });

  if (tag) {
    query = query.contains('tags', [tag]);
  }

  query = query.filter('status', 'eq', 'published');

  const { data, count, error } = await query.range(offset, offset + limit - 1);

  if (error) {
    const filtered = (
      tag ? MOCK_POSTS.filter((p) => p.tags.includes(tag)) : MOCK_POSTS
    ).filter((p) => (p.status ? p.status === 'published' : true));
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
