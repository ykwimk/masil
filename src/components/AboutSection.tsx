'use client';

import { Coffee, Leaf, Lightbulb, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        >
          <span className="tag">마실 소개</span>
          <h2>마실이란?</h2>
          <p>
            '마실'은 이웃집에 가볍게 놀러가는 우리의 전통 문화입니다.
            <br className="hidden md:block" />
            마케터들이 부담 없이 모여 지식과 경험을 나누는 커뮤니티, 그것이 바로
            마실입니다.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {[
            {
              icon: <Leaf className="h-10 w-10 md:h-12 md:w-12" />,
              title: '자연스러운 성장',
              description: '식물처럼 천천히, 하지만 꾸준히 함께 성장해요',
              color: 'bg-primary',
            },
            {
              icon: <Users className="h-10 w-10 md:h-12 md:w-12" />,
              title: '진정한 커넥션',
              description: '형식적인 네트워킹이 아닌 진짜 관계를 만들어요',
              color: 'bg-black',
            },
            {
              icon: <Lightbulb className="h-10 w-10 md:h-12 md:w-12" />,
              title: '실용적인 인사이트',
              description: '현장에서 바로 적용할 수 있는 지식을 나눠요',
              color: 'bg-primary',
            },
            {
              icon: <Coffee className="h-10 w-10 md:h-12 md:w-12" />,
              title: '편안한 분위기',
              description: '부담 없이 질문하고 대화할 수 있는 환경이에요',
              color: 'bg-black',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <div className="feature-card h-full">
                <div className={`tag`}>NEW</div>
                <div className="bg-primary/10 text-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full p-3">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-white md:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 md:text-base">
                  {item.description}
                </p>
                <div className="text-primary mt-4 text-sm font-medium">
                  자세히 보기 →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
