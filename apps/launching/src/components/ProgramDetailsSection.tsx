'use client';

import { motion } from 'motion/react';
import {
  CheckCircle2,
  NotebookPen,
  Megaphone,
  BarChart3,
  FileText,
} from 'lucide-react';
import ReviewCard from './ReviewCard';

export default function ProgramDetailsSection() {
  return (
    <>
      {/* 페인포인트 언급 */}
      <section className="bg-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="badge">이런 고민, 해본 적 있나요?</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              실전에서 검증하고, <br className="block sm:hidden" />
              함께 성장해요
            </h2>
            <div className="inline-block">
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-foreground/80 text-base break-keep">
                    책과 강의로 배운 카피라이팅! 실제 프로젝트에서 써보고
                    싶어요.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-foreground/80 text-base break-keep">
                    내가 쓴 카피가 좋은지, 나쁜지 모르겠어요.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-foreground/80 text-base break-keep">
                    같이 고민하고 실행할 동료가 필요해요.
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <div className="border-border bg-secondary/30 rounded-2xl border p-6 text-center md:p-8">
              <h3 className="text-xl font-bold md:text-2xl">
                그 고민, <span className="text-primary">마실</span>에서
                해결하세요!
              </h3>
              <p className="text-foreground/70 mt-3 break-keep">
                카피 작성 → 콘텐츠 발행 → 인사이트 도출까지 전 과정을 경험할 수
                있는
              </p>
              <p className="text-foreground/70 mt-2 break-keep">
                ‘실전형 카피라이팅 프로젝트’ <strong>마실 2기</strong>에 참여해
                보세요.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* 2기 활동 요약 */}
      <section className="bg-section py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto max-w-5xl"
          >
            <div className="text-center">
              <span className="badge">함께 하게 될 5주간의 활동들</span>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                5주 로드맵으로 완성하는 <br className="block sm:hidden" />
                실전형 프로젝트
              </h3>
              <p className="bg-primary/10 text-primary mt-3 inline-block rounded-full px-3 py-1 text-sm">
                핵심 활동 내용 = 인터뷰 콘텐츠 제작 및 성과 분석
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="border-border rounded-xl border bg-white p-5">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <NotebookPen className="h-4 w-4" />
                  Week 1
                </div>
                <h4 className="mt-2 font-semibold">
                  인터뷰 질문 설계 & 서면 인터뷰 진행
                </h4>
                <p className="text-foreground/70 mt-2 break-keep">
                  핵심 메시지를 끌어낼 인터뷰 질문지를 만들고, (특별한 스토리를
                  가진 ~의) 서면 인터뷰를 진행합니다.
                </p>
              </div>
              <div className="border-border rounded-xl border bg-white p-5">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <NotebookPen className="h-4 w-4" />
                  Week 2
                </div>
                <h4 className="mt-2 font-semibold">인터뷰 콘텐츠 제작</h4>
                <p className="text-foreground/70 mt-2 break-keep">
                  수집한 인터뷰 내용을 바탕으로 핵심 메시지를 명확히 전달하는
                  인터뷰 콘텐츠를 완성합니다.
                </p>
              </div>
              <div className="border-border rounded-xl border bg-white p-5">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Megaphone className="h-4 w-4" />
                  Week 3
                </div>
                <h4 className="mt-2 font-semibold">홍보 게시글 기획</h4>
                <p className="text-foreground/70 mt-2 break-keep">
                  인터뷰 콘텐츠를 홍보하기 위해 채널별(인스타그램, 블로그 등)
                  게시글을 기획하고, 멤버들과 피드백을 주고받습니다.
                </p>
              </div>
              <div className="border-border rounded-xl border bg-white p-5">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <BarChart3 className="h-4 w-4" />
                  Week 4
                </div>
                <h4 className="mt-2 font-semibold">
                  채널별 게시글 발행 및 인사이트 도출
                </h4>
                <p className="text-foreground/70 mt-2 break-keep">
                  3주차에서 기획한 홍보 게시글을 실제로 발행하고, 조회수/반응 등
                  데이터를 기반으로 결과를 분석합니다.
                </p>
              </div>
              <div className="border-border rounded-xl border bg-white p-5 lg:col-span-2">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4" />
                  Week 5
                </div>
                <h4 className="mt-2 font-semibold">
                  2기 활동 결과 리포트 제작
                </h4>
                <p className="text-foreground/70 mt-2 break-keep">
                  5주간의 실험을 정리하며 성과와 배움을 담은 결과 리포트를
                  완성합니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* 활동 커리큘럼 */}
      <section className="bg-white py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-5xl"
          >
            <div className="text-center">
              <span className="badge">1기 마실 후기</span>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                멤버들이 전하는 생생한 경험
              </h3>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <ReviewCard
                authorLabel="김**님 후기 글"
                text="부족한 부분은 서로 매꿔나가며, 자발적으로 아이디어를 내고 결과 값을 만들어 내는 멤버들을 보며 자극을 많이 받았습니다."
                href="https://doqumentary.tistory.com/m/3#utm_source=blog&utm_medium=tistory&utm_campaign=retrospect&utm_id=doq"
              />
              <ReviewCard
                authorLabel="권** 후기 글"
                text="회사 밖에서 같은 목표를 가진 사람들과 프로젝트를 완성한 경험이 정말 뜻깊었습니다. 또한, 마실에서 배운 것들이 본업에서도 자연스럽게 쓰이고 있네요~!"
                href="https://m.blog.naver.com/kjhwjdgk98/223906290650"
              />
              <ReviewCard
                authorLabel="이**님 후기 글"
                text={`이렇게 빠르게 모여서\n이리도 빠른 액션이 나오다니..\n\n함께여서 이뤄낼 수 있었고, ’하는 사람은 된다‘ 라는 의미도 얻을 수 있었습니다.`}
                href="https://www.threads.com/@sooha._.h.c/post/DKhj2RczPTK?xmt=AQF0QINOZP5B87y6nQGI_HDVKCYaY5ia_F_uwbhYi3qZJw&slof=1"
              />
              <ReviewCard
                authorLabel="김**님 후기 글"
                text={`각자의 자리에서 쌓은 경험과 고민이 모여 반짝이는 아이디어로 이어지고, 그 흐름 속에서 더 큰 그림을 함께 그려갈 수 있어 좋았습니다.\n\n끊임없이 크고 작은 도전을 이어가는 마실, 다음 챕터가 더욱 기다려집니다!`}
                href="https://www.threads.com/@marketing.zip_/post/DOnJhjBEfvP?xmt=AQF04qJxlK3LCc3NYi7-k4wMsCPRtT5G4XZCy_yh0vuFyw&slof=1"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
