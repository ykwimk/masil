'use client';

import { motion } from 'motion/react';

export default function FinalSection() {
  return (
    <section className="relative bg-black py-20">
      <div className="gradient-bg absolute inset-0" />
      <div className="hero-grid" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            지금 합류하고, <br className="block sm:hidden" />
            실전에서 성장하세요
          </h2>
          <p className="mt-3 break-keep text-white/70">
            이메일을 남겨주시면 모집/진행 관련 소식을 가장 먼저 보내드려요. 함께
            실행하며 배우는 경험을 시작해 보세요.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
