import { TAGS } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="bg-background">
      <div className="container py-8 md:py-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              오늘의 마케팅 인사이트
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              관리자와 에디터들이 올린 글이 핀보드 형식으로 모여요.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <span key={tag} className="badge">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
