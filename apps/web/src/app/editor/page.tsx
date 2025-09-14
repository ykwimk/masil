import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import MyPosts from '@/components/editor/MyPosts';

export default async function EditorPage({
  searchParams,
}: {
  searchParams?: Promise<{
    created?: string;
    updated?: string;
    error?: string;
  }>;
}) {
  const { created, updated, error } = (await searchParams) ?? {};
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-white">
      <section className="container pt-24 pb-16 md:pt-32">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          에디터
        </h1>
        <p className="text-muted-foreground mt-2">
          {session?.user?.email} / role: {session?.user?.role ?? 'user'}
        </p>
        {created && (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            새 글이 저장되었습니다.
          </div>
        )}
        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            오류가 발생했어요. 다시 시도해 주세요.
          </div>
        )}
        {updated && (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            게시글 상태가 업데이트되었습니다.
          </div>
        )}
        <div className="mt-6 flex items-center gap-3">
          <a
            href="/editor/new"
            className="bg-primary inline-flex items-center rounded-md px-4 py-2 text-white shadow-sm transition hover:opacity-90"
          >
            새 글 작성
          </a>
        </div>
        <div className="text-muted-foreground mt-8 text-sm">
          발행되지 않은 초안은 공개 페이지에서 보이지 않아요.
        </div>
        {/* 내 글 목록 */}
        <MyPosts />
      </section>
    </div>
  );
}
