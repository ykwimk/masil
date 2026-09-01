# Masil Landing Design System

> 이 문서는 `apps/landing` 리디자인의 **확정된 시각 기준**을 정의한다.
> `AGENTS.md`가 AI의 작업 방식과 범위를 정한다면, `DESIGN.md`는 Masil이 어떻게 보여야 하는지를 정한다.
>
> flex.team 연구 문서는 참고 자료일 뿐이다. 최종 Masil 디자인과 충돌하면 이 문서와 최종 prototype이 우선한다.

---

## 1. Design Status

디자인 탐색 단계는 완료되었다.

현재 목표는 새로운 visual direction을 계속 생성하는 것이 아니라,
확정된 prototype을 실제 Next.js production 코드로 충실하게 구현하고 검증하는 것이다.

최종 prototype 참고 경로:

- `docs/prototypes/masil-landing-v3.html`

---

## 2. Design Goal

Masil landing은 다음 인상을 목표로 한다.

- clean
- sophisticated
- contemporary
- premium
- human
- quiet confidence
- slightly playful
- dynamic but controlled
- visually rich but not busy
- minimal but not empty

피해야 하는 인상:

- generic SaaS landing
- AI-generated template
- over-designed editorial poster
- brutalist UI
- excessively cute community page
- dark page with random decoration
- motion without purpose

---

## 3. Brand Elements

반드시 유지:

- Masil 브랜드명 / 로고
- Masil Green
- Pretendard
- Hakgyoansim Mulgyeol
- 실제 멤버 5명
- 실제 파트너 4곳
- 실제 외부 링크 / CTA
- production 콘텐츠의 핵심 의미

---

## 4. Layout System

페이지 전체에서 세 축만 반복한다.

### Center Text Axis

사용:

- Hero
- Why Masil
- section intro
- Partners intro
- Join / Closing

### Content Axis

사용:

- First Experiment
- People details
- footer / 운영 정보

### Wide Axis

사용:

- Hero ambient background
- Partner marquee
- 큰 visual asset

원칙:

- 큰 메시지와 서사는 center
- 설명과 운영 정보는 left/grid
- 새로운 축을 임의로 만들지 않는다
- 일부러 비대칭을 만들어 “디자인한 느낌”을 내지 않는다

---

## 5. Color System

기본 surface는 dark다.

권장 범위:

- Deep Ink: `#080A08`
- Near Black: `#0D100D`
- Charcoal Green: `#111611`
- Footer Surface: `#141814`
- Warm White: `#F2F0E9`
- Muted Text: warm white의 60~75%
- Masil Green: 기존 production token 유지

### Masil Green 사용

사용 가능:

- Header / Hero의 브랜드명
- Hero headline의 `마실`
- section eyebrow
- primary CTA
- 제한적인 hover/focus accent
- Hero ambient field

금지:

- 한 section 전체를 green으로 채우기
- neon / glow 중심의 green
- generic SaaS gradient

---

## 6. Typography

Primary Typeface: **Pretendard**

Signature Typeface: **Hakgyoansim Mulgyeol**

Signature 사용 가능:

- Header logo `마실`
- Hero headline 안의 `마실`
- 아주 제한적인 brand moment

사용 금지:

- 모든 H2
- 모든 section heading
- body
- people name
- partner heading
- closing 전체 문장

### Weight

- Hero H1: 600
- Narrative / large statement: 600
- Feature H2: 600~700
- Person name / process title: 600
- Narrative body: 500
- Body: 400
- Label / eyebrow: 500~600

`800~900`을 기본 heading weight로 사용하지 않는다.

### Korean Typesetting

```css
word-break: keep-all;
overflow-wrap: normal;
line-break: strict;
```

- 단어 중간 줄바꿈 금지
- display line-height 약 1.15~1.3
- body line-height 약 1.5~1.7
- 중앙 정렬 문단은 지나치게 넓게 만들지 않는다

---

## 7. Header

- dark transparent / subtle surface
- 단순하고 조용하게 유지
- nav는 시각적으로 headline보다 후순위
- scroll 후 background/border는 최소한
- mobile menu 접근성 유지
- decorative effect 금지

