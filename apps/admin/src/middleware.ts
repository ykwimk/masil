import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

// 로그인 없이 열리는 경로
const PUBLIC_PATHS = ['/login', '/auth'];

export async function middleware(request: NextRequest) {
  let refreshed: { name: string; value: string; options: CookieOptions }[] = [];
  let cacheHeaders: Record<string, string> = {};

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          // 뒤이은 서버 컴포넌트가 갱신된 토큰을 읽도록 요청 쿠키도 바꾼다
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          refreshed = cookiesToSet;
          cacheHeaders = headers;
        },
      },
    },
  );

  // JWT 서명을 확인하고, 만료됐으면 여기서 갱신한다. createServerClient와 이 호출 사이에 다른 코드를 두지 않는다
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  // 갱신된 쿠키와 캐시 금지 헤더는 리다이렉트를 포함해 모든 응답에 붙인다
  const withSession = (response: NextResponse) => {
    refreshed.forEach(({ name, value, options }) =>
      response.cookies.set(name, value, options),
    );
    Object.entries(cacheHeaders).forEach(([key, value]) =>
      response.headers.set(key, value),
    );
    return response;
  };

  const { pathname, search } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!claims && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return withSession(NextResponse.redirect(url));
  }

  return withSession(NextResponse.next({ request }));
}

export const config = {
  // 정적 파일은 건너뛴다
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)',
  ],
};
