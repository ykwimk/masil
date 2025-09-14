import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function EditorPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white">
      <section className="container pt-24 pb-16 md:pt-32">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          에디터
        </h1>
        <p className="text-muted-foreground mt-2">
          {session?.user?.email} / role: {session?.user?.role ?? 'user'}
        </p>
        <div className="mt-6">
          여기서 글을 작성/수정할 수 있도록 확장할 예정입니다.
        </div>
      </section>
    </div>
  );
}
