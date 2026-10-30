import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function JoinSection() {
  return (
    <section
      id="join"
      aria-labelledby="join-heading"
      className="grid min-h-[78svh] scroll-mt-[72px] place-items-center bg-[color-mix(in_oklch,var(--landing-ink)_84%,var(--landing-surface))] py-[clamp(96px,12vw,168px)] text-center text-[var(--landing-foreground)]"
    >
      <div className="landing-container">
        <div className="mx-auto w-full max-w-[720px]">
          <p className="mb-5 font-mono text-[11px] font-semibold tracking-[0.13em] text-[var(--landing-accent)] uppercase">
            Join Masil
          </p>
          <h2
            id="join-heading"
            className="font-pretendard text-[clamp(34px,4vw,58px)] leading-[1.22] font-semibold tracking-[-0.025em] break-keep [line-break:strict] max-[560px]:text-[clamp(31px,9vw,42px)]"
          >
            다음 시도를,
            <br />
            혼자가 아닌 함께.
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,21px)] leading-[1.65] break-keep text-[var(--landing-muted)] [line-break:strict]">
            1~5년 차 마케터, 커리어를 고민하는 마케터, 실무 고민을 나누고 성장의
            실마리를 얻고 싶은 분을 기다립니다.
          </p>

          <div className="mt-[34px] flex justify-center">
            <Button
              asChild
              size="lg"
              className="min-h-12 rounded-full border border-[var(--landing-accent)] bg-[var(--landing-accent)] px-6 text-[15px] font-semibold text-[var(--landing-ink)] shadow-none transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklch,var(--landing-accent)_84%,white)] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Link
                href="https://event-us.kr/masilcommunity/event/105246"
                target="_blank"
                rel="noopener noreferrer"
              >
                세미나 참여 신청 <span aria-hidden="true">↗</span>
                <span className="sr-only">새 창에서 열림</span>
              </Link>
            </Button>
          </div>

          <nav
            aria-label="마실 연락처와 소셜 채널"
            className="mt-[30px] flex flex-wrap justify-center gap-x-6 gap-y-2.5"
          >
            <a
              href="mailto:masilcommunity@gmail.com"
              className="inline-flex min-h-11 items-center rounded-sm text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-foreground)] focus-visible:text-[var(--landing-foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--landing-accent)]"
            >
              masilcommunity@gmail.com
            </a>
            <a
              href="https://instagram.com/masil_community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-sm text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-foreground)] focus-visible:text-[var(--landing-foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--landing-accent)]"
            >
              Instagram <span aria-hidden="true">↗</span>
              <span className="sr-only">새 창에서 열림</span>
            </a>
            <a
              href="https://www.youtube.com/@masil_community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-sm text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-foreground)] focus-visible:text-[var(--landing-foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--landing-accent)]"
            >
              YouTube <span aria-hidden="true">↗</span>
              <span className="sr-only">새 창에서 열림</span>
            </a>
          </nav>

          <div
            aria-hidden="true"
            className="mx-auto mt-[52px] aspect-square w-[clamp(100px,9vw,124px)]"
          >
            <Image
              src="/images/redesign/brand/masil-clover-cutout.png"
              alt=""
              width={500}
              height={500}
              sizes="124px"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
