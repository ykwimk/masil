# Masil Landing Agent Guide

## 적용 범위

이 `AGENTS.md`는 **`apps/landing` 프로젝트에만 적용**한다.
이 문서의 지침을 Masil 모노레포 전체 규칙으로 해석하지 않는다.

이 landing 페이지는 한국의 마케터 커뮤니티 **마실(Masil)** 을 소개하는 공개 웹사이트다.
주요 목적은 마실의 정체성을 명확하게 전달하고, 시각적으로 인상적인 브랜드 경험을 제공하며,
세미나 참여나 커뮤니티 문의 같은 다음 행동으로 자연스럽게 이어지도록 하는 것이다.

---

## 현재 작업 단계

Open Design을 통한 **디자인 탐색과 prototype 확정 단계는 완료**되었다.

이제 기본 작업은 새로운 디자인을 다시 탐색하는 것이 아니라,
확정된 디자인을 `apps/landing`의 실제 Next.js production 코드로 구현하고 검증하는 것이다.

명시적인 요청이 없는 한:

- 새로운 visual direction을 제안하지 않는다.
- 확정된 디자인을 임의로 재해석하지 않는다.
- Open Design 탐색 단계로 되돌아가지 않는다.
- 현재 production 코드와 최종 prototype의 차이를 줄이는 구현에 집중한다.

---

## Source of Truth

충돌이 있을 때 다음 우선순위를 따른다.

1. 현재 사용자의 명시적 요청
2. `apps/landing/AGENTS.md` — 작업 범위와 개발 방식
3. `apps/landing/DESIGN.md` — 확정된 시각 시스템과 디자인 규칙
4. `apps/landing/docs/prototypes/masil-landing-v3.html` — 최종 prototype의 실제 시각/인터랙션 참고
5. 현재 production 코드 — 콘텐츠, 실제 링크, 기존 동작 확인
6. `apps/landing/docs/references/*` — 레퍼런스 연구 자료

`docs/references`의 내용은 참고 원칙일 뿐 최종 Masil 디자인을 덮어쓰지 않는다.

---

## 프로젝트 목표

이 landing 페이지를 작업할 때 다음을 우선한다.

- 마실의 정체성을 명확하게 전달한다.
- 확정된 비주얼 방향을 production에서 충실하게 구현한다.
- 데스크톱과 모바일 모두에서 완성도 높은 반응형 경험을 제공한다.
- 접근성과 시맨틱 HTML을 지킨다.
- 중요한 외부 링크와 기존 콘텐츠를 보존한다.
- React / TypeScript 코드를 읽기 쉽고 유지보수 가능하게 작성한다.
- 한 번에 전체를 크게 갈아엎기보다 검토 가능한 작은 단위로 변경한다.

---

## 기술 스택

현재 landing 앱은 다음 기술을 사용한다.

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion
- Lucide React

공용 패키지는 다음 위치에 있을 수 있다.

- `packages/ui`
- `packages/hooks`

새 dependency를 추가하기 전에 기존 dependency나 공용 유틸리티로 해결 가능한지 먼저 확인한다.

---

## 프로젝트 경계

landing 전용 변경은 가급적 다음 범위 안에서 처리한다.

- `apps/landing/src`
- `apps/landing/public`
- `apps/landing/docs`

다음 공용 패키지는 **명시적인 요청이 없는 한 수정하지 않는다.**

- `packages/ui`
- `packages/hooks`

공용 패키지를 수정하면 모노레포의 다른 앱에도 영향을 줄 수 있다.
landing 전용 디자인 토큰, 유틸리티, 컴포넌트, 스타일이 필요하면 `apps/landing` 내부에 정의한다.

---

## 개발 명령어

landing 앱 실행:

```bash
pnpm --filter landing dev
```

프로덕션 빌드 검증:

```bash
pnpm --filter landing build
```

작업에 더 적합한 기존 명령어가 있을 경우 관련 `package.json`을 먼저 확인한다.

