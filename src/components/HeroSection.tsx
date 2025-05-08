'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';

export default function HeroSection() {
  return (
    <section className="leaf-pattern relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="from-secondary/70 to-background/95 absolute inset-0 z-0 bg-gradient-to-b"></div>

      <div className="z-10 container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
              마케터를 위한 커뮤니티
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 text-4xl leading-tight font-bold md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            마케팅, 혼자 하지 말고
            <br />
            <span className="text-primary">같이 마실 나가요</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            브랜딩, 퍼포먼스, 인사이트... 혼자 고민하던 마케터들을 위한 진짜
            마실.
            <br />
            함께 배우고, 나누고, 성장하는 커뮤니티입니다.
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-base"
            >
              <Link href="#join">마실 참여하기</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base"
            >
              <Link href="#about">더 알아보기</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="from-background absolute right-0 bottom-0 left-0 z-10 h-24 bg-gradient-to-t to-transparent"></div>
    </section>
  );
}
