/**
 * This module exports font-related constants and functions.
 */

// Importing fonts
import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Public_Sans,
} from "next/font/google"
import localFont from "next/font/local"

// Font constants
export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: "500",
})
