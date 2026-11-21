import { Button } from '@masil/ui/components/Button';
import { Logo } from '@masil/ui/components/Logo';
import { signOut } from '../actions';
import { LoginButton } from './LoginButton';

const ERRORS: Record<string, string> = {
  forbidden: '편집 권한이 없는 계정이에요',
  auth: '로그인하지 못했어요',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;
  // 쿼리 값으로 __proto__·constructor 같은 프로토타입 키를 찾지 않게 자기 키만 본다
  const message =
    error && Object.hasOwn(ERRORS, error) ? ERRORS[error] : undefined;

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center gap-6 px-4">
      <Logo className="text-3xl" />
      <h1 className="text-xl font-semibold">에디터 로그인</h1>
      {message && (
        <p role="alert" className="text-muted">
          {message}
        </p>
      )}
      <LoginButton next={next} />
      {/* reader 계정으로 들어온 상태라 로그아웃해야 다른 계정을 고를 수 있다 */}
      {error === 'forbidden' && (
        <form action={signOut}>
          <Button type="submit" variant="secondary" className="w-full">
            로그아웃
          </Button>
        </form>
      )}
    </main>
  );
}
