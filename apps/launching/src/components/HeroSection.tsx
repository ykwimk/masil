'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black pt-16">
      <div className="gradient-bg absolute inset-0"></div>
      <div className="sm:md-28 z-10 container mx-auto mb-12 px-4 text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-3xl leading-tight font-bold text-white sm:mb-6 sm:text-4xl md:text-6xl">
            실패를 나누고,
            <br className="block md:hidden" /> 성장을 함께하는
            <br />
            <span className="text-primary">마케터 커뮤니티 ‘마실’</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-base text-white/80 sm:mb-8 sm:text-lg md:text-xl">
            마케팅에 진심인 마실 멤버들의 첫번째 실험,
            <br />
            <strong>연사 초청 세미나에 여러분을 초대합니다.</strong>
          </p>

          <motion.div
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
                세미나 참가하기
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
