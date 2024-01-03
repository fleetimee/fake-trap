"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { SectionOneResData } from "@/types/section/res"
import { ContentType } from "@/lib/enums/status"
import { createContentVideo } from "@/lib/fetcher/content-fetcher"
import { contentVideoSchema } from "@/lib/validations/content-video"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Icons } from "../icons"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof contentVideoSchema>

interface AddContentVideoFormProps {
  idSection: number
  section: SectionOneResData
}

export function AddContentVideoForm({ idSection }: AddContentVideoFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransaction] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(contentVideoSchema),
    defaultValues: {
      content_title: "",
      content_type: ContentType.VIDEO,
      id_section: idSection,
      video_url: "",
      flavor_text: "",
    },
  })

  async function onSubmit(data: Inputs) {
    startTransaction(async () => {
      try {
        const response = await createContentVideo({
          token: session?.user?.token,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Konten video berhasil ditambahkan",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponse = await response.json()

          sonnerToast.error("Gagal", {
            description: errorResponse.error,
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: `${error}`,
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-5"
      >
        <FormField
          control={form.control}
          name="content_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Konten</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  id="content_title"
                  placeholder="Judul Konten"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="video_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Video</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  id="video_url"
                  placeholder="URL Video"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ini harus berupa URL video youtube
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flavor_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Deskripsi"
                  {...field}
                  className="h-20 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
