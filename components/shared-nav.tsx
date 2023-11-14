"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { MenuListResData } from "@/types/menu/res/menu-list"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface DashboardNavNewProps {
  items: MenuListResData[]
}

export function DashboardNavNew({ items }: DashboardNavNewProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <div className="sticky top-20 grid min-h-[20rem]   grid-cols-1 items-start justify-between gap-60 rounded-md bg-background p-4">
      <nav className="sticky top-20 grid items-start gap-3">
        {items.map((item, index) => {
          const Icon = Icons[item.menu_icon || "arrowRight"]
          return (
            item.menu_url && (
              <Link key={index} href={item.menu_url}>
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ",
                    path === item.menu_url ? "bg-accent" : "transparent"
                  )}
                >
                  <Icon className="mr-2 h-6 w-6" />
                  <span className={cn()}>{item.menu_name}</span>
                </span>
              </Link>
            )
          )
        })}
      </nav>
    </div>
  )
}
