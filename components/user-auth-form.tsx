"use client"

import { SyntheticEvent, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()

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
                callbackUrl: searchParams.get("from") || "/",
                redirect: false,
              }).then((res) => {
                if (res?.error === "Login failed") {
                  setIsLoading(false)

                  toast({
                    title: "Error",
                    description: "Username atau password salah",
                    variant: "destructive",
                  })
                } else {
                  setIsLoading(false)

                  router.push(searchParams.get("from") || "/")

                  toast({
                    title: "Berhasil",
                    description: "Anda berhasil masuk",
                  })
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
