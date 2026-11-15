# 마실

에디터가 어드민에서 쓰고 발행한 글을 독자가 웹에서 읽는 서비스.
제품은 [PRODUCT.md](./PRODUCT.md), 진행 순서와 현재 단계는 [PLAN.md](./PLAN.md).

## 구조

- `apps/web`: 독자용 / `apps/admin`: 에디터용 (둘 다 Next.js)
- `packages/ui`: 디자인 토큰, 본문 스타일, 공통 컴포넌트. web·admin만 쓴다. 앱 안에 복사본을 만들지 않는다.
- `supabase/migrations`: DB 스키마. 대시보드에서 직접 바꾸지 않는다.
- `apps/landing`: **건드리지 않는다.** 1단계에서 packages와 떼어낸 독립 앱이다.

## 확인

끝났다고 말하기 전에 돌린다.

    pnpm lint && pnpm typecheck && pnpm build

화면을 바꿨으면 브라우저에서 직접 본다.
단계를 끝낼 때는 `git diff main -- apps/landing`이 비어 있고 `pnpm --filter landing build`가 통과하는지 본다. 루트 tailwind·eslint·typescript 버전을 올릴 때도 landing 빌드를 꼭 돌린다.

## 규칙

- PLAN.md의 현재 단계 일만 한다.
- 단계를 마치면 PLAN.md 상태를 고치고, `reviewer` 에이전트로 diff를 본 다음 PR을 연다.
- 권한은 RLS로 막는다. 미들웨어와 화면에서 하는 검사는 보조다. service role 키는 서버에서만 쓴다.
- 디자인은 PRODUCT.md의 디자인 절을 따른다. 반복 카드·그림자·그라디언트는 쓰지 않고, 캐릭터는 홈 첫 화면에만, 손그림 장식은 물결 밑줄 하나만 쓴다.
- 이 파일에는 실제로 막혔던 일이 생겼을 때만 한 줄씩 더한다.
