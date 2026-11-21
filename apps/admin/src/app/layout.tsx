import type { Metadata } from 'next';
import { hakgyoansimMulgyeol, pretendard } from '@masil/ui/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: '마실 에디터',
  // 에디터 전용이라 검색에 나오지 않게 한다
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${hakgyoansimMulgyeol.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
