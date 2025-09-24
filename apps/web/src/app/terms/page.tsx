import { UPDATED_DATE } from '@/lib/constants';

export default function TermsPage() {
  return (
    <div className="h-full bg-white">
      <section className="container border-t bg-white pt-24 pb-8 md:pt-32">
        <div className="container py-8">
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              이용약관
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              최종 수정일: {UPDATED_DATE}
            </p>

            <div className="prose-custom mt-6 text-sm leading-6">
              <h2>제1조(목적)</h2>
              <p>
                본 약관은 마실(이하 “서비스”)의 이용과 관련하여 서비스와 이용자
                간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>

              <h2>제2조(정의)</h2>
              <p>“이용자”란 본 약관에 따라 서비스를 이용하는 자를 말합니다.</p>

              <h2>제3조(약관의 게시와 개정)</h2>
              <p>
                서비스는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수
                있으며, 개정 시 공지합니다.
              </p>

              <h2>제4조(계정 및 로그인)</h2>
              <ul>
                <li>
                  이용자는 구글 로그인 등 인증 수단을 통해 서비스를 이용할 수
                  있습니다.
                </li>
                <li>타인의 계정을 도용하거나 부정 사용해서는 안 됩니다.</li>
              </ul>

              <h2>제5조(서비스 이용)</h2>
              <ul>
                <li>
                  서비스는 게시물 작성/열람 등 커뮤니티 기능을 제공합니다.
                </li>
                <li>
                  서비스는 안정적인 제공을 위해 기능을 변경하거나 중단할 수
                  있습니다.
                </li>
              </ul>

              <h2>제6조(이용자의 의무)</h2>
              <ul>
                <li>
                  법령 및 공서양속을 위반하는 콘텐츠를 게시해서는 안 됩니다.
                </li>
                <li>저작권 및 타인의 권리를 침해하지 않아야 합니다.</li>
              </ul>

              <h2>제7조(게시물의 관리)</h2>
              <p>
                서비스는 관련 법령 또는 약관을 위반하는 경우 게시물의 노출 제한,
                삭제 등의 조치를 취할 수 있습니다.
              </p>

              <h2>제8조(책임의 제한)</h2>
              <p>
                불가항력, 이용자의 귀책 등으로 인한 손해에 대해서는 책임을 지지
                않습니다.
              </p>

              <h2>제9조(분쟁 해결)</h2>
              <p>
                분쟁은 상호 협의로 해결하며, 협의가 어려운 경우 관련 법령에
                따릅니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
