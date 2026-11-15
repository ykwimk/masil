# 마실 웹 계획

한 단계를 끝내고 배포한 뒤 다음 단계로 간다. 단계마다 브랜치 → PR → 리뷰(reviewer 에이전트) → 머지 → 배포.
제품 정의는 [PRODUCT.md](./PRODUCT.md)를 따른다.

| 단계 | 내용 | 상태 |
| --- | --- | --- |
| 1 | 정리(삭제) | 완료 |
| 2 | 토큰·공통 컴포넌트 | 완료 |
| 3 | 기반: DB·로그인 | 대기 |
| 4 | 글 쓰기·발행(글자만) | 대기 |
| 5 | 웹 읽기 | 대기 |
| 6 | 사진 | 대기 |
| 7 | 독자 로그인 + 좋아요·저장 | 대기 |
| 8 | 댓글 | 대기 |
| 9 | 게시판 | 대기 |

## 모든 단계 공통: landing 확인

apps/landing은 1단계에서 packages와 떼어낸 뒤로 건드리지 않는다. landing은 packages를 쓰지 않고, packages는 web과 admin만 쓴다.

단계를 끝낼 때 확인한다.

1. `git diff main -- apps/landing`이 비어 있다.
2. `pnpm --filter landing build`가 통과한다. 루트의 tailwind·eslint·typescript 버전을 올리는 변경은 이 빌드 확인을 반드시 거친다.

## 3단계부터 공통

**환경**

- 개발은 Supabase CLI 로컬 DB(`supabase start`)로 한다. 스키마·정책은 `supabase/migrations`, RLS 확인 스크립트는 `supabase/tests`(`supabase test db`).
- 로컬 Supabase는 Colima로 띄운다. 이 맥은 메모리가 8GB라서 쓰지 않는 서비스는 빼고 띄운다(`supabase start -x …`).
- 운영 Supabase 프로젝트는 서울 지역(ap-northeast-2)에 새로 만든다. 마이그레이션을 로컬에서 확인한 뒤 운영에 적용한다.
- 마이그레이션을 바꾼 단계는 Supabase 보안 점검(Advisors)에 경고가 없어야 끝난다.

**사용자 확인**

- 서버(서버 컴포넌트·서버 액션·라우트·미들웨어)에서 로그인한 사용자는 Supabase 공식 문서 기준대로 `supabase.auth.getClaims()`로 확인한다. 쿠키의 세션을 그대로 믿는 `getSession()`으로 권한을 판단하지 않는다.

**비밀 값과 보안 헤더**

- service role 키와 재검증 토큰은 Vercel의 Production 환경에만 넣는다. 미리보기(Preview)에는 넣지 않는다.
- CSP는 nonce 방식을 쓰지 않는다. nonce를 쓰면 모든 요청을 그때그때 렌더링하게 되어, on-demand 재검증으로 미리 만들어 두는 설계가 깨진다.

**백업**

- 운영 DB와 Storage 사진을 한 달에 한 번 저장소 밖에 받아 둔다. 이메일이 들어 있으니 git에는 넣지 않는다.

**직접 짜는 부분**

- 단계마다 '직접'에 적은 2~3개는 사용자가 직접 짠다.
- Claude는 틀(파일, 타입, 호출 위치, 빈 함수)과 `TODO(human)`만 만든다. 한 번에 `TODO(human)` 하나씩 두고, 채워지면 확인한 뒤 다음으로 간다.

## 1. 정리

**할 일**

