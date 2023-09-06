"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <div className="sticky top-20 grid  grid-cols-1 items-start justify-between gap-60 rounded-md bg-background p-4">
      <nav className="sticky top-20 grid items-start gap-3">
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"]
          return (
            item.href && (
              <Link key={index} href={item.disabled ? "/" : item.href}>
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ",
                    path === item.href ? "bg-accent" : "transparent",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Icon className="mr-2 h-6 w-6" />
                  <span className={cn("font-heading")}>{item.title}</span>
                </span>
              </Link>
            )
          )
        })}
      </nav>

      <Link href="/me">
        <span className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ">
          <Icons.post className="mr-2 h-6 w-6" />
          <span className={cn("font-heading")}>Profil</span>
        </span>
      </Link>
    </div>
  )
}
