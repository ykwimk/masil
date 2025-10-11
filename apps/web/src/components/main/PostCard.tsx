import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const { id, title, description, nickname, tags, card_image_url } = post;

  return (
    <li key={id} className="masonry-item">
      <Card className="group hover:border-primary/40 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <Link href={`/magazine/${id}`} className="flex h-full flex-col">
          {card_image_url && (
            <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={card_image_url as string}
                alt={title}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                quality={90}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={priority}
              />
            </div>
          )}
          <CardContent className="flex flex-1 flex-col gap-3 px-5 py-5">
            <h3 className="text-lg leading-snug font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
            <div className="mt-auto">
              <div className="text-muted-foreground text-xs">
                by. {nickname}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="badge">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </li>
  );
}
