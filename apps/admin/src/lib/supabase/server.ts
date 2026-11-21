import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// 서버 컴포넌트·서버 액션·라우트 핸들러용. 요청 사용자의 쿠키(JWT)로 동작해서 RLS를 그대로 받는다
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 서버 컴포넌트에서는 쿠키를 쓸 수 없다. 세션 갱신은 미들웨어가 맡는다
          }
        },
      },
    },
  );
}
