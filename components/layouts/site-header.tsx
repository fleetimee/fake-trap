"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { extractToken } from "@/lib/utils"

import { MainNav } from "../main-nav"
import { MobileNav } from "../mobile-nav"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { buttonVariants } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function SiteHeader(props: {
  user:
    | {
        code: number
        expires: string
        token: string
      }
    | undefined
}) {
  if (props.user) {
    const userExtracted = extractToken(props.user.token)

    const initial = `${userExtracted.username
      .charAt(0)
      .toUpperCase()}${userExtracted.username.charAt(1).toUpperCase()}`

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
                    <AvatarFallback>{initial}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {userExtracted.username && (
                        <p className="font-medium">{userExtracted.username}</p>
                      )}
                      {userExtracted.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {userExtracted.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
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
                    Sign out
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
              target="_blank"
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
