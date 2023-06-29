import type { NextAuthOptions } from "next-auth"
import { getToken } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"

import { toast } from "@/components/ui/use-toast"

import { extractToken } from "./utils"

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
        username: {
          label: "Username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            }
          )

          const user = await response.json()

          console.log(user)
          console.log(response)

          if (user && response.ok) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            throw new Error("Login failed", user)
          }
        } catch (error) {
          throw new Error("Login failed")
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
