import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { UserData } from "@/types/user-res"
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  users: z.array(
    z.object({
      uuid: z.string().nonempty(),
    })
  ),
})

async function deleteUserFromCourse(path: string, token: string | undefined) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${path}/users`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.ok) {
    toast({
      title: "Success",
      description: "User berhasil dihapus dari pelatihan ini",
    })
  } else {
    toast({
      title: "Gagal",
      description: "User gagal dihapus dari pelatihan ini",
    })
  }
}

export function UserOperations(props: { user: UserData }) {
  const router = useRouter()

  const pathname = usePathname()

  const parts = pathname.split("/")

  const id_course = parts[3]

  const { data: session } = useSession()

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [{ uuid: props.user.uuid }],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsDeleteLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${id_course}/users`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Success",
          description: "User berhasil dihapus dari pelatihan ini",
        })
        setIsDeleteLoading(false)
        setOpenDeleteAlert(false)
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "User gagal dihapus dari pelatihan ini",
        variant: "destructive",
      })
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(props.user.uuid)
              toast({
                title: "Copied!",
                description: "User ID berhasil dicopy!",
              })
            }}
          >
            <span className="mr-2">
              <Icons.copy className="h-4 w-4" />
            </span>
            Copy user ID
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setOpenDeleteAlert(true)}
          >
            <span className="mr-2">
              <Icons.trash className="h-4 w-4" />
            </span>
            Hapus User
          </DropdownMenuItem>
          {/* <DeleteStudentsOutOfCourseButton uuid={user.uuid} /> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDeleteAlert} onOpenChange={setOpenDeleteAlert}>
        <Form {...form}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Apakah anda yakin ingin menghapus user dari pelatihan ini ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                User yang dihapus tidak akan dapat mengakses pelatihan ini lagi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Tidak</AlertDialogCancel>
              {/* <AlertDialogAction
                  onClick={async (event) => {
                    event.preventDefault()
                    setIsDeleteLoading(true)
                    const deleted = await deleteUserFromCourse(
                      id_course,
                      session?.user?.token
                    )
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
                  )}{" "}
                  <span>Hapus</span>
                </AlertDialogAction> */}
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Button variant="destructive" type="submit">
                  {isDeleteLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.trash className="mr-2 h-4 w-4" />
                  )}{" "}
                  <span>Hapus</span>
                </Button>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Form>
      </AlertDialog>
    </>
  )
}
