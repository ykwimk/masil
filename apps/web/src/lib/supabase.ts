import type { SupabaseClient } from '@supabase/supabase-js';

type SupabaseClientLike = Pick<SupabaseClient, 'from'>;

let client: SupabaseClientLike | null = null;

export async function getSupabaseClient(): Promise<SupabaseClientLike | null> {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  try {
    const supabase = await import('@supabase/supabase-js');

    client = supabase.createClient(url, key, {
      auth: { persistSession: false },
    });
  } catch {
    return null;
  }

  return client;
}
