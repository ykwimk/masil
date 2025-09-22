'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { deletePost, setPostStatus } from '@/app/editor/actions';
import MyPostItem from './MyPostItem';
import type { Post } from '@/types';

type MyPost = Pick<Post, 'id' | 'title' | 'created_at' | 'status'>;

export default function MyPosts({ myPosts }: { myPosts: MyPost[] }) {
  const [posts, setPosts] = useState<MyPost[]>(myPosts);
  const [pending, setPending] = useState<Set<number>>(() => new Set());

  const handleSetPendingFlag = useCallback((id: number, isFlag: boolean) => {
    setPending((prev) => {
      const next = new Set(prev);
      if (isFlag) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const onToggleStatus = useCallback(
    async (id: number) => {
      const target = posts.find((post) => post.id === id);
      if (!target) return;

      const targetStatus = target.status;
      const changeStatus = targetStatus === 'published' ? 'draft' : 'published';

      handleSetPendingFlag(id, true);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, status: changeStatus } : post,
        ),
      );

      try {
        const res = await setPostStatus(id, targetStatus);
        if (!res?.ok) {
          setPosts((prev) =>
            prev.map((post) =>
              post.id === id ? { ...post, status: targetStatus } : post,
            ),
          );
          toast.error('오류가 발생했어요. 다시 시도해 주세요.');
        } else {
          const message =
            changeStatus === 'published'
              ? '게시글이 발행되었습니다.'
              : '게시글 발행이 취소되었습니다.';
          toast.success('게시글 상태가 업데이트되었습니다.');
        }
      } catch (e) {
        console.error(e);
      }

      handleSetPendingFlag(id, false);
    },
    [posts, handleSetPendingFlag],
  );

  const onDeletePost = useCallback(
    async (id: number) => {
      handleSetPendingFlag(id, true);
      setPosts((prev) => prev.filter((post) => post.id !== id));

      try {
        const res = await deletePost(id);
        if (!res?.ok) {
          setPosts(posts);
          toast.error('삭제에 실패했어요. 다시 시도해 주세요.');
        } else {
          toast.success('게시글이 삭제되었습니다.');
        }
      } catch (e) {
        console.error(e);
      }

      handleSetPendingFlag(id, false);
    },
    [posts, handleSetPendingFlag],
  );

  if (posts.length <= 0)
    return (
      <div className="text-muted-foreground pt-24 text-center text-xl font-semibold">
        내 작성한 포스트가 없어요 😅
      </div>
    );

  return (
    <div className="mt-2 divide-y rounded-md border">
      {posts.map((post) => (
        <MyPostItem
          key={post.id}
          post={post}
          disabled={pending.has(post.id)}
          onToggleStatus={onToggleStatus}
          onDeletePost={onDeletePost}
        />
      ))}
    </div>
  );
}
