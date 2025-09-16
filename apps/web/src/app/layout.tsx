import type { Metadata } from 'next';
import { hakgyoansimMulgyeol, pretendard } from '@masil/ui/styles/fonts';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { AuthProvider } from '@/providers/AuthProvider';
import NicknameModal from '@/components/shared/NicknameModal';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://masil-web.vercel.app'),
  title: '마실 | 마케터의 가벼운 마실길',
  description:
    '마케터들을 위한 가벼운 커뮤니티, 마실에서 함께 성장하고 배우며 인사이트를 나눠보세요.',
  keywords:
    '마케팅, 마케팅 커뮤니티, 마케터 모임, 마케팅 인사이트, 마케팅 네트워킹, 마실',
  openGraph: {
    title: '마실 | 마케터의 가벼운 마실길',
    description:
      '마케터들을 위한 가벼운 커뮤니티, 마실에서 함께 성장하고 배우며 인사이트를 나눠보세요.',
    url: 'https://masil-web.vercel.app',
    siteName: '마실',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '마실 - 마케터의 가벼운 마실길',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '마실 | 마케터의 가벼운 마실길',
    description:
      '마케터들을 위한 가벼운 커뮤니티, 마실에서 함께 성장하고 배우며 인사이트를 나눠보세요.',
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
        className={`${pretendard.variable} ${hakgyoansimMulgyeol.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <NicknameModal />
        </AuthProvider>
      </body>
    </html>
  );
}
