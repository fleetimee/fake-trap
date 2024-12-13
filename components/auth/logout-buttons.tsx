"use client"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function LogOutButtons() {
  const router = useRouter()

  return (
    <div className="flex w-full items-center space-x-4">
      <Button
        aria-label="Log out"
        size="sm"
        className="w-full border-2 border-red-950 bg-red-600 p-6 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgba(127,29,29,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_rgba(127,29,29,1)]"
        onClick={(event) => {
          event.preventDefault()

          signOut({
            callbackUrl: "/",
          }).then(() => {
            localStorage.clear()
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
        className="w-full border-2 border-blue-950 bg-white p-6 text-lg font-bold text-blue-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
        onClick={() => router.back()}
      >
        Kembali
      </Button>
    </div>
  )
}
