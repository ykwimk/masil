# Masil

에디터가 어드민에서 쓰고 발행한 글을 독자가 웹에서 읽는 서비스의 모노레포입니다.

- 제품: [PRODUCT.md](./PRODUCT.md)
- 진행 순서와 현재 단계: [PLAN.md](./PLAN.md)
- 작업 규칙: [CLAUDE.md](./CLAUDE.md)

## 구조

```
apps/
  web/       # 독자용 웹 (Next.js). 5단계 전까지는 홈 첫 화면만
  admin/     # 에디터용 (Next.js, :3100). Google 로그인, editor·admin만 들어온다
  landing/   # 소개 페이지. packages를 쓰지 않는 독립 앱, 건드리지 않음
packages/
  ui/        # web·admin이 같이 쓰는 토큰·글꼴·컴포넌트
supabase/
  migrations/  # DB 스키마와 RLS. 대시보드에서 직접 바꾸지 않는다
  tests/       # RLS 확인 스크립트(pgTAP)
```

## 시작하기

Node.js 22 이상(`@supabase/supabase-js`가 요구), pnpm 10.x(`packageManager` 참고).

```bash
pnpm install
pnpm web       # apps/web 개발 서버
pnpm admin     # apps/admin 개발 서버, http://localhost:3100 (로컬 DB 필요)
pnpm landing   # apps/landing 개발 서버
```

## 로컬 DB

Supabase CLI와 Docker 런타임(이 맥은 Colima)이 필요합니다. 쓰지 않는 서비스는 빼고 띄웁니다.

```bash
colima start               # Docker가 꺼져 있으면
pnpm db:start              # db·auth·kong·rest만 띄운다
supabase db reset          # migrations를 처음부터 다시 적용
supabase test db           # supabase/tests의 RLS 확인
supabase db advisors       # 보안·성능 점검
```

비밀 값은 아래 두 파일에만 둡니다. 둘 다 git에 들어가지 않습니다.

| 파일 | 변수 | 값 |
| --- | --- | --- |
| `supabase/.env` | `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID`, `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET` | Google Cloud OAuth 클라이언트 |
| `apps/admin/.env.local` | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `supabase status`의 API URL과 Publishable key |

- admin은 `http://localhost:3100`으로 엽니다. `127.0.0.1`로 열면 로그인 쿠키의 호스트가 달라져서 로그인이 실패합니다.
- 새 계정은 reader라서 어드민에 들어올 수 없습니다. 로컬에서는 이렇게 올립니다.

  ```bash
  supabase db query "update public.profiles set role = 'editor' where id = (select id from auth.users where email = '<내 Gmail>')"
  ```

- `NEXT_PUBLIC_SUPABASE_URL`이 없으면 admin 빌드가 멈춥니다. CSP `connect-src`에 넣을 주소이기 때문입니다.

## 확인

```bash
pnpm lint && pnpm typecheck && pnpm build
```
