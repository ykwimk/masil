import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import MyPosts from '@/components/editor/MyPosts';
import { ROLE_LABELS } from '@/lib/constants';
import { getMyPosts } from '@/app/editor/actions';

export default async function EditorPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 'user';
  const roleLabel = ROLE_LABELS[role];

  const myPosts = await getMyPosts();

  return (
    <div className="bg-white">
      <section className="container pt-24 pb-16 md:pt-32">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          에디터
        </h1>
        <p className="text-muted-foreground mt-2">
          {session?.user?.email} / {roleLabel}
        </p>
        {/* 내 글 목록 */}
        <div className="mt-6 mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="mb-1 text-xl font-bold">내 글 목록</h2>
            <div className="text-muted-foreground text-sm">
              ※ 발행되지 않은 초안은 공개 페이지에서 보이지 않아요.
            </div>
          </div>
          <Link
            href="/editor/new"
            className="bg-primary inline-flex items-center rounded-md px-3 py-2 text-sm text-white shadow-sm transition hover:opacity-90"
          >
            새 글 작성
          </Link>
        </div>
        <MyPosts myPosts={myPosts} />
      </section>
    </div>
  );
}
