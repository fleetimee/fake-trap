"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog"
import { generateFromString } from "generate-avatar"
import { MessagesSquare } from "lucide-react"
import { useSession } from "next-auth/react"
import Balancer from "react-wrap-balancer"
import { toast as sonnerToast } from "sonner"

import { deleteThread } from "@/lib/fetcher/threads-fetcher"
import { getMetaData } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ForumCardProps {
  idCourse: string
  idThreads: string
  title: string
  createdAt: string
  numberOfUsers: number
  numberOfPosts: number
  linkString: string
}

export function ForumCard({ ...props }: ForumCardProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openDeleteThreadAlert, setOpenDeleteThreadAlert] =
    useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const isAdmin = session?.expires.role.some(
    (role) => role.role_name === "Admin" || role.role_name === "Operator LMS"
  )

  return (
    <>
      <Card>
        <CardTitle className={`$ group p-4 pb-0`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage
                  src={`data:image/svg+xml;utf8,${generateFromString(props.idThreads)}`}
                />
                <AvatarFallback className="rounded-md">{"A"}</AvatarFallback>
              </Avatar>

              <div className="space-y-1 text-sm">
                <h2 className={`group-hover:underline"}`}>ANONIM</h2>

                <p className="text-foreground/60">anonim</p>
              </div>
            </div>

            <div className="flex space-x-2">
              {isAdmin && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="space-x-2"
                      onClick={() => setOpenDeleteThreadAlert(true)}
                    >
                      <Icons.trash className="aspect-square w-4 text-red-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Hapus thread ini</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </CardTitle>

        <CardContent className="p-4 pt-2">
          <div>
            <small className="text-sm text-foreground/60">
              Dibuat saat {getMetaData(props.createdAt)}
            </small>
          </div>
          <p className="cst-wrap-text mt-1">
            <Balancer>{props.title}</Balancer>
          </p>
        </CardContent>

        <CardFooter className="flex-col items-start p-0 pb-2">
          <Separator className="mb-2" />

          <div className="space-x-2 px-4 py-2">
            <Link href={props.linkString}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className="space-x-2"
                  >
                    <MessagesSquare className="aspect-square w-5" />
                    <span>{props.numberOfPosts}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Jumlah balasan yang diberikan</TooltipContent>
              </Tooltip>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="default" className="space-x-2">
                  <Icons.user className="aspect-square w-5" />
                  <span>{props.numberOfUsers}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Jumlah user yang terlibat</TooltipContent>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog
        open={openDeleteThreadAlert}
        onOpenChange={setOpenDeleteThreadAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda yakin ingin menghapus thread ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thread yang telah dihapus tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteThread({
                  token: session?.user.token,
                  idThreads: props.idThreads,
                })

                if (deleted) {
                  sonnerToast.success("Berhasil", {
                    description: "Thread berhasil dihapus.",
                  })

                  setIsDeleteLoading(false)
                  setOpenDeleteThreadAlert(false)
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal", {
                    description: "Thread gagal dihapus.",
                  })

                  setIsDeleteLoading(false)
                }
              }}
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