- **가장 먼저** landing을 packages에서 떼어낸다. landing이 쓰던 `packages/ui`의 `styles/base.css`·글꼴·`cn`과 `packages/hooks`의 `useScrollHeader`를 apps/landing 안으로 복사하고 import를 바꾼다. 글꼴은 실제로 쓰는 굵기만(Pretendard 400·500·600·700, 물결체 700) 가져온다. `next.config.mjs`의 `transpilePackages`와 `package.json`의 `@masil/*` 의존성을 지운다.
- `apps/side-project`, `apps/launching`을 지우고 루트 `package.json`의 `launching`·`sideproject` 스크립트를 지운다.
- `packages/hooks`를 지운다(쓰는 곳이 없어진다).
- git 밖의 폴더를 지운다: `_bmad`, `_bmad-output`, `.codex`, `supabase/.temp`, 루트 `next-env.d.ts`. (`apps/landing/docs`는 landing 것이라 둔다)
- apps/web을 비운다: 에디터, NextAuth, 예전 Supabase 코드, API 라우트, `components/` 전부, `tailwind.config.mjs`, `components.json`, globals.css의 복사 스타일, 쓰지 않게 된 의존성. 남기는 것: `layout.tsx`, '준비 중' 한 화면, `privacy`·`terms`(7단계에서 다시 본다).
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
4. `packages/ui/src/components/Logo.tsx`: '마실' 글자 로고. Button은 3단계, 입력 필드는 4단계에서 처음 쓸 때 만든다. 글꼴은 쓰는 굵기만 남기고, 예전 base.css를 지운다.
5. web: globals.css가 tokens.css와 prose.css를 import한다. '준비 중' 화면은 **홈 첫 화면**으로 만든다(제목과 '마실' 물결 밑줄, 소개, 임시 캐릭터 그림, 빈 상태 문장). privacy·terms도 새 토큰으로 옮긴다.

**끝났다는 기준**

- web에 `components/ui` 복사본이 없다.
- 홈 첫 화면이 새 토큰으로 배포된다. 휴대폰(390×844)에서 캐릭터가 제목 옆에 작게 있어, 아래에 대표 글이 들어갈 자리가 첫 화면 안에 남는다.
- landing 확인(공통) 통과.

## 3. 기반: DB·로그인

**할 일**

- 운영 Supabase 프로젝트를 서울 지역에 만든다.
- `profiles(id → auth.users, nickname, role)`. 가입하면 트리거가 profiles 행을 만든다.
  - 본인은 자기 행의 `nickname`만 바꿀 수 있다. `role`은 사용자가 바꿀 수 없다(칼럼 권한).
  - role 변경 화면은 만들지 않는다. 첫 admin과 editor 지정은 SQL로 한다. 나중에 화면을 만들면 service role을 쓰기 전에 서버에서 admin인지 먼저 확인한다.
- apps/admin(Next.js, `@supabase/ssr`)을 새로 만든다.
  - Google 로그인. editor·admin이 아니면 들어올 수 없다.
  - Button을 packages/ui에 만든다.
  - 운영 보안 헤더: CSP를 좁힌다. 외부 스크립트 출처(`https:`)와 `unsafe-eval`을 빼고, `connect-src`는 자기 자신과 우리 Supabase 주소만 허용한다.
  - 새 Vercel 프로젝트로 배포한다.
- Supabase Auth 리다이렉트 허용 목록은 운영 주소와 localhost만 둔다. 로그인 뒤 돌아갈 주소(`next`)는 우리 사이트 안의 경로만 받는다.
- Google 동의 화면은 테스트 모드로 두고, 테스트 사용자는 에디터·관리자 계정만 넣는다(7단계에서 프로덕션으로 바꾼다).

**끝났다는 기준**

- reader가 자기 `profiles.role`을 바꾸려 하면 막힌다(스크립트 `supabase test db`로 확인한다. 실제로 막는 장치는 칼럼 권한이다).
- reader 계정은 어드민에 들어올 수 없다.
- admin 운영 CSP에 `unsafe-eval`과 외부 스크립트 출처가 없고, 페이지가 CSP 오류 없이 뜬다.
- admin을 새 Vercel 프로젝트로 배포한다.
- landing 확인(공통) 통과.

**직접**: 로그인, RLS·확인 스크립트, Button

## 4. 글 쓰기·발행(글자만)

**할 일**

