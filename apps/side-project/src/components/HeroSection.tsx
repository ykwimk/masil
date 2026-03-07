'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export default function HeroSection() {
  const statTitleClassName =
    "relative inline-flex items-center px-0.5 text-primary transition-all duration-300 before:absolute before:inset-x-0 before:bottom-0.5 before:h-[0.38em] before:rounded-sm before:bg-white/10 before:opacity-100 before:blur-[0.5px] before:content-[''] sm:px-1 md:before:bottom-1 md:before:h-[0.45em] md:before:opacity-0 md:before:transition-all md:before:duration-300 md:group-hover:text-white md:group-hover:tracking-[0.02em] md:group-hover:before:opacity-100 md:group-focus-visible:text-white md:group-focus-visible:tracking-[0.02em] md:group-focus-visible:before:opacity-100";

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black">
      <div className="gradient-bg absolute inset-0"></div>
      <div className="sm:md-28 z-10 container mx-auto px-4 text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-3xl leading-tight font-bold text-white sm:mb-6 sm:text-4xl md:text-6xl">
            <br className="block md:hidden" />
            마음껏 실험하는
            <br />
            <span className="text-primary">사이드 프로젝트</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base text-white/80 sm:mb-8 sm:text-lg md:text-xl">
            새해 마실과 통하는 카피를 완성하세요.
            <br />
            직접 쓰고, 피드백 받고, 발행하며 결과물을 완성해요.
          </p>
          {/* <motion.div
            className="flex flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 py-5 text-sm sm:px-8 sm:py-6 sm:text-base"
            >
              <Link
                href="https://event-us.kr/masilcommunity/event/105246"
                target="_blank"
              >
                5주 동안 함께 달려요
              </Link>
            </Button>
          </motion.div> */}
          <motion.div
            className="stats-container mx-auto mt-20 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="https://www.notion.so/kacykim/2d066610840280e4bf4cfe982fdd4494?source=copy_link"
              target="_blank"
              className="group block h-full rounded-md outline-none"
            >
              <div className="stat-item">
                <div className="stat-value">
                  <span className={statTitleClassName}>About</span>
                </div>
                <div className="stat-label text-white/70">마실이란?</div>
              </div>
            </Link>
            <Link
              href="https://www.notion.so/kacykim/2d066610840280c8a568c43df50298d7?source=copy_link"
              target="_blank"
              className="group block h-full rounded-md outline-none"
            >
              <div className="stat-item">
                <div className="stat-value">
                  <span className={statTitleClassName}>History</span>
                </div>
                <div className="stat-label text-white/70">지난 실험들</div>
              </div>
            </Link>
            <Link
              href="https://www.notion.so/kacykim/2db666108402808d9dfee123ed893662?source=copy_link"
              target="_blank"
              className="group block h-full rounded-md outline-none"
            >
              <div className="stat-item line-none">
                <div className="stat-value">
                  <span className={statTitleClassName}>Partners</span>
                </div>
                <div className="stat-label text-white/70">
                  인터뷰 컨텐츠 결과
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
