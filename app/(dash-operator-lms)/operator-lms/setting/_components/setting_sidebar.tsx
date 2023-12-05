"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { RoleListResData } from "@/types/role/res"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
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
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {items.map((item) => (
        <Link
          key={item.id_role}
          href={`/operator-lms/roles/${item.role_name.toLowerCase()}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === `/operator-lms/roles/${item.role_name.toLowerCase()}`
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.role_name}
        </Link>
      ))}
    </nav>
  )
}
