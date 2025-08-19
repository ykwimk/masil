# Masil

마실 커뮤니티 프로젝트의 공식 레포지토리입니다.

## 📖 모노레포 구조

이 레포지토리는 Turborepo를 사용하여 여러 애플리케이션과 패키지를 효율적으로 관리하는 모노레포 구조입니다.

### `apps`

사용자에게 직접 제공되는 애플리케이션들이 위치합니다.

-   `landing`: 마실 커뮤니티를 소개하는 랜딩 페이지입니다.

> [!NOTE]
> 새로운 애플리케이션을 추가할 경우, 이 곳에 해당 프로젝트의 설명을 추가 에정!

### `packages`

여러 애플리케이션에서 공통으로 사용되는 코드(UI 컴포넌트, 유틸리티 함수, 설정 등)가 위치합니다.

> [!NOTE]
> 현재는 비어있지만, 공통 로직이 발생하면 패키지를 추가하여 관리할 예정!

## 🚀 시작하기

### 사전 요구 사항

- [Node.js](https://nodejs.org/en/) (v20 이상 권장)
- [pnpm](https://pnpm.io/installation)

### 설치 및 실행

1.  **저장소 복제:**

    ```bash
    git clone https://github.com/your-username/masil.git
    cd masil
    ```

2.  **의존성 설치:**

    ```bash
    pnpm install
    ```

3.  **개발 서버 실행:**

    ```bash
    pnpm dev
    ```

    웹 애플리케이션은 `http://localhost:3000` 에서 확인할 수 있습니다.

## 🛠️ 기술 스택

-   **Monorepo:** [Turborepo](https://turbo.build/repo)
-   **Package Manager:** [pnpm](https://pnpm.io/)
-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Linting:** [ESLint](https://eslint.org/)
-   **Formatting:** [Prettier](https://prettier.io/)

## 📜 사용 가능한 스크립트

-   `pnpm dev`: 모든 앱을 개발 모드로 실행합니다.
-   `pnpm build`: 모든 앱을 프로덕션용으로 빌드합니다.
-   `pnpm lint`: 모든 앱의 린트를 실행합니다.
-   `pnpm format`: 모든 파일의 코드 스타일을 통일합니다.
