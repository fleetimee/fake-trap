"use client"

/**
 * Renders a navigation component for the dashboard with the provided items.
 * @param {DashboardNavProps} items - An array of SidebarNavItem objects containing the navigation items to be displayed.
 * @returns {JSX.Element} - A JSX element representing the navigation component.
 */
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const [activeLink, setActiveLink] = useState<string>("")

  const handleLinkClick = (href: string | undefined) => {
    if (href) {
      setActiveLink(href)
    }
  }

  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="sticky top-20 grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  item.href === activeLink ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                onClick={() => handleLinkClick(item.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
