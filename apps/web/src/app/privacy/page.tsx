import { UPDATED_DATE } from '@/lib/constants';

export default function PrivacyPolicyPage() {
  return (
    <div className="h-full bg-white">
      <section className="container border-t bg-white pt-24 pb-8 md:pt-32">
        <div className="container py-8">
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              개인정보처리방침
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              최종 수정일: {UPDATED_DATE}
            </p>

            <div className="prose-custom mt-6 text-sm leading-6">
              <p>
                본 개인정보처리방침은 마실(이하 “서비스”)이 이용자의 개인정보를
                어떤 목적으로, 어떤 항목을, 어떤 방식으로 처리하는지, 그리고
                이용자의 권리를 어떻게 보장하는지에 대해 설명합니다.
              </p>

              <h2>1. 처리하는 개인정보의 항목</h2>
              <ul>
                <li>필수: 이메일 주소(구글 로그인), 이름/프로필(제공 시)</li>
                <li>
                  서비스 이용 과정에서 생성되는 정보: 닉네임, 게시물/댓글 등
                  서비스 내 활동 정보
                </li>
                <li>
                  쿠키: 인증 세션 유지 등 서비스 운영 목적의 최소한으로 사용
                </li>
              </ul>

              <h2>2. 처리 목적</h2>
              <ul>
                <li>이용자 인증 및 계정 관리</li>
                <li>커뮤니티 서비스 제공(게시물 작성/조회 등)</li>
                <li>부정 이용 방지, 보안, 서비스 품질 향상</li>
              </ul>

              <h2>3. 보유 및 이용 기간</h2>
              <p>
                원칙적으로 회원 탈퇴 시 즉시 파기합니다. 다만, 관련 법령에
                특별한 규정이 있는 경우 그에 따릅니다.
              </p>

              <h2>4. 제3자 제공 및 국외 이전</h2>
              <p>
                서비스는 다음의 외부 서비스를 사용하며, 서비스 제공을 위해
                개인정보가 국외로 이전될 수 있습니다.
              </p>
              <ul>
                <li>
                  인증: Google (Google LLC) — 구글 계정 인증 시 필요한 범위의
                  정보에 한해 처리
                </li>
                <li>
                  인프라/데이터베이스: Supabase — 서비스 데이터 저장/조회(서버
                  위치는 제공사 정책에 따름)
                </li>
                <li>
                  호스팅: Vercel — 웹 애플리케이션 호스팅(서버 위치는 제공사
                  정책에 따름)
                </li>
              </ul>
              <p className="text-muted-foreground">
                국외 이전 항목: 이메일, 닉네임, 서비스 이용 관련 데이터 일체 중
                서비스 제공에 필요한 범위
              </p>

              <h2>5. 개인정보 파기 절차 및 방법</h2>
              <p>
                보유 기간 경과 또는 처리 목적 달성 시 지체 없이 파기합니다.
                전자적 파일은 복구 불가한 방법으로, 인쇄물은 분쇄 또는 소각 등의
                방법으로 파기합니다.
              </p>

              <h2>6. 이용자의 권리</h2>
              <ul>
                <li>개인정보 열람, 정정, 삭제, 처리정지 요구</li>
                <li>동의 철회 및 회원 탈퇴</li>
              </ul>

              <h2>7. 개인정보 보호책임자</h2>
              <p>
                아래 연락처로 문의하실 수 있습니다. 신속하고 충분한 답변을
                드리겠습니다.
              </p>
              <ul>
                <li>이름: 이성준</li>
                <li>이메일: ykwimk@gmail.com</li>
              </ul>

              <h2>8. 정책 변경</h2>
              <p>
                본 방침은 법령, 내부 정책 변경 등에 따라 수정될 수 있으며,
                중요한 변경 사항은 서비스 내 공지사항을 통해 고지합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
