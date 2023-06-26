"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { KnowledgeByIdSectionData } from "@/types/knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
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
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

/**
 * Defines a schema for the form data used to create a new section in the knowledge sidebar.
 */
const formSchema = z.object({
  section_title: z.string().min(2).max(18).nonempty(),
})

/**
 * EditSectionSheet component that renders a form to edit a section in the knowledge sidebar.
 */
export function EditSectionSheet(props: {
  item: KnowledgeByIdSectionData
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section_title: props.item.section_title,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsloading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${props.item.id_section}`,
        {
          headers: headersObj,
          method: "PUT",
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Section berhasil diubah",
          description: "Section berhasil diubah",
        })

        router.refresh()
        form.reset()
        props.setOpen(false)
      } else {
        toast({
          title: "Section gagal diubah",
          description: "Section gagal diubah",
        })
      }
    } catch (error) {
      toast({
        title: "Section gagal diubah",
        description: "Section gagal diubah",
      })

      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <SheetContent size="content">
      <SheetHeader>Edit Section</SheetHeader>
      <SheetDescription>Ubah nama sectionmu disini</SheetDescription>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 py-8"
        >
          <FormField
            control={form.control}
            name="section_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Section</FormLabel>
                <FormControl>
                  <Input placeholder="Pendahuluan" {...field} />
                </FormControl>
                <FormDescription>Judul section anda.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="self-end">
            {isLoading ? (
              <Icons.spinner className="h-5 w-5 animate-spin" />
            ) : (
              "Ubah"
            )}
          </Button>
        </form>
      </Form>
    </SheetContent>
  )
}
