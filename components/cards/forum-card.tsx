"use client"

import { useState } from "react"
import Image from "next/image"
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
  name: string
  username: string
  profile_picture: string
}

export function ForumCard({
  idCourse,
  idThreads,
  title,
  createdAt,
  numberOfPosts,
  numberOfUsers,
  linkString,
  name,
  username,
  profile_picture,
}: ForumCardProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openDeleteThreadAlert, setOpenDeleteThreadAlert] =
    useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const isAdmin = session?.expires.role.some(
    (role) => role.role_name === "Admin" || role.role_name === "Operator LMS"
  )

  const profilePictureLink = `${process.env.NEXT_PUBLIC_BASE_URL}${profile_picture}`

  return (
    <>
      <Card>
        <div className="absolute right-0 top-0 h-8 w-8 rotate-12 bg-blue-500/10" />
        <CardTitle className="relative p-4 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative size-12 overflow-hidden rounded-full">
                <Image
                  src={
                    profilePictureLink
                      ? profilePictureLink
                      : `data:image/svg+xml;utf8,${generateFromString(
                          username ? username : "Nama"
                        )}`
                  }
                  alt={username || "User"}
                  width={100}
                  height={100}
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-1">
                <h2 className="text-sm">{name}</h2>
                <p className="text-sm text-muted-foreground">@{username}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              {isAdmin && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
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

        <CardContent className="relative p-4 pt-2">
          <div className="mb-4">
            <small className="inline-block rounded-md bg-muted px-3 py-1 text-sm font-medium">
              Dibuat saat {getMetaData(createdAt)}
            </small>
          </div>
          <div className="w-full">
            <div className="mt-1 w-full rounded-md bg-background p-4">
              <p className="text-lg font-medium">
                <Balancer>{title}</Balancer>
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative flex-col items-start border-t p-0 pb-2">
          <div className="space-x-2 px-4 py-2">
            <Link href={linkString}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="default">
                    <MessagesSquare className="aspect-square w-5" />
                    <span>{numberOfPosts}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Jumlah balasan yang diberikan</TooltipContent>
              </Tooltip>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="default">
                  <Icons.user className="aspect-square w-5" />
                  <span>{numberOfUsers}</span>
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
                  idThreads: idThreads,
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
