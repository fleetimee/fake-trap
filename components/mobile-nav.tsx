import Link from "next/link"
import { MainNavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"
import { Icons } from "@/components/icons"

/**
 * Represents the props for the MobileNav component.
 * @interface
 * @property {MainNavItem[]} items - An array of MainNavItem objects representing the navigation items.
 * @property {React.ReactNode} [children] - Optional React node(s) to be rendered inside the mobile navigation component.
 */
interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
}
/**
 * Renders a mobile navigation component with a list of items and optional children.
 * @param items - An array of MainNavItem objects representing the navigation items.
 * @param children - Optional React node(s) to be rendered inside the mobile navigation component.
 * @returns A React component representing the mobile navigation.
 */
export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody()

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  )
}
