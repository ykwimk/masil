'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroAmbient.module.css';

const fieldDepths = [
  { x: 6, y: 4, direction: 1 },
  { x: 13, y: 8, direction: -1 },
  { x: 22, y: 14, direction: 1 },
];

export default function HeroAmbient() {
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ambient = ambientRef.current;
    const hero = ambient?.closest<HTMLElement>('section');
    if (!ambient || !hero) return;

    const fields = Array.from(
      ambient.querySelectorAll<HTMLElement>('[data-hero-field]'),
    );
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let isInView = false;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resetParallax = () => {
      fields.forEach((field) => {
        field.style.setProperty('--field-parallax-x', '0px');
        field.style.setProperty('--field-parallax-y', '0px');
      });
    };

    const updateActivity = () => {
      const isActive = isInView && !document.hidden && !reducedMotion.matches;
      ambient.dataset.active = String(isActive);

      if (!isActive) {
        cancelAnimationFrame(frame);
        frame = 0;
        resetParallax();
      }
    };

    const paintParallax = () => {
      const rect = hero.getBoundingClientRect();
      const normalizedX = Math.max(
        -1,
        Math.min(1, ((pointerX - rect.left) / rect.width - 0.5) * 2),
      );
      const normalizedY = Math.max(
        -1,
        Math.min(1, ((pointerY - rect.top) / rect.height - 0.5) * 2),
      );

      fields.forEach((field, index) => {
        const depth = fieldDepths[index];
        field.style.setProperty(
          '--field-parallax-x',
          `${(normalizedX * depth.x * depth.direction).toFixed(2)}px`,
        );
        field.style.setProperty(
          '--field-parallax-y',
          `${(normalizedY * depth.y * depth.direction).toFixed(2)}px`,
        );
      });

      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (
        ambient.dataset.active !== 'true' ||
        !finePointer.matches ||
        reducedMotion.matches
      ) {
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paintParallax);
    };

    const onPointerLeave = () => resetParallax();
    const onPreferenceChange = () => {
      if (!finePointer.matches || reducedMotion.matches) resetParallax();
      updateActivity();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        updateActivity();
      },
      { threshold: 0.02 },
    );

    observer.observe(hero);
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', updateActivity);
    reducedMotion.addEventListener('change', onPreferenceChange);
    finePointer.addEventListener('change', onPreferenceChange);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', updateActivity);
      reducedMotion.removeEventListener('change', onPreferenceChange);
      finePointer.removeEventListener('change', onPreferenceChange);
    };
  }, []);

  return (
    <div
      ref={ambientRef}
      className={styles.ambient}
      data-active="false"
      aria-hidden="true"
    >
      <span className={`${styles.field} ${styles.fieldA}`} data-hero-field />
      <span className={`${styles.field} ${styles.fieldB}`} data-hero-field />
      <span className={`${styles.field} ${styles.fieldC}`} data-hero-field />
      <span className={styles.grain} />
    </div>
  );
}
