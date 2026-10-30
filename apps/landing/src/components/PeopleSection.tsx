import Image from 'next/image';
import Link from 'next/link';

const people = [
  {
    name: '김여규',
    role: '브랜드 커뮤니티 마케터',
    label: '모임장',
    description:
      '마케터들이 자신의 이야기를 더 가치 있게 말할 수 있도록, 그 시작을 함께 하고 싶었습니다.',
    image: '/images/redesign/people/img-profile1-cutout.png',
    href: 'https://app.notion.com/p/kacykim/22866610840281af82a0eccad1648265?source=copy_link',
  },
  {
    name: '권정하',
    role: '마케터',
    description:
      '생각은 실행으로, 실행은 결과로 증명하는 마케터입니다. 마음껏 시도하며 반짝이는 결과들을 만들고 있어요.',
    image: '/images/redesign/people/img-profile5-cutout.png',
    href: 'https://purrfect-teller-734.notion.site/1fb15ca40074802eab0cc60ca91de1ec?pvs=4',
  },
  {
    name: '김주은',
    role: '콘텐츠 마케터',
    description: '기록하고 해석하며, 진심이 닿는 마케팅을 만듭니다.',
    image: '/images/redesign/people/img-profile3-cutout.png',
    href: 'https://heisley.notion.site/1facc1fde979801abcefe3424a4a0f09?pvs=4',
  },
  {
    name: '이지영',
    role: '콘텐츠 마케터',
    description: '매력을 디자인하는 챠밍아티스트입니다.',
    image: '/images/redesign/people/img-profile2-cutout.png',
    href: 'https://heisley.notion.site/1facc1fde9798051a012d1a35f7ca4eb?pvs=4',
  },
  {
    name: '김도형',
    role: '콘텐츠 마케터',
    description: '분석력 있는 Creative를 지향하는 마케터 입니다.',
    image: '/images/redesign/people/img-profile4-cutout.png',
    href: 'https://heisley.notion.site/1facc1fde979804d9755e3b5160f9f20?pvs=4',
  },
] as const;

export default function PeopleSection() {
  return (
    <section
      id="people"
      aria-labelledby="people-heading"
      className="font-pretendard scroll-mt-[72px] bg-[color-mix(in_oklch,var(--landing-surface)_100%,var(--landing-accent)_3%)] py-[clamp(88px,12vw,176px)] text-[var(--landing-foreground)] max-[560px]:py-24"
    >
      <div className="landing-container">
        <div className="mx-auto w-full max-w-[760px] text-center">
          <p className="mb-5 font-mono text-[11px] font-semibold tracking-[0.13em] text-[var(--landing-accent)] uppercase">
            People · Masil 01
          </p>
          <h2
            id="people-heading"
            className="text-[clamp(34px,4vw,58px)] leading-[1.22] font-semibold tracking-[-0.025em] break-keep [line-break:strict] max-[560px]:text-[clamp(31px,9vw,42px)]"
          >
            첫 번째 도전을 함께 만든
            <br />
            다섯 명의 마케터
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,21px)] leading-[1.65] break-keep text-[var(--landing-muted)] [line-break:strict]">
            서로 다른 전문성과 시선으로 마실의 첫 실험을 완성했습니다. 각 멤버를
            눌러 더 자세한 이야기를 만나보세요.
          </p>
        </div>

        <ul className="mt-[clamp(56px,8vw,96px)] grid grid-cols-5 items-start gap-[26px] max-[920px]:grid-cols-2 max-[920px]:gap-x-[18px] max-[920px]:gap-y-[34px] max-[460px]:mx-auto max-[460px]:max-w-[280px] max-[460px]:grid-cols-1">
          {people.map((person) => (
            <li
              key={person.name}
              className="min-w-0 max-[920px]:w-full max-[920px]:last:col-span-2 max-[920px]:last:w-[calc(50%_-_9px)] max-[920px]:last:justify-self-center max-[460px]:last:col-span-1 max-[460px]:last:w-full"
            >
              <Link
                href={person.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block min-h-11 text-inherit no-underline focus-visible:outline-none"
              >
                <div className="grid aspect-square place-items-center overflow-hidden rounded-full border border-[color-mix(in_oklch,var(--landing-foreground)_72%,var(--landing-border))] bg-[var(--landing-foreground)] transition-[border-color,background-color] duration-200 group-hover:border-[color-mix(in_oklch,var(--landing-accent)_34%,var(--landing-foreground))] group-hover:bg-[color-mix(in_oklch,var(--landing-foreground)_94%,var(--landing-accent))] group-focus-visible:border-[color-mix(in_oklch,var(--landing-accent)_34%,var(--landing-foreground))] group-focus-visible:bg-[color-mix(in_oklch,var(--landing-foreground)_94%,var(--landing-accent))] group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[var(--landing-accent)] motion-reduce:transition-none">
                  <Image
                    src={person.image}
                    alt={`${person.name} 프로필 일러스트`}
                    width={500}
                    height={500}
                    sizes="(max-width: 460px) 280px, (max-width: 920px) calc(50vw - 38px), 210px"
                    className="h-[92%] w-[92%] object-contain object-center transition-transform duration-200 group-hover:-translate-y-[3px] group-focus-visible:-translate-y-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0"
                  />
                </div>

                <div className="pt-[18px] text-center break-keep [line-break:strict]">
                  <h3 className="text-[19px] leading-snug font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[5px] group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-[5px]">
                    {person.name}
                    <span className="sr-only">
                      {' '}
                      소개 페이지 (새 창에서 열림)
                    </span>
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--landing-muted)]">
                    {person.role}
                    {'label' in person && ` · ${person.label}`}
                  </p>
                  <p className="mt-3 text-sm leading-[1.6] text-[color-mix(in_oklch,var(--landing-muted)_82%,var(--landing-foreground))] max-[560px]:text-[13px]">
                    {person.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
