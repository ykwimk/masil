import { Logo } from './shared/Logo';

const footerLinkClass =
  'inline-flex min-h-11 items-center rounded-sm text-sm text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-foreground)] focus-visible:text-[var(--landing-foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--landing-accent)]';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--landing-border)] bg-[color-mix(in_oklch,var(--landing-surface)_86%,var(--landing-ink))] py-[42px] text-[var(--landing-foreground)]">
      <div className="landing-container flex flex-wrap items-end justify-between gap-x-12 gap-y-8 max-[920px]:flex-col max-[920px]:items-start">
        <div>
          <Logo className="text-[var(--landing-accent)]" />
          <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed break-keep text-[var(--landing-muted)] [line-break:strict]">
            마케터들의 가벼운 마실길, 함께 배우고 성장하는 커뮤니티입니다.
          </p>
        </div>

        <div className="text-right max-[920px]:text-left">
          <nav
            aria-label="푸터 소셜 채널"
            className="flex flex-wrap justify-end gap-x-6 max-[920px]:justify-start"
          >
            <a
              href="https://instagram.com/masil_community"
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              Instagram <span aria-hidden="true">↗</span>
              <span className="sr-only">새 창에서 열림</span>
            </a>
            <a
              href="https://www.youtube.com/@masil_community"
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              YouTube <span aria-hidden="true">↗</span>
              <span className="sr-only">새 창에서 열림</span>
            </a>
          </nav>
          <div className="mt-2 space-y-1 text-[13px] text-[var(--landing-muted)]">
            <p>
              © {new Date().getFullYear()} 마실 커뮤니티. All rights reserved.
            </p>
            <p className="break-keep [line-break:strict]">
              실패를 나누고, 성장을 함께합니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
