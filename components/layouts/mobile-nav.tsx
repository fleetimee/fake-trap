"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/public/logo.png"
import { MainNavItem } from "@/types"
import { useSession } from "next-auth/react"

import { MenuListResNewData } from "@/types/menu/res"
import { CategoryNavDataListRes } from "@/types/navbar/res/navbar-list"
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
}

export function MobileNav({
  mainNavItems,
  sidebarNavItems,
  children,
}: MobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: session } = useSession()
  const isLoggedOn = session !== null

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
      <SheetContent position="left" size="content">
        <div className="px-7">
          <Link href="/" className="flex items-center  ">
            <Image src={Logo} alt="Logo" width={25} height={25} />

            <span className=" font-bold text-bpdprimary sm:inline-block">
              - LIVE
            </span>
          </Link>
        </div>
        {isLoggedOn && (
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="pl-1 pr-7">
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
                          ) : (
                            <div
                              key={index}
                              className="text-foreground/70 transition-colors"
                            >
                              {item.title}
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}

                {sidebarNavItems.length > 0 ? (
                  <AccordionItem value="sidebar">
                    <AccordionTrigger className="text-sm">
                      Sidebar Menu
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {sidebarNavItems?.map((item, index) =>
                          item.menu_url ? (
                            <MobileLink
                              key={index}
                              href={String(item.menu_url)}
                              pathname={pathname}
                              setIsOpen={setIsOpen}
                            >
                              {item.menu_name}
                            </MobileLink>
                          ) : (
                            <div
                              key={index}
                              className="text-foreground/70 transition-colors"
                            >
                              {item.menu_name}
                            </div>
                          )
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : null}
              </Accordion>
            </div>
          </ScrollArea>
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
