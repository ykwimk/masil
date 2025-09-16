import 'server-only';
import GoogleProvider from 'next-auth/providers/google';
import { getSupabaseAdminClient } from '@/lib/db/admin';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    updateAge: 5 * 60,
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        const verified = (profile as any)?.email_verified;
        const email = profile?.email?.toLowerCase();

        if (!verified) return false;
        if (!email || !email.endsWith('@gmail.com')) return false;

        const admin = await getSupabaseAdminClient();
        if (admin) {
          const { data, error } = await admin
            .from('profiles')
            .select('email,nickname')
            .eq('email', email)
            .maybeSingle();

          if (error) return false;

          if (!data) {
            const { error: upsertError } = await admin
              .from('profiles')
              .upsert(
                { email, role: 'user', nickname: null },
                { onConflict: 'email' },
              );

            if (upsertError) {
              console.error('upsert error:', upsertError);
              return false;
            }
          }
          return true;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);
      const isNeedsRefresh =
        !!user ||
        !token.roleFetchedAt ||
        now - token.roleFetchedAt > 300 ||
        token.nickname == null;

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
              .select('role,nickname')
              .eq('email', token.email)
              .maybeSingle();

            if (!error && data?.role) {
              token.role = data.role;
              token.nickname = data.nickname ?? null;
            } else if (!error && !data) {
              await admin.from('profiles').upsert(
                {
                  email: token.email,
                  role: 'user',
                  nickname: token.nickname ?? null,
                },
                { onConflict: 'email' },
              );
              token.role = token.role || 'user';
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
        session.user.nickname = token.nickname ?? null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