---

## 작업 방식

코드를 수정하기 전에:

1. `AGENTS.md`와 `DESIGN.md`를 읽는다.
2. 최종 prototype과 현재 production 구현을 비교한다.
3. 요청을 해결하기 위한 가장 작은 변경 범위를 정한다.
4. 시각 변경인지, 구조 변경인지, 동작 변경인지 구분한다.
5. 큰 구현이면 수정 전에 접근 방향을 짧게 설명한다.

구현 중에는:

1. 요청받은 범위 안에서만 변경한다.
2. 가능한 경우 기존 dependency와 패턴을 재사용한다.
3. 관련 없는 코드 정리는 함께 하지 않는다.
4. 명시적인 요청이 없는 한 기존 콘텐츠와 실제 링크를 유지한다.
5. 처음부터 데스크톱과 모바일을 함께 고려한다.
6. prototype HTML을 그대로 복붙하지 않고 현재 React/Next.js 구조에 맞게 구현한다.
7. 상호작용이 필요한 최소 범위만 Client Component로 만든다.

작업을 마치기 전에:

1. 변경한 파일을 다시 검토한다.
2. 가능한 경우 build, typecheck, lint 등 관련 검증을 실행한다.
3. 실제 브라우저 렌더를 확인한다.
4. 무엇을 변경했는지 정리한다.
5. 검증 실패, 타협한 부분, 남은 차이를 명확히 알린다.
6. 코드 검증과 시각 검증을 구분한다.

---

## 코드 작성 원칙

- 기존 React / TypeScript / 프로젝트 컨벤션을 따른다.
- 불필요한 추상화보다 읽기 쉬운 코드를 우선한다.
- 컴포넌트는 가능한 한 하나의 명확한 역할을 갖도록 유지한다.
- 너무 이른 일반화는 피한다.
- 기존 도구로 충분한 문제에 새 라이브러리를 추가하지 않는다.
- 시맨틱 HTML과 키보드 접근성을 유지한다.
- 애니메이션은 목적이 있을 때만 사용한다.
- 반복되는 값은 landing 내부의 로컬 디자인 토큰으로 정리하는 것을 고려한다.
- 이미 잘 동작하는 코드는 요청 결과를 명확히 개선하지 않는 이상 불필요하게 다시 쓰지 않는다.

---

## 확정된 비주얼 방향

현재 리디자인은 더 이상 `Editorial Social Club` 탐색 단계가 아니다.
최종 시각 규칙은 `DESIGN.md`를 따른다.

핵심 방향:

- deep black / dark green 중심의 일관된 surface
- 강한 center text axis
- Pretendard 중심 typography
- Hakgyoansim Mulgyeol은 로고와 Hero의 `마실` 등 제한적인 brand moment에만 사용
- Masil Green을 제한적인 accent로 사용
- Hero의 느린 ambient green field
- Why 구간의 clean typography / scroll focus
- First Experiment의 실제 community asset
- 5명 People의 동일한 warm-white plate
- Partners의 느린 marquee
- Join / Closing의 clover brand moment
- 목적이 분명한 최소 모션

피해야 하는 방향:

- 흔한 SaaS 랜딩페이지 문법
- 일부러 만든 비대칭과 포스터 콜라주
- 과도한 rounded card / glassmorphism / shadow
- generic neon gradient
- 의미 없는 Canvas / particle / waveform
- 모든 섹션에 모션 적용
- AI가 임의로 추가한 decorative brand typography
- 디자인 완성도를 해치는 novelty

---

## 반응형 디자인

데스크톱과 모바일을 모두 최종 결과물로 취급한다.

