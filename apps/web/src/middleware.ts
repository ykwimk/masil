import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default withAuth(
  (req: NextRequestWithAuth) => {
    const token = req.nextauth?.token;

    const isAdminRole = token?.role === 'admin' || token?.role === 'editor';
    if (!isAdminRole) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  },
);

export const config = {
  matcher: ['/editor/:path*'],
};
