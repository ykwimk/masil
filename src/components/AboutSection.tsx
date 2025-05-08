'use client';

import { Coffee, Leaf, Lightbulb, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';

export default function AboutSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">마실이란?</h2>
          <p className="text-muted-foreground text-lg">
            '마실'은 이웃집에 가볍게 놀러가는 우리의 전통 문화입니다.
            <br />
            마케터들이 부담 없이 모여 지식과 경험을 나누는 커뮤니티, 그것이 바로
            마실입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Leaf className="text-primary h-10 w-10" />,
              title: '자연스러운 성장',
              description: '식물처럼 천천히, 하지만 꾸준히 함께 성장해요',
            },
            {
              icon: <Users className="text-primary h-10 w-10" />,
              title: '진정한 커넥션',
              description: '형식적인 네트워킹이 아닌 진짜 관계를 만들어요',
            },
            {
              icon: <Lightbulb className="text-primary h-10 w-10" />,
              title: '실용적인 인사이트',
              description: '현장에서 바로 적용할 수 있는 지식을 나눠요',
            },
            {
              icon: <Coffee className="text-primary h-10 w-10" />,
              title: '편안한 분위기',
              description: '부담 없이 질문하고 대화할 수 있는 환경이에요',
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
              <Card className="h-full border-none shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="flex h-full flex-col items-center pt-6 text-center">
                  <div className="bg-primary/10 mb-4 rounded-full p-3">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
