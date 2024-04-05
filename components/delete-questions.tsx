"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { deleteAllQuizQuestion } from "@/lib/fetcher/question-fetcher"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "./ui/button"

interface DeleteQuestionsProps {
  idQuiz: number
}

export function DeleteQuestions({ idQuiz }: DeleteQuestionsProps) {
  const { data: session } = useSession()

  const [isPending, startTransition] = React.useTransition()

  const [open, setOpen] = React.useState(false)

  const router = useRouter()

  return (
    <AlertDialog open={open} onOpenChange={setOpen} defaultOpen={false}>
      <AlertDialogTrigger asChild>
        <Button
          className="max-w-xs justify-self-end py-4 align-middle"
          variant="destructive"
        >
          Hapus Semua Soal
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah anda yakin untuk menghapus semua soal ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini tidak dapat diurungkan, pastikan anda yakin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={async (event) => {
              event.preventDefault()

              startTransition(async () => {
                const res = await deleteAllQuizQuestion({
                  token: session?.user?.token,
                  idQuiz: idQuiz,
                })

                if (res) {
                  sonnerToast.success("Berhasil menghapus soal")

                  router.refresh()
                  setOpen(false)
                } else {
                  sonnerToast.error("Gagal menghapus soal")
                }
              })
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
