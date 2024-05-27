import { clsx, type ClassValue } from "clsx"
import { isAfter, isBefore, isWithinInterval } from "date-fns"
import { toast as sonnerToast } from "sonner"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

import { CourseAvailability } from "@/lib/enums/status"

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a date string to a formatted string representation.
 * @param date - The date string to convert.
 * @returns The formatted string representation of the date.
 */
export function convertDatetoString(date: string): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Converts a date string to a formatted string representation.
 * @param date - The date string to convert.
 * @returns The formatted string representation of the date.
 */
export function convertDateToStringSimplified(date: string): string {
  const dateObj = new Date(date)

  // Add 7 hours to the date to match with GMT+7
  dateObj.setUTCHours(dateObj.getUTCHours() + 7)

  const day = dateObj.getUTCDate().toString().padStart(2, "0")
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0") // Months are 0-based
  const year = dateObj.getUTCFullYear().toString() // Get full year
  const hours = dateObj.getUTCHours().toString().padStart(2, "0")
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0")

  return `${day}/${month}/${year} - ${hours}.${minutes}`
}

export function convertDatetoStringWithTime(date: string): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export function convertDatetoStringShort(date: string): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
}

/**
 * Extracts the user information from a token.
 * @param token - The token to extract the user information from.
 * @returns The extracted user information.
 */
export function extractToken(token: string | undefined): UserExtracted {
  const tokenParts = token?.split(".")

  if (!tokenParts) {
    return {
      email: "",
      exp: 0,
      id: "",
      orig_iat: 0,
      role: [],
      username: "",
      group: 0,
      name: "",
    }
  }

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
  group: number
  name: string
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

export function getYoutubeLastId(url: string | undefined) {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
  const match = url?.match(regex)
  return match ? match[1] : url
}

export function swrFetcher<T>(url: string, token: string) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json()) as Promise<T>
}

export const dateNow = convertDatetoString(new Date().toString())

export const getDayWithText = new Date().toLocaleString("en", {
  weekday: "long",
})

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return sonnerToast(errors.join("\n"))
  } else if (err instanceof Error) {
    return sonnerToast(err.message)
  } else {
    return sonnerToast("Something went wrong, please try again later.")
  }
}

export function isMacOs() {
  if (typeof window === "undefined") return false

  return window.navigator.userAgent.includes("Mac")
}

interface GetCourseStatusProps {
  dateStart: Date
  dateEnd: Date
}

export function getCourseStatus({
  dateStart,
  dateEnd,
}: GetCourseStatusProps): CourseAvailability {
  const currentDate = new Date()

  if (!dateStart || !dateEnd) {
    return CourseAvailability.SOON
  }

  const startDate = new Date(dateStart)
  const endDate = new Date(dateEnd)

  const currentDateInUserTimezone = new Date(
    currentDate.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    })
  )

  if (isAfter(startDate, endDate)) {
    throw new Error("Start date cannot be after end date")
  }

  if (
    isWithinInterval(currentDateInUserTimezone, {
      start: startDate,
      end: endDate,
    })
  ) {
    return CourseAvailability.ACTIVE
  }

  if (isAfter(currentDateInUserTimezone, endDate)) {
    return CourseAvailability.OVER
  }

  if (isBefore(currentDateInUserTimezone, startDate)) {
    return CourseAvailability.SOON
  }

  return CourseAvailability.SOON
}

// Time picker utils

/**
 * regular expression to check for valid hour format (01-23)
 */
export function isValidHour(value: string) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value)
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export function isValid12Hour(value: string) {
  return /^(0[1-9]|1[0-2])$/.test(value)
}

/**
 * regular expression to check for valid minute format (00-59)
 */
export function isValidMinuteOrSecond(value: string) {
  return /^[0-5][0-9]$/.test(value)
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean }

export function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig
) {
  let numericValue = parseInt(value, 10)

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max
      if (numericValue < min) numericValue = min
    } else {
      if (numericValue > max) numericValue = min
      if (numericValue < min) numericValue = max
    }
    return numericValue.toString().padStart(2, "0")
  }

  return "00"
}

export function getValidHour(value: string) {
  if (isValidHour(value)) return value
  return getValidNumber(value, { max: 23 })
}

export function getValid12Hour(value: string) {
  if (isValid12Hour(value)) return value
  return getValidNumber(value, { max: 12 })
}

export function getValidMinuteOrSecond(value: string) {
  if (isValidMinuteOrSecond(value)) return value
  return getValidNumber(value, { max: 59 })
}

type GetValidArrowNumberConfig = {
  min: number
  max: number
  step: number
}

export function getValidArrowNumber(
  value: string,
  { min, max, step }: GetValidArrowNumberConfig
) {
  let numericValue = parseInt(value, 10)
  if (!isNaN(numericValue)) {
    numericValue += step
    return getValidNumber(String(numericValue), { min, max, loop: true })
  }
  return "00"
}

export function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step })
}

export function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step })
}

export function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value)
  date.setMinutes(parseInt(minutes, 10))
  return date
}

export function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value)
  date.setSeconds(parseInt(seconds, 10))
  return date
}

export function setHours(date: Date, value: string) {
  const hours = getValidHour(value)
  date.setHours(parseInt(hours, 10))
  return date
}

export type TimePickerType = "minutes" | "seconds" | "hours" // | "12hours";

export function setDateByType(date: Date, value: string, type: TimePickerType) {
  switch (type) {
    case "minutes":
      return setMinutes(date, value)
    case "seconds":
      return setSeconds(date, value)
    case "hours":
      return setHours(date, value)
    default:
      return date
  }
}

export function getDateByType(date: Date, type: TimePickerType) {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()))
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()))
    case "hours":
      return getValidHour(String(date.getHours()))
    default:
      return "00"
  }
}

export function getArrowByType(
  value: string,
  step: number,
  type: TimePickerType
) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step)
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step)
    case "hours":
      return getValidArrowHour(value, step)
    default:
      return "00"
  }
}

export function absoluteUrl(path: string) {
  // return `${env.NEXT_PUBLIC_APP_URL}${path}`

  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const getMetaData = (createdAt: string | Date) => {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt)

  const formatter = new Intl.RelativeTimeFormat("id")
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }

  // EXPLAIN: detik yg sudah berlalu di jadiin Math.abs (jadi angka positif) xxx.123 (karena di bagi 1000 makannya ada 3 angka di belakang)
  const secondsElapsed = (date.getTime() - Date.now()) / 1000

  // console.log('sebelum /1000 ' + (date.getTime() - Date.now()))
  // console.log('sesudah /1000 ' + Math.abs(secondsElapsed))

  type TRange = keyof typeof ranges

  for (let key in ranges) {
    // EXPLAIN: apakah detik yang sudah berlalu tersebut melebihi dari ranges[key] ? jika iya maka range nya adalah ranges[key] contoh (secondsElapsed sudah melebihi 3600 / 1 jam lebih lah) maka range nya adalah hours / jam jika sudah melebihi 1 hari maka range nya day / hari dst..
    if (ranges[key as TRange] < Math.abs(secondsElapsed)) {
      // console.log(key, ranges[key as TRange])
      const delta = secondsElapsed / ranges[key as TRange]
      return formatter.format(Math.round(delta), key as TRange)
    }
  }
}
