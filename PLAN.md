# 마실 웹 계획

한 단계를 끝내고 배포한 뒤 다음 단계로 간다. 단계마다 브랜치 → PR → 리뷰(reviewer 에이전트) → 머지 → 배포.
제품 정의는 [PRODUCT.md](./PRODUCT.md)를 따른다.

| 단계 | 내용 | 상태 |
| --- | --- | --- |
| 1 | 정리(삭제) | 대기 |
| 2 | 토큰·공통 컴포넌트 | 대기 |
| 3 | 어드민 쓰기 → 웹 읽기 | 대기 |
| 4 | 독자 로그인 + 좋아요·저장·댓글 | 대기 |
| 5 | 게시판 | 대기 |

## 모든 단계 공통: landing 확인

apps/landing은 손대지 않는다. landing이 쓰는 기존 파일도 바꾸지 않는다.
`packages/ui/styles/base.css`, `packages/ui/src/styles/fonts.ts`, `packages/ui/src/utils/cn.ts`, `packages/hooks`
새 토큰·컴포넌트는 packages/ui 안에 새 파일로 만들고 web·admin만 import한다. `packages/ui/package.json`의 `exports`는 기존 항목을 그대로 두고 새 항목만 더한다.

단계를 끝낼 때마다 아래를 확인한다. 하나라도 걸리면 그 단계는 끝나지 않은 것이다.

1. `git diff main -- apps/landing packages/hooks packages/ui/styles/base.css packages/ui/src/styles packages/ui/src/utils`가 비어 있다.
2. `pnpm --filter landing build`가 통과한다.
3. landing을 운영 모드로 띄워(`pnpm --filter landing start -p 3100`) 1440px·390px 전체 페이지를 캡처하고, `.baseline/landing/`의 기준 캡처와 나란히 비교한다. 레이아웃·색·글꼴이 같아야 한다(애니메이션 때문에 생기는 픽셀 차이는 괜찮다).
4. 루트 설정(`tsconfig.base.json`, `eslint.config.mjs`, 루트 devDependencies)이나 `pnpm-lock.yaml`의 landing 항목이 바뀌었으면 왜 바뀌었는지 PR에 적는다.

## 1. 정리

**할 일**

- **가장 먼저** landing 기준 캡처를 찍는다(위 3번 방법). `.baseline/landing/`에 두고, `.gitignore`에 `.baseline/`을 더한다.
- `apps/side-project`, `apps/launching`을 지우고 루트 `package.json`의 `launching`·`sideproject` 스크립트를 지운다.
- git 밖의 폴더를 지운다: `_bmad`, `_bmad-output`, `.codex`, `supabase/.temp`, 루트 `next-env.d.ts`. (`apps/landing/docs`는 landing 것이라 둔다)
- apps/web을 비운다: 에디터, NextAuth, 예전 Supabase 코드, API 라우트, `components/` 전부, `tailwind.config.mjs`, `components.json`, globals.css의 복사 스타일, 쓰지 않게 된 의존성. 남기는 것: `layout.tsx`, '준비 중' 한 화면, `privacy`·`terms`(4단계에서 다시 본다).
- 확인 명령을 갖춘다: web과 packages/ui에 `"typecheck": "tsc --noEmit"`, `turbo.json`에 `typecheck` 작업, 루트에 `pnpm typecheck`.
- README를 지금 구조에 맞게 고친다.

**끝났다는 기준**

- `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm build`가 통과한다.
- landing 확인(공통) 통과. 앱 두 개를 지우면 lockfile이 바뀌므로 landing 항목의 버전이 그대로인지 특히 본다.
- 배포된 web에 '준비 중' 화면이 보인다.
- Vercel의 launching·side-project 프로젝트를 지울지는 사용자가 정한다.

## 2. 토큰·공통 컴포넌트

**할 일**

