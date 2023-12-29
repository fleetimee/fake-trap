"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { deleteSection } from "@/lib/fetcher/section-fetcher"
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"

interface KnowledgeDeleteSectionProps {
  idSection: string
}

export function DeleteSection({ idSection }: KnowledgeDeleteSectionProps) {
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
            token: session?.user?.token,
            idSection: idSection,
          })

          if (res) {
            sonnerToast.success("Berhasil menghapus section")

            router.refresh()
          } else {
            sonnerToast.error("Gagal menghapus section")
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
