"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { QuizListResData } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { deleteExercise } from "@/lib/fetcher/exercise-fetcher"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface QuizOperationsProps {
  quiz: QuizListResData
  referenceResp: ReferenceListRes
  linkString: string
}

export function QuizOperations({ quiz, linkString }: QuizOperationsProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openDeleteQuiz, setOpenDeleteQuiz] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="flex items-center
            "
            // onSelect={() => setOpenEditQuizSheet(true)}
          >
            <Link
              href={`${linkString}/update/${quiz.id_quiz}`}
              className="flex w-full cursor-default items-center"
            >
              Update
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex  items-center "
            onSelect={() => setOpenDeleteQuiz(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDeleteQuiz} onOpenChange={setOpenDeleteQuiz}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus quiz ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Quiz yang sudah dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteExercise({
                  idExercise: quiz.id_quiz.toString(),
                  token: session?.user.token,
                })

                if (deleted) {
                  sonnerToast.success("Berhasil", {
                    description: "Berhasil menghapus quiz",
                  })

                  setIsDeleteLoading(false)
                  setOpenDeleteQuiz(false)
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal", {
                    description: "Gagal menghapus quiz",
                  })

                  setIsDeleteLoading(false)
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 size-4" />
              )}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
