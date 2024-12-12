"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/public/logo.png"
import { MainNavItem } from "@/types"
import { useSession } from "next-auth/react"

import { CategoryNavDataListRes } from "@/types/navbar/res/navbar-list"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  topNavItems?: CategoryNavDataListRes[]
}

export function MainNav({ items, children, topNavItems }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const { data: session } = useSession()

  const isLoggedOn = session !== null

  return (
    <div className="hidden gap-6 lg:flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/" className="hidden items-center space-x-0 md:flex">
            <Image src={Logo} alt="Logo" width={25} height={25} />
            <span className="hidden font-bold  text-bpdprimary sm:inline-block">
              - LIVE
            </span>
          </Link>
        </TooltipTrigger>

        <TooltipContent>
          B-LIVE (BPD DIY Learning Integrated Virtual Education)
        </TooltipContent>
      </Tooltip>

      {isLoggedOn && (
        <NavigationMenu>
          <NavigationMenuList>
            {items?.[0]?.items ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto">
                  {items[0].title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {items[0].items.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-primary ">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
