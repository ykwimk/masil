'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="tag">소개</span>
          <h2>마실이란?</h2>
          <p className="break-keep opacity-70">
            커리어 실패와 번아웃의 순간을 다시 해보는 용기로 바꾸는{' '}
            <strong>마케터 커뮤니티</strong>입니다.
            <br />
            가볍게 와서 진심을 나누고 다시 해보는 힘을 얻어가는 곳, 그게
            마실이에요.
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
            <div className="bg-primary/20 absolute -top-10 -left-10 z-50 h-40 w-40 rounded-full blur-3xl"></div>
            <div className="rounded-xl bg-white shadow-lg">
              <div className="relative z-10 mx-auto max-w-[400px]">
                <Image
                  src="/images/img-community.png"
                  alt="마실 커뮤니티 활동"
                  width={400}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
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
              <h3 className="text-xl font-bold md:text-2xl">마실 1기 활동</h3>

              <p className="text-sm break-keep opacity-70 md:text-base">
                첫 실험은{' '}
                <span className="highlighted">
                  하이아웃풋클럽(HOC) 마케터 와니
                </span>
                님과 함께한 연사 세미나 기획이었습니다.
                <br />
                주제 선정부터 섭외, 진행까지 모든 과정을 실무자들이 직접
                실행했습니다.
                <br />
                그리고 그 과정 속에서, 마실은 이런 활동들을 함께 경험했습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
              {[
                {
                  title: '정기 모임',
                  description: '온/오프라인 모임을 통한 인사이트 공유',
                },
                {
                  title: '세미나 기획',
                  description: '세미나 주제 선정 및 연사 섭외',
                },
                {
                  title: '콘텐츠 제작',
                  description: '홍보 콘텐츠 제작\n(카드뉴스, 릴스, 스레드 등)',
                },
                {
                  title: '따뜻한 공감',
                  description: '실무와 커리어에 대한 고민 나눔',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-3 shadow-sm md:p-4"
                >
                  <h4 className="text-primary mb-1 text-base font-bold md:mb-2 md:text-lg">
                    {feature.title}
                  </h4>
                  <p className="text-xs break-keep opacity-70 md:text-sm">
                    {feature.description.split('\n').map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            {/* <button className="bg-primary hover:bg-primary/90 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors md:px-6 md:py-3 md:text-base">
              더 알아보기
            </button> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
