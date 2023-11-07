"use client"

import React from "react"
import { Metadata } from "next"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Promosikan Ke Admin",
  description: "Promosikan Ke Admin",
}

interface PromoteToAdminFormProps {
  uuid: string
}

interface PromoteToAdminProps {
  uuid: string
  token: string | undefined
}

async function promoteAdmin({ uuid, token }: PromoteToAdminProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/promoteAdmin`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (res.ok) {
    sonnerToast.success("Berhasil mempromosikan ke admin")

    return true
  } else {
    sonnerToast.error("Gagal mempromosikan ke admin")

    return false
  }
}

export function PromoteToAdminForm({ uuid }: PromoteToAdminFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const { data: session } = useSession()

  const router = useRouter()

  return (
    <Button
      disabled={isLoading}
      onClick={async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const res = await promoteAdmin({
          uuid,
          token: session?.user.token,
        })

        if (res) {
          setIsLoading(false)
          router.back()
          router.refresh()
        } else {
          setIsLoading(false)
        }
      }}
      className="flex items-center justify-center space-x-2"
    >
      {isLoading ? (
        <Icons.spinner className="animate-spin" />
      ) : (
        "Promosikan Ke Admin"
      )}
    </Button>
  )
}
