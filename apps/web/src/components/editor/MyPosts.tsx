import { getMyPosts, setPostStatus, deletePost } from '@/app/editor/actions';
import { Button } from '@/components/ui/button';

export default async function MyPosts() {
  const myPosts = await getMyPosts();

  if (myPosts.length <= 0)
    return (
      <div className="text-muted-foreground pt-24 text-center text-xl font-semibold">
        내 작성한 포스트가 없어요 😅
      </div>
    );

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-semibold">내 글 목록</h2>
      <div className="divide-y rounded-md border">
        {myPosts.map((post) => (
          <div key={post.id} className="flex flex-wrap items-center gap-3 p-3">
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
                  variant="outline"
                  className="cursor-pointer"
                >
                  발행 취소
                </Button>
              ) : (
                <Button type="submit" className="cursor-pointer">
                  발행하기
                </Button>
              )}
            </form>
            <form action={deletePost}>
              <input type="hidden" name="id" value={post.id} />
              <Button
                type="submit"
                variant="destructive"
                className="cursor-pointer"
              >
                삭제
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
