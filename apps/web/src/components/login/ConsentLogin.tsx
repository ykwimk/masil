'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LoginButton } from './LoginButton';

export function ConsentLogin({ redirectTo }: { redirectTo: string }) {
  const [agree, setAgree] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-md border p-3 text-left text-sm">
        <input
          id="agree-privacy"
          type="checkbox"
          className="mt-1"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          aria-describedby="agree-privacy-desc"
        />
        <label htmlFor="agree-privacy" className="flex-1">
          <span id="agree-privacy-desc" className="break-keep">
            개인정보 수집·이용에 동의합니다. 동의 시 서비스 제공을 위한 최소한의
            정보(이메일 등)가 수집·처리됩니다. 자세한 내용은{' '}
            <Link
              href="/privacy"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              개인정보처리방침
            </Link>
            과{' '}
            <Link
              href="/terms"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              이용약관
            </Link>
            을 확인해 주세요.
          </span>
        </label>
      </div>
      <LoginButton redirectTo={redirectTo} />
    </div>
  );
}
