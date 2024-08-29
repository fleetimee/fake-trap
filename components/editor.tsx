"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "@/styles/editor.css"

import { useSession } from "next-auth/react"
import { toast as sonnerToast } from "sonner"

import { ErrorResponse } from "@/types/error-res"
import { createPost, editPost, getPostById } from "@/lib/fetcher/post-fetcher"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"

const formSchema = z.object({
  id_threads: z.number().optional(),
  content: z.any().optional(),
  user_uuid: z.string().optional(),
})

interface EditorProps {
  id_threads: number
  editedPostId?: string
}

export function Editor({ id_threads, editedPostId }: EditorProps) {
  const { data: session } = useSession()

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_threads: id_threads,
      user_uuid: session?.expires.id,
    },
  })

  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    // @ts-ignore
    const Header = (await import("@editorjs/header")).default
    // @ts-ignore
    const Embed = (await import("@editorjs/embed")).default
    // @ts-ignore
    const Table = (await import("@editorjs/table")).default
    // @ts-ignore
    const List = (await import("@editorjs/list")).default
    // @ts-ignore
    const Code = (await import("@editorjs/code")).default
    // @ts-ignore
    const LinkTool = (await import("@editorjs/link")).default
    // @ts-ignore
    const InlineCode = (await import("@editorjs/inline-code")).default
    // @ts-ignore
    const Image = (await import("@editorjs/image")).default
    // @ts-ignore
    const Attaches = (await import("@editorjs/attaches")).default

    const body = formSchema.parse(formSchema)

    let initialData = null

    if (editedPostId) {
      const res = await getPostById({
        token: session?.user.token,
        idPosts: editedPostId,
      })

      console.log(res)

      initialData = JSON.parse(res?.data.content || "{}")
    }

    console.log(initialData)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Ketik disini untuk membuat post...",
        inlineToolbar: true,
        data: initialData || body.content || {},
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `${process.env.NEXT_PUBLIC_BASE_URL}/forumImageUpload`,
              },
            },
          },
          attaches: {
            class: Attaches,
            config: {
              endpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/forumFileUpload`,
            },
          },
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedPostId])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  // if (!isMounted) {
  //   return null
  // }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSaving(true)

    try {
      const block = await ref.current?.save()
      const requestBody = {
        id_threads: id_threads,
        content: JSON.stringify(block),
        user_uuid: session?.expires.id,
      }

      const res = editedPostId
        ? await editPost({
            token: session?.user.token,
            idPosts: editedPostId,
            body: JSON.stringify(requestBody),
          })
        : await createPost({
            token: session?.user.token,
            body: JSON.stringify(requestBody),
          })

      if (res?.ok) {
        sonnerToast.success("Berhasil", {
          description: "Post berhasil disimpan.",
        })

        ref.current?.clear()
        router.refresh()
        router.back()
      } else {
        const errorResponse: ErrorResponse = await res.json()
        sonnerToast.error("Gagal", {
          description: errorResponse.error,
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: "Terjadi kesalahan saat menyimpan post.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                router.back()
              }}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Button>
            <p className="text-sm text-muted-foreground">
              {editedPostId ? "Update" : "Buat"} Post
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{editedPostId ? "Update" : "Post"}</span>
          </button>
        </div>
        <div className="prose prose-stone dark:prose-invert whatever-you-want mx-auto w-[800px]">
          <TextareaAutosize
            id="title"
            disabled
            className="dis w-full resize-none appearance-none overflow-hidden bg-transparent text-xs font-bold focus:outline-none"
            {...register("content")}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Gunakan{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            untuk membuka command menu
          </p>

          <p className="text-sm text-gray-500">
            Anda dapat menyisipkan gambar dengan menarik dan meletakkan gambar
            ke dalam editor.
          </p>
        </div>
      </div>
    </form>
  )
}
