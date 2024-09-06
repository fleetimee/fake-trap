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
import {
  createNote,
  getUserNotes,
  updateNote,
} from "@/lib/fetcher/note-fetcher"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"

const formSchema = z.object({
  content: z.string().optional(),
})

interface NotesEditorProps {
  id_course: number
  isUpdate?: string
}

export function NotesEditor({ id_course, isUpdate }: NotesEditorProps) {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

    if (isUpdate) {
      const res = await getUserNotes({
        token: session?.user.token,
        idCourse: id_course.toString(),
      })

      initialData = JSON.parse(res?.data.content || "{}")
    }

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Ketik untuk memulai membuat catatan...",
        inlineToolbar: true,
        data: initialData || body.content || ({} as any),
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
  }, [])

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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSaving(true)

    try {
      const block = await ref.current?.save()

      const res = isUpdate
        ? await updateNote({
            token: session?.user?.token,
            body: JSON.stringify({
              id_course: id_course,
              content: JSON.stringify(block),
            }),
          })
        : await createNote({
            token: session?.user?.token,
            body: JSON.stringify({
              id_course: id_course,
              content: JSON.stringify(block),
            }),
          })

      if (res?.ok) {
        sonnerToast.success("Berhasil", {
          description: isUpdate
            ? "Catatan berhasil diperbarui"
            : "Catatan berhasil dibuat",
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
        <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 flex items-center space-x-10 sm:mb-0">
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
              {isUpdate ? "Perbarui" : "Buat"} Catatan
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{isUpdate ? "Perbarui" : "Buat"} Catatan</span>
          </button>
        </div>
        <div className="prose prose-stone dark:prose-invert whatever-you-want mx-auto w-full max-w-[800px] rounded-md border border-dashed border-gray-300 p-4">
          <TextareaAutosize
            id="title"
            disabled
            className="dis w-full resize-none appearance-none overflow-hidden bg-transparent text-xs font-bold focus:outline-none"
            {...register("content")}
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-500">
              {errors.content.message}
            </p>
          )}
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
