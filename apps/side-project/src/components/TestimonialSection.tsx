'use client';

import Link from 'next/link';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Testimonial {
  author: string;
  isTag: boolean;
  imageUrl: string;
  linkUrl: string;
}

const testimonials: Testimonial[] = [
  {
    author: '김여규',
    isTag: true,
    imageUrl: '/images/img-profile1.png',
    linkUrl:
      'https://kacykim.notion.site/2026661084028079879ae2bed4aec198?pvs=4',
  },
  {
    author: '권정하',
    isTag: false,
    imageUrl: '/images/img-profile5.png',
    linkUrl:
      'https://purrfect-teller-734.notion.site/1fb15ca40074802eab0cc60ca91de1ec?pvs=4',
  },
  // {
  //   author: '김주은',
  //   isTag: false,
  //   imageUrl: '/images/img-profile3.png',
  //   linkUrl:
  //     'https://heisley.notion.site/1facc1fde979801abcefe3424a4a0f09?pvs=4',
  // },
  // {
  //   author: '이지영',
  //   isTag: false,
  //   imageUrl: '/images/img-profile2.png',
  //   linkUrl:
  //     'https://heisley.notion.site/1facc1fde9798051a012d1a35f7ca4eb?pvs=4',
  // },
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
          <h2>마실 2기 멤버를 소개합니다!</h2>
          <p>
            마실의 두번째 도전을 만들어낸 멤버들입니다.
            <br />
            이번 카피라이팅 결과를 만나보세요.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    <h3 className="mb-1 text-center text-lg font-bold md:text-xl">
                      {testimonial.author}
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
