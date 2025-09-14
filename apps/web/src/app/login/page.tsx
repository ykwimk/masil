import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LoginButton } from '@/components/login/LoginButton';
import { safeRedirect } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = (await searchParams) ?? {};
  const redirectTo = safeRedirect(from);
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return redirect('/');
  }

  return (
    <div className="h-full bg-white">
      <section className="container border-t bg-white pt-24 pb-8 md:pt-32">
        <div className="container py-8">
          <div className="mx-auto w-full max-w-md">
            <Card>
              <CardContent className="text-center">
                <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                  로그인
                </h1>
                {error ? (
                  <p className="mt-2 mb-7 text-sm text-red-600">
                    Gmail 주소로만 로그인할 수 있어요.
                  </p>
                ) : (
                  <p className="text-muted-foreground mt-2 mb-7">
                    Google 계정으로 로그인할 수 있습니다.
                  </p>
                )}
                <div className="space-y-4">
                  <LoginButton redirectTo={redirectTo} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
