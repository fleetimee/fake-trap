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
import { CustomTextarea } from "../ui/custom-textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

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
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-blue-700">
                Mulai Diskusi
              </FormLabel>
              <FormControl>
                <CustomTextarea
                  {...field}
                  placeholder="Bagikan pemikiran, pengalaman, atau pertanyaan Anda tentang topik ini. Contoh: Menurut pengalaman saya dalam menerapkan konsep ini..."
                  className="min-h-[160px] shadow-sm"
                />
              </FormControl>
              <FormDescription className="flex items-center gap-2 text-blue-600/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Sampaikan dengan jelas untuk diskusi yang lebih bermakna
                <span className="text-red-500">*</span>
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="flex w-fit items-center gap-2 rounded-xl 
                     bg-gradient-to-r from-blue-600 to-blue-500 px-6
                     py-2.5 text-white shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-600
                     hover:shadow-md"
          disabled={isPending}
        >
          {isPending && <Icons.spinner className="h-4 w-4 animate-spin" />}
          {isPending ? "Memulai Diskusi..." : "Mulai Diskusi Baru"}
        </Button>
      </form>
    </Form>
  )
}