1. PC 배치 시안: 홈·글 화면을 HTML로 그려 1440px·390px 폭에서 사용자와 확인한다. 시안 파일은 저장소에 넣지 않는다.
2. `packages/ui/styles/tokens.css`(새 파일): PRODUCT.md의 색·글꼴·읽기 수치를 Tailwind v4 `@theme`으로 정의한다.
3. `packages/ui/styles/prose.css`(새 파일): 글 본문 스타일. 웹 글 화면과 어드민 에디터·미리보기가 같이 쓴다.
4. `packages/ui/src/components/`(새 폴더): 3단계에 필요한 것만 만든다(Button, 입력 필드, 마실 글자 로고 정도). 쓸 곳이 생기면 그때 더한다. 기존 `src/index.ts`는 바꾸지 않고, 컴포넌트는 새 export 경로(`@masil/ui/components/*`)로 내보낸다.
5. web의 globals.css가 `base.css` 대신 tokens.css와 prose.css를 import하고, `@source`로 packages/ui를 스캔하게 한다. '준비 중' 화면이 새 토큰을 쓴다. 글꼴은 기존 `@masil/ui/styles/fonts`를 그대로 import해서 쓴다.

**끝났다는 기준**

- web에 `components/ui` 복사본이 없다.
- '준비 중' 화면이 새 색·글꼴로 배포된다.
- landing 확인(공통) 통과.

## 3. 어드민 쓰기 → 웹 읽기

**DB** (`supabase/migrations`)

- `profiles(id → auth.users, nickname, role)`. 가입하면 트리거가 profiles 행을 만든다. 첫 admin은 SQL로 지정한다.
- `posts(id, author_id, title, excerpt, body_html, cover_image_url, status draft|published, published_at, created_at, updated_at)`.
- Storage에 글 이미지 버킷을 둔다.
- RLS: 발행된 글은 누구나 읽는다. 쓰기는 editor(자기 글)와 admin(모든 글)만 할 수 있다.

**apps/admin** (Next.js, `@supabase/ssr`)

- Google 로그인. editor·admin이 아니면 들어올 수 없다.
- 글 목록, 새 글, 수정, 초안 저장·발행·발행 취소, 대표 이미지 올리기.
- Tiptap 에디터 → 서버에서 HTML을 걸러서 저장. 미리보기는 prose.css를 쓴다.

**apps/web**

- 홈: 대표 글 한 편 + 나머지 발행 글 목록. 글이 없을 때와 한 편일 때도 다룬다.
- 글 화면 `/posts/[id]`: 메타데이터·OG, 없는 글은 404.
- 새로 발행한 글은 1분 안에 보이면 된다(시간 기반 재검증).

**끝났다는 기준**

- 운영 환경 어드민에서 발행한 글이 1분 안에 운영 환경 web에 보인다.
- 초안은 anon 키로 조회해도 나오지 않는다.
- reader 계정으로 posts에 쓰기를 시도하면 RLS가 막는다(SQL 또는 스크립트로 확인).
- admin을 새 Vercel 프로젝트로 배포한다.
- landing 확인(공통) 통과.

## 4. 독자 로그인 + 좋아요·저장·댓글

- web에 Google 로그인과 닉네임 설정을 붙인다.
- `likes(post_id, user_id)`, `saves(post_id, user_id)`, `comments(id, post_id, user_id, body, created_at)`를 만들고 RLS를 건다.
- 글 화면에 좋아요 수·저장·댓글, '저장한 글' 화면을 만든다.
- 어드민에서 admin이 댓글을 지울 수 있게 한다.
- privacy·terms 내용을 새 서비스에 맞게 고친다.

**끝났다는 기준**

- 로그인하지 않은 독자는 숫자는 보지만, 누르면 로그인으로 안내받는다.
- 다른 사람의 댓글·좋아요·저장은 RLS로 지우거나 볼 수 없다.
- landing 확인(공통) 통과.
- 배포.

## 5. 게시판

시작할 때 PRODUCT.md에 범위를 먼저 적고 이 절을 채운다. 끝났다는 기준에는 landing 확인(공통)이 들어간다.

## 이번 계획에 없는 것

태그·분류·검색, 알림, landing 변경, 마실 앱 연결, Next.js 16 업그레이드.
