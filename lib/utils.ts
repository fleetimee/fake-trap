import { clsx, type ClassValue } from "clsx"
import jwt from "jsonwebtoken"
import { JWT } from "next-auth/jwt"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDatetoString(date: string): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function jwtDecode(token: string) {
  return jwt.verify(token, `${process.env.NEXTAUTH_SECRET}`)
}

export function extractToken(token: string | undefined): UserExtracted {
  const tokenParts = token?.split(".")

  const encodedPayload = tokenParts?.[1]

  const rawPayload = atob(encodedPayload!)

  return JSON.parse(rawPayload)
}

export function extractTokenMiddleware(token: any): UserExtracted {
  const tokenParts = token?.split(".")

  const encodedPayload = tokenParts?.[1]

  const rawPayload = atob(encodedPayload!)

  return JSON.parse(rawPayload)
}

export interface UserExtracted {
  email: string
  exp: number
  id: string
  orig_iat: number
  role: Role[]
  username: string
}

export interface Role {
  id_role: number
  role_name: string
  role_description: string
}

export function parseUserExtracted(token: any): UserExtracted {
  const userExtracted = localStorage.getItem("userExtracted")

  return JSON.parse(userExtracted!)
}
