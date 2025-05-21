'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-black py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="tag">특별한 경험</span>
          <h2 className="text-white">마실에서 만나는 특별한 경험</h2>
          <p className="text-white/70">
            마케터로서 성장하는 데 필요한 모든 것을 마실에서 경험해보세요
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="bg-primary/20 absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="마실 커뮤니티 활동"
                width={600}
                height={400}
                className="rounded-xl shadow-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 space-y-6 md:space-y-8 lg:order-2"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white md:text-2xl">
                함께 성장하는 마케터 커뮤니티
              </h3>
              <p className="text-sm text-white/70 md:text-base">
                마실은 단순한 네트워킹을 넘어 실질적인 성장을 추구합니다. 다양한
                배경을 가진 마케터들이 모여 서로의 경험과 지식을 나누며 함께
                성장합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              {[
                {
                  title: '정기 모임',
                  description: '매월 다양한 주제로 진행되는 오프라인 모임',
                },
                {
                  title: '온라인 커뮤니티',
                  description:
                    '언제 어디서나 질문하고 도움을 받을 수 있는 공간',
                },
                {
                  title: '스터디 그룹',
                  description:
                    '관심사가 비슷한 마케터들과 함께 깊이 있는 주제 탐구',
                },
                {
                  title: '멘토링 기회',
                  description:
                    '경험 많은 선배 마케터들에게 직접 조언을 구할 수 있는 기회',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="border-primary/20 rounded-lg border bg-white/5 p-3 md:p-4"
                >
                  <h4 className="text-primary mb-1 text-base font-bold md:mb-2 md:text-lg">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-white/70 md:text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <button className="bg-primary hover:bg-primary/90 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors md:px-6 md:py-3 md:text-base">
              더 알아보기
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
