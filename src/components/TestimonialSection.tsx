'use client';

import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    quote:
      '마케팅 고민, 더 이상 혼자 끙끙 앓지 않게 됐어요. 마실에서 만난 분들과 함께 문제를 해결하는 과정이 정말 값져요.',
    author: '김지현',
    role: '브랜드 마케터',
    initials: '김',
    isNew: true,
  },
  {
    quote:
      '실무에서 바로 적용할 수 있는 인사이트가 가득해요. 이론이 아닌 실제 경험에서 나온 조언들이 큰 도움이 됩니다.',
    author: '이승우',
    role: '스타트업 마케팅 매니저',
    initials: '이',
    isNew: false,
  },
  {
    quote:
      '마실에서 만난 분들과 협업 프로젝트도 진행하게 됐어요. 단순한 네트워킹을 넘어 실질적인 관계로 발전했습니다.',
    author: '박소연',
    role: '콘텐츠 마케터',
    initials: '박',
    isNew: false,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="tag">멤버 후기</span>
          <h2>마실 멤버들의 이야기</h2>
          <p>마실에서 함께한 마케터들이 들려주는 진솔한 경험담</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="instructor-card"
            >
              <div className="border-primary/20 h-full rounded-xl border">
                <div className="relative h-48 bg-gray-200 md:h-64">
                  {testimonial.isNew && <div className="tag z-20">NEW</div>}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#eef6ee]">
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url('/images/profile.png')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                </div>
                <div className="content">
                  <h3 className="mb-1 text-lg font-bold md:text-xl">
                    {testimonial.author}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-xs break-keep md:mb-4 md:text-sm">
                    {testimonial.role}
                  </p>
                  <Quote className="text-primary/30 mb-2 h-5 w-5 md:h-6 md:w-6" />
                  <p className="text-muted-foreground text-sm md:text-base">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
