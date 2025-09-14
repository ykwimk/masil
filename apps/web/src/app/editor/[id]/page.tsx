import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { PostEditorForm } from '@/components/editor/PostEditorForm';
import { getPostEditorById, updatePost } from '@/app/editor/actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage(props: PageProps) {
  const { id } = await props.params;
  const post = await getPostEditorById(id);

  if (!post) return notFound();

  return (
    <div className="bg-white">
      <section className="container pt-24 pb-16 md:pt-32">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          글 수정
        </h1>
        <p className="text-muted-foreground mt-2 mb-6">
          제목, 태그, 컨텐츠를 수정한 뒤 저장하세요.
        </p>
        <Card>
          <CardContent className="p-6">
            <PostEditorForm
              id={post.id}
              initialValues={{
                title: post.title,
                description: post.description ?? '',
                tags: post.tags ?? [],
                content: post.content ?? '',
              }}
              submitLabel="수정 저장"
              isShowPublishToggle={false}
              onAction={updatePost}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
