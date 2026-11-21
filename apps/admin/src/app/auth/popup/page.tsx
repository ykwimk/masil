'use client';

import { useEffect } from 'react';
import { AUTH_CHANNEL } from '@/lib/auth-channel';

// 팝업 로그인이 돌아오는 곳. 코드 교환은 하지 않고 본 창에 code를 넘긴 뒤 닫힌다.
// window.opener 대신 BroadcastChannel을 쓴다: Google 페이지를 거치며 opener 연결이 끊길 수 있다(COOP)
export default function AuthPopupPage() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const channel = new BroadcastChannel(AUTH_CHANNEL);
    channel.postMessage({ code }); // 취소하거나 실패하면 null
    channel.close();
    window.close();
  }, []);

  return (
    <main className="p-4">
      <p>로그인을 마쳤어요. 창이 닫히지 않으면 직접 닫아 주세요.</p>
    </main>
  );
}
