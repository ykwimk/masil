import type { Metadata } from 'next';
import { pretendard, hakgyoansimMulgyeol } from '@masil/ui/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://masil-launching.vercel.app'),
  title: '마실 커뮤니티 | 사전예약',
  description:
    '마실 커뮤니티 런칭 알림을 가장 먼저 받아보세요. 이메일로 사전예약하고 소식을 놓치지 마세요.',
  keywords:
    '마실, 사전예약, 커밍순, 베타, 대기자 명단, 마케팅 커뮤니티, 런칭 알림',
  openGraph: {
    title: '마실 | 사전예약',
    description:
      '마실 커뮤니티 런칭 알림을 가장 먼저 받아보세요. 이메일로 사전예약하고 소식을 놓치지 마세요.',
    url: 'https://masil-launching.vercel.app',
    siteName: '마실',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '마실 - 사전예약',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '마실 커뮤니티 | 사전예약',
    description:
      '마실 커뮤니티 런칭 알림을 가장 먼저 받아보세요. 이메일로 사전예약하고 소식을 놓치지 마세요.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${hakgyoansimMulgyeol.variable} font-pretendard`}
      >
        {children}
      </body>
    </html>
  );
}
