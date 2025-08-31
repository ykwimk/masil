import { PostCard } from './PostCard';

const FEEDS = [
  {
    id: 'm1',
    title: '8월 퍼포먼스 캠페인 리포트 — ROAS 142% 상승 요인 분석',
    description:
      '크리에이티브 다변화와 상위 퍼널 예산 재배분이 핵심 레버였습니다. 검색/브랜드 키워드 조합의 기여도를 함께 정리했습니다.',
    author: '운영팀',
    tags: ['퍼포먼스', '리포트', '예산배분'],
  },
  {
    id: 'm2',
    title: '브랜드 재정렬: 핵심 메시지 3가지로 통일하기',
    description:
      '브랜드 보이스 가이드를 간결하게 재정의하고 캠페인 전/후 사용자 인식 변화를 리서치로 확인했습니다.',
    author: '브랜딩팀',
    tags: ['브랜딩', '메시지', '리서치'],
  },
  {
    id: 'm3',
    title: '인스타 릴스 실험 — 6초 훅과 카피 변주 테스트',
    description:
      '훅 3종 × 카피 3종 매트릭스를 구성해 조회 유지율과 전환율의 상관을 확인했습니다. 놀라운 포인트는…',
    author: '콘텐츠팀',
    tags: ['콘텐츠', '크리에이티브', '실험'],
  },
  {
    id: 'm4',
    title: '온드 채널 전환 개선: 랜딩 섹션 2개로 단순화',
    description:
      'CTA 배치와 폼 필드 축소만으로 전환율 1.7배 향상. 히트맵/스크롤맵 지표도 함께 공유합니다.',
    author: '그로스팀',
    tags: ['그로스', '전환', '온드채널'],
  },
  {
    id: 'm5',
    title: '커뮤니티 공동 캠페인 제안 — “직장인 리브랜딩 위크”',
    description:
      '파트너 브랜드와의 협업 포맷/타임라인/성과지표(리드·참여·리퍼럴)를 함께 설계해 보았습니다.',
    author: '파트너십',
    tags: ['캠페인', '협업', '리드'],
  },
  {
    id: 'm6',
    title: '데이터 리포트: 채널별 첫 구매 경로 분해',
    description:
      '라스트 클릭의 착시를 줄이기 위해 터치포인트 뎁스를 가중 평균으로 반영했습니다. 간단한 읽을거리 버전.',
    author: '데이터팀',
    tags: ['데이터', '어트리뷰션', '인사이트'],
  },
];

export function FeedSection() {
  return (
    <div className="masonry">
      {FEEDS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
