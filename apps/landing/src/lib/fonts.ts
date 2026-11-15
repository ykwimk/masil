import localFont from 'next/font/local';

// landing이 실제로 쓰는 굵기만: 본문 400, font-medium·semibold·bold, 로고(물결체 bold)
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
