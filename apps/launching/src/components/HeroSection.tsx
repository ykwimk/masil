'use client';

import { motion } from 'motion/react';
import WaitListForm from './WaitListForm';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black pt-16">
      <div className="gradient-bg absolute inset-0" />
      <div className="hero-grid" />
      <motion.div
        aria-hidden
        className="hero-orb from-primary/40 absolute top-24 -right-20 h-72 w-72 rounded-full bg-gradient-to-br to-white/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        aria-hidden
        className="hero-orb to-primary/30 absolute bottom-10 -left-16 h-80 w-80 rounded-full bg-gradient-to-tr from-white/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      />
      <div className="z-10 container mx-auto px-4 text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur sm:mb-6">
            <span className="bg-primary size-2 rounded-full" />
            COMING SOON
          </div>
          <h1 className="mb-4 text-4xl leading-tight font-bold text-white sm:mb-8 sm:text-5xl md:text-6xl">
            <span className="via-primary/60 to-primary bg-gradient-to-r from-white bg-clip-text text-3xl text-transparent sm:text-5xl md:text-6xl">
              실험 커뮤니티 ‘마실’
            </span>
            <span className="ml-3 align-middle text-2xl">✨</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base break-keep text-white/80 sm:mb-8 sm:text-lg md:text-xl">
            곧 만나요. 더 가볍고 친근한 커뮤니티의 시작,
            <strong className="text-white"> 마실</strong>에서 함께해요.
            <br />
            작은 인사이트가 내일의 선택을 바꿉니다.
          </p>
          <WaitListForm />
        </motion.div>
      </div>
    </section>
  );
}
