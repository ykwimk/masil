import localFont from 'next/font/local';

// 쓰는 굵기만: 본문 400, 라벨 500, 제목 600·700 (PRODUCT.md 디자인 절)
export const pretendard = localFont({
  src: [
    {
      path: '../fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

// '마실' 로고와 홈 제목의 '마실'에만
export const hakgyoansimMulgyeol = localFont({
  src: [
    {
      path: '../fonts/TTHakgyoansimMulgyeolB.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hakgyoansimMulgyeol',
  display: 'swap',
});
