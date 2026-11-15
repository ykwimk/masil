import Link from 'next/link';
import { Logo } from '@masil/ui/components/Logo';
import { HeroArt } from '@/components/HeroArt';
import { Wave } from '@/components/Wave';

// 홈 첫 화면. 3단계에서 아래에 대표 글과 '더 읽어볼 이야기'가 붙는다.
export default function HomePage() {
  return (
    <>
      <header className="border-line border-b px-6 max-[359px]:px-5">
        <div className="mx-auto flex min-h-16 max-w-(--container-page) items-center lg:min-h-18">
          <Link href="/" className="py-2">
            <Logo className="text-[28px] leading-none" />
          </Link>
        </div>
      </header>

      <main className="px-6 max-[359px]:px-5">
        {/* 휴대폰: 그림을 제목 옆에 작게 둬서 대표 글이 첫 화면 안에 들어오게 한다 */}
        <section className="mx-auto grid max-w-(--container-page) grid-cols-[minmax(0,1fr)_104px] items-start gap-x-3 gap-y-5 pt-10 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-x-16 lg:gap-y-7 lg:pt-14">
          {/* PC: 그림이 두 행에 걸치므로 제목은 위 행 아래쪽, 소개는 아래 행 위쪽에 붙인다 */}
          <h1 className="text-display lg:text-display-lg font-semibold tracking-[-0.03em] lg:self-end">
            일과 삶 사이,
            <br />
            잠깐{' '}
            <span className="font-brand text-accent-ink relative inline-block font-bold">
              마실
              <Wave className="absolute -bottom-[0.2em] -left-[0.04em] h-[0.26em] w-[calc(100%+0.08em)]" />
            </span>
            .
          </h1>
          <HeroArt className="w-full lg:row-span-2 lg:max-w-[440px] lg:justify-self-end" />
          <p className="text-lead text-muted lg:text-lead-lg col-span-2 lg:col-span-1 lg:max-w-[30em] lg:self-start">
            에디터가 고른 일과 커리어, 사람들의 이야기를 천천히 읽어요.
          </p>
        </section>

        <p className="text-lead text-muted lg:text-lead-lg mx-auto max-w-(--container-page) pt-14 pb-24 lg:pt-20 lg:pb-40">
          새로운 이야기를 준비하고 있어요.
        </p>
      </main>
    </>
  );
}
