import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      role?: 'admin' | 'editor' | 'user';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'admin' | 'editor' | 'user';
    emailVerified?: boolean;
    roleFetchedAt?: number;
  }
}
