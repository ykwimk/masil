import { Button } from '@masil/ui/components/Button';
import { createClient } from '@/lib/supabase/server';
import { signOut } from './actions';

// 글 목록은 4단계. 지금은 누구로 들어왔는지만 보여 준다
export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <p>{data?.claims.email}로 들어왔어요</p>
      <form action={signOut} className="mt-6">
        <Button type="submit" variant="secondary">
          로그아웃
        </Button>
      </form>
    </main>
  );
}