Logo:

- Hakgyoansim Mulgyeol
- warm white 또는 Masil Green
- 과도하게 크지 않게

---

## 8. Hero

Hero는 첫 인상을 결정하는 중심 장면이다.

### Layout

- center aligned
- deep black base
- 큰 Korean headline
- 짧은 supporting copy
- primary CTA 1개
- 충분한 whitespace

Headline:

```text
실패를 나누고,
성장을 함께하는
마케터 커뮤니티 ‘마실’
```

`마실`:

- Masil Green
- Hakgyoansim Mulgyeol

나머지 headline:

- Pretendard
- warm white

### Hero Ambient Green Field

별도 Canvas를 사용하지 않는다.

Hero background에 3개의 대형 radial green field를 둔다.

목표:

> “green gradient background”가 아니라  
> “deep black 안에서 green light가 천천히 살아 움직이는 느낌”

원칙:

- 왼쪽은 black negative space를 충분히 유지
- 중앙~오른쪽부터 green depth가 느껴짐
- 오른쪽 / 오른쪽 아래에 더 깊은 green presence
- field edge는 보이지 않게 충분히 blur
- neon / bright glow 금지
- cursor spotlight 금지
- particle / dotted wave / Canvas 금지

Motion:

- 매우 느린 automatic drift / breathing
- 서로 다른 field에 서로 다른 parallax depth 적용
- pointer 반응은 미세하고 느리게
- pointer가 떠나면 smooth inertia로 복귀
- 화면 밖 / 비활성 탭에서는 불필요한 모션 중단
- `prefers-reduced-motion`에서는 같은 composition의 static field

현재 prototype의 26/30/34초 drift와 field별 depth는 구현 참고값이지 영구 토큰은 아니다.
시각 결과가 prototype과 일치하는 것을 우선한다.

Hero text는 항상 ambient보다 강한 hierarchy를 유지한다.

---

## 9. Why Masil / Narrative

Hero 다음 구간은 clean typography 중심이다.

별도의 Canvas / waveform / particle visual을 넣지 않는다.

구조:

- eyebrow
- centered headline
- short intro
- scroll-focus narrative

Scroll Focus:

- 모든 문장은 처음부터 DOM에 존재
- 현재 읽는 문장만 더 밝게
- 위치 / 크기 / blur를 동시에 크게 바꾸지 않는다
- color / brightness 중심
- reduced-motion에서는 즉시 상태 변경 또는 정적 상태

---

## 10. First Experiment

목적:

“마실이 실제로 무엇을 해봤는가”를 보여준다.

Visual:

- `/images/redesign/activity/img-community-cutout.png`
- section의 중심 visual object로 크게 사용
- generic card 안에 작게 넣지 않는다

Process:

- 주제 선정
- 연사 섭외
- 콘텐츠 제작
- 세미나 진행

필요하면 `lucide-react` 아이콘을 process 이해용으로만 제한적으로 사용한다.

---

## 11. People

반드시 5명 모두 사용한다.

- 김여규
- 권정하
- 김주은
- 이지영
- 김도형

Assets:

- `/images/redesign/people/img-profile1-cutout.png`
- `/images/redesign/people/img-profile2-cutout.png`
- `/images/redesign/people/img-profile3-cutout.png`
- `/images/redesign/people/img-profile4-cutout.png`
- `/images/redesign/people/img-profile5-cutout.png`

### Plate System

5명 모두:

- 동일한 warm-white circular plate
- 동일 plate size
- 동일 plate color
- 동일 plate shape
- portrait optical scale 통일
- portrait position 통일

금지:

- 사람마다 다른 원 크기
- 사람마다 다른 배경색
- member별 예외 scale
- 임의의 offset / blob

hover/focus:

- 매우 약한 Masil Green tint
- 또는 2~4px 수준의 subtle movement

정도로 제한한다.

---

## 12. Partners

실제 파트너 4개 전부 사용한다.

- 이지스퍼블리싱
- 달샘
- 위올워크
- GroupBy

