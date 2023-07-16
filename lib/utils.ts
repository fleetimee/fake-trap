import { clsx, type ClassValue } from "clsx"
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

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function unslugify(str: string) {
  return str.replace(/-/g, " ")
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files)
  if (!isArray) return false
  return files.every((file) => file instanceof File)
}

export function getYoutubeLastId(url: string) {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
  const match = url.match(regex)
  return match ? match[1] : url
}
