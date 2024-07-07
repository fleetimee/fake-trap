import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

/**
 * Renders the site footer component.
 * @param className - The CSS class name to apply to the footer element.
 * @returns A React component that displays the site footer.
 */
export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(`bg-primary dark:bg-background`, className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row md:py-2">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="font text-center text-sm  leading-loose text-white md:text-left">
            © {new Date().getFullYear()} BANK BPD DIY . All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 space-x-4 md:flex-row">
          <Link
            href="/intro/privacy-policy"
            passHref
            aria-label="Privacy Policy"
          >
            <p className="font text-center text-sm leading-loose text-white hover:underline md:text-left">
              Aturan Privasi
            </p>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}
