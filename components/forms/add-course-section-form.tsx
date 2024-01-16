"use client"

import * as process from "process"
import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { createSectionCourse } from "@/lib/fetcher/section-fetcher"
import { courseSectionSchema } from "@/lib/validations/section"
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

import { Icons } from "../icons"

type Inputs = z.infer<typeof courseSectionSchema>

interface AddSectionFormProps {
  idCourse: number
}

export function AddCourseSectionForm({ idCourse }: AddSectionFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(courseSectionSchema),
    defaultValues: {
      section: [{ section_title: "" }],
    },
  })

  async function onSubmit(values: Inputs): Promise<void> {
    startTransition(async () => {
      try {
        const res = await createSectionCourse({
          token: session?.user?.token,
          idCourse: idCourse,
          body: JSON.stringify(values),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Berhasil menambahkan section",
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
      } catch (e) {
        sonnerToast.error("Gagal", {
          description: "Terjadi kesalahan",
        })
      }
    })

    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-5"
      >
        <FormField
          control={form.control}
          name="section.0.section_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Section <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Pendahuluan"
                  {...field}
                  id="section_title"
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>Berikan judul yang sesuai</FormDescription>
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
