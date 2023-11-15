"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { courseSchema } from "@/lib/validations/course"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof courseSchema>

export function AddCourseForm() {
  const { data: session } = useSession()

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: "",
      course_desc: "",
      image: "",
      tutor_uuid: "",
    },
  })

  async function onSubmit(data: Inputs) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Pelatihan berhasil dibuat",
        })

        router.back()
        router.refresh()
        form.reset()
      } else {
        sonnerToast.error("Gagal", {
          description: "Pelatihan gagal dibuat",
        })
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="course_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pelatihan</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ketikkan judul pelatihan disini"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Pelatihan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ketikkan deskripsi pelatihan disini"
                  {...field}
                  disabled={isLoading}
                  className="h-40 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ketikkan deskripsi pelatihan disini"
                  {...field}
                  disabled={isLoading}
                  className="h-20 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
