'use server';

import { headers } from 'next/headers';
import { getSupabasePublicClient } from '@/lib/db/public';

export interface WaitListActionState {
  ok: boolean;
  message: string;
}

export async function handleAddToWaitList(
  prevState: WaitListActionState,
  formData: FormData,
): Promise<WaitListActionState> {
  const email = String(formData.get('email') ?? '');
  const normalizedEmail = email.trim().toLowerCase();
  const emailRegex =
    /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/;
  if (!emailRegex.test(normalizedEmail)) {
    return { ok: false, message: '올바른 이메일 주소를 입력해 주세요.' };
  }

  const supabase = await getSupabasePublicClient();
  if (!supabase) {
    return {
      ok: false,
      message: '저장에 실패했어요. 잠시 후 다시 시도해 주세요.',
    };
  }

  const header = headers();
  const userAgent = header.get('user-agent');
  const referer = header.get('referer');

  const { error } = await supabase.from('waitlist').insert({
    email: normalizedEmail,
    source: 'launching',
    user_agent: userAgent,
    referer,
  });

  if (error) {
    if (error.code !== '23505') {
      console.error('waitList error', error);
      return {
        ok: false,
        message: '저장 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
      };
    }
  }

  return {
    ok: true,
    message: '사전예약이 완료되었습니다! 런칭 소식을 이메일로 보내드릴게요.',
  };
}
