"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { createThread } from "@/lib/fetcher/threads-fetcher"
import { addThreadSchema } from "@/lib/validations/thread"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof addThreadSchema>

interface AddThreadFormProps {
  idCourse: number
}

export function AddThreadForm({ idCourse }: AddThreadFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransaction] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(addThreadSchema),
    defaultValues: {
      id_course: idCourse,
      threads_title: "",
    },
  })

  async function onSubmit(data: Inputs) {
    startTransaction(async () => {
      try {
        const res = await createThread({
          token: session?.user?.token,
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Thread berhasil ditambahkan",
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
        className="grid w-full max-w-2xl gap-5"
      >
        <FormField
          control={form.control}
          name="threads_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ajukan Pertanyaan</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tulis pertanyaanmu disini"
                  rows={4}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                <span className="text-red-500">*</span> Wajib diisi
              </FormDescription>
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
