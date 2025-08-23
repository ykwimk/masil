import localFont from 'next/font/local';

export const hakgyoansimMulgyeol = localFont({
  src: [
    {
      path: '../../public/fonts/TTHakgyoansimMulgyeolR.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TTHakgyoansimMulgyeolB.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hakgyoansimMulgyeol',
  display: 'swap',
});
