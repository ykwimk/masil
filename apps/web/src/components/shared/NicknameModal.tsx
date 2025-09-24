'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { setNickname } from '@/app/actions/account';
import { Button } from '@/components/ui/button';

export default function NicknameModal() {
  const { status, data } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [from, setFrom] = useState<string>('/');

  useEffect(() => {
    const open =
      status === 'authenticated' && data?.user && data.user.nickname == null;
    setIsOpen(open);
  }, [status, data?.user?.nickname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFrom(
        window.location.pathname +
          window.location.search +
          window.location.hash,
      );
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
        aria-hidden
      />
      <div className="relative z-10 w-[90%] max-w-sm rounded-md bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-start justify-between">
          <h2 className="text-base font-semibold">닉네임 설정</h2>
          <button
            type="button"
            className="text-muted-foreground -m-1 cursor-pointer rounded p-1 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          게시물에 표시될 닉네임을 입력해 주세요. (2~20자)
        </p>
        <form action={setNickname} className="space-y-3">
          <input type="hidden" name="from" value={from} />
          <label htmlFor="nickname" className="block text-sm font-medium">
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            minLength={2}
            maxLength={20}
            required
            placeholder="예: 마실러"
            className="focus:ring-primary w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              나중에
            </Button>
            <Button type="submit" className="cursor-pointer">
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
