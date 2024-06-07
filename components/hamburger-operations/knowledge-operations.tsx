"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { deleteKnowledge } from "@/lib/fetcher/knowledge-fetcher"
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

interface KnowledgeOperationsProps {
  knowledgeData: KnowledgeListResData
  categoryRes: CategoryListRes
  referenceResp: ReferenceListRes
  updateRowLink?: string
  isApproval?: boolean
  isAdmin?: boolean
}

export function KnowledgeOperations({
  knowledgeData,
  updateRowLink,
  isApproval = false,
  isAdmin = false,
}: KnowledgeOperationsProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const pathName = usePathname()

  const [openDeleteKnowledgeAlert, setOpenDeleteKnowledgeAlert] =
    React.useState<boolean>(false)

  const isStatusCodeIn = (codes: string[]) =>
    codes.includes(knowledgeData.status_code)

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
          {isApproval && (
            <>
              {/* Catatan Novian Fix */}
              <DropdownMenuItem disabled={!isStatusCodeIn(["0053"]) || isAdmin}>
                <Link
                  href={
                    isStatusCodeIn(["0053"])
                      ? `approve/revision/77`
                      : `${pathName}/request/${knowledgeData.id_knowledge}`
                  }
                  rel="noreferrer"
                  className="flex w-full cursor-default items-center"
                >
                  {isStatusCodeIn(["0053"]) ? "Ajukan Ulang" : "Ajukan"}
                  <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem
            className="flex items-center"
            // onSelect={() => setOpenEditKnowledgeSheet(true)}
          >
            <Link
              href={
                updateRowLink
                  ? updateRowLink
                  : `/operator-lms/knowledge/update/${knowledgeData.id_knowledge}`
              }
              rel="noreferrer"
              className="flex w-full cursor-default items-center"
            >
              Update
              <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center text-red-500 hover:text-red-700"
            onSelect={() => setOpenDeleteKnowledgeAlert(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={openDeleteKnowledgeAlert}
        onOpenChange={setOpenDeleteKnowledgeAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus materi ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Materi yang dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)
                const deleted = await deleteKnowledge({
                  idKnowledge: knowledgeData.id_knowledge.toString(),
                  token: session?.user.token,
                })

                if (deleted) {
                  sonnerToast.success("Berhasil", {
                    description: "Materi berhasil dihapus",
                  })

                  setIsDeleteLoading(false)
                  setOpenDeleteKnowledgeAlert(false)
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal", {
                    description: "Materi gagal dihapus",
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