- 데스크톱을 그대로 축소하지 않는다.
- 작은 화면에서도 콘텐츠 우선순위를 유지한다.
- 정교한 absolute positioning에 과도하게 의존하지 않는다.
- 타이포그래피 가독성을 유지한다.
- 버튼과 링크의 터치 영역을 충분히 확보한다.
- hover 전용 정보는 모바일에서 항상 접근 가능하게 한다.
- Partner marquee는 모바일 / reduced-motion 환경에서 정적 grid 대안을 고려한다.

---

## Motion 사용 원칙

기존 dependency로 해결 가능하면 새 animation library를 추가하지 않는다.

현재 대표 모션:

- Hero ambient green field
- Why scroll-focus
- Partner marquee
- 작은 hover / focus feedback
- Clover의 제한적인 idle motion

원칙:

- 핵심 메시지는 즉시 읽힌다.
- 모션은 보조 레이어다.
- 화면 밖 모션은 중단한다.
- `prefers-reduced-motion` 대안을 제공한다.
- 포인터 반응은 미세하고 느리게 유지한다.
- 동작 자체를 보여주기 위한 모션은 금지한다.

---

## 디자인 토큰

landing 전용 비주얼 토큰은 `apps/landing` 내부에 둔다.

반복되는 값은 CSS 변수나 작은 로컬 토큰 시스템으로 정리한다.

예:

- page/background color
- Masil Green
- warm white
- muted foreground
- section spacing
- display typography
- ambient motion values

공용 디자인 시스템은 직접 수정하지 않는다.

---

## 컴포넌트 전략

현재 확정된 주요 흐름:

1. Header
2. Hero
3. Why Masil
4. First Experiment
5. People
6. Partners
7. Join / Closing
8. Footer

구현은 이 순서대로 작은 단위로 진행하는 것을 선호한다.

- 기존 섹션 경계가 유효하면 유지한다.
- 필요하면 섹션 내부는 자유롭게 재구성한다.
- 가독성이나 유지보수성이 실제로 좋아질 때만 컴포넌트를 추출한다.
- 상호작용이 있는 작은 부분만 별도 Client Component로 분리하는 것을 우선한다.

---

## 기존 콘텐츠

명시적인 요청이 없는 한 다음은 유지한다.

- 핵심 한국어 카피의 의미
- 세미나 및 외부 링크
- 멤버 5명 정보
- 파트너 4곳 정보
- 계속 활용 가치가 있는 기존 이미지 자산

리디자인용 가공 자산이 `public/images/redesign`에 존재하면 해당 자산을 우선 사용한다.

---

## 레퍼런스

모션과 인터랙션의 일반 원칙을 확인할 때:

- `docs/references/flex-motion-interaction-research.md`

를 참고할 수 있다.

하지만 레퍼런스의:

- Canvas 형태
- 타이핑 장치
- 브랜드 색
- 레이아웃
- 이미지
- 문구
- 제품 서사

를 복제하지 않는다.

현재 확정된 Masil 디자인과 레퍼런스가 충돌하면 **Masil의 `DESIGN.md`와 최종 prototype이 우선**한다.

---

## 판단 기준

요구사항이 모호할 경우:

1. `DESIGN.md`와 최종 prototype을 먼저 확인한다.
2. 현재 production 코드와 콘텐츠를 확인한다.
3. 가장 작은 합리적 변경을 우선한다.
4. 시각 방향을 새로 발명하지 않는다.
5. 큰 아키텍처나 디자인 결정이 필요한 경우 먼저 사람에게 판단을 요청한다.

---

## 완료 기준

코드가 컴파일된다고 해서 작업이 끝난 것은 아니다.

다음도 함께 확인한다.

- 확정된 prototype과 시각적으로 충분히 가까운가
- 콘텐츠가 명확하게 전달되는가
- 데스크톱과 모바일 모두 자연스러운가
- 기존 링크와 인터랙션이 유지되는가
- 접근성 퇴행이 없는가
- Hero ambient / People / Partners / Clover가 실제 렌더에서 정상인가
- 코드 PASS와 Visual PASS를 구분했는가
- 요청 범위를 벗어난 변경이 없는가
