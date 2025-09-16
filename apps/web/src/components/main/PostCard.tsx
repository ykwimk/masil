import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    description: string;
    nickname: string;
    tags: string[];
  };
}
export function PostCard({ post }: PostCardProps) {
  return (
    <article key={post.id} className="masonry-item">
      <Card className="hover:border-primary/30 transition-colors">
        <CardContent>
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="badge">
                #{t}
              </span>
            ))}
          </div>
          <h3 className="text-lg leading-snug font-semibold">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            {post.description}
          </p>
          <div className="text-muted-foreground mt-3 text-xs">
            by. {post.nickname}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
