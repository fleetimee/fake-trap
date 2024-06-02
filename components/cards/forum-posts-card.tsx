"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Blocks, { RenderFn } from "editorjs-blocks-react-renderer"
import { generateFromString } from "generate-avatar"
import { File } from "lucide-react"
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

  return (
    <Link href={data.file.url} target="_blank" className="p-11">
      <div className="flex items-center rounded-md border bg-white p-2 md:w-[700px]">
        {/* <FileIcon className="text-black" /> */}

        <File className={cn("h-6 w-6", color)} />
        <div className="flex flex-col px-2">
          <span className="truncate text-sm font-semibold">
            {data.file.title}
          </span>
          <span className="text-xs text-gray-500">
            {(data.file.size * 1024).toFixed(2)} KB
          </span>{" "}
        </div>
        <Button variant="ghost" className="ml-auto">
          <ChevronDownIcon />
        </Button>
      </div>
    </Link>
  )
}

function ChevronDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
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
      <Card>
        <CardTitle className={`group p-4 pb-0`}>
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
                      className="space-x-2"
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
                        className="space-x-2"
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
        <CardContent className="p-4 pt-2">
          <div>
            <small className="text-sm text-foreground/60">
              Dibuat saat {getMetaData(post.created_at)}
            </small>
          </div>
          <p className="cst-wrap-text mt-1">
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
          </p>
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
