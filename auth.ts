import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

const REQRES_API_KEY = "reqres-free-v1";

interface ReqresUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
}

export const config = {
	pages: {
		signIn: "/sign-in",
		error: "sign-in"
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: "email" },
				password: { type: "password" }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				try {
					const response = await fetch("https://reqres.in/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"x-api-key": REQRES_API_KEY
						},
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password
						})
					});

					const data = await response.json();
					
					if (!response.ok) {
						return null;
					}

					const userResponse = await fetch("https://reqres.in/api/users/1", {
						headers: {
							"x-api-key": REQRES_API_KEY
						}
					});

					const userData = await userResponse.json();
					const user: ReqresUser = userData.data;

					return {
						id: user.id.toString(),
						name: `${user.first_name} ${user.last_name}`,
						email: user.email,
						role: "user",
						token: data.token
					};
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			}
		})
	],
	callbacks: {
		async session({ session, token }: any) {
			session.user.id = token.sub;
			session.user.role = token.role;
			session.user.name = token.name;
			session.user.token = token.token;
			return session;
		},
		async jwt({ token, user }: any) {
			if (user) {
				token.role = user.role;
				token.name = user.name;
				token.token = user.token;
			}
			return token;
		}
	}
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

