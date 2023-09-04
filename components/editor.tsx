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

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  id_threads: z.number().optional(),
  content: z.any().optional(),
  user_uuid: z.string().optional(),
})

interface EditorProps {
  id_threads: number
}

export function Editor({ id_threads }: EditorProps) {
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

    const body = formSchema.parse(formSchema)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [id_threads])

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

    const block = await ref.current?.save()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/posts/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          id_threads: id_threads,
          content: JSON.stringify(block),
          user_uuid: session?.expires.id,
        }),
      }
    )

    setIsSaving(false)

    if (!res?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
        variant: "destructive",
      })
    }

    ref.current?.clear()
    router.refresh()

    return toast({
      description: "Your post has been saved.",
    })
  }

  return (
    <Card className="grid items-center justify-center p-8">
      <CardHeader>
        <CardTitle>
          <h2 className="text-2xl font-bold">Buat Post Baru</h2>
        </CardTitle>
        <CardDescription>
          <p className="text-sm text-gray-500">
            Buat post baru untuk berbagi informasi dengan anggota lain.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full gap-10">
            <div className="prose prose-stone dark:prose-invert mx-auto w-[800px] ">
              <TextareaAutosize
                id="title"
                disabled
                className="dis w-full resize-none appearance-none overflow-hidden bg-transparent text-xs font-bold focus:outline-none"
                {...register("content")}
              />
              <div
                id="editor"
                className=" min-h-[50px] rounded-2xl border  p-4"
              />
              <p className="text-sm text-gray-500">
                Use{" "}
                <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                  Tab
                </kbd>{" "}
                to open the command menu.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 items-center justify-between">
              <button type="submit" className={cn(buttonVariants())}>
                {isSaving && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
