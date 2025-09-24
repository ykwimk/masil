export async function HeroSection() {
  return (
    <section className="relative bg-black">
      <div className="gradient-bg absolute inset-0"></div>
      <div className="container pt-24 pb-14 md:pt-32 md:pb-24">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              오늘의 마케팅 인사이트
            </h1>
            <p className="mt-2 text-white/80">
              관리자와 에디터들이 올린 글이 핀보드 형식으로 모여요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
