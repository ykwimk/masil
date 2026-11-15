// 3단계에서 읽기 화면을 만들기 전까지 보여주는 화면
export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="font-hakgyoansimMulgyeol text-primary text-4xl font-bold">
        마실
      </h1>
      <p className="text-muted-foreground">새로운 마실을 준비하고 있어요.</p>
    </main>
  );
}
