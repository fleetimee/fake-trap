"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CategoryListResData } from "@/types/category/res"
import { RuleOneResData } from "@/types/rule/res"
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const formSchema = z.object({
  category_name: z.string().nonempty().min(3).max(36),
  image: z.string().url().optional(),
})

interface DeleteCategoryProps {
  idKategori: number
  token: string | undefined
}

async function deleteCategory({ idKategori, token }: DeleteCategoryProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${idKategori}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.ok) {
    sonnerToast.success("Berhasil", {
      description: "Kategori berhasil dihapus",
    })

    return true
  } else {
    sonnerToast.error("Gagal", {
      description: "Kategori gagal dihapus",
    })

    return false
  }
}

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

  const [openEditCategorySheet, setOpenEditCategorySheet] =
    React.useState<boolean>(false)

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: kategori.category_name,
      image: kategori.image,
    },
  })

  const buildEditRowLink = () => {
    if (editRowLink) {
      return `${editRowLink}update/${kategori.id_category}`
    } else {
      return `/operator-lms/category/update/${kategori.id_category}`
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${kategori.id_category}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Kategori berhasil diubah",
        })

        router.refresh()
        form.reset()
        setOpenEditCategorySheet(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "Kategori gagal diubah",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: `${error}`,
      })

      console.error(error)
    } finally {
      setIsEditLoading(false)
    }
  }

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
          <Link href={`/dashboard/category/${kategori.id_category}`}>
            <DropdownMenuItem>Detail</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(kategori.id_category.toString())

              sonnerToast.info("ID Kategori berhasil dicopy")
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
                  : `/operator-lms/category/update/${kategori.id_category}`
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
              Kategori yang dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)
                const deleted = await deleteCategory({
                  idKategori: kategori.id_category,
                  token: session?.user.token,
                })

                if (deleted) {
                  setIsDeleteLoading(false)
                  setOpenDeleteAlert(false)
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
              <span>Hapus</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Sheet
        open={openEditCategorySheet}
        onOpenChange={setOpenEditCategorySheet}
      >
        <SheetContent size="content">
          <SheetHeader>
            <SheetTitle>Perbarui Kategori</SheetTitle>
            <SheetDescription>
              Perbarui kategori yang sudah ada
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 py-8"
            >
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama Kategori <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Kategori"
                        {...field}
                        disabled={isEditLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Nama Kategori yang akan ditambahkan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Gambar"
                        {...field}
                        disabled={isEditLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Gambar yang akan ditambahkan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-end">
                {isEditLoading ? (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}
