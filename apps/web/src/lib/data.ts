import 'server-only';
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
    return {
      posts: [],
      total: 0,
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
    return {
      posts: [],
      total: 0,
      error: error.message,
    };
  }

  return {
    posts: data ?? [],
    total: count ?? data?.length ?? 0,
  };
}

// ID로 게시물 조회
export async function getPostById(id: string): Promise<{
  post: Post | null;
  error?: string;
}> {
  const supabase = await getSupabasePublicClient();
  if (!supabase) return { post: null };

  const idNum = Number(id);
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .filter('id', 'eq', Number.isFinite(idNum) ? idNum : id)
    .filter('status', 'eq', 'published')
    .maybeSingle();

  if (error) {
    return { post: null, error: error.message } as const;
  }

  return { post: data ?? null } as const;
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
