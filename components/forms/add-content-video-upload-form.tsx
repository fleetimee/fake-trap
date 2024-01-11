"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ContentType } from "@/lib/enums/status"
import { contentVideoUploadSchema } from "@/lib/validations/content-video"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Inputs = z.infer<typeof contentVideoUploadSchema>

interface AddContentVideoUploadFormProps {
  idSection: number
}

export function AddContentVideoUploadForm({
  idSection,
}: AddContentVideoUploadFormProps) {
  const { data: session } = useSession()

  const [isPending, startTransaction] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(contentVideoUploadSchema),
    defaultValues: {
      content_title: "",
      content_type: ContentType.VIDEO,
      id_section: idSection,
      video_path: "",
      flavor_text: "",
    },
  })

  return (
    <Form {...form}>
      <form className="grid w-full max-w-2xl gap-5">
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

        <FormField
          control={form.control}
          name="video_path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  id="video_path"
                  type="file"
                  accept="video/*"
                  placeholder="Video"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Preview</FormLabel>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
            <img
              alt="Video thumbnail"
              className="h-full w-full object-cover"
              src="/images/placeholder.svg"
            />
          </div>
        </FormItem>

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
