// 손그림 장식은 물결 밑줄 하나만 쓴다(PRODUCT.md 디자인 절).
export const ROUGH_FILTER = 'url(#masil-rough)';

// 선을 손으로 그린 것처럼 살짝 흔드는 필터. layout에 한 번만 둔다.
export function RoughFilter() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute"
      aria-hidden="true"
      focusable="false"
    >
      {/* 물결 밑줄은 높이가 몇 px뿐이라 위아래 영역을 넉넉히 둬야 선이 잘리지 않는다 */}
      <filter id="masil-rough" x="-10%" y="-100%" width="120%" height="300%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.035"
          numOctaves={2}
          seed={7}
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={3.2}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

// 폭에 맞춰 늘어나도 선 굵기는 3px로 유지한다
export function Wave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 132 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3 8 q16 -7 32 -1 t32 0 t32 -1 t30 1"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={ROUGH_FILTER}
        className="stroke-accent-ink"
      />
    </svg>
  );
}
