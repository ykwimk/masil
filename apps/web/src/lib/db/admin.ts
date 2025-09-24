import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';

type SupabaseAdminLike = Pick<SupabaseClient, 'from' | 'storage'>;

let adminClient: SupabaseAdminLike | null = null;

export async function getSupabaseAdminClient(): Promise<SupabaseAdminLike | null> {
  if (adminClient) return adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  try {
    const supabase = await import('@supabase/supabase-js');

    adminClient = supabase.createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  } catch {
    return null;
  }
  return adminClient;
}
