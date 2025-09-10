import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LoginButton } from '@/components/login/LoginButton';
import { safeRedirect } from '@/lib/utils';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ from?: string }>;
}) {
  const { from } = (await searchParams) ?? {};
  const redirectTo = safeRedirect(from);
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white">
      <section className="container pt-24 pb-16 md:pt-32">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {session?.user ? '계정' : '로그인'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {session?.user
            ? '로그아웃하거나 계정으로 이동하세요.'
            : 'Google 계정으로 로그인할 수 있습니다.'}
        </p>

        <div className="mt-6 flex gap-3">
          <LoginButton signedIn={!!session?.user} redirectTo={redirectTo} />
        </div>
      </section>
    </div>
  );
}
