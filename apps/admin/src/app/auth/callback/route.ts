import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Google → Supabase Auth → 여기로 돌아온다. ?code=를 세션 쿠키로 바꾼 뒤 next로 보낸다
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/';

  // 우리 경로만 받는다. 앞에 origin을 붙이므로 //host, /\host 같은 값도 우리 호스트 안의 경로가 된다
  if (!next.startsWith('/')) {
    next = '/';
  }

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=auth`);
    }

    if (data) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
