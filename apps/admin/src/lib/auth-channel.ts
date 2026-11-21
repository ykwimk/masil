// 팝업(/auth/popup)이 본 창(LoginButton)에 { code: string | null }을 보내는 채널.
// supabase 클라이언트와 떼어 둔다: 팝업이 이 상수 하나 때문에 supabase-js를 받지 않게
export const AUTH_CHANNEL = 'masil-auth';
