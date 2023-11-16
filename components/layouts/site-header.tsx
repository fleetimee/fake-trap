"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { generateFromString } from "generate-avatar"
import { signOut } from "next-auth/react"

import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { extractToken } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
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

import { Icons } from "../icons"

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
}

export function SiteHeader({ ...props }: SiteHeaderProps) {
  const pathname = usePathname()

  const isUrlIncludePemateriDivisi = pathname.includes("/pemateri-divisi")
  const isUrlIncludeSupervisorPemateriDivisi = pathname.includes(
    "/supervisor-pemateri-divisi"
  )
  const isUrlIncludeOperatorLMS = pathname.includes("/operator-lms")
  const isUrlIncludeSupervisorOperatorLMS = pathname.includes("/supervisor-lms")
  const isUrlIncludePeserta = pathname.includes("/peserta")
  const isUrlIncludeExecutive = pathname.includes("/executive")

  if (props.user) {
    console.log(props.displayName)
    console.log(props.emailName)
    console.log(props.isMoreThanOneRole)

    return (
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav items={siteConfig.mainNav} />
          <MobileNav
            mainNavItems={siteConfig.mainNav}
            sidebarNavItems={dashboardConfig.sidebarNav}
          />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2"></nav>

            {props.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`data:image/svg+xml;utf8,${generateFromString(
                        props.displayName
                      )}`}
                    />
                    <AvatarFallback />
                  </Avatar>
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
                    <DropdownMenuItem
                      asChild
                      disabled={!props.isMoreThanOneRole}
                    >
                      <Link href={"/panel-selector"}>
                        <Icons.empty
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Panel Selector
                        <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          isUrlIncludeSupervisorOperatorLMS
                            ? "/supervisor-lms/profile"
                            : isUrlIncludeOperatorLMS
                            ? "/operator-lms/profile"
                            : isUrlIncludeSupervisorPemateriDivisi
                            ? "/supervisor-pemateri-divisi/profile"
                            : isUrlIncludePemateriDivisi
                            ? "/pemateri-divisi/profile"
                            : isUrlIncludeExecutive
                            ? "/executive/profile"
                            : isUrlIncludePeserta
                            ? "/peserta/profile"
                            : "/dashboard"
                        }
                      >
                        <Icons.user
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Profile
                        <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          isUrlIncludePemateriDivisi
                            ? "/pemateri-divisi"
                            : isUrlIncludeSupervisorPemateriDivisi
                            ? "/supervisor-pemateri-divisi"
                            : isUrlIncludeOperatorLMS
                            ? "/operator-lms"
                            : isUrlIncludeSupervisorOperatorLMS
                            ? "/supervisor-lms"
                            : isUrlIncludeExecutive
                            ? "/executive"
                            : isUrlIncludePeserta
                            ? "/peserta"
                            : "/dashboard"
                        }
                      >
                        <Icons.dashboard
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Dashboard
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          isUrlIncludePemateriDivisi
                            ? "/pemateri-divisi/setting"
                            : isUrlIncludeSupervisorPemateriDivisi
                            ? "/supervisor-pemateri-divis/setting"
                            : isUrlIncludeOperatorLMS
                            ? "/operator-lms/setting"
                            : isUrlIncludeSupervisorOperatorLMS
                            ? "/supervisor-lms/setting"
                            : isUrlIncludeExecutive
                            ? "/executive/setting"
                            : isUrlIncludePeserta
                            ? "/peserta/setting"
                            : "/dashboard"
                        }
                      >
                        <Icons.settings
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer"
                    onSelect={(event) => {
                      event.preventDefault()
                      signOut({
                        callbackUrl: `${window.location.origin}`,
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
                    <Link href="#">
                      <Icons.logout
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Log out
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
                  Sign In
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
          <MainNav items={siteConfig.mainNav} />
          <MobileNav
            mainNavItems={siteConfig.mainNav}
            sidebarNavItems={dashboardConfig.sidebarNav}
          />
          {props.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
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
            <Link
              href="/login"
              rel="noopener noreferrer"
              replace
              prefetch={false}
            >
              <div
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Sign In
                <span className="sr-only">Masuk</span>
              </div>
            </Link>
          )}
        </div>
      </header>
    )
}
