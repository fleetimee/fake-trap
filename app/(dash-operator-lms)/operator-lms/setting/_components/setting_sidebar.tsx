"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { RoleListResData } from "@/types/role/res"
import { cn } from "@/lib/utils"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 rounded-lg border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-150",
            pathname === item.href
              ? "bg-blue-600 text-white shadow-md"
              : "text-blue-600 hover:bg-blue-100 hover:text-blue-700 hover:shadow-sm",
            "justify-start"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

interface SidebarNavRoleProps {
  items: RoleListResData[]
}

export function SidebarNavRole({ items }: SidebarNavRoleProps) {
  const pathname = usePathname()

  return (
    <nav className="rounded-lg border border-blue-100 bg-blue-50/50 p-2 lg:space-y-1">
      {items.map((item) => {
        const formattedRoleName = item.role_name
          .toLowerCase()
          .replace(/\s+/g, "-")
        return (
          <Link
            key={item.id_role}
            href={`/operator-lms/roles/${formattedRoleName}`}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === `/operator-lms/roles/${formattedRoleName}`
                ? "bg-blue-600 text-white shadow-sm"
                : "text-blue-600 hover:bg-blue-100 hover:text-blue-700",
              "justify-start"
            )}
          >
            {item.role_name}
          </Link>
        )
      })}
    </nav>
  )
}
