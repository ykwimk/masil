import { createBrowserClient } from '@supabase/ssr';

// 브라우저(클라이언트 컴포넌트)용. 지금은 Google 로그인 시작에만 쓴다
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
