/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@masil/ui'],
  async headers() {
    // headers()는 build와 dev에서만 불린다. 그래서 lint·typecheck는 이 값 없이도 돈다
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error(
        'CSP connect-src에 넣을 Supabase 주소가 없습니다. apps/admin/.env.local 또는 Vercel 환경 변수에 NEXT_PUBLIC_SUPABASE_URL을 넣어 주세요',
      );
    }
    const supabaseOrigin = new URL(supabaseUrl).origin;
    const dev = process.env.NODE_ENV === 'development';

    // nonce를 쓰지 않으므로 App Router 인라인 스크립트·스타일 때문에 'unsafe-inline'을 둔다(PLAN 3단계 공통).
    // eval과 ws:는 개발 모드(React 개발 도구, HMR)에서만 연다
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      `connect-src 'self' ${supabaseOrigin}${dev ? ' ws:' : ''}`,
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    // shortcut: web과 admin에 같은 보안 헤더가 두 벌 있다, 5단계에서 web CSP를 정리할 때 packages로 합친다.
    // COOP same-origin은 넣지 않는다: 팝업 로그인(/auth/popup)과 본 창의 연결이 끊긴다
    const securityHeaders = [
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      { key: 'Content-Security-Policy', value: csp },
    ];

    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
