import WhyNarrative from './WhyNarrative';

export default function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="scroll-mt-[72px] bg-[color-mix(in_oklch,var(--landing-ink)_72%,black)] py-[clamp(88px,12vw,176px)] text-[var(--landing-foreground)] max-[560px]:py-24"
    >
      <div className="landing-container">
        <div className="mx-auto w-full max-w-[760px] text-center">
          <p className="mb-5 font-mono text-[11px] font-semibold tracking-[0.13em] text-[var(--landing-accent)] uppercase">
            Why Masil
          </p>
          <h2
            id="why-heading"
            className="font-pretendard text-[clamp(34px,4vw,58px)] leading-[1.22] font-semibold tracking-[-0.025em] break-keep [line-break:strict] max-[560px]:text-[clamp(31px,9vw,42px)]"
          >
            혼자 잘하는 것보다,
            <br />
            함께 오래 성장하는 방법.
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,21px)] leading-[1.65] break-keep text-[var(--landing-muted)] [line-break:strict]">
            ‘마실’은 이웃집에 가볍게 놀러 가듯, 마케터가 솔직한 경험을 나누고
            다음 시도를 시작하는 커뮤니티입니다.
          </p>
        </div>

        <WhyNarrative />
      </div>
    </section>
  );
}
