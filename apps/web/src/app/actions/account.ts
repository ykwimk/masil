'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getSupabaseAdminClient } from '@/lib/db/admin';
import { safeRedirect } from '@/lib/utils';
import { authOptions } from '@/lib/auth';

export async function setNickname(formData: FormData) {
  const input = String(formData.get('nickname') || '').trim();
  const from = safeRedirect(String(formData.get('from') || '/'));

  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;

  if (!email) {
    const encodedUri = encodeURIComponent(from || '/');
    return redirect(`/login?callbackUrl=${encodedUri}`);
  }

  if (!input || input.length < 2 || input.length > 20) {
    return redirect(from || '/');
  }

  const admin = await getSupabaseAdminClient();
  if (!admin) return redirect(from || '/');

  const { error: updateError } = await admin
    .from('profiles')
    .update({ nickname: input })
    .eq('email', email);

  if (updateError) return redirect(from || '/');

  return redirect(from || '/');
}
