"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { ErrorResponse } from "@/types/error-res"
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"





interface KnowledgeDeleteSectionProcessProps {
  idSection: string
  token: string | undefined
}

async function deleteSection({
  idSection,
  token,
}: KnowledgeDeleteSectionProcessProps) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}`

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      sonnerToast.success("Berhasil menghapus section")

      return true
    } else {
      const errorResponse: ErrorResponse = await res.json()

      sonnerToast.error(errorResponse.error)

      return false
    }
  } catch (error) {
    sonnerToast.error("Gagal menghapus section")

    return false
  }
}

interface KnowledgeDeleteSectionProps {
  idSection: string
}

export function KnowledgeDeleteSection({
  idSection,
}: KnowledgeDeleteSectionProps) {
  const { data: session } = useSession()

  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()

  return (
    <ContextMenuItem
      disabled={isPending}
      inset
      onClick={async (event) => {
        event.preventDefault()

        startTransition(async () => {
          const res = await deleteSection({
            idSection,
            token: session?.user.token,
          })

          if (res) {
            router.refresh()
          }
        })
      }}
    >
      Delete
      <ContextMenuShortcut>
        {isPending ? "Deleting..." : "Delete"}
      </ContextMenuShortcut>
    </ContextMenuItem>
  )
}
