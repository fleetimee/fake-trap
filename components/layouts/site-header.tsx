"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

import { dashboardConfig } from "@/config/dashboard"
import { UserExtracted, extractToken } from "@/lib/utils"

import { MainNav } from "../main-nav"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { buttonVariants } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import UserAccountNav from "../user-account-nav"

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

    userExtracted.username = userExtracted.username.replace(/['"]+/g, "")
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={dashboardConfig.mainNav} />
        {/* <UserAccountNav user={props.user} /> */}

        {props.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8">
                <AvatarFallback>a</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                {/* <div className="flex flex-col space-y-1 leading-none">
            {session?.expires.username && (
              <p className="font-medium">{session?.expires.username}</p>
            )}
            {session?.expires.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {session?.expires.email}
              </p>
            )}
          </div> */}
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
          <Link href="/signin">
            <div
              className={buttonVariants({
                size: "sm",
              })}
            >
              Sign In
              <span className="sr-only">Sign In</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}
