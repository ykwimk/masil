'use client';

import { motion } from 'motion/react';
import {
  ArrowRight,
  Mail,
  Instagram,
  Youtube,
  BadgeCheck,
  HelpCircle,
  Users2,
  Sprout,
} from 'lucide-react';
import { Button } from '../components/ui/button';

export default function JoinSection() {
  return (
    <section id="join" className="bg-section relative overflow-hidden py-20">
      <div className="gradient-bg absolute inset-0"></div>

      {/* Floating elements */}
      {/* <motion.div
        className="floating-tag absolute top-[20%] left-[10%] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        커뮤니티
      </motion.div>
      <motion.div
        className="floating-tag absolute top-[30%] right-[15%] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        네트워킹
      </motion.div> */}

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="tag">함께하기</span>
          <h2>마실과 함께 성장하세요</h2>
          <p className="break-keep opacity-70">
            마케팅의 길에서 혼자가 아닌 함께 걸어가는 동료를 만나보세요.
            <br />
            잠깐 마실 나가듯, 가볍게 시작해볼까요?
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-primary relative overflow-hidden p-6 md:p-8 lg:p-10">
                <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10"></div>
                <div className="relative z-10">
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    세미나 참여 신청
                  </h3>
                  <p className="keep-all mb-6 text-white/90">
                    이런 분이라면, 현재 모집 중인 세미나에
                    <br />
                    지금 바로 신청해 보세요.
                  </p>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="mt-1 rounded-full bg-white/20 p-2">
                        <BadgeCheck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          1~5년차 마케터
                        </h4>
                        {/* <p className="text-sm text-white/80">
                          매월 다양한 주제로 진행되는 오프라인 모임
                        </p> */}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="mt-1 rounded-full bg-white/20 p-2">
                        <HelpCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          커리어가 고민되는 마케터
                        </h4>
                        {/* <p className="text-sm text-white/80">
                          언제 어디서나 질문하고 도움을 받을 수 있는 공간
                        </p> */}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="mt-1 rounded-full bg-white/20 p-2">
                        <Users2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          실무 고민을 함께 나누고 싶은 분
                        </h4>
                        {/* <p className="text-sm text-white/80">
                          유용한 마케팅 자료 및 리소스 공유
                        </p> */}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="mt-1 rounded-full bg-white/20 p-2">
                        <Sprout className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          성장의 실마리를 얻고 싶은 분
                        </h4>
                        {/* <p className="text-sm text-white/80">
                          유용한 마케팅 자료 및 리소스 공유
                        </p> */}
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="text-primary bg-white px-6 hover:bg-white/90"
                  >
                    <a
                      href="https://event-us.kr/masilcommunity/event/105246"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      지금 신청하기 <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 lg:p-10">
                <h3 className="mb-4 text-2xl font-bold">문의하기</h3>
                <p className="mb-6 break-keep opacity-70">
                  마실에 대해 더 알고 싶으신가요? <br />
                  언제든지 문의해주세요.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">이메일</h4>
                      <a
                        href="mailto:masilcommunity@gmail.com"
                        className="hover:text-primary opacity-70 transition-colors"
                      >
                        masilcommunity@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Instagram className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">인스타그램</h4>
                      <p className="opacity-70">
                        <a
                          href="https://instagram.com/masil_community"
                          target="_blank"
                          className="hover:text-primary opacity-70 transition-colors"
                        >
                          @masil_community
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 rounded-full p-3">
                      <Youtube className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium">유튜브</h4>
                      <p className="opacity-70">
                        <a
                          href="https://www.youtube.com/@masil_community"
                          target="_blank"
                          className="hover:text-primary opacity-70 transition-colors"
                        >
                          @masil_community
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm break-keep opacity-70">
                      문의사항은 이메일 또는 인스타그램 DM으로 연락주시면 빠르게
                      답변드리겠습니다. 평일 기준 24시간 이내 답변을 드립니다.
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
