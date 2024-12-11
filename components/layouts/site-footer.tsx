import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden border-t",
        "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500",
        "dark:from-blue-950 dark:via-blue-900 dark:to-blue-800",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-full",
        "before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)]",
        "before:animate-shimmer before:bg-[length:250%_250%]",
        "backdrop-blur-md",
        className
      )}
    >
      <div className="container relative z-10 flex flex-col items-center justify-between gap-6 py-8 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm font-medium text-white drop-shadow-lg md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              BANK BPD DIY
            </span>
            . All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link
            href="/intro/privacy-policy"
            className="group relative overflow-hidden rounded-full px-4 py-2 transition-all hover:ring-2 hover:ring-white/50"
            aria-label="Privacy Policy"
          >
            <span className="relative z-10 text-sm font-medium text-white">
              Aturan Privasi
            </span>
            <div className="absolute inset-0 -z-10 bg-white/10 transition-all duration-300 group-hover:bg-white/20" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
