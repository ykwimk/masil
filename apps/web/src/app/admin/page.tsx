import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white">
      <section className="container pt-24 pb-16 md:pt-32">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          관리 페이지 (Admin)
        </h1>
        <p className="text-muted-foreground mt-2">
          {session?.user?.email} / role: {session?.user?.role ?? 'user'}
        </p>
        <div className="mt-6">관리자 전용 영역입니다.</div>
      </section>
    </div>
  );
}
