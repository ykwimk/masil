import 'server-only';
import { POSTS as MOCK_POSTS } from './mock';
import { getSupabasePublicClient } from './db/public';
import type { ListPostsParams, Post } from './types';

// 게시물 목록
export async function getListPosts({
  tag,
  limit = 10,
  offset = 0,
}: ListPostsParams) {
  const supabase = await getSupabasePublicClient();

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
    source: 'remote',
  };
}

// ID로 게시물 조회
export async function getPostById(id: string): Promise<{
  post: Post | null;
  source: 'remote' | 'mock';
  error?: string;
}> {
  const supabase = await getSupabasePublicClient();

  if (!supabase) {
    const post = MOCK_POSTS.find((p) => p.id === id) ?? null;
    return { post, source: 'mock' } as const;
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .filter('id', 'eq', id)
    .filter('status', 'eq', 'published')
    .maybeSingle();

  if (error) {
    const post = MOCK_POSTS.find((p) => p.id === id) ?? null;
    return { post, source: 'mock', error: error.message } as const;
  }

  return { post: data ?? null, source: 'remote' } as const;
}

// 태그 목록
export async function getTags(): Promise<{
  tags: string[];
  error?: string;
}> {
  const supabase = await getSupabasePublicClient();

  if (!supabase) {
    return {
      tags: [],
      error: 'supabase_not_configured',
    };
  }

  const { data, error } = await supabase
    .from('tags')
    .select('name,is_active')
    .order('name', { ascending: true });

  if (error) {
    return { tags: [], error: error.message };
  }

  const activeTags = (data ?? [])
    .filter((tag: any) => tag.is_active !== false)
    .map((tag: any) => tag.name);

  return { tags: activeTags };
}
