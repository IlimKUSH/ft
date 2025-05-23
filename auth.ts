import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface CustomUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}

interface CustomToken extends JWT {
  role?: string;
  name?: string;
  token?: string;
}

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  basePath: '/api/auth',
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const loginResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!loginResponse.ok) {
            const error = await loginResponse
              .json()
              .catch(() => ({ error: 'Invalid credentials' }));
            throw new Error(error.error || 'Invalid credentials');
          }

          const loginData = await loginResponse.json();

          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/me`,
            {
              headers: {
                Authorization: `Bearer ${loginData.token}`,
              },
            },
          );

          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await userResponse.json();

          return {
            id: userData.id?.toString() ?? '1',
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: 'user',
            token: loginData.token,
          } as CustomUser;
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const customSession: CustomSession = {
        ...session,
        user: {
          ...session.user,
          id: token.sub ?? '',
          role: (token as CustomToken).role ?? '',
          name: (token as CustomToken).name ?? '',
          token: (token as CustomToken).token ?? '',
        },
      };
      return customSession;
    },
    async jwt({ token, user }) {
      if (user) {
        (token as CustomToken).role = (user as CustomUser).role;
        (token as CustomToken).name = (user as CustomUser).name;
        (token as CustomToken).token = (user as CustomUser).token;
      }
      return token as CustomToken;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
