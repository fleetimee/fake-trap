"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast as sonnerToast } from "sonner"

import { deleteSelectedQuestion } from "@/lib/fetcher/question-fetcher" // Import the fetcher
import { Icons } from "@/components/icons"
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
import { Button } from "@/components/ui/button"

interface DeleteQuestionButtonProps {
  idQuestion: number
  token: string
}

export function DeleteQuestionButton({
  idQuestion,
  token,
}: DeleteQuestionButtonProps) {
  const router = useRouter()
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="space-x-2"
        onClick={() => setOpenDeleteAlert(true)}
      >
        <Icons.trash className="aspect-square w-4 text-red-500" />
      </Button>

      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus pertanyaan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus pertanyaan ini?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteSelectedQuestion({
                  idQuestion,
                  token,
                })

                if (deleted) {
                  sonnerToast.success("Berhasil", {
                    description: "Pertanyaan berhasil dihapus",
                  })

                  setIsDeleteLoading(false)
                  setOpenDeleteAlert(false)
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal", {
                    description: "Pertanyaan gagal dihapus",
                  })

                  setIsDeleteLoading(false)
                }
              }}
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 size-4" />
              )}
              <span>Hapus</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
