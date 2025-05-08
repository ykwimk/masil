'use client';

import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            마실에서 만나는 특별한 경험
          </h2>
          <p className="text-muted-foreground text-lg">
            마케터로서 성장하는 데 필요한 모든 것을 마실에서 경험해보세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {[
              {
                title: '정기 모임',
                description:
                  '매월 다양한 주제로 진행되는 오프라인 모임에서 실제 사례와 인사이트를 나눠요',
              },
              {
                title: '온라인 커뮤니티',
                description:
                  '언제 어디서나 질문하고 도움을 받을 수 있는 활발한 온라인 공간이 있어요',
              },
              {
                title: '스터디 그룹',
                description:
                  '관심사가 비슷한 마케터들과 함께 깊이 있는 주제를 탐구해요',
              },
              {
                title: '멘토링 기회',
                description:
                  '경험 많은 선배 마케터들에게 직접 조언을 구할 수 있어요',
              },
            ].map((feature, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle className="text-primary h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="mb-1 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl md:p-8"
          >
            <div className="bg-primary/10 absolute top-0 right-0 h-32 w-32 rounded-bl-full"></div>
            <div className="relative z-10">
              <h3 className="mb-6 text-2xl font-bold">
                이런 분들에게 추천해요
              </h3>
              <ul className="space-y-4">
                {[
                  '혼자 마케팅 고민을 해결하기 버거우신 분',
                  '마케터 동료와 함께 성장하고 싶은 분',
                  '실무에 바로 적용할 수 있는 인사이트가 필요한 분',
                  '마케팅 트렌드를 놓치지 않고 싶은 분',
                  '다양한 업계의 마케팅 사례를 알고 싶은 분',
                  '나의 경험과 지식을 나누고 싶은 분',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-primary/20 text-primary mt-0.5 inline-block rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
