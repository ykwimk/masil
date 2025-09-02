import { PostCard } from './PostCard';
import { POSTS } from '@/lib/mock';

export function PostsSection() {
  return (
    <div className="masonry">
      {POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
