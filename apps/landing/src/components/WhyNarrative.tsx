'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhyNarrative.module.css';

const narrative = [
  { before: '커리어의 ', key: '실패', after: '를 숨기지 않고 나눕니다.' },
  {
    before: '번아웃의 순간을 다시 해보는 ',
    key: '용기',
    after: '로 바꿉니다.',
  },
  {
    before: '실무의 고민을 혼자 두지 않고 ',
    key: '함께',
    after: ' 풉니다.',
  },
  {
    before: '작은 실행을 쌓아 오래가는 ',
    key: '성장',
    after: '을 만듭니다.',
  },
];

export default function WhyNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = Array.from(
      container.querySelectorAll<HTMLElement>('[data-focus-line]'),
    );
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isInView = false;
    let isListening = false;
    let frame = 0;

    const updateFocus = () => {
      frame = 0;
      if (!isInView || reducedMotion.matches || document.hidden) return;

      const target = window.innerHeight * 0.52;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      lines.forEach((line, index) => {
        const rect = line.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - target);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === nearestIndex ? current : nearestIndex,
      );
    };

    const requestFocusUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateFocus);
    };

    const stopListening = () => {
      if (!isListening) return;
      window.removeEventListener('scroll', requestFocusUpdate);
      window.removeEventListener('resize', requestFocusUpdate);
      cancelAnimationFrame(frame);
      frame = 0;
      isListening = false;
    };

    const syncListening = () => {
      const shouldListen =
        isInView && !reducedMotion.matches && !document.hidden;

      if (!shouldListen) {
        stopListening();
        return;
      }

      if (!isListening) {
        window.addEventListener('scroll', requestFocusUpdate, {
          passive: true,
        });
        window.addEventListener('resize', requestFocusUpdate);
        isListening = true;
      }

      requestFocusUpdate();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        syncListening();
      },
      { threshold: 0.05 },
    );

    observer.observe(container);
    document.addEventListener('visibilitychange', syncListening);
    reducedMotion.addEventListener('change', syncListening);

    return () => {
      stopListening();
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncListening);
      reducedMotion.removeEventListener('change', syncListening);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-[clamp(64px,9vw,112px)] w-full max-w-[880px]"
    >
      {narrative.map((line, index) => (
        <p
          key={line.key}
          data-focus-line
          data-active={index === activeIndex}
          className={styles.line}
        >
          {line.before}
          <span className={styles.key}>{line.key}</span>
          {line.after}
        </p>
      ))}
    </div>
  );
}
