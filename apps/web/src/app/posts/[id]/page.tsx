import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { POSTS } from '@/lib/mock';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const post = POSTS.find((p) => p.id === id);
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

export default async function PostDetail(props: PageProps) {
  const { id } = await props.params;
  const post = POSTS.find((p) => p.id === id);
  if (!post) return notFound();

  return (
    <div className="bg-white">
      <section className="container pt-24 pb-6 md:pt-32">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="badge">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {post.title}
        </h1>
        <div className="text-muted-foreground mt-2 text-sm">
          by. {post.author}
        </div>
      </section>
      <section className="border-t">
        <div className="container py-8">
          <article className="prose-custom">
            <p className="text-foreground/80">{post.description}</p>
            <p className="text-foreground/70">
              본문 콘텐츠는 곧 제공될 예정입니다. 데이터 소스 연결 후 실제 글
              내용과 이미지를 보여줍니다.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
