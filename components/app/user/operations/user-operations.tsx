"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { UserListResData } from "@/types/user/res"
import { deleteUser } from "@/lib/fetcher/users-fetcher"
import { Icons } from "@/components/icons"
import { AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
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

interface UserOperationsAdminProps {
  user: UserListResData
  editRowLink?: string
}

export function UserOperationsAdmin({
  user,
  editRowLink,
}: UserOperationsAdminProps) {
  const { data: session } = useSession()

  console.log(session)

  const router = useRouter()

  const [openDeleteUserSheet, setOpenDeleteUserSheet] =
    React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {/* <DropdownMenuItem className="flex items-center">
            <Link
              className="flex w-full cursor-default items-center"
              href={`/dashboard/user/${user.uuid}`}
            >
              Lihat
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator /> */}

          <DropdownMenuItem className="flex items-center">
            <Link
              className="flex w-full cursor-default items-center"
              href={
                editRowLink
                  ? `${editRowLink}/reset-password/${user.uuid}`
                  : `/operator-lms/users/reset-password/${user.uuid}`
              }
            >
              Reset Password
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center"
            // onSelect={() => setOpenEditUserSheet(true)}
            asChild
            // disabled
          >
            <Link
              href={
                editRowLink
                  ? `${editRowLink}/update/${user.uuid}`
                  : `/operator-lms/users/update/${user.uuid}`
              }
              className="flex w-full cursor-default items-center"
            >
              <p>Update</p>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex  items-center hover:bg-red-600 hover:text-white"
            onSelect={() => setOpenDeleteUserSheet(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={openDeleteUserSheet}
        onOpenChange={setOpenDeleteUserSheet}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus user ini?
            </AlertDialogTitle>
            <AlertDescription>
              User yang dihapus tidak dapat dikembalikan.
            </AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="m-4">Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteUser({
                  uuid: user.uuid,
                  token: session?.user.token,
                })

                if (deleted) {
                  sonnerToast.success("Berhasil", {
                    description: "User berhasil dihapus",
                  })

                  setIsDeleteLoading(false)
                  setOpenDeleteUserSheet(false)
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal", {
                    description: "User gagal dihapus",
                  })

                  setIsDeleteLoading(false)
                }
              }}
              className="m-4 bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
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
