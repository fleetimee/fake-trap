import "@/styles/globals.css"

import { Metadata } from "next"
import { Montserrat, Open_Sans, Public_Sans } from "next/font/google"
import Script from "next/script"
import { GoogleTagManager } from "@next/third-parties/google"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/config/site"
import { fontHeading, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Background from "@/components/background"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerToaster } from "@/components/ui/sonner-toaster"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NextAuthProvider } from "@/app/providers"

//👇 Configure our font object
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
})

const montSerat = Montserrat({
  subsets: ["latin"],
  display: "swap",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "E-Learning",
  ],
  creator: "Novian Andika",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  authors: [
    {
      name: "Novian Andika",
      url: "https://fleetime.my.id/",
    },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "fleetime",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={publicSans.className}>
      <GoogleTagManager gtmId="GTM-5FS6WP7L" />
      <body
        className={cn(
          "min-h-screen bg-background  antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TooltipProvider>
              <div className="relative flex min-h-screen flex-col">
                {/* <BGGrid> */}
                {/* <Providers>{children}</Providers> */}
                <NextTopLoader />
                <Background>
                  {children}
                  <Script
                    defer
                    src="https://static.cloudflareinsights.com/beacon.min.js"
                    data-cf-beacon='{"token": "29ffe609493c44b99a0a3923ab5d53f4"}'
                  />
                </Background>
                {/*{children}*/}
                {/* </BGGrid> */}
                <Toaster />
                <TailwindIndicator />
              </div>
            </TooltipProvider>
          </ThemeProvider>
          <SonnerToaster />
        </NextAuthProvider>
      </body>
    </html>
  )
}
