import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { UserData } from "@/types/user-res"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet } from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

async function deleteUser(uuid: string, token: string | undefined) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/user/${uuid}`,
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
      title: "Success",
      description: "User berhasil dihapus",
    })

    return true
  } else {
    toast({
      title: "Gagal",
      description: "User gagal dihapus",
      variant: "destructive",
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

export function UserOperationsAdmin(props: { user: UserData }) {
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
      username: props.user.username,
      email: props.user.email,
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icons.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex cursor-pointer items-center
            "
            onSelect={() => setOpenEditUserSheet(true)}
          >
            <span className="mr-2">
              <Icons.edit className="h-4 w-4" />
            </span>
            Edit User
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setOpenDeleteUserSheet(true)}
          >
            <span className="mr-2">
              <Icons.trash className="h-4 w-4" />
            </span>
            Hapus User
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
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={openEditUserSheet}></Sheet>
    </>
  )
}
