"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { UserListResData } from "@/types/user/res"
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

interface ErrorResponseProps {
  error: string
}

interface DeleteUserProps {
  uuid: string
  token: string | undefined
}

async function deleteUser({ uuid, token }: DeleteUserProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`,
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
      description: "User berhasil dihapus",
    })

    return true
  } else {
    sonnerToast.error("Gagal", {
      description: "User gagal dihapus",
    })

    return false
  }
}

const formSchema = z.object({
  username: z
    .string({
      required_error: "Nama harus diisi",
    })
    .nonempty({
      message: "Nama harus diisi",
    }),
  email: z
    .string({
      required_error: "Email harus diisi",
    })
    .nonempty({
      message: "Email harus diisi",
    })
    .email({
      message: "Email tidak valid",
    }),
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(8, {
      message: "Password minimal 8 karakter",
    })
    .nonempty({
      message: "Password harus diisi",
    }),
})

interface UserOperationsAdminProps {
  user: UserListResData
}

export function UserOperationsAdmin({ user }: UserOperationsAdminProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openEditUserSheet, setOpenEditUserSheet] =
    React.useState<boolean>(false)

  const [openDeleteUserSheet, setOpenDeleteUserSheet] =
    React.useState<boolean>(false)

  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${user.uuid}`,
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
          description: "User berhasil diubah",
        })

        router.refresh()
        form.reset()
        setOpenEditUserSheet(false)
      } else {
        const errorResponse: ErrorResponseProps = await response.json()

        sonnerToast.error("Gagal", {
          description: errorResponse.error,
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: `${error}`,
      })
    } finally {
      setIsEditLoading(false)
    }
  }

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
        <DropdownMenuContent align="end" className="w-auto">
          <DropdownMenuItem className="flex items-center">
            <Link
              className="flex w-full cursor-default items-center"
              href={`/dashboard/user/promote-supervisor/${user.uuid}`}
            >
              Promosikan Sebagai Supervisor
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center"
            onSelect={() => setOpenEditUserSheet(true)}
            asChild
          >
            <p>Edit</p>
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
                  setIsDeleteLoading(false)
                  setOpenDeleteUserSheet(false)
                  router.refresh()
                } else {
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

      <Sheet open={openEditUserSheet} onOpenChange={setOpenEditUserSheet}>
        <SheetContent size="content">
          <SheetHeader>
            <SheetTitle>Ubah User</SheetTitle>
            <SheetDescription>Ubah data user</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 py-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="1337h4cker5"
                        disabled={isEditLoading}
                      />
                    </FormControl>

                    <FormDescription>
                      Username yang akan digunakan untuk login
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="hello@bpd.co.id"
                        type="email"
                        disabled={isEditLoading}
                      />
                    </FormControl>
                    <FormDescription>Email yang akan digunakan</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                        disabled={isEditLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Password yang akan digunakan untuk login
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-end">
                {isEditLoading ? (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                ) : (
                  "Tambah"
                )}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}
