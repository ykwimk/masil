'use client';

import { motion } from 'motion/react';

export default function TargetUserSection() {
  return (
    <section className="w-full bg-white px-6 py-20">
      <h2 className="mb-8 text-center text-2xl font-semibold text-green-800">
        이런 분들에게 추천해요
      </h2>
      <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
        {[
          '혼자 마케팅 고민을 해결하기 버거우신 분',
          '마케터 동료와 성장하고 싶은 분',
          '나의 경험과 노하우를 나누고 싶은 분',
          '식물처럼 천천히, 단단히 자라고 싶은 분',
        ].map((item, idx) => (
          <motion.li
            key={idx}
            className="rounded-lg bg-green-50 p-4 text-gray-700 shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            ✅ {item}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
