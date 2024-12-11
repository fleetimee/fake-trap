"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

import { MenuListResNewData } from "@/types/menu/res"
import { UserOrgOneResData } from "@/types/user/res/user-org-get-one"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import MiniProfile from "@/components/mini-profile"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"

interface DashboardNavNewProps {
  items: MenuListResNewData[]
  org: UserOrgOneResData
  pesertaCourseTrackerCount?: number
  supervisorDivisiTrackerCount?: number
  operatorLmsTrackerCount?: number
  supervisorLmsTrackerCount?: number
}

export function DashboardNewNewNav({
  items,
  org,
  pesertaCourseTrackerCount,
  supervisorDivisiTrackerCount,
  operatorLmsTrackerCount,
  supervisorLmsTrackerCount,
}: DashboardNavNewProps) {
  const { data: session } = useSession()
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <div className="sticky top-20 flex h-[calc(100vh-6rem)] flex-col rounded-lg border bg-gradient-to-b from-white to-gray-50/50 p-3 shadow-sm backdrop-blur dark:from-gray-950 dark:to-gray-950/50">
      <nav className="flex h-full flex-col gap-2">
        {org && (
          <div className="relative space-y-3 pb-4">
            <MiniProfile
              name={org.nama}
              unitKerja={org.unit_kerja}
              jabatan={org.jabatan}
              kdKantor={org.kd_kantor}
              profilePicture={org.profile_picture}
            />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent dark:via-blue-950" />
          </div>
        )}
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-1">
            {items.map((item, index) => {
              const Icon = Icons[item.menu_icon || "arrowRight"]
              if (!item.menu_url) return null

              const isActive =
                path.split("/")[2] === item.menu_url.split("/")[2]
              const notificationCount = (() => {
                switch (item.id_menu) {
                  case 50:
                    return pesertaCourseTrackerCount
                  case 39:
                    return supervisorDivisiTrackerCount
                  case 57:
                    return operatorLmsTrackerCount
                  case 43:
                    return supervisorLmsTrackerCount
                  default:
                    return null
                }
              })()

              return (
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
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                        : "text-slate-600 hover:bg-blue-50/50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-blue-950/20 dark:hover:text-blue-400"
                    )}
                  >
                    <Icon
                      className={cn(
                        "mr-2 size-4 shrink-0",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-400 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-blue-400"
                      )}
                    />
                    <span className="flex-1 truncate">{item.menu_name}</span>
                    {notificationCount ? (
                      <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white dark:bg-blue-600">
                        {notificationCount}
                      </span>
                    ) : null}
                  </span>
                </Link>
              )
            })}
          </div>
          <ScrollBar className="invisible" orientation="vertical" />
        </ScrollArea>
      </nav>
    </div>
  )
}
