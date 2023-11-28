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
import { updateSectionSchema } from "@/lib/validations/section"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Icons } from "../icons"

type Inputs = z.infer<typeof updateSectionSchema>

interface UpdateSectionFormProps {
  idSection: number
  section: SectionOneResData
}

export function UpdateSectionForm({
  idSection,
  section,
}: UpdateSectionFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateSectionSchema),
    defaultValues: {
      section_title: section.section_title,
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}`

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Section berhasil diperbarui",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const error: ErrorResponse = await response.json()

          sonnerToast.error("Gagal", {
            description: error.error,
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
          name="section_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="section_title">Nama Section</FormLabel>
              <Input
                disabled={isPending}
                id="section_title"
                type="text"
                placeholder="Nama Section"
                {...field}
              />
              <FormDescription>Berikan judul yang sesuai</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  )
}
