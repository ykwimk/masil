'use client';

import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function JoinSection() {
  return (
    <section id="join" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-none shadow-xl">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-primary p-8 text-white md:p-10">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    마실과 함께 성장하세요
                  </h2>
                  <p className="mb-6 opacity-90">
                    마케팅의 길에서 혼자가 아닌 함께 걸어가는 동료를 만나보세요.
                    잠깐 마실 나가듯, 가볍게 시작해볼까요?
                  </p>
                  <ul className="mb-8 space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>매월 정기 모임 참여 기회</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>활발한 온라인 커뮤니티 활동</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span>마케팅 자료 및 리소스 공유</span>
                    </li>
                  </ul>
                  <Button
                    asChild
                    className="text-primary bg-white hover:bg-white/90"
                  >
                    <a
                      href="https://tally.so/r/your-form-id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      지금 참여하기 <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="p-8 md:p-10">
                  <h3 className="mb-4 text-xl font-bold">문의하기</h3>
                  <p className="text-muted-foreground mb-6">
                    마실에 대해 더 알고 싶으신가요? 언제든지 문의해주세요.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-primary h-5 w-5" />
                      <a
                        href="mailto:hello@masil.community"
                        className="hover:text-primary transition-colors"
                      >
                        hello@masil.community
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="text-primary h-5 w-5" />
                      <span>카카오톡 채널: @마실커뮤니티</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
