import "@/styles/globals.css"

import { Metadata } from "next"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/config/site"
import { fontHeading, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Background from "@/components/background"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerToaster } from "@/components/ui/sonner-toaster"
import { Toaster } from "@/components/ui/toaster"
import { NextAuthProvider } from "@/app/providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s / ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Elearning",
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
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              {/* <BGGrid> */}
              {/* <Providers>{children}</Providers> */}
              <NextTopLoader />

              <Background>{children}</Background>

              {/*{children}*/}
              {/* </BGGrid> */}
              <Toaster />
              <TailwindIndicator />
            </div>
          </ThemeProvider>
          <SonnerToaster />
        </NextAuthProvider>
      </body>
    </html>
  )
}
