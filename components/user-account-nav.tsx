"use client"

import Link from "next/link"
import { User } from "next-auth"
import { getToken } from "next-auth/jwt"
import { signOut, useSession } from "next-auth/react"

import handler from "@/lib/helper"
import { extractToken, jwtDecode, parseUserExtracted } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"

/**
 * Props for the UserAccountNav component.
 */
interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The user object containing the user's name, image, and email.
   */
  user: Pick<User, "name" | "image" | "email">
}

/**
 * Renders a dropdown menu containing user account information and links to various pages.
 * @param user The user object containing the user's name, image, and email.
 * @returns A React component that displays the user account dropdown menu.
 */
export default function UserAccountNav({ user }: UserAccountNavProps) {
  const imageUrl = "https://avatars.githubusercontent.com/u/45744788?v=4"

  const { data: session } = useSession()

  const userExtracted = parseUserExtracted()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: userExtracted.username,
            image: user.image ?? imageUrl,
          }}
          className="h-8 w-8"
        />
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
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
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
  )
}
