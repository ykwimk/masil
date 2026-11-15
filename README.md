# Masil

에디터가 어드민에서 쓰고 발행한 글을 독자가 웹에서 읽는 서비스의 모노레포입니다.

- 제품: [PRODUCT.md](./PRODUCT.md)
- 진행 순서와 현재 단계: [PLAN.md](./PLAN.md)
- 작업 규칙: [CLAUDE.md](./CLAUDE.md)

## 구조

```
apps/
  web/       # 독자용 웹 (Next.js). 3단계 전까지는 '준비 중' 화면
  landing/   # 소개 페이지. packages를 쓰지 않는 독립 앱, 건드리지 않음
packages/
  ui/        # web·admin이 같이 쓰는 토큰·글꼴·컴포넌트
```

`apps/admin`(에디터용)과 `supabase/`는 3단계에서 만듭니다.

## 시작하기

Node.js 20 이상, pnpm 10.x(`packageManager` 참고).

```bash
pnpm install
pnpm web       # apps/web 개발 서버
pnpm landing   # apps/landing 개발 서버
```

## 확인

```bash
pnpm lint && pnpm typecheck && pnpm build
```
