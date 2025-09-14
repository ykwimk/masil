'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdminClient } from '@/lib/db/admin';
import { parseTags, summarize } from '@/lib/utils';

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 'user';

  if (!session?.user?.email || !['admin', 'editor'].includes(role)) {
    return redirect('/login?callbackUrl=%2Feditor');
  }

  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const tags = parseTags(String(formData.get('tags') || ''));
  const publish = String(formData.get('publish') || '') === 'on';
  const descriptionInput = String(formData.get('description') || '').trim();

  if (!title || !content) {
    return redirect('/editor?error=missing_fields');
  }

  const description = descriptionInput || summarize(content, 160);
  const status = publish ? 'published' : 'draft';

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
