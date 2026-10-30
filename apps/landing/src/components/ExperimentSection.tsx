import Image from 'next/image';

const process = ['주제 선정', '연사 섭외', '콘텐츠 제작', '세미나 진행'];

export default function ExperimentSection() {
  return (
    <section
      id="experiment"
      aria-labelledby="experiment-heading"
      className="scroll-mt-[72px] bg-[var(--landing-surface)] py-[clamp(88px,12vw,176px)] text-[var(--landing-foreground)] max-[560px]:py-24"
    >
      <div className="landing-container grid grid-cols-2 items-center gap-[clamp(48px,9vw,118px)] max-[920px]:grid-cols-1">
        <div className="relative grid min-h-[520px] place-items-center max-[920px]:min-h-0">
          <div
            aria-hidden="true"
            className="absolute aspect-square w-[min(92%,520px)] rounded-full border border-[var(--landing-border)]"
          />
          <Image
            src="/images/redesign/activity/img-community-cutout.png"
            alt="산책하며 음료를 든 사람으로 표현한 마실 커뮤니티 활동 일러스트"
            width={500}
            height={500}
            sizes="(max-width: 920px) 90vw, 500px"
            className="relative z-10 h-auto w-[min(90%,500px)]"
          />
        </div>

        <div>
          <p className="mb-5 font-mono text-[11px] font-semibold tracking-[0.13em] text-[var(--landing-accent)] uppercase">
            First Experiment · Masil 01
          </p>
          <h2
            id="experiment-heading"
            className="font-pretendard text-[clamp(34px,3vw,58px)] leading-[1.22] font-semibold tracking-[-0.025em] break-keep [line-break:strict] max-[560px]:text-[clamp(31px,9vw,42px)]"
          >
            좋은 대화를
            <br />
            직접 무대로 옮겼습니다.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,21px)] leading-[1.65] break-keep text-[var(--landing-muted)] [line-break:strict]">
            첫 실험은 하이아웃풋클럽(HOC) 마케터 와니 님과 함께한 연사 세미나
            기획이었습니다. 정기 온·오프라인 모임에서 인사이트와 실무·커리어
            고민을 나누고, 주제 선정부터 연사 섭외, 카드뉴스·릴스·스레드 등의
            홍보 콘텐츠 제작, 세미나 진행까지 모든 과정을 실무자들이 직접
            실행했습니다.
          </p>

          <ol
            className="mt-12 border-t border-[var(--landing-border)]"
            aria-label="마실 1기 세미나 과정"
          >
            {process.map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[54px_1fr] items-baseline gap-4 border-b border-[var(--landing-border)] py-[18px] max-[560px]:grid-cols-[42px_1fr]"
              >
                <span className="font-mono text-xs text-[var(--landing-muted)] tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-lg font-medium">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
