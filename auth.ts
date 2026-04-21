import { createNewUser, getUserByEmail } from './lib/actions/user-actions';
import { AUTH_CONFIG } from './lib/auth.config';
import { IUser } from './types/user';

import NextAuth from 'next-auth';
import type { Session } from 'next-auth';

// ----------------------------------------------------------------

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') return true;

      try {
        if (!user.email) return false;
        const existingUser = await getUserByEmail(user.email);

        if (existingUser) return true;

        await createNewUser({
          fullName: user.name ?? '',
          email: user.email,
          password: '',
          avatarImg: user.image ?? '',
        });

        return true;
      } catch (error) {
        console.log('Error with sign in with provider', error);
        return false;
      }
    },
    async jwt({ token }) {
      try {
        if (!token.email) return token;

        const fetchedUser: IUser = await getUserByEmail(token.email);

        if (fetchedUser) {
          token.id = fetchedUser._id.toString();
          token.onboardingStep = fetchedUser.onboardingStep;
          token.picture = fetchedUser.avatarImg;
          token.userName = fetchedUser.fullName;
        }

        return token;
      } catch (error) {
        console.log('Error inside jwt callback', error);
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.onboardingStep = token.onboardingStep;
        session.user.image = token.picture;
        session.user.name = token.userName;
      }

      return session;
    },
    authorized({ auth }: { auth: Session | null }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  pages: {
    signIn: '/login',
  },
  ...AUTH_CONFIG,
});
