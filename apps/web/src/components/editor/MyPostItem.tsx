import Link from 'next/link';
import { Post } from '@/types';
import { Button } from '@/components/ui/button';

interface MyPostItemProps {
  post: Pick<Post, 'id' | 'title' | 'created_at' | 'status'>;
  disabled: boolean;
  onToggleStatus: (id: number) => void;
  onDeletePost: (id: number) => void;
}

export default function MyPostItem({
  post,
  disabled,
  onToggleStatus,
  onDeletePost,
}: MyPostItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3">
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{post.title}</div>
        <div className="text-muted-foreground mt-0.5 text-xs">
          {post.created_at ? new Date(post.created_at).toLocaleString() : ''}
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
      {post.status === 'published' ? (
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          disabled={disabled}
          onClick={() => onToggleStatus(post.id)}
        >
          발행 취소
        </Button>
      ) : (
        <Button
          type="button"
          className="cursor-pointer"
          disabled={disabled}
          onClick={() => onToggleStatus(post.id)}
        >
          발행하기
        </Button>
      )}
      <Button
        asChild={post.status !== 'published'}
        variant="outline"
        className="cursor-pointer"
        disabled={post.status === 'published' || disabled}
      >
        <Link href={`/editor/${post.id}`}>수정</Link>
      </Button>
      <Button
        type="button"
        variant="destructive"
        className="cursor-pointer"
        disabled={disabled}
        onClick={() => onDeletePost(post.id)}
      >
        삭제
      </Button>
    </div>
  );
}
