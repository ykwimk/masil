'use client';

import { signIn, signOut } from 'next-auth/react';

export function LoginButton({
  signedIn,
  redirectTo,
}: {
  signedIn: boolean;
  redirectTo: string;
}) {
  if (signedIn) {
    return (
      <button
        className="btn-primary bg-primary rounded-md px-4 py-2 text-white"
        onClick={() => signOut({ callbackUrl: redirectTo })}
      >
        로그아웃
      </button>
    );
  }

  return (
    <button
      className="btn-primary bg-primary rounded-md px-4 py-2 text-white"
      onClick={() => signIn('google', { callbackUrl: redirectTo })}
    >
      Google로 로그인
    </button>
  );
}
