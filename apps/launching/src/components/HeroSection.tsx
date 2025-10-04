'use client';

import { motion } from 'motion/react';
import WaitListForm from './WaitListForm';

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
            곧 만나요!
            <br className="block md:hidden" /> 마케터 커뮤니티
            <br />
            <span className="text-primary">‘마실’ 커밍순</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-base text-white/80 sm:mb-8 sm:text-lg md:text-xl">
            지금 사전예약하시면 런칭 소식을 가장 먼저 받아보실 수 있어요.
            <br />
            이메일을 남겨주시면 베타 오픈 소식을 보내드릴게요.
          </p>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <WaitListForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
