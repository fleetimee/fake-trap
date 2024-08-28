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
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"

const formSchema = z.object({
  id_course: z.number(),
  content: z.any(),
})

interface NotesEditorProps {
  id_course: number
}

export function NotesEditor({ id_course }: NotesEditorProps) {
  const { data: session } = useSession()

  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_course: id_course,
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

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Ketik untuk memulai membuat catatan...",
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

    const block = await ref.current?.save()
  }
}
