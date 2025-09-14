import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createPost } from '@/app/editor/actions';
import { Card, CardContent } from '@/components/ui/card';
import { PostEditorForm } from '@/components/editor/PostEditorForm';

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 'user';

  if (!session?.user?.email || !['admin', 'editor'].includes(role)) {
    return redirect('/login?callbackUrl=%2Feditor%2Fnew');
  }

  return (
    <div className="bg-white">
      <section className="container pt-24 pb-16 md:pt-32">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          새 글 작성
        </h1>
        <p className="text-muted-foreground mt-2 mb-6">
          제목, 태그, 컨텐츠를 입력해 초안으로 저장하거나 발행할 수 있어요.
        </p>
        <Card>
          <CardContent className="p-6">
            <PostEditorForm action={createPost} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
