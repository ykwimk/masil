import type { SupabaseClient } from '@supabase/supabase-js';

type SupabasePublicLike = Pick<SupabaseClient, 'from'>;

let publicClient: SupabasePublicLike | null = null;

export async function getSupabasePublicClient(): Promise<SupabasePublicLike | null> {
  if (publicClient) return publicClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  try {
    const supabase = await import('@supabase/supabase-js');

    publicClient = supabase.createClient(url, key, {
      auth: { persistSession: false },
    });
  } catch {
    return null;
  }

  return publicClient;
}
