"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { createSectionKnowledge } from "@/lib/fetcher/section-fetcher"
import { knowledgeSectionSchema } from "@/lib/validations/section"
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

type Inputs = z.infer<typeof knowledgeSectionSchema>

interface AddSectionFormProps {
  idKnowledge: number
}

export function AddKnowledgeSectionForm({ idKnowledge }: AddSectionFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(knowledgeSectionSchema),
    defaultValues: {
      section_title: "",
      knowledge: [
        {
          id_knowledge: idKnowledge,
        },
      ],
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const response = await createSectionKnowledge({
          token: session?.user?.token,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Section berhasil ditambahkan",
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
      } catch (error) {}
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
                placeholder="Judul Section"
                {...field}
              />
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
