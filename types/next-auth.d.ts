import NextAuth from "next-auth/next"

declare module "next-auth" {
  interface Session {
    user: {
      code: number
      expires: string
      token: string
    }
  }
}
