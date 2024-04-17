"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { DashboardIcon } from "@radix-ui/react-icons"
import { generateFromString } from "generate-avatar"
import { FramerIcon } from "lucide-react"
import { signOut } from "next-auth/react"

import { MenuListResNewData } from "@/types/menu/res"
import { CategoryNavDataListRes } from "@/types/navbar/res/navbar-list"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { KnowledgeSearch } from "@/components/knowledge-search"
import { MainNav } from "@/components/layouts/main-nav"
import { MobileNav } from "@/components/layouts/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MovingBorderButton } from "../ui/moving-border"

interface SiteHeaderProps {
  user:
    | {
        code: number
        expires: string
        token: string
      }
    | undefined
  isMoreThanOneRole: boolean
  displayName: string
  emailName: string
  sidebarNavItems: MenuListResNewData[]
  topNavItems?: CategoryNavDataListRes[]
  titleNav?: string
  profilePicture?: string
}

export function SiteHeader({ ...props }: SiteHeaderProps) {
  const [time, setTime] = React.useState<Date>(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }

    const formattedDate = date.toLocaleDateString("id-ID", options)
    const formattedTime = date.toLocaleTimeString("id-ID", timeOptions)

    return `${formattedDate} | ${formattedTime}`
  }

  const profilePictureLink = `${process.env.NEXT_PUBLIC_BASE_URL}${props.profilePicture}`

  if (props.user) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="h-2 bg-primary backdrop-blur"></div> {/* Blue strip */}{" "}
        <div className="container flex h-16 items-center">
          <MainNav items={siteConfig.mainNav} topNavItems={props.topNavItems} />
          <MobileNav
            mainNavItems={siteConfig.mainNav}
            sidebarNavItems={props.sidebarNavItems}
          />

          {/* The title is now next to the MobileNav component. */}
          {props.titleNav ? (
            <h1 className="ml-2 text-center  font-bold md:hidden">
              {props.titleNav ?? "BPD DIY E-Learning"}
            </h1>
          ) : (
            <h1 className="ml-2 inline-flex items-center text-center  font-bold md:hidden">
              <FramerIcon className="mr-2 size-4" aria-hidden="true" />
              BPD DIY E-Learning
            </h1>
          )}

          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className=" hidden text-sm font-medium leading-none text-muted-foreground md:block">
              <div className="rounded-full bg-gray-200 px-4 py-2 text-black">
                Waktu Server: {formatDate(time)}
              </div>
            </div>

            <nav className="flex items-center space-x-2">
              <KnowledgeSearch />
            </nav>

            {props.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="relative size-8 overflow-hidden rounded-full bg-white">
                    <Image
                      src={
                        props.profilePicture
                          ? profilePictureLink
                          : `data:image/svg+xml;utf8,${generateFromString(
                              props.displayName ? props.displayName : "Nama"
                            )}`
                      }
                      alt="User name"
                      width={50}
                      height={50}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {props.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {props.emailName}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/login">
                        <DashboardIcon
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Dashboard
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      disabled={!props.isMoreThanOneRole}
                    >
                      <Link href={"/panel-selector"}>
                        <Icons.menu
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Kewenangan
                        <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer"
                    // onSelect={(event) => {
                    //   event.preventDefault()
                    //   signOut({
                    //     callbackUrl: "/login",
                    //   }).then(() => {
                    //     localStorage.clear()
                    //     sessionStorage.clear()

                    //     document.cookie.split(";").forEach((c) => {
                    //       document.cookie = c
                    //         .replace(/^ +/, "")
                    //         .replace(
                    //           /=.*/,
                    //           `=;expires=${new Date().toUTCString()};path=/`
                    //         )
                    //     })
                    //   })
                    // }}
                  >
                    <Link href="/login/signout">
                      <Icons.logout
                        className="mr-2 size-4"
                        aria-hidden="true"
                      />
                      Keluar
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <div
                  className={buttonVariants({
                    size: "lg",
                  })}
                >
                  Log In
                  <span className="sr-only">Masuk</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
    )
  } else
    return (
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={siteConfig.mainNav} topNavItems={props.topNavItems} />
          <MobileNav
            mainNavItems={siteConfig.mainNav}
            sidebarNavItems={props.sidebarNavItems}
          />
          {props.titleNav ? (
            <h1 className="ml-2 text-center  font-bold md:hidden">
              {props.titleNav ?? "BPD DIY E-Learning"}
            </h1>
          ) : (
            <h1 className="ml-2 flex text-center  font-bold md:hidden">
              <FramerIcon className="mr-2 size-4" aria-hidden="true" />
              BPD DIY E-Learning
            </h1>
          )}

          <div className="flex flex-1 items-center justify-end space-x-4">
            {props.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-8">
                    <AvatarFallback>a</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {/* {session?.expires.username && (
              <p className="font-medium">{session?.expires.username}</p>
            )}
            {session?.expires.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {session?.expires.email}
              </p>
            )} */}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                      event.preventDefault()
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      }).then(() => {
                        localStorage.clear()
                        sessionStorage.clear()

                        document.cookie.split(";").forEach((c) => {
                          document.cookie = c
                            .replace(/^ +/, "")
                            .replace(
                              /=.*/,
                              `=;expires=${new Date().toUTCString()};path=/`
                            )
                        })
                      })
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="p-8">
                <div
                  className={buttonVariants({
                    size: "lg",
                  })}
                >
                  Log In
                  <span className="sr-only">Masuk</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
    )
}
