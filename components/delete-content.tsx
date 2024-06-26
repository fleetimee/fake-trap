"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { deleteContent } from "@/lib/fetcher/content-fetcher"
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"

// interface DeleteContentProcessProps {
//   idContent: string
//   token: string | undefined
// }
//
// async function deleteContent({ idContent, token }: DeleteContentProcessProps) {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${idContent}`
//
//     const res = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//
//     if (res.ok) {
//       sonnerToast.success("Berhasil menghapus content")
//
//       return true
//     } else {
//       const errorResponse: ErrorResponse = await res.json()
//
//       sonnerToast.error(errorResponse.error)
//
//       return false
//     }
//   } catch (error) {}
// }

interface KnowledgeDeleteContentProps {
  idContent: string
}

export function KnowledgeDeleteContent({
  idContent,
}: KnowledgeDeleteContentProps) {
  const { data: session } = useSession()

  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()

  return (
    <ContextMenuItem
      inset
      disabled={isPending}
      onClick={async (e) => {
        e.preventDefault()

        startTransition(async () => {
          const res = await deleteContent({
            idContent: idContent,
            token: session?.user?.token,
          })

          if (res) {
            sonnerToast.success("Berhasil menghapus content")
            router.refresh()
          } else {
            sonnerToast.error("Gagal menghapus content")
          }
        })
      }}
    >
      Delete
      <ContextMenuShortcut>
        {isPending ? "Deleting" : "Delete"}
      </ContextMenuShortcut>
    </ContextMenuItem>
  )
}