Assets:

- `/images/redesign/partners/partners-logo1.png`
- `/images/redesign/partners/partners-logo2.svg`
- `/images/redesign/partners/partners-logo3.png`
- `/images/redesign/partners/partners-logo4.png`

### Desktop

기본 방향:

- dark section
- warm off-white logo tile
- 원본 logo color 최대한 유지
- 4개 로고 + duplicate 4개
- slow horizontal infinite marquee
- 동일 tile size
- 동일 logo optical height
- 충분한 gap
- heavy border 금지

마키는 약 45~60초 수준의 매우 느린 linear motion을 기준으로 한다.

### Reduced Motion / Small Screen

- animation 중단
- normalized static grid
- logo 크기와 visual treatment 동일

---

## 13. Join / Closing

Center Text Axis 사용.

구조:

```text
closing statement
↓
short supporting copy
↓
primary CTA
↓
contact / social
↓
small clover brand moment
```

Clover:

- `/images/redesign/brand/masil-clover-cutout.png`
- 고정 정사각 wrapper
- `aspect-ratio: 1`
- `object-fit: contain`
- 약 100~130px 범위의 작은 brand discovery moment
- 과도하게 크게 사용하지 않음
- 매우 미세한 idle motion만 허용

금지:

- 의미 없는 거대 `마실`
- rotated brand typography
- signature font 남발

---

## 14. Card / Border / Icon

Card:

- 정보 chunking이 실제로 필요할 때만 사용
- section마다 card 금지
- visual을 card 안에 다시 감싸지 않는다

Border:

- 1px subtle border만 필요한 곳에 제한적으로 사용
- heavy border 금지

Icon:

- process
- external link
- CTA
- compact utility

에만 제한적으로 사용.

---

## 15. Motion Hierarchy

### Level 1 — Ambient

- Hero ambient green field
- Partner marquee
- 제한적인 clover idle motion

### Level 2 — Content

- Why scroll-focus
- 필요할 경우 image reveal / section transition

### Level 3 — UI

- hover
- focus
- button feedback

Timing character:

- UI feedback: 150–240ms
- content transition: 400–550ms
- ambient: 매우 느리게

금지:

- 모든 요소 fade-up
- 모든 section에 별도 animation
- scroll hijacking
- long intro animation
- particle / waveform showcase
- motion이 정보보다 강한 상태

---

## 16. Surface Rhythm

```text
Hero              Deep Ink + ambient green
Why / Narrative   Black / Near Black
Experiment        Near Black
People            Dark Olive Black
Partners          Black / Near Black
Closing           Deep Ink
Footer            Slightly lifted dark surface
```

large beige section을 사용하지 않는다.

리듬은:

- whitespace
- visual scale
- typography density
- motion / static 대비

로 만든다.

---

## 17. Responsive

Desktop 디자인을 모바일에서 단순 축소하지 않는다.

Mobile:

- center text axis 유지
- headline line breaks 재설계
- Hero ambient를 단순화하거나 static 처리 가능
- People은 2열 + 마지막 1명 또는 single column
- hover-only 정보는 항상 노출
- Partner marquee는 static grid 우선
- touch target 최소 44px
- nav 접근성 유지

---

## 18. Accessibility

반드시 유지:

- semantic HTML
- keyboard navigation
- visible focus
- `prefers-reduced-motion`
- offscreen animation stop
- background/foreground contrast
- 한국어 natural line breaks
- image alt
- mobile menu `aria-expanded`
- external link 의미 보존

---

## 19. Image System

Identity assets는 재생성하지 않는다.

허용:

- background removal
- crop
- scale normalization
- transparent PNG
- layout plate

금지:

- 사람 / 로고 / clover를 AI가 다시 그리기
- 색 / 형태 임의 변경

가공본이 `public/images/redesign`에 존재하면 production 원본보다 가공본을 우선 사용한다.

---

## 20. Do / Don't

### DO

