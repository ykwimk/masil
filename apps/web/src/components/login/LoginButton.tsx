'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Spinner } from '../ui/spinner';

interface LoginButtonProps {
  redirectTo: string;
  disabled: boolean;
}

export function LoginButton({ redirectTo, disabled }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: redirectTo });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      variant="outline"
      className={cn('h-11 w-full cursor-pointer bg-white')}
      onClick={handleClick}
      aria-label="Google로 로그인"
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Spinner size={12} />
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="size-4"
            aria-hidden
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.157 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 12 24 12c3.059 0 5.842 1.157 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.174 35.091 26.719 36 24 36c-5.202 0-9.62-3.317-11.281-7.946l-6.532 5.033C9.5 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-3.994 5.565.001-.001 6.191 5.238 6.191 5.238C39.242 35.26 44 30 44 24c0-1.341-.138-2.651-.389-3.917z"
            />
          </svg>
          Google로 로그인
        </>
      )}
    </Button>
  );
}
