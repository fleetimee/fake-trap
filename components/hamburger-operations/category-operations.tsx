"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { CategoryListResData } from "@/types/category/res"
import { RuleOneResData } from "@/types/rule/res"
import { deleteCategory } from "@/lib/fetcher/category-fetcher"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CategoryOperationsProps {
  kategori: CategoryListResData
  rule: RuleOneResData
  editRowLink?: string
}

export function CategoryOperations({
  kategori,
  rule,
  editRowLink,
}: CategoryOperationsProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const buildEditRowLink = () => {
    if (editRowLink) {
      return `${editRowLink}update/${kategori.id_category}`
    } else {
      return `/operator-lms/category/update/${kategori.id_category}`
    }
  }

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
          <Link href={`/dashboard/category/${kategori.id_category}`}>
            <DropdownMenuItem>Detail</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard
                .writeText(kategori.id_category.toString())
                .then(() => {
                  sonnerToast.info("ID Modul berhasil dicopy")
                })
                .catch((error) => {
                  console.error("Failed to copy text: ", error)
                })
            }}
          >
            Copy
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center"
            disabled={!rule.can_write_knowledge}
          >
            <Link
              href={
                editRowLink
                  ? buildEditRowLink()
                  : `/operator-lms/category/update/${kategori.slug}_${kategori.id_category}`
              }
              passHref
              className="flex w-full items-center justify-between"
            >
              Edit
            </Link>
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex  items-center"
            disabled={!rule.can_write_knowledge}
            onSelect={() => setOpenDeleteAlert(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus kategori ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Modal yang dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)
                const deleted = await deleteCategory({
                  token: session?.user?.token,
                  idCategory: kategori.id_category.toString(),
                })

                if (deleted) {
                  sonnerToast.success("Berhasil", {
                    description: "Modul berhasil dihapus",
                  })

                  setIsDeleteLoading(false)
                  setOpenDeleteAlert(false)
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal", {
                    description: "Modul gagal dihapus",
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
              <span>Hapus</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
