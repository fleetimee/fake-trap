"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

interface PromoteToPemateriFormProps {
  uuid: string
}

interface PromoteToPemateriProps {
  uuid: string
  token: string | undefined
}

async function promotePemateri({ uuid, token }: PromoteToPemateriProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/promotePemateri`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (res.ok) {
    sonnerToast.success("Berhasil mempromosikan ke pemateri")

    return true
  } else {
    sonnerToast.error("Gagal mempromosikan ke pemateri")

    return false
  }
}

export function PromoteToPemateriForm({ uuid }: PromoteToPemateriFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const { data: session } = useSession()

  const router = useRouter()

  return (
    <Button
      disabled={isLoading}
      onClick={async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const res = await promotePemateri({
          uuid,
          token: session?.user.token,
        })

        if (res) {
          setIsLoading(false)
          router.push("/dashboard/user")
          router.refresh()
        } else {
          setIsLoading(false)
        }
      }}
    >
      {isLoading ? (
        <Icons.spinner className="animate-spin" />
      ) : (
        "Promosikan Ke Pemateri"
      )}
    </Button>
  )
}
