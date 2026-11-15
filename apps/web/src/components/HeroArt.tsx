// shortcut: 임시 캐릭터 그림(자리와 크기를 정하려고 그림). 실제 그림이 나오면 이 파일을 바꾼다.
import { ROUGH_FILTER } from './Wave';

// 선은 그림 크기와 상관없이 같은 굵기(휴대폰 2px, PC 3px)
function Line({ d }: { d: string }) {
  return <path d={d} vectorEffect="non-scaling-stroke" />;
}

const lineGroup = {
  className: 'fill-none stroke-foreground stroke-2 lg:stroke-3',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  filter: ROUGH_FILTER,
} as const;

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 300"
      aria-hidden="true"
      focusable="false"
      className={`overflow-visible ${className ?? ''}`}
    >
      {/* 반달: 퇴근길에 걸린 졸린 달 */}
      <g transform="translate(200 178.4) scale(1.222)">
        <path
          d="M12 92 a78 78 0 0 1 156 0 Z"
          className="fill-character-yellow"
        />
        <g {...lineGroup}>
          <Line d="M60 64 q9 7 18 0" />
          <Line d="M100 64 q9 7 18 0" />
          <Line d="M84 78 q5 5 10 0" />
          <Line d="M2 96 q44 -6 88 0 t88 0" />
        </g>
      </g>

      {/* 문 친구: 이웃집에 놀러 가는 아치 */}
      <g transform="translate(64 40) scale(1.05)">
        <path
          d="M24 186 V80 a52 52 0 0 1 104 0 V186 Z"
          className="fill-accent"
        />
        <g {...lineGroup}>
          <Line d="M30 182 V84 a49 49 0 0 1 98 -2 V182" />
          <Line d="M58 118 q14 13 30 -1" />
          <Line d="M58 186 q-6 10 -18 9" />
          <Line d="M100 186 q8 9 20 6" />
          <Line d="M128 118 q20 -6 22 -30" />
          <Line d="M146 84 q2 -8 10 -6" />
        </g>
        <circle cx="62" cy="98" r="4.5" className="fill-foreground" />
        <circle cx="90" cy="96" r="4.5" className="fill-foreground" />
        <circle cx="112" cy="146" r="5" className="fill-foreground" />
      </g>

      {/* 말풍선: 수다 떠는 친구 */}
      <g transform="translate(254 30)">
        <path
          d="M22 8 h104 a14 14 0 0 1 14 14 v58 a14 14 0 0 1 -14 14 h-58 l-28 26 l5 -26 h-23 a14 14 0 0 1 -14 -14 v-58 a14 14 0 0 1 14 -14 Z"
          className="fill-character-coral"
        />
        <g {...lineGroup}>
          <Line d="M56 40 v12" />
          <Line d="M90 38 v12" />
          <Line d="M60 66 q14 14 28 -2" />
          <Line d="M126 -2 l9 -14" />
          <Line d="M140 12 l16 -6" />
        </g>
      </g>

      {/* 세모: 놀란 친구 */}
      <g transform="translate(10 176.2) scale(0.767)">
        <path
          d="M60 14 L112 122 H8 Z"
          strokeWidth={10}
          strokeLinejoin="round"
          className="fill-character-pink stroke-character-pink"
        />
        <g {...lineGroup}>
          <Line d="M60 14 q-8 -10 2 -14 q10 -2 4 8" />
          <Line d="M38 124 l-4 8" />
          <Line d="M84 124 l4 8" />
          <Line d="M54 98 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" />
        </g>
        <circle cx="48" cy="80" r="4" className="fill-foreground" />
        <circle cx="72" cy="80" r="4" className="fill-foreground" />
      </g>
    </svg>
  );
}
