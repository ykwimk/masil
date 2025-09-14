import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { getMyPosts, setPostStatus } from '@/app/editor/actions';

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
  const myPosts = await getMyPosts();

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
        {myPosts.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold">내 글 목록</h2>
            <div className="divide-y rounded-md border">
              {myPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-wrap items-center gap-3 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{post.title}</div>
                    <div className="text-muted-foreground mt-0.5 text-xs">
                      {post.created_at
                        ? new Date(post.created_at).toLocaleString()
                        : ''}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {post.status === 'published' ? '발행됨' : '초안'}
                  </span>
                  <form action={setPostStatus}>
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="status" value={post.status} />
                    {post.status === 'published' ? (
                      <Button
                        type="submit"
                        name="status"
                        value="draft"
                        variant="outline"
                        className="cursor-pointer"
                      >
                        발행 취소
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        name="status"
                        value="published"
                        className="cursor-pointer"
                      >
                        발행하기
                      </Button>
                    )}
                  </form>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
