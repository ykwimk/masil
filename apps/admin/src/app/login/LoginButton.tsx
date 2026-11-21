'use client';

import { useEffect, useState } from 'react';
import { Button } from '@masil/ui/components/Button';
import { AUTH_CHANNEL, createClient } from '@/lib/supabase/client';

const POPUP_WIDTH = 500;
const POPUP_HEIGHT = 600;

// next는 검사하지 않고 그대로 넘긴다. 검사는 /auth/callback 한곳에서 한다
export function LoginButton({ next }: { next?: string }) {
  const [pending, setPending] = useState(false);

  async function signIn() {
    setPending(true);

    // await 전에 열어야 클릭으로 연 창으로 인정돼 팝업 차단을 피한다
    const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2;
    const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2;
    const popup = window.open(
      '',
      'masil-google-login',
      `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top}`,
    );

    // 팝업이 막혔으면 이 창에서 Google로 갔다가 콜백으로 바로 돌아온다
    const callback = new URL('/auth/callback', window.location.origin);
    if (next) callback.searchParams.set('next', next);

    const { data, error } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: popup
          ? new URL('/auth/popup', window.location.origin).toString()
          : callback.toString(),
        skipBrowserRedirect: Boolean(popup),
        // 다른 Google 계정으로 바꿔 들어올 수 있게 계정 선택 화면을 띄운다
        queryParams: { prompt: 'select_account' },
      },
    });

    if (error) {
      popup?.close();
      window.location.assign('/login?error=auth');
      return;
    }
    if (popup) popup.location.href = data.url;
    setPending(false);
  }

  // 팝업이 보낸 code를 콜백 주소에 실어 이 창을 옮긴다. 교환·next 검사·실패 처리는 콜백이 한다
  useEffect(() => {
    const channel = new BroadcastChannel(AUTH_CHANNEL);
    channel.addEventListener('message', (e) => {
      const code = e.data.code;
      if (code) {
        const callback = new URL('/auth/callback', window.location.origin);
        callback.searchParams.set('code', code);
        if (next) callback.searchParams.set('next', next);

        window.location.assign(callback);
      } else {
        window.location.assign('/login?error=auth');
      }
    });

    return () => channel.close();
  }, [next]);

  return (
    <Button onClick={signIn} disabled={pending}>
      Google로 로그인
    </Button>
  );
}
