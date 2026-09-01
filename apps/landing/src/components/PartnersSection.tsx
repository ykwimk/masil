import Image from 'next/image';
import Link from 'next/link';
import styles from './PartnersSection.module.css';

const partners = [
  {
    name: '이지스퍼블리싱',
    logo: '/images/redesign/partners/partners-logo1.png',
    href: 'https://www.easyspub.co.kr',
  },
  {
    name: '달샘',
    logo: '/images/redesign/partners/partners-logo3.png',
    href: 'https://www.instagram.com/dalsam2023',
  },
  {
    name: '위올워크',
    logo: '/images/redesign/partners/partners-logo4.png',
    href: 'https://www.weallwork.kr',
  },
  {
    name: 'GroupBy',
    logo: '/images/redesign/partners/partners-logo2.svg',
    href: 'https://groupby.kr',
  },
] as const;

export default function PartnersSection() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="font-pretendard scroll-mt-[72px] bg-[var(--landing-ink)] py-[clamp(88px,12vw,176px)] text-[var(--landing-foreground)] max-[560px]:py-24"
    >
      <div className="landing-container">
        <div className="mx-auto w-full max-w-[760px] text-center">
          <p className="mb-5 font-mono text-[11px] font-semibold tracking-[0.13em] text-[var(--landing-accent)] uppercase">
            Partners
          </p>
          <h2
            id="partners-heading"
            className="text-[clamp(34px,4vw,58px)] leading-[1.22] font-semibold tracking-[-0.025em] break-keep [line-break:strict] max-[560px]:text-[clamp(31px,9vw,42px)]"
          >
            마실과 함께합니다
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,21px)] leading-[1.65] break-keep text-[var(--landing-muted)] [line-break:strict]">
            마케터의 배움과 실행을 응원하는 네 파트너입니다.
          </p>
        </div>

        <div
          className={styles.marquee}
          role="group"
          aria-label="마실 파트너 로고"
        >
          <div className={styles.track}>
            <ul className={styles.set}>
              {partners.map((partner) => (
                <li key={partner.name}>
                  <Link
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.tile} ${styles.link}`}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={300}
                      height={100}
                      sizes="(max-width: 720px) 50vw, 286px"
                      className={styles.logo}
                    />
                    <span className="sr-only">새 창에서 열림</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className={`${styles.set} ${styles.duplicate}`}
              aria-hidden="true"
            >
              {partners.map((partner) => (
                <span className={styles.tile} key={partner.name}>
                  <Image
                    src={partner.logo}
                    alt=""
                    width={300}
                    height={100}
                    sizes="286px"
                    className={styles.logo}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
