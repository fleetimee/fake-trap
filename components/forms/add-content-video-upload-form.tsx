"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ContentType } from "@/lib/enums/status"
import { contentVideoUploadSchema } from "@/lib/validations/content-video"
import { Icons } from "@/components/icons"
import { LocalVideoPlayer } from "@/components/local-video-player"
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

import { Progress } from "../ui/progress"

type Inputs = z.infer<typeof contentVideoUploadSchema>

interface AddContentVideoUploadFormProps {
  idSection: number
}

export function AddContentVideoUploadForm({
  idSection,
}: AddContentVideoUploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const router = useRouter()

  const { data: session } = useSession()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(contentVideoUploadSchema),
    defaultValues: {
      ContentTitle: "",
      ContentType: ContentType.LOCAL_FILE,
      IdSection: idSection,
      FlavorText: "",
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const formData = new FormData()

        formData.append("ContentTitle", data.ContentTitle)
        formData.append("ContentType", data.ContentType)
        formData.append("IdSection", data.IdSection.toString())
        formData.append("FlavorText", data.FlavorText)
        formData.append("video_path", data.video_path)

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/video`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.token}`,
            },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                )

                setUploadProgress(percentCompleted)
              }
            },
          }
        )

        console.log(response)

        if (response.status === 201) {
          sonnerToast.success("Konten berhasil ditambahkan")

          router.refresh()

          form.reset()
        } else {
          sonnerToast.error("Konten gagal ditambahkan")
        }

        // const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/video`

        // const response = await fetch(url, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${session?.user?.token}`,
        //   },
        //   body: formData,
        // })

        // if (response.ok) {
        //   sonnerToast.success("Konten berhasil ditambahkan")

        //   router.refresh()

        //   form.reset()
        // } else {
        //   sonnerToast.error("Konten gagal ditambahkan")
        // }
      } catch (error) {
        console.log(error)

        sonnerToast.error("Konten gagal ditambahkan")
      } finally {
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="ContentTitle"
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
          name="FlavorText"
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
                  onChange={(e) => {
                    if (e.target.files) {
                      form.setValue("video_path", e.target.files[0])

                      console.log(e.target.files[0])

                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setPreview(reader.result as string)
                      }

                      reader.readAsDataURL(e.target.files[0])
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Progress</FormLabel>
          <Progress value={uploadProgress} />
        </FormItem>

        <FormItem>
          <FormLabel>Preview</FormLabel>
          <div className="aspect-[16/9] w-full rounded-lg bg-gray-200 dark:bg-gray-800">
            {isPending ? null : preview ? (
              <LocalVideoPlayer url={preview} />
            ) : (
              <img
                alt="Video thumbnail"
                className="h-full w-full rounded-lg object-cover"
                src="/images/placeholder.svg"
              />
            )}
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
