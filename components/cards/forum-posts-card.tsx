"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Blocks, { RenderFn } from "editorjs-blocks-react-renderer"
import { generateFromString } from "generate-avatar"
import { Download, File } from "lucide-react"
import { useSession } from "next-auth/react"
import Balancer from "react-wrap-balancer"
import { toast as sonnerToast } from "sonner"

import { PostsListResData } from "@/types/posts/res"
import { deletePost } from "@/lib/fetcher/post-fetcher"
import { cn, getMetaData } from "@/lib/utils"
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
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface FileAttachmentData {
  file: { title: string; size: number; extension: string; url: string }
}

function formatFileSize(sizeInBytes: number) {
  const sizeInKB = sizeInBytes / 1024
  if (sizeInKB < 1024) {
    return `${sizeInKB.toFixed(2)} KB`
  } else {
    const sizeInMB = sizeInKB / 1024
    return `${sizeInMB.toFixed(2)} MB`
  }
}

const FileAttachment: RenderFn<FileAttachmentData> = ({ data }) => {
  const getColor = (extension: string) => {
    switch (extension) {
      case ".doc":
      case ".docx":
        return "text-blue-500"
      case ".pdf":
        return "text-red-500"
      case ".ppt":
      case ".pptx":
        return "text-orange-500"
      case ".xls":
      case ".xlsx":
        return "text-green-500"
    }
  }

  console.log(data.file.extension)

  const color = getColor(data.file.extension) // replace `fileExtension` with the actual variable holding the file extension

  console.log(data.file.size)

  return (
    <Link href={data.file.url} target="_blank" className="p-11">
      <div className="flex w-full items-center rounded-md border bg-white p-2">
        {/* <FileIcon className="text-black" /> */}

        <File className={cn("h-6 w-6", color)} />
        <div className="flex flex-col px-2">
          <span className="truncate text-sm font-semibold">
            {data.file.title}
          </span>
          <span className="text-xs text-gray-500">
            {formatFileSize(data.file.size)}
          </span>
        </div>
        <Button variant="ghost" className="ml-auto">
          <Download className="h-6 w-6" />
        </Button>
      </div>
    </Link>
  )
}

export default FileAttachment

interface ForumPost {
  post: PostsListResData
}

export function ForumPost({ post }: ForumPost) {
  let contentParsed

  try {
    contentParsed = JSON.parse(post.content)
  } catch (e) {
    contentParsed = null
  }

  const profilePictureLink = `${process.env.NEXT_PUBLIC_BASE_URL}${post.profile_picture}`

  const router = useRouter()

  const { data: session } = useSession()

  const [openDeletePostAlert, setOpenDeletePostAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const isAdmin = session?.expires.role.some(
    (role) => role.role_name === "Admin" || role.role_name === "Operator LMS"
  )
  const isPostAuthor = session?.expires.id === post.user_uuid
  const isAdminOrAuthor = isAdmin || isPostAuthor

  return (
    <>
      <Card className="group relative border-2 border-black bg-white transition-all hover:-rotate-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-950 dark:hover:shadow-[4px_4px_0px_0px_rgba(148,163,184)]">
        <div className="absolute right-0 top-0 h-8 w-8 -rotate-12 bg-blue-500/20" />
        <CardTitle className="relative p-4 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative size-12 overflow-hidden rounded-full bg-white">
                <Image
                  src={
                    profilePictureLink
                      ? profilePictureLink
                      : `data:image/svg+xml;utf8,${generateFromString(
                          post.username ? post.username : "Nama"
                        )}`
                  }
                  alt="User name"
                  width={100}
                  height={100}
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-1">
                <h2 className={`${"text-sm group-hover:underline"}`}>
                  {post.name}
                </h2>
                <p className={`text-sm text-foreground/60`}>{post.username}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              {isAdminOrAuthor && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-black bg-white transition-all hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-red-900"
                      onClick={() => setOpenDeletePostAlert(true)}
                    >
                      <Icons.trash className="aspect-square w-4 text-red-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Hapus post ini</TooltipContent>
                </Tooltip>
              )}

              {isPostAuthor && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/editor/${post.id_threads}/?editedPostId=${post.id_post}`}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="space-x-2 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
                      >
                        <Icons.edit className="aspect-square w-4" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Edit post ini</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </CardTitle>
        <CardContent className="relative p-4 pt-2">
          <div className="mb-4">
            <small className="inline-block rounded-lg border-2 border-black bg-yellow-100 px-3 py-1 text-sm font-medium dark:border-slate-800 dark:bg-yellow-100/20">
              Dibuat saat {getMetaData(post.created_at)}
            </small>
          </div>
          <div className="flex w-full justify-center">
            <div className="cst-wrap-text whatever-you-want mt-1 rounded-lg border-2 border-black bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              {contentParsed ? (
                <Balancer>
                  <Blocks
                    data={contentParsed}
                    renderers={{
                      attaches: FileAttachment,
                    }}
                  />
                </Balancer>
              ) : (
                <p>{post.content}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={openDeletePostAlert}
        onOpenChange={setOpenDeletePostAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus post</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus post ini?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deletePost({
                  idPosts: post.id_post.toString(),
                  token: session?.user.token,
                })

                if (deleted) {
                  sonnerToast.success("Berhasil", {
                    description: "Post berhasil dihapus",
                  })

                  setIsDeleteLoading(false)
                  setOpenDeletePostAlert(false)
                  router.refresh()
                } else {
                  sonnerToast.error("Gagal", {
                    description: "Post gagal dihapus",
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
