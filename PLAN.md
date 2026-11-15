# 마실 웹 계획

한 단계를 끝내고 배포한 뒤 다음 단계로 간다. 단계마다 브랜치 → PR → 리뷰(reviewer 에이전트) → 머지 → 배포.
제품 정의는 [PRODUCT.md](./PRODUCT.md)를 따른다.

| 단계 | 내용 | 상태 |
| --- | --- | --- |
| 1 | 정리(삭제) | 완료 |
| 2 | 토큰·공통 컴포넌트 | 완료 |
| 3 | 어드민 쓰기 → 웹 읽기 | 대기 |
| 4 | 독자 로그인 + 좋아요·저장·댓글 | 대기 |
| 5 | 게시판 | 대기 |

## 모든 단계 공통: landing 확인

apps/landing은 1단계에서 packages와 떼어낸 뒤로 건드리지 않는다. landing은 packages를 쓰지 않고, packages는 web과 admin만 쓴다.

단계를 끝낼 때 확인한다.

1. `git diff main -- apps/landing`이 비어 있다.
2. `pnpm --filter landing build`가 통과한다. 루트의 tailwind·eslint·typescript 버전을 올리는 변경은 이 빌드 확인을 반드시 거친다.

## 1. 정리

**할 일**

- **가장 먼저** landing을 packages에서 떼어낸다. landing이 쓰던 `packages/ui`의 `styles/base.css`·글꼴·`cn`과 `packages/hooks`의 `useScrollHeader`를 apps/landing 안으로 복사하고 import를 바꾼다. 글꼴은 실제로 쓰는 굵기만(Pretendard 400·500·600·700, 물결체 700) 가져온다. `next.config.mjs`의 `transpilePackages`와 `package.json`의 `@masil/*` 의존성을 지운다.
- `apps/side-project`, `apps/launching`을 지우고 루트 `package.json`의 `launching`·`sideproject` 스크립트를 지운다.
- `packages/hooks`를 지운다(쓰는 곳이 없어진다).
- git 밖의 폴더를 지운다: `_bmad`, `_bmad-output`, `.codex`, `supabase/.temp`, 루트 `next-env.d.ts`. (`apps/landing/docs`는 landing 것이라 둔다)
- apps/web을 비운다: 에디터, NextAuth, 예전 Supabase 코드, API 라우트, `components/` 전부, `tailwind.config.mjs`, `components.json`, globals.css의 복사 스타일, 쓰지 않게 된 의존성. 남기는 것: `layout.tsx`, '준비 중' 한 화면, `privacy`·`terms`(4단계에서 다시 본다).
- 확인 명령을 갖춘다: web에 `"typecheck": "next typegen && tsc --noEmit"`, packages/ui에 `"typecheck": "tsc --noEmit"`, `turbo.json`에 `typecheck` 작업, 루트에 `pnpm typecheck`.
- README를 지금 구조에 맞게 고친다.

**끝났다는 기준**

- `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm build`가 통과한다.
- `grep -rn "@masil/" apps/landing`(node_modules·.next 제외)이 비어 있다.
- landing 화면 확인은 이번 한 번만: PR의 Vercel landing 미리보기와 masil-landing.vercel.app을 사용자가 눈으로 비교한다.
- 배포된 web에 '준비 중' 화면이 보인다.
- Vercel의 launching·side-project 프로젝트를 지울지는 사용자가 정한다.

## 2. 토큰·공통 컴포넌트

**할 일**

1. ~~PC 배치 시안~~ 끝남: Artifact 시안 03(https://claude.ai/code/artifact/3a332ca2-9bca-4335-83c1-32edda54a727). 밝은 바탕, 홈 7:5 두 열, '마실' 물결 밑줄, 캐릭터는 홈 첫 화면에만. 정한 값은 PRODUCT.md 디자인 절에 있다.
2. `packages/ui/styles/tokens.css`(새 파일): PRODUCT.md의 색·글꼴·읽기 수치를 Tailwind v4 `@theme`으로 정의한다.
3. `packages/ui/styles/prose.css`(새 파일): 글 본문 스타일. 웹 글 화면과 어드민 에디터·미리보기가 같이 쓴다.
4. `packages/ui/src/components/Logo.tsx`: '마실' 글자 로고. Button·입력 필드는 3단계에서 처음 쓸 때 만든다. 글꼴은 쓰는 굵기만 남기고, 예전 base.css를 지운다.
5. web: globals.css가 tokens.css와 prose.css를 import한다. '준비 중' 화면은 **홈 첫 화면**으로 만든다(제목과 '마실' 물결 밑줄, 소개, 임시 캐릭터 그림, 빈 상태 문장). privacy·terms도 새 토큰으로 옮긴다.

**끝났다는 기준**

- web에 `components/ui` 복사본이 없다.
- 홈 첫 화면이 새 토큰으로 배포된다. 휴대폰(390×844)에서 캐릭터가 제목 옆에 작게 있어, 아래에 대표 글이 들어갈 자리가 첫 화면 안에 남는다.
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
- Button·입력 필드는 여기서 처음 쓰므로 packages/ui에 만든다.

**apps/web**

- 홈: 2단계 첫 화면 아래에 대표 글 한 편과 '더 읽어볼 이야기'(물결 밑줄 제목) 목록을 둔다. 글이 없을 때와 한 편일 때도 다룬다.
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
