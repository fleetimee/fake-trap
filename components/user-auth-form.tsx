"use client"

// import * as React from "react"
import { SyntheticEvent, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { set } from "date-fns"
import { signIn, signOut, useSession } from "next-auth/react"

import { cn, extractToken } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

import { toast } from "./ui/use-toast"

/**
 * Props for the UserAuthForm component.
 * @interface UserAuthFormProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * User authentication form component.
 * @param {UserAuthFormProps} props - Component props.
 * @param {string} props.className - Additional class name for the component.
 * @returns {JSX.Element} - Rendered component.
 */
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const userName = useRef("")
  const password = useRef("")

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-4 pb-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="octavia"
              type="text"
              autoCapitalize="none"
              disabled={isLoading}
              onChange={(e) => {
                userName.current = e.target.value
              }}
            />
          </div>
          <div className="grid gap-4 pb-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              onChange={(e) => {
                password.current = e.target.value
              }}
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={() =>
              signIn("credentials", {
                username: userName.current,
                password: password.current,
                callbackUrl: "/",
                redirect: false,
              }).then((res) => {
                console.log(res)

                if (res?.error === "Login failed") {
                  setIsLoading(false)

                  toast({
                    title: "Error",
                    description: "Username atau password salah",
                    variant: "destructive",
                  })
                } else {
                  setIsLoading(false)

                  router.push("/")
                }
              })
            }
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Masuk
          </Button>
        </div>
      </form>
    </div>
  )
}