- center-axis를 강하게 사용
- whitespace를 디자인 요소로 사용
- heading weight 절제
- actual assets를 크게 사용
- Hero ambient 하나를 분명한 대표 모션으로 사용
- 사람 / 로고 scale 정규화
- dark surface 일관성 유지

### DON'T

- 일부러 비대칭을 만들기
- 원 크기 / 색을 멤버마다 다르게 만들기
- 의미 없는 거대 `마실`
- Hakgyoansim을 모든 heading에 사용
- Why에 Canvas / waveform 추가
- Hero에 particle / Canvas showcase 추가
- beige partner section
- generic SaaS neon gradient
- critique score를 위해 novelty 추가
- 기존 자산을 임의로 누락

---

## 21. AI / Codex Working Rules

1. 디자인 탐색은 완료된 상태로 본다.
2. 새로운 visual system을 임의로 제안하지 않는다.
3. 이 문서와 최종 prototype을 구현 기준으로 사용한다.
4. production 콘텐츠를 생략하지 않는다.
5. member 5명 / partner 4곳을 검증한다.
6. Hakgyoansim 사용 위치를 검증한다.
7. Hero ambient field가 실제 렌더에서 보이는지 확인한다.
8. People plate의 실제 visual consistency를 확인한다.
9. Partner marquee의 실제 motion / reduced-motion 상태를 확인한다.
10. Clover aspect ratio를 실제 렌더에서 확인한다.
11. 한국어 줄바꿈을 확인한다.
12. 코드 PASS와 Visual PASS를 분리해 보고한다.

---

## 22. Production Acceptance Checklist

### Hero

- [ ] Center aligned인가?
- [ ] `마실`에 Masil Green + Hakgyoansim Mulgyeol이 적용됐는가?
- [ ] 나머지 headline은 Pretendard인가?
- [ ] 별도 Canvas / waveform이 없는가?
- [ ] ambient green depth가 실제 화면에서 보이는가?
- [ ] 왼쪽 black negative space가 유지되는가?
- [ ] pointer parallax가 과하지 않게 느껴지는가?
- [ ] reduced-motion에서 static composition으로 정상 표시되는가?

### Why

- [ ] Canvas 없이 clean typography 중심인가?
- [ ] scroll-focus가 현재 문장 하나만 강조하는가?
- [ ] Korean keep-all이 유지되는가?

### Experiment

- [ ] 실제 community cutout asset을 사용하는가?
- [ ] process 4단계가 모두 존재하는가?

### People

- [ ] 5명이 모두 존재하는가?
- [ ] 5개 plate 크기 / 색 / 형태가 실제 화면에서 동일한가?
- [ ] portrait optical scale이 지나치게 달라 보이지 않는가?

### Partners

- [ ] 4개 partner가 모두 존재하는가?
- [ ] desktop marquee가 느리고 자연스러운가?
- [ ] 원본 logo가 읽히는가?
- [ ] reduced-motion / mobile에서 static grid가 정상인가?

### Join / Closing

- [ ] Clover aspect ratio가 정상인가?
- [ ] 의미 없는 거대 brand typography가 없는가?
- [ ] CTA / contact / social link가 실제 production 링크와 일치하는가?

### Global

- [ ] large beige section이 없는가?
- [ ] H2가 과도하게 굵지 않은가?
- [ ] Hakgyoansim이 제한적으로만 사용되는가?
- [ ] mobile / keyboard / reduced-motion 상태가 존재하는가?
- [ ] build / typecheck / lint에서 새 오류가 없는가?

---

## 23. Reference Principle

flex.team은 복제 대상이 아니다.

참고할 수 있는 것은:

- 제한된 typography hierarchy
- center / content / wide axis 반복
- black surface consistency
- 큰 whitespace
- motion을 한두 곳에 집중하는 방식
- large visual을 크게 보여주는 방식
- partner asset normalization
- closing을 단계적으로 닫는 방식
- reduced-motion을 별도 완성 상태로 보는 관점

최종 Masil 구현은 flex의 형태가 아니라
**Masil의 콘텐츠와 자산이 위 원칙 안에서 가장 자연스럽게 보이는 방식**이어야 한다.
