"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { toast as sonnerToast } from "sonner"
import * as z from "zod"

import "@/styles/editor.css"

import { useSession } from "next-auth/react"

import { ErrorResponse } from "@/types/error-res"
import { cn } from "@/lib/utils"
import { articleSchema } from "@/lib/validations/article"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"

import { Label } from "../ui/label"

type Inputs = z.infer<typeof articleSchema>

interface AddArticleFormProps {
  idSection: number
}

export function AddArticleForm({ idSection }: AddArticleFormProps) {
  const { data: session } = useSession()

  const form = useForm<Inputs>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      content_title: "",
      content_type: "0014",
      image: "",
      link: "",
      id_section: idSection,
      author_id: session?.expires.id,
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
    const SimpleImage = (await import("@editorjs/simple-image")).default

    const body = articleSchema.pick({ body: true }).parse(form.getValues())

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Write your article here...",
        inlineToolbar: true,
        data: body.body,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: SimpleImage,
        },
      })
    }
  }, [form])

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

  if (!isMounted) {
    return null
  }

  async function onSubmit(data: Inputs) {
    setIsSaving(true)

    try {
      const block = await ref.current?.save()

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/article`

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({ ...data, body: JSON.stringify(block) }),
      })

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Artikel berhasil ditambahkan",
        })

        router.back()
        router.refresh()
        ref.current?.clear()
      } else {
        const errorResponse: ErrorResponse = await response.json()

        sonnerToast.error("Gagal menambahkan artikel", {
          description: errorResponse.error,
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal menambahkan artikel", {
        description: `${error}`,
      })
    } finally {
      setIsSaving(false)
    }

    console.log(data)
  }

  return (
    // <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid w-full max-w-2xl gap-8 sm:gap-4 md:gap-6"
    >
      <div className="prose prose-stone mx-auto w-full dark:prose-invert sm:w-3/4 md:w-1/2 lg:w-[800px]">
        <div className="mb-4 flex w-full max-w-2xl flex-col gap-3">
          <Label htmlFor="content_title">Judul</Label>
          <TextareaAutosize
            id="content_title"
            disabled={isSaving}
            className="w-full resize-none appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            {...form.register("content_title")}
          />
        </div>
        <div
          id="editor"
          className="whatever-you-want min-h-[50px] rounded-2xl border p-4 sm:min-h-[100px] md:min-h-[150px] lg:min-h-[200px]"
        />
        <p className="text-sm text-gray-500 sm:text-base md:text-lg">
          Use{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase sm:text-sm md:text-base">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>

      <button
        type="submit"
        className={cn(buttonVariants(), "w-fit ")}
        disabled={isSaving}
      >
        {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        <span>Save</span>
      </button>
    </form>
    // </Form>
  )
}
