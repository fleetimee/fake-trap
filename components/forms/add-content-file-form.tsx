"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { SectionOneResData } from "@/types/section/res"
import { createContentFile } from "@/lib/fetcher/content-fetcher"
import { isArrayOfFile } from "@/lib/utils"
import { contentFileSchema } from "@/lib/validations/content-file"
import { FileDialog, FileWithPreview } from "@/components/file-dialog"
import { Icons } from "@/components/icons"
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
import { Input } from "@/components/ui/input"

type Inputs = z.infer<typeof contentFileSchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

interface AddContentFileFormProps {
  idSection: number
  section: SectionOneResData
}

export function AddContentFileForm({ idSection }: AddContentFileFormProps) {
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)

  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransaction] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(contentFileSchema),
    defaultValues: {
      ContentTitle: "",
      ContentType: "0013",
      IdSection: idSection,
      files: [],
    },
  })

  async function onSubmit(data: InputsWithIndexSignature) {
    startTransaction(async () => {
      try {
        const formData = new FormData()

        Object.keys(data).forEach((key) => {
          if (key !== "files") {
            formData.append(key, data[key])
          }
        })

        if (isArrayOfFile(data.files)) {
          data.files.forEach((file) => {
            formData.append("files", file)
          })
        }

        const res = await createContentFile({
          token: session?.user.token,
          body: formData,
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Konten file berhasil ditambahkan",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponse = await res.json()

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
        className="grid w-full max-w-2xl gap-8"
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
                  id="ContentTitle"
                  placeholder="Judul Konten"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Upload File</FormLabel>

          {files?.length ? (
            <div className="flex flex-col items-start gap-5">
              {files.map((file, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icons.billing className="size-5 text-gray-400" />
                  <Link
                    href={file.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className="
                            cursor-pointer
                            text-sm
                            text-blue-600
                            hover:text-blue-500
                            hover:underline
                    "
                    >
                      {file.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ) : null}

          <FormControl>
            <FileDialog
              setValue={form.setValue}
              name="files"
              maxFiles={3}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles}
              isUploading={isPending}
              disabled={isPending}
            />
          </FormControl>

          <FormDescription>
            Maksimal 3 file dengan ukuran maksimal 4MB
          </FormDescription>

          <FormMessage>{form.formState.errors.files?.message}</FormMessage>
        </FormItem>

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
