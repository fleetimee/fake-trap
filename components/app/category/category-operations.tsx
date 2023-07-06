"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { DataCategory } from "@/types/category-res"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { EditCategorySheet } from "./edit-category-sheet"

async function deleteCategory(id: number, token: string | undefined) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.ok) {
    toast({
      title: "Berhasil",
      description: "Kategori berhasil dihapus",
    })

    return true
  } else {
    toast({
      title: "Gagal",
      description: "Kategori gagal dihapus",
      variant: "destructive",
    })

    return false
  }
}

export function CategoryOperations(props: { kategori: DataCategory }) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openEditCategorySheet, setOpenEditCategorySheet] =
    React.useState<boolean>(false)

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icons.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(
                props.kategori.id_category.toString()
              )
              toast({
                title: "Berhasil",
                description: "ID Kategori berhasil dicopy",
              })
            }}
          >
            <span className="mr-2">
              <Icons.copy className="h-4 w-4" />
            </span>
            Copy ID Kategori
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setOpenDeleteAlert(true)}
          >
            <span className="mr-2">
              <Icons.trash className="h-4 w-4" />
            </span>
            Hapus Kategori
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)
                const deleted = await deleteCategory(
                  props.kategori.id_category,
                  session?.user.token
                )

                if (deleted) {
                  setIsDeleteLoading(false)
                  setOpenDeleteAlert(false)
                  router.refresh()
                } else {
                  setIsDeleteLoading(false)
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
