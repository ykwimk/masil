import GoogleProvider from 'next-auth/providers/google';
import { getSupabaseAdminClient } from '@/lib/db/admin';
import type { NextAuthOptions } from 'next-auth';
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

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const verified = (profile as any)?.email_verified;
        return verified === true;
      }
      return true;
    },
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);
      const isNeedsRefresh =
        !!user || !token.roleFetchedAt || now - token.roleFetchedAt > 300;

      if (!token.email) {
        token.role = 'user';
        return token;
      }

      if (isNeedsRefresh) {
        const admin = await getSupabaseAdminClient();
        if (admin) {
          try {
            const { data, error } = await admin
              .from('profiles')
              .select('role')
              .eq('email', token.email)
              .maybeSingle();
            if (!error && data?.role) {
              token.role = data.role;
            } else {
              token.role = token.role || 'user';
            }
            token.roleFetchedAt = now;
          } catch {
            token.role = token.role || 'user';
          }
        } else {
          token.role = token.role || 'user';
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || 'user';
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
