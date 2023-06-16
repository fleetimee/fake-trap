"use client"

// import * as React from "react"
import { SyntheticEvent, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

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

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 pb-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={() =>
              signIn("credentials", {
                email: "a@gmail.com",
                password: "123456",
              })
            }
          >
            {isLoading && (
              <Icons.gitHub className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.logo className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  )
}
