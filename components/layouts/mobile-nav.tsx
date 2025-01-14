"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/public/logo.png"
import { MainNavItem } from "@/types"
import { generateFromString } from "generate-avatar"
import { useSession } from "next-auth/react"

import { MenuListResNewData } from "@/types/menu/res"
import { CategoryNavDataListRes } from "@/types/navbar/res/navbar-list"
import { UserOrgOneResData } from "@/types/user/res/user-org-get-one"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MobileNavProps {
  mainNavItems?: MainNavItem[]
  sidebarNavItems: MenuListResNewData[]
  topNavItems?: CategoryNavDataListRes[]
  children?: React.ReactNode
  userOrg?: UserOrgOneResData
  profilePicture?: string
  pesertaCourseTrackerCount?: number
  supervisorDivisiTrackerCount?: number
  operatorLmsTrackerCount?: number
  supervisorLmsTrackerCount?: number
}

export function MobileNav({
  mainNavItems,
  sidebarNavItems,
  children,
  userOrg,
  profilePicture,
  pesertaCourseTrackerCount,
  supervisorDivisiTrackerCount,
  operatorLmsTrackerCount,
  supervisorLmsTrackerCount,
}: MobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: session } = useSession()
  const isLoggedOn = session !== null

  const getNotificationCount = (menuId: number) => {
    switch (menuId) {
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
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative mr-4 size-9 p-0 sm:hidden xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        >
          <Icons.menu className="size-4 xl:mr-2" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        position="left"
        className="flex w-full max-w-[300px] flex-col p-0"
      >
        <div className="px-6 py-4">
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Logo" width={25} height={25} />
            <span className="font-bold text-bpdprimary sm:inline-block">
              - LIVE
            </span>
          </Link>
        </div>

        {isLoggedOn && (
          <>
            <ScrollArea className="flex-1 px-6">
              <Accordion type="single" collapsible className="w-full">
                {mainNavItems?.map((item, index) => (
                  <AccordionItem value={item.title} key={index}>
                    <AccordionTrigger className="text-sm capitalize">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.items?.map((subItem, index) =>
                          subItem.href ? (
                            <MobileLink
                              key={index}
                              href={String(subItem.href)}
                              pathname={pathname}
                              setIsOpen={setIsOpen}
                              disabled={subItem.disabled}
                            >
                              {subItem.title}
                            </MobileLink>
                          ) : null
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}

                {sidebarNavItems.length > 0 && (
                  <AccordionItem value="sidebar">
                    <AccordionTrigger className="text-sm">
                      Sidebar Menu
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {sidebarNavItems?.map((item, index) =>
                          item.menu_url ? (
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <MobileLink
                                href={String(item.menu_url)}
                                pathname={pathname}
                                setIsOpen={setIsOpen}
                              >
                                {item.menu_name}
                              </MobileLink>
                              {getNotificationCount(item.id_menu) ? (
                                <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
                                  {getNotificationCount(item.id_menu)}
                                </span>
                              ) : null}
                            </div>
                          ) : null
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </ScrollArea>

            {/* Profile card moved to footer */}
            {userOrg && (
              <div className="mt-auto border-t p-4">
                <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 p-3">
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-white/25 to-white/5" />
                    <div className="relative size-12 overflow-hidden rounded-full border-2 border-white/30">
                      <Image
                        src={
                          profilePicture
                            ? `${process.env.NEXT_PUBLIC_BASE_URL}${profilePicture}`
                            : `data:image/svg+xml;utf8,${generateFromString(
                                userOrg.nama || "Default"
                              )}`
                        }
                        alt={userOrg.nama || "Profile"}
                        width={48}
                        height={48}
                        className="size-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="truncate text-sm font-medium text-white">
                      {userOrg.nama}
                    </h3>
                    <p className="truncate text-xs text-white/80">
                      {userOrg.jabatan}
                    </p>
                    <div className="mt-1">
                      <span className="inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                        {userOrg.kd_kantor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps {
  children?: React.ReactNode
  href: string
  disabled?: boolean
  pathname: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}
