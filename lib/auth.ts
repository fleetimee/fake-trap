import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { login } from "@/lib/fetcher/auth-fetcher"
import { extractToken } from "@/lib/utils"

/**
 * Configuration options for NextAuth authentication.
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await login({
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        const user = await response.json()


        if (user && response.ok) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // Throw the whole response object on error
          throw new Error(user?.message || response.statusText)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      // decode token

      session.user = token as any

      const userExtracted = extractToken(session.user.token)

      session.expires = userExtracted as any

      return session
    },
  },
}
