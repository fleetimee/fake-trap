"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import {
  deleteSection,
  deleteSectionCourseKnowledge,
} from "@/lib/fetcher/section-fetcher"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"

interface KnowledgeDeleteSectionProps {
  idSection: string
  isCourseKnowledge?: boolean
  idCourse?: number
  idKnowledge?: number
}

export function DeleteSection({
  idSection,
  isCourseKnowledge = false,
  idCourse,
  idKnowledge,
}: KnowledgeDeleteSectionProps) {
  const { data: session } = useSession()
  const [isPending, startTransition] = React.useTransition()
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const router = useRouter()

  console.log("isCourseKnowledge", isCourseKnowledge)

  const handleDelete = async () => {
    startTransition(async () => {
      const res = isCourseKnowledge
        ? await deleteSectionCourseKnowledge({
            token: session?.user.token,
            idCourse: idCourse!,
            idKnowledge: idKnowledge!,
          })
        : await deleteSection({
            token: session?.user.token,
            idSection,
          })

      if (res) {
        sonnerToast.success("Berhasil menghapus section")
        router.refresh()
      } else {
        sonnerToast.error("Gagal menghapus section")
      }
    })
  }

  return (
    <>
      <ContextMenuItem
        disabled={isPending}
        inset
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShowDeleteDialog(true)
        }}
      >
        Delete
        <ContextMenuShortcut>
          {isPending ? "Deleting..." : "Delete"}
        </ContextMenuShortcut>
      </ContextMenuItem>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Section akan dihapus secara
              permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {isPending ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