- `posts(id, author_id, title, excerpt, body_html, cover_image_url, status draft|published, published_at, created_at, updated_at)`.
- RLS: 발행된 글은 누구나 읽는다. 쓰기는 editor(자기 글)와 admin(모든 글)만 할 수 있다.
- admin: 글 목록, 새 글, 수정, 초안 저장·발행·발행 취소. 입력 필드(Input)를 packages/ui에 만든다.
- 에디터는 Tiptap 3. 확장은 PRODUCT.md에 정한 요소만 켠다: StarterKit(h2·h3, 인용, 목록, 구분선만), Link, Placeholder. 미리보기는 prose.css를 쓴다.
- 서버에서 HTML을 걸러서 저장한다.
  - sanitize-html을 쓴다. 정규식으로 직접 거르지 않는다.
  - 허용 태그는 쓰는 확장이 만드는 태그와 똑같이 맞춘다.
  - `javascript:` 같은 위험한 링크 주소와 `on*` 속성을 막는다.
  - 설정과 테스트는 사용자가 짠다.
- 저장하지 않은 변경이 있을 때 페이지를 떠나면 경고한다.

**끝났다는 기준**

- 초안은 anon 키로 조회해도 나오지 않는다.
- reader 계정으로 posts에 쓰기를 시도하면 RLS가 막는다(스크립트).
- `<script>`, `on*` 속성, `javascript:` 링크가 저장된 본문에 남지 않는다.
- 에디터가 쓰는 브라우저(맥 Chrome·Safari)에서 한글로 한 문단을 쓰고 저장해도 글자가 깨지지 않는다.
- 배포.
- landing 확인(공통) 통과.

**직접**: HTML 거르기, 발행 로직, Input

## 5. 웹 읽기

**할 일**

- 홈: 2단계 첫 화면 아래에 대표 글 한 편과 '더 읽어볼 이야기'(물결 밑줄 제목) 목록을 둔다. 글이 없을 때와 한 편일 때도 다룬다.
- 글 화면 `/posts/[id]`: 메타데이터·OG, 없는 글은 404.
- 재검증
  - admin에서 발행·발행 취소·수정하면 web에 재검증을 요청한다(비밀 토큰을 함께 보낸다).
  - web은 토큰을 확인한 뒤에만 해당 글과 홈을 바로 다시 만든다(on-demand).
  - 시간 기반 재검증은 놓친 요청에 대비한 보조로만 둔다.
- web 운영 보안 헤더: CSP를 좁힌다. 외부 스크립트 출처(`https:`)와 `unsafe-eval`을 빼고, `connect-src`는 자기 자신과 우리 Supabase 주소만 허용한다.
- `layout.tsx`의 예전 메타데이터("마케터의 가벼운 마실길")를 새 소개로 바꾼다.

**끝났다는 기준**

- 운영 어드민에서 발행·발행 취소·수정하면 운영 web에 바로 반영된다.
- 재검증 요청은 토큰이 없거나 틀리면 거절된다.
- web 운영 CSP에 `unsafe-eval`과 외부 스크립트 출처가 없고, 페이지가 CSP 오류 없이 뜬다.
- web 배포.
- landing 확인(공통) 통과.

**직접**: 재검증

## 6. 사진

**할 일**

- Storage 글 이미지 버킷
  - 업로드는 editor·admin만 한다(Storage 정책). 읽기는 공개다.
  - 파일 종류(이미지만)와 크기를 버킷에서 제한한다.
  - 파일 이름은 서버에서 무작위(UUID)로 정한다. 올린 사람이 정한 이름을 쓰지 않는다.
- admin에서 대표 이미지와 본문 사진을 올린다.
- 올리기 전에 브라우저에서 다시 그려(canvas) 위치정보 같은 메타데이터를 지우고, 긴 변을 2000px로 줄인다.
- 대표 이미지: next/image로 보여준다. `images.remotePatterns`는 `*.supabase.co`가 아니라 우리 프로젝트 주소만 허용한다.
- 본문 사진: Tiptap Image 확장. HTML 거르기 허용 목록에 우리 Storage 주소의 `<img>`만 더한다.
- 사진 캡션: figure 확장을 직접 만들고, 거르기 허용 목록에 `figure`·`figcaption`을 더한다.

