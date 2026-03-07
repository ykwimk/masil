'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const tabs = [
  {
    title: '마실이란?',
    tabName: 'About',
    linkUrl:
      'https://kacykim.notion.site/2026661084028079879ae2bed4aec198?pvs=4',
  },
  {
    title: '지난 실험들',
    tabName: 'History',
    linkUrl:
      'https://purrfect-teller-734.notion.site/1fb15ca40074802eab0cc60ca91de1ec?pvs=4',
  },
  {
    title: '인터뷰 컨텐츠 결과',
    tabName: 'Partners',
    linkUrl:
      'https://heisley.notion.site/1facc1fde979801abcefe3424a4a0f09?pvs=4',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-section py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* <span className="tag">소개</span> */}
          {/* <h2>소개</h2> */}
          {/* <p>
            5주 동안 함께 달려요
            <br />※ 이번 모임은 소수 정예 유료로 진행됩니다.
          </p> */}
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="instructor-card"
            >
              <Link href={tab.linkUrl} target="_blank" className="h-full">
                <div className="border-primary/20 h-full rounded-xl border">
                  <div className="relative h-32 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center bg-[#eef6ee]">
                      <div className="text-center text-3xl font-bold">
                        {tab.tabName}
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h3 className="mb-1 text-center text-lg font-semibold">
                      {tab.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
