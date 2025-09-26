import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { id, title, description, nickname, tags } = post;

  return (
    <li key={id} className="masonry-item">
      <Card className="hover:border-primary/30 transition-colors">
        <CardContent>
          <Link href={`/posts/${id}`}>
            <h3 className="text-lg leading-snug font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
            <div className="text-muted-foreground mt-3 text-xs">
              by. {nickname}
            </div>
          </Link>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="badge">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
