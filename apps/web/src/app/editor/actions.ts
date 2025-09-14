'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdminClient } from '@/lib/db/admin';
import { parseTags, summarize } from '@/lib/utils';
import { Post } from '@/types';

// 새 글 작성
export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 'user';

  if (!session?.user?.email || !['admin', 'editor'].includes(role)) {
    return redirect('/login?callbackUrl=%2Feditor');
  }

  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const tags = parseTags(String(formData.get('tags') || ''));
  const isPublish = String(formData.get('publish') || '') === 'on';
  const descriptionInput = String(formData.get('description') || '').trim();

  if (!title || !content) {
    return redirect('/editor?error=missing_fields');
  }

  const description = descriptionInput || summarize(content, 160);
  const status = isPublish ? 'published' : 'draft';

  const admin = await getSupabaseAdminClient();
  if (!admin) return redirect('/editor?error=db_unavailable');

  const insertPayload: any = {
    title,
    description,
    content,
    tags,
    author: session.user.email,
    status,
  };

  const { error } = await admin
    .from('posts')
    .insert(insertPayload)
    .select('id')
    .single();

  if (error) {
    return redirect('/editor?error=insert_failed');
  }

  return redirect('/editor?created=1');
}

// 게시글 상태 변경 (draft <-> published)
export async function setPostStatus(formData: FormData) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 'user';
  const email = session?.user?.email ?? null;

  if (!email || !['admin', 'editor'].includes(role)) {
    return redirect('/login?callbackUrl=%2Feditor');
  }

  const formId = String(formData.get('id') || '').trim();
  const idNum = Number(formId);
  const formStatus = String(formData.get('status') || '').trim();
  const status = formStatus === 'published' ? 'draft' : 'published';

  const allowed = ['draft', 'published'] as const;
  if (!Number.isInteger(idNum) || !allowed.includes(formStatus as any)) {
    return redirect('/editor?error=invalid_params');
  }

  const admin = await getSupabaseAdminClient();
  if (!admin) return redirect('/editor?error=unavailable');

  let query = admin.from('posts').update({ status }).eq('id', idNum);

  if (role !== 'admin') {
    query = query.eq('author', email);
  }

  const { error } = await query;
  if (error) return redirect('/editor?error=update_failed');

  return redirect('/editor?updated=1');
}

// 게시글 삭제
export async function deletePost(formData: FormData) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 'user';
  const email = session?.user?.email ?? null;

  if (!email || !['admin', 'editor'].includes(role)) {
    return redirect('/login?callbackUrl=%2Feditor');
  }

  const formId = String(formData.get('id') || '').trim();
  const idNum = Number(formId);
  if (!Number.isInteger(idNum)) {
    return redirect('/editor?error=invalid_params');
  }

  const admin = await getSupabaseAdminClient();
  if (!admin) return redirect('/editor?error=db_unavailable');

  let query = admin.from('posts').delete().eq('id', idNum);
  if (role !== 'admin') {
    query = query.eq('author', email);
  }

  const { error } = await query;
  if (error) return redirect('/editor?error=delete_failed');

  return redirect('/editor?deleted=1');
}

// 내 글 목록 불러오기
export async function getMyPosts() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;

  let myPosts: Pick<Post, 'id' | 'title' | 'created_at' | 'status'>[] = [];

  if (email && ['admin', 'editor'].includes(session?.user?.role ?? 'user')) {
    const admin = await getSupabaseAdminClient();
    if (admin) {
      const { data } = await admin
        .from('posts')
        .select('id,title,created_at,status')
        .eq('author', email)
        .order('created_at', { ascending: false });

      myPosts = data ?? [];
    }
  }

  return myPosts;
}
