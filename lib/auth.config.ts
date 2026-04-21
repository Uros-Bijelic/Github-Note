import { validateUserOnLogin } from './actions/user-validate-actions';

import { type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const AUTH_CONFIG: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email address',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials) throw new Error('Missing email or password!');

          const user = await validateUserOnLogin(
            credentials.email as string,
            credentials.password as string
          );

          if (!user) return null;

          return user;
        } catch (error) {
          console.log('Error fetching user from MongoDB', error);
        }

        return null;
      },
    }),
  ],
};