**끝났다는 기준**

- reader와 anon은 Storage에 올릴 수 없다. 허용하지 않은 종류나 너무 큰 파일은 거절된다(스크립트).
- 외부 주소의 `<img>`가 저장된 본문에 남지 않는다.
- 에디터로 넣은 본문 사진이 웹 글 화면에 제대로 보인다.
- figure 없이 넣은 사진 아래에 틈이 없다.
- 올린 사진 파일에 위치정보가 없다.
- 배포.
- landing 확인(공통) 통과.

**직접**: 이미지 업로드(메타데이터 지우기 포함), figure 확장

## 7. 독자 로그인 + 좋아요·저장

**할 일**

- web에 Google 로그인과 닉네임 설정을 붙인다.
- `likes(post_id, user_id)`, `saves(post_id, user_id)`를 만들고 RLS를 건다.
- 글 화면에 좋아요 수·저장, '저장한 글' 화면을 만든다.
- 아래 둘은 로그인과 같이 나간다. 독자의 개인정보를 받기 시작하는 단계이기 때문이다.
  - 회원 탈퇴: 계정을 지우면 profiles·좋아요·저장도 지운다.
  - privacy·terms 내용을 새 서비스에 맞게 고친다. 개인정보 처리방침의 연락처는 개인 이메일이 아니라 서비스 이메일로 바꾼다.
- Google 동의 화면을 프로덕션으로 바꾼다.
- 운영 Supabase 무료 플랜의 일시정지에 어떻게 대응할지 정한다(유료 전환은 사용자가 정한다).

**끝났다는 기준**

- 로그인하지 않은 독자도 좋아요 수는 보고, 누르면 로그인으로 안내받는다.
- 스크립트(`supabase test db`)로 확인한다.
  - 남의 좋아요·저장은 지울 수 없다.
  - 저장 목록은 본인만 볼 수 있다.
  - reader가 자기 `profiles.role`을 바꾸려 하면 막힌다.
- 회원 탈퇴하면 계정·profiles·좋아요·저장이 지워진다.
- 개인정보 처리방침의 연락처가 서비스 이메일이다.
- 배포.
- landing 확인(공통) 통과.

**직접**: 웹 로그인, likes·saves RLS, 즉시 반영(낙관적 업데이트)

## 8. 댓글

**할 일**

- `comments(id, post_id, user_id, body, created_at)`를 만들고 RLS를 건다. 글 화면에 댓글을 붙인다.
- 글자 수를 제한한다(DB 제약과 서버 둘 다).
- 도배를 제한한다(같은 사용자가 짧은 시간에 여러 개를 못 쓴다).
- 평문으로만 보여준다(HTML을 해석하지 않는다).
- 어드민에서 admin이 댓글을 지울 수 있게 한다.
- 탈퇴한 사람의 댓글을 지울지 '탈퇴한 사용자'로 남길지는 이 단계를 시작할 때 정한다.

**끝났다는 기준**

- 로그인하지 않은 독자도 댓글은 보고, 쓰려고 하면 로그인으로 안내받는다.
- 스크립트(`supabase test db`)로 확인한다.
  - 남의 댓글은 지울 수 없다.
  - 댓글은 누구나 읽을 수 있다.
- 댓글 글자 수와 도배 제한이 서버와 DB에서 모두 걸린다.
- `<script>`가 든 댓글도 글자 그대로 보인다.
- 탈퇴한 사람의 댓글은 정한 방식대로 처리된다.
- 배포.
- landing 확인(공통) 통과.

**직접**: 댓글 RLS, 도배 제한

## 9. 게시판

시작할 때 PRODUCT.md에 범위를 먼저 적고 이 절을 채운다. 끝났다는 기준에는 landing 확인(공통)이 들어간다.

## 이번 계획에 없는 것

태그·분류·검색, 알림, landing 변경, 마실 앱 연결, Next.js 16 업그레이드.
