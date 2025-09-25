# Masil

마실 커뮤니티 프로젝트의 공식 모노레포입니다.

## 📖 모노레포 구조

Turborepo로 여러 애플리케이션과 패키지를 한 저장소에서 관리합니다.

### apps

- `apps/web`: 커뮤니티 메인 웹 애플리케이션 (Next.js App Router)
- `apps/landing`: 랜딩 페이지 애플리케이션

### packages

- `packages/ui` (`@masil/ui`): 폰트 설정, 공용 스타일(`styles/base.css`), `cn()` 유틸 등 UI 유틸리티
- `packages/hooks` (`@masil/hooks`): 공용 React 훅(`useScrollHeader` 등)

### docs

- `docs/sql`: 데이터베이스 스키마/쿼리 문서화(준비 중)

## 📦 폴더 개요

```
apps/
  web/       # 메인 웹앱
  landing/   # 랜딩 사이트
packages/
  ui/        # UI 유틸, 폰트, 스타일
  hooks/     # 공용 React 훅
docs/
  sql/       # DB 문서
```

## 🚀 시작하기

### 사전 요구 사항

- Node.js 20 이상 권장
- pnpm 10.x (루트 `package.json`의 `packageManager` 참조)

### 설치

```bash
pnpm install
```

### 실행

- 전체 앱 동시 실행

  ```bash
  pnpm dev
  ```

  두 앱이 사용 가능한 포트에 바인딩됩니다(예: 3000/3001). 터미널 로그의 실제 포트를 확인하세요.

- 개별 앱만 실행

  ```bash
  pnpm web      # apps/web만 개발 모드로 실행
  pnpm landing  # apps/landing만 개발 모드로 실행
  ```

### 빌드/린트/포맷

- `pnpm build`: 모든 앱 빌드
- `pnpm lint`: Turborepo를 통해 전체 린트
- `pnpm format`: Prettier로 `ts/tsx/md` 포맷

## 참고

- Google OAuth로 로그인합니다. `@gmail.com`이며 이메일 인증된 계정만 허용합니다.
- `/editor` 경로는 `admin` 또는 `editor` 역할만 접근 가능합니다(NextAuth 미들웨어).
- 이미지 업로드 API(`apps/web/src/app/api/upload/route.ts`)는 Supabase Storage에 업로드하며 10MB 제한과 이미지 타입 검사를 수행합니다.

## 🛠️ 기술 스택

- Monorepo: Turborepo
- Package Manager: pnpm
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- Linting: ESLint (Flat config)
- Formatting: Prettier (+ Tailwind 플러그인)

## 📜 유용한 스크립트

- `pnpm dev`: 모든 앱 개발 모드 실행
- `pnpm build`: 모든 앱 프로덕션 빌드
- `pnpm lint`: 전체 린트 실행
- `pnpm format`: 포맷 수행
- `pnpm web`: `apps/web` 개발 서버만 실행
- `pnpm landing`: `apps/landing` 개발 서버만 실행

## 🤝 기여

- 이슈/PR 환영합니다. 패키지 변경 시 관련 앱에서 실행 확인을 부탁드립니다.

