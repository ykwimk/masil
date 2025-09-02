import { PostCard } from './PostCard';
import { FEEDS } from '@/lib/mock';

export function FeedSection() {
  return (
    <div className="masonry">
      {FEEDS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
