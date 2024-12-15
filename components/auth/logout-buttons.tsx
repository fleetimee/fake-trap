"use client"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function LogOutButtons() {
  const router = useRouter()

  return (
    <div className="flex w-full items-center space-x-2">
      <Button
        aria-label="Log out"
        size="sm"
        className="w-full"
        onClick={(event) => {
          event.preventDefault()

          signOut({
            callbackUrl: "/",
          }).then(() => {
            // Store the value we want to keep
            const passwordDialogSeen = localStorage.getItem(
              "passwordChangeDialogSeen"
            )

            // Clear localStorage
            localStorage.clear()

            // Restore the value we want to keep
            if (passwordDialogSeen) {
              localStorage.setItem(
                "passwordChangeDialogSeen",
                passwordDialogSeen
              )
            }

            sessionStorage.clear()

            document.cookie.split(";").forEach((c) => {
              document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
            })
          })
        }}
      >
        Keluar
      </Button>

      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
      >
        Kembali
      </Button>
    </div>
  )
}
