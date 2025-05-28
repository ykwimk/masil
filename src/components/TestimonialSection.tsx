'use client';

import Link from 'next/link';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  isTag: boolean;
  imageUrl: string;
  linkUrl: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      '마케터들이 자신의 이야기를 더 가치 있게 말할 수 있도록, 그 시작을 함께 하고 싶었습니다.',
    author: '김여규',
    role: 'BX 라이터',
    initials: '김',
    isTag: true,
    imageUrl: '/images/img-profile1.png',
    linkUrl: 'https://www.naver.com',
  },
  {
    quote:
      '생각은 실행으로, 실행은 결과로 증명하는 마케터입니다. 마음껏 시도하며 반짝이는 결과들을 만들고 있어요.',
    author: '권정하',
    role: '마케터',
    initials: '권',
    isTag: false,
    imageUrl: '/images/img-profile5.png',
    linkUrl: 'https://www.naver.com',
  },
  {
    quote: '기록하고 해석하며, 진심이 닿는 마케팅을 만듭니다.',
    author: '김주은',
    role: '콘텐츠 마케터',
    initials: '김',
    isTag: false,
    imageUrl: '/images/img-profile3.png',
    linkUrl: 'https://www.naver.com',
  },
  {
    quote: '매력을 디자인하는 챠밍아티스트입니다.',
    author: '이지영',
    role: '콘텐츠 마케터',
    initials: '이',
    isTag: false,
    imageUrl: '/images/img-profile2.png',
    linkUrl: 'https://www.naver.com',
  },
  {
    quote: '분석력 있는 Creative를 지향하는 마케터 김도형 입니다.',
    author: '김도형',
    role: '콘텐츠 마케터',
    initials: '김',
    isTag: false,
    imageUrl: '/images/img-profile4.png',
    linkUrl: 'https://www.naver.com',
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
          <span className="tag">멤버</span>
          <h2>마실 1기 멤버를 소개합니다!</h2>
          <p>
            마실의 첫번째 도전을 만들어낸 멤버들입니다.
            <br />
            클릭해서 더 자세히 만나보세요. 커피챗 환영입니다!
          </p>
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
              <Link
                href={testimonial.linkUrl}
                target="_blank"
                className="h-full"
              >
                <div className="border-primary/20 h-full rounded-xl border">
                  <div className="relative h-48 bg-gray-200 md:h-64">
                    {testimonial.isTag && (
                      <div className="tag z-20">모임장</div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#eef6ee]">
                      <Avatar className="h-48 w-48 border-4 border-white md:h-56 md:w-56">
                        <AvatarFallback className="bg-primary text-2xl text-white md:text-3xl">
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundImage: `url(${testimonial.imageUrl})`,
                              backgroundSize: '150%',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundColor: 'white',
                            }}
                          />
                        </AvatarFallback>
                      </Avatar>
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
                    <p className="text-muted-foreground text-sm break-keep md:text-base">
                      "{testimonial.quote}"
                    </p>
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
