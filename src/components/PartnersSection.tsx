'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface Partner {
  name: string;
  logo: string;
  url: string;
}

export default function PartnersSection() {
  const partners: Partner[] = [
    {
      name: '이지스퍼블리싱',
      logo: '/images/partners-logo1.png',
      url: 'https://www.easyspub.co.kr',
    },
    {
      name: '달샘',
      logo: '/images/partners-logo3.png',
      url: 'https://www.instagram.com/dalsam2023',
    },
    {
      name: '그룹바이',
      logo: '/images/partners-logo2.svg',
      url: 'https://groupby.kr',
    },
  ];

  return (
    <section className="border-b border-gray-100 bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="section-title mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="tag">파트너스</span>
          <h2>마실과 함께합니다</h2>
          <p className="break-keep opacity-70">
            마케터의 성장을 지원하는 파트너사들입니다.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <Link href={partner.url} target="_blank">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={300}
                  height={300}
                  className={cn(
                    'partner-logo h-auto object-contain',
                    partner.name === '달샘'
                      ? 'max-h-14 w-28 md:max-h-16 md:w-32 lg:w-40'
                      : 'max-h-8 w-20 md:max-h-10 md:w-24 lg:w-36',
                  )}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
