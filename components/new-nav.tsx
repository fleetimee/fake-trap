"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { MenuListResNewData } from "@/types/menu/res"
import { UserOrgOneResData } from "@/types/user/res/user-org-get-one"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import MiniProfile from "./mini-profile"

interface DashboardNavNewProps {
  items: MenuListResNewData[]
  org: UserOrgOneResData
}

export function DashboardNewNewNav({ items, org }: DashboardNavNewProps) {
  const { data: session } = useSession()

  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <div className="sticky top-20 grid min-h-[20rem]   grid-cols-1 items-start justify-between gap-60 rounded-md bg-background p-4">
      <nav className="sticky top-20 grid  items-start gap-3">
        {org && (
          <MiniProfile
            name={org.nama}
            unitKerja={org.unit_kerja}
            jabatan={org.jabatan}
            kdKantor={org.kd_kantor}
          />
        )}

        {items.map((item, index) => {
          const Icon = Icons[item.menu_icon || "arrowRight"]
          return (
            item.menu_url && (
              <Link
                key={index}
                href={
                  item.menu_url.includes("/person/profile")
                    ? `${item.menu_url}/${session?.expires?.id}`
                    : item.menu_url
                }
              >
                <span
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ",
                    path === item.menu_url ||
                      path.startsWith(`${item.menu_url}/`)
                      ? "bg-accent"
                      : "transparent"
                  )}
                >
                  <Icon className="mr-2 size-6" />
                  <span className={cn()}>{item.menu_name}</span>
                  {item.menu_name === "Pelatihan" ? (
                    <span className="ml-2 inline-block rounded-full bg-red-500 p-1 text-xs font-bold text-white">
                      1
                    </span>
                  ) : null}
                </span>
              </Link>
            )
          )
        })}
      </nav>
    </div>
  )
}
