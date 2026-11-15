# 마실

에디터가 어드민에서 쓰고 발행한 글을 독자가 웹에서 읽는 서비스.
제품은 [PRODUCT.md](./PRODUCT.md), 진행 순서와 현재 단계는 [PLAN.md](./PLAN.md).

## 구조

- `apps/web`: 독자용 / `apps/admin`: 에디터용 (둘 다 Next.js)
- `packages/ui`: 새 토큰(`styles/tokens.css`), 본문 스타일(`styles/prose.css`), 공통 컴포넌트(`src/components/`). 모두 새 파일이고 web·admin만 가져다 쓴다. 앱 안에 복사본을 만들지 않는다.
- `supabase/migrations`: DB 스키마. 대시보드에서 직접 바꾸지 않는다.
- `apps/landing`: **손대지 않는다.** landing이 쓰는 기존 파일도 바꾸지 않는다: `packages/ui/styles/base.css`, `packages/ui/src/styles/fonts.ts`, `packages/ui/src/utils/cn.ts`, `packages/hooks`.

## 확인

끝났다고 말하기 전에 돌린다.

    pnpm lint && pnpm typecheck && pnpm build

화면을 바꿨으면 브라우저에서 직접 본다.
단계를 끝낼 때는 PLAN.md의 'landing 확인'(diff 없음, landing 빌드, 기준 캡처와 화면 비교)도 한다.

## 규칙

- PLAN.md의 현재 단계 일만 한다.
- 단계를 마치면 PLAN.md 상태를 고치고, `reviewer` 에이전트로 diff를 본 다음 PR을 연다.
- 권한은 RLS로 막는다. 미들웨어와 화면에서 하는 검사는 보조다. service role 키는 서버에서만 쓴다.
- 디자인은 PRODUCT.md의 디자인 절을 따른다. 반복 카드, 그림자, 납작한 벡터 일러스트는 쓰지 않는다.
- 이 파일에는 실제로 막혔던 일이 생겼을 때만 한 줄씩 더한다.
