import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    CredentialsProvider({
      name: 'Email + Password',
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        return { id: 'demo-user', email: credentials.email, name: 'Demo User' };
      }
    }),
    GitHubProvider({ clientId: process.env.GITHUB_ID ?? '', clientSecret: process.env.GITHUB_SECRET ?? '' }),
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID ?? '', clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '' })
  ],
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' }
};
