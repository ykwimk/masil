import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/data';
import { sanitizeHtmlFragment } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const { post } = await getPostById(id);

  if (!post) return { title: '게시물을 찾을 수 없어요' };

  return {
    title: `${post.title} | 마실`,
    description: post.description,
    openGraph: {
      title: `${post.title} | 마실`,
      description: post.description,
      images: ['/og-image.png'],
      type: 'article',
    },
  };
}

export default async function PostDetailPage(props: PageProps) {
  const { id } = await props.params;
  const { post } = await getPostById(id);

  if (!post) return notFound();

  return (
    <div className="bg-white">
      <section className="container pt-24 pb-6 md:pt-32">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span key={tag} className="badge">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {post.title}
        </h1>
        <div className="text-muted-foreground mt-2 text-sm">
          by. {post.nickname}
        </div>
      </section>
      <section className="border-t">
        <div className="container py-8">
          <article className="prose-custom">
            <p className="text-foreground/80">{post.description}</p>
            {post.content ? (
              <div
                className="prose-custom mt-4"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlFragment(post.content),
                }}
              />
            ) : (
              <p className="text-foreground/70">본문 콘텐츠가 아직 없습니다.</p>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
