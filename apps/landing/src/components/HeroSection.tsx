import Link from 'next/link';
import HeroAmbient from './HeroAmbient';
import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate grid min-h-[100svh] scroll-mt-[72px] place-items-center overflow-hidden bg-[var(--landing-ink)] pt-[132px] pb-24 text-center text-[var(--landing-foreground)] max-[920px]:min-h-[92svh] max-[920px]:pt-[126px]"
    >
      <HeroAmbient />

      <div className="landing-container relative z-10">
        <div className="mx-auto w-full max-w-[960px]">
          <p className="mb-5 font-mono text-[11px] font-semibold tracking-[0.13em] text-[var(--landing-accent)] uppercase">
            Marketer Community · Seoul
          </p>
          <h1
            id="hero-heading"
            className="font-pretendard mx-auto max-w-[13ch] text-[clamp(46px,6.4vw,92px)] leading-[1.16] font-semibold tracking-[-0.035em] break-keep max-[560px]:max-w-[9.5ch] max-[560px]:text-[clamp(42px,13vw,58px)]"
          >
            실패를 나누고,
            <br />
            성장을 함께하는
            <br />
            마케터 커뮤니티{' '}
            <span className="font-hakgyoansimMulgyeol font-bold tracking-[-0.02em] text-[var(--landing-accent)]">
              ‘마실’
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-[34ch] text-[clamp(17px,1.6vw,21px)] leading-[1.65] break-keep text-[var(--landing-muted)] max-[560px]:max-w-[20ch]">
            마케팅에 진심인 마실 멤버들의 첫 번째 실험,
            <br />
            연사 초청 세미나에 여러분을 초대합니다.
          </p>

          <div className="mt-9 flex justify-center">
            <Button
              asChild
              size="lg"
              className="min-h-12 rounded-full border border-[var(--landing-accent)] bg-[var(--landing-accent)] px-6 text-[15px] font-semibold text-[var(--landing-ink)] shadow-none transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--landing-accent)_84%,white)] active:translate-y-0"
            >
              <Link
                href="https://event-us.kr/masilcommunity/event/105246"
                target="_blank"
                rel="noopener noreferrer"
              >
                세미나 참가하기 <span aria-hidden="true">↗</span>
              </Link>
            </Button>
          </div>

          <p className="mt-[18px] text-[13px] break-keep text-[var(--landing-muted)]">
            가볍게 와서, 진심을 나누고, 다시 해보는 힘을 얻는 곳
          </p>
        </div>
      </div>
    </section>
  );
}
