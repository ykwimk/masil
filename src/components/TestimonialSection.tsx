'use client';

import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Card, CardContent } from '../components/ui/card';

const testimonials = [
  {
    quote:
      '마케팅 고민, 더 이상 혼자 끙끙 앓지 않게 됐어요. 마실에서 만난 분들과 함께 문제를 해결하는 과정이 정말 값져요.',
    author: '김지현',
    role: '브랜드 마케터',
    initials: '김',
  },
  {
    quote:
      '실무에서 바로 적용할 수 있는 인사이트가 가득해요. 이론이 아닌 실제 경험에서 나온 조언들이 큰 도움이 됩니다.',
    author: '이승우',
    role: '스타트업 마케팅 매니저',
    initials: '이',
  },
  {
    quote:
      '마실에서 만난 분들과 협업 프로젝트도 진행하게 됐어요. 단순한 네트워킹을 넘어 실질적인 관계로 발전했습니다.',
    author: '박소연',
    role: '콘텐츠 마케터',
    initials: '박',
  },
  {
    quote:
      '마케팅 트렌드를 놓치지 않고 따라갈 수 있게 되었어요. 함께 공부하고 성장하는 문화가 정말 좋습니다.',
    author: '최준호',
    role: '퍼포먼스 마케터',
    initials: '최',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            마실 멤버들의 이야기
          </h2>
          <p className="text-muted-foreground text-lg">
            마실에서 함께한 마케터들이 들려주는 진솔한 경험담
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <Quote className="text-primary/30 mb-4 h-8 w-8" />
                  <p className="mb-6 text-lg">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <Avatar className="bg-primary/10 mr-4 h-10 w-10">
                      <AvatarFallback className="text-primary font-medium">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
