'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function EditorFab() {
  const { status, data } = useSession();

  if (status !== 'authenticated') return null;

  const role = data?.user?.role ?? 'user';
  const isAdminRole = role === 'admin' || role === 'editor';
  if (!isAdminRole) return null;

  return (
    <Link
      href="/editor"
      className="fixed right-5 bottom-5 z-40 md:right-8 md:bottom-8"
      title="에디터로 이동"
      aria-label="에디터로 이동"
    >
      <span
        className="inline-flex size-14 items-center justify-center rounded-full border bg-white text-2xl shadow-lg transition will-change-transform hover:-translate-y-0.5 hover:shadow-xl"
        style={{ animation: 'float 3.5s ease-in-out infinite' }}
      >
        📝
      </span>
    </Link>
  );
}
