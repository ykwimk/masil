import { POSTS } from '@/lib/mock';
import { PostCard } from './PostCard';

export function PostsSection({ selectedTag }: { selectedTag?: string }) {
  const filteredPosts = selectedTag
    ? POSTS.filter((p) => p.tags.includes(selectedTag))
    : POSTS;
  return (
    <div className="masonry">
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {filteredPosts.length === 0 && (
        <div className="text-muted-foreground">
          해당 태그의 게시물이 없어요.
        </div>
      )}
    </div>
  );
}
