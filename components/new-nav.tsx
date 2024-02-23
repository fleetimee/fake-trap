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
}

export function DashboardNewNewNav({
  items,
  org,
  pesertaCourseTrackerCount,
  supervisorDivisiTrackerCount,
  operatorLmsTrackerCount,
}: DashboardNavNewProps) {
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
        <ScrollArea className="grid h-80">
          <div className="grid flex-col gap-3">
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
                        path.split("/")[2] === item.menu_url.split("/")[2]
                          ? "bg-accent"
                          : "transparent"
                      )}
                    >
                      <Icon className="mr-2 size-6" />
                      <span className={cn()}>{item.menu_name}</span>

                      {item.id_menu === 50 ? (
                        pesertaCourseTrackerCount ? (
                          <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            {pesertaCourseTrackerCount}
                          </span>
                        ) : null
                      ) : null}

                      {item.id_menu === 39 ? (
                        supervisorDivisiTrackerCount ? (
                          <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            {supervisorDivisiTrackerCount}
                          </span>
                        ) : null
                      ) : null}

                      {item.id_menu === 57 ? (
                        operatorLmsTrackerCount ? (
                          <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            {operatorLmsTrackerCount}
                          </span>
                        ) : null
                      ) : null}
                    </span>
                  </Link>
                )
              )
            })}
          </div>

          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </nav>
    </div>
  )
}
