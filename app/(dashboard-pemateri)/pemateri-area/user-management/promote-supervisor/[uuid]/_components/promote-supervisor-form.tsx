"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"





interface PromoteToSupervisorFormProps {
  uuid: string
}

interface PromoteToSupervisorProps {
  uuid: string
  token: string | undefined
}

async function promoteSupervisor({ uuid, token }: PromoteToSupervisorProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/promoteSupervisor`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (res.ok) {
    sonnerToast.success("Berhasil mempromosikan ke supervisor")

    return true
  } else {
    sonnerToast.error("Gagal mempromosikan ke supervisor")

    return false
  }
}

export function PromoteToSupervisorForm({
  uuid,
}: PromoteToSupervisorFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const { data: session } = useSession()

  const router = useRouter()

  return (
    <Button
      disabled={isLoading}
      onClick={async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const res = await promoteSupervisor({
          uuid,
          token: session?.user.token,
        })

        console.log("res", res)

        if (res) {
          setIsLoading(false)
          router.back()
          router.refresh()
        } else {
          setIsLoading(false)
        }
      }}
    >
      {isLoading ? (
        <Icons.spinner className="animate-spin" />
      ) : (
        "Promosikan Ke Supervisor"
      )}
    </Button>
  )
}
