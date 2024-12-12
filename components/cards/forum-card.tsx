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
      <Card className="group relative border-2 border-black bg-white transition-all hover:-rotate-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-950 dark:hover:shadow-[4px_4px_0px_0px_rgba(148,163,184)]">
        <div className="absolute right-0 top-0 h-8 w-8 rotate-12 bg-blue-500/20" />
        <CardTitle className="relative p-4 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative size-12 overflow-hidden rounded-full bg-white">
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

              <div className="space-y-1 text-sm">
                <h2 className={`group-hover:underline"}`}>{name}</h2>

                <p className="text-foreground/60">@{username}</p>
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

        <CardContent className="relative p-4 pt-2">
          <div className="mb-2">
            <small className="inline-block rounded-lg border-2 border-black bg-yellow-100 px-3 py-1 text-sm font-medium dark:border-slate-800 dark:bg-yellow-100/20">
              Dibuat saat {getMetaData(createdAt)}
            </small>
          </div>
          <p className="cst-wrap-text mt-1 text-lg font-medium">
            <Balancer>{title}</Balancer>
          </p>
        </CardContent>

        <CardFooter className="relative flex-col items-start border-t-2 border-black bg-blue-50 p-0 pb-2 dark:border-slate-800 dark:bg-blue-950/20">
          <Separator className="mb-2" />

          <div className="space-x-2 px-4 py-2">
            <Link href={linkString}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className="border-2 border-black bg-white font-medium transition-all hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-blue-900"
                  >
                    <MessagesSquare className="aspect-square w-5" />
                    <span>{numberOfPosts}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Jumlah balasan yang diberikan</TooltipContent>
              </Tooltip>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="border-2 border-black bg-white font-medium transition-all hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-blue-900"
                >
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
