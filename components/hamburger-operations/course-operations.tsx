"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { CourseListResData } from "@/types/course/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
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

interface DeleteCourseProps {
  courseId: number
  token: string | undefined
}

async function deleteCourse({ courseId, token }: DeleteCourseProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${courseId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (res.ok) {
    sonnerToast.success("Berhasil", {
      description: "Pembelajaran berhasil dihapus",
    })

    return true
  } else {
    sonnerToast.error("Gagal", {
      description: "Pembelajaran gagal dihapus",
    })

    return false
  }
}

interface CourseOperationProps {
  courseResp: CourseListResData
  knowledgeResp: KnowledgeListRes
}

export function CourseOperations({ courseResp }: CourseOperationProps) {
  const { data: session } = useSession()

  const router = useRouter()
  const pathname = usePathname()

  const [openDeleteCourse, setOpenDeleteCourse] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            disabled={
              courseResp.status_code === "0051" ||
              courseResp.status_code === "0052" ||
              courseResp.status_code === "0053"
            }
          >
            <Link
              href={`${pathname}/request/${courseResp.id_course}`}
              rel="noreferrer"
              className="flex w-full cursor-default items-center"
            >
              Ajukan
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex  items-center
                  "
            // onSelect={() => setOpenEditCourse(true)}
          >
            <Link
              href={`/operator-lms/course/update/${courseResp.id_course}`}
              rel="noreferrer"
              className="flex w-full cursor-default items-center"
            >
              Update
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex  items-center "
            onSelect={() => setOpenDeleteCourse(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openDeleteCourse} onOpenChange={setOpenDeleteCourse}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus pembelajaran ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Pembelajaran yang sudah dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteCourse({
                  courseId: courseResp.id_course,
                  token: session?.user.token,
                })

                if (deleted) {
                  setIsDeleteLoading(false)
                  setOpenDeleteCourse(false)
                  router.refresh()
                } else {
                  setIsDeleteLoading(false)
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
