import { createClient } from '@/lib/supabase/server';

// 글 목록은 4단계. 지금은 누구로 들어왔는지만 보여 준다
export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <p>{data?.claims.email}로 들어왔어요</p>
    </main>
  );
}
