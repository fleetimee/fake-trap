import { Role } from "@/lib/utils"





declare module "next-auth" {
  interface Session {
    user: {
      code: number
      expires: string
      token: string
    }
    expires: {
      email: string
      exp: number
      id: string
      orig_iat: number
      role: Role[]
      username: string
    }
  }
}
