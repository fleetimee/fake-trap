import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { KnowledgeByIdSectionContentData } from "@/types/knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"

import { toast } from "./ui/use-toast"

const contentTypes = [
  { value: 1, label: "Video" },
  { value: 2, label: "File" },
  { value: 3, label: "Link" },
  { value: 4, label: "Text" },
] as const

/**
 * Defines the schema for the knowledge content form.
 */
const formSchema = z.object({
  content_title: z.string().min(2).max(40).nonempty(),
  content_type: z.number().int(),
  image: z.string().optional(),
  link: z.string().optional(),
  id_section: z.number().int(),
})

export function EditSectionContentSheet(props: {
  item: KnowledgeByIdSectionContentData
}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_title: props.item.content_title,
      content_type: props.item.content_type,
      image: props.item.image,
      link: props.item.link,
      id_section: props.item.id_section,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/knowledge/content/${props.item.id_content}`,
        {
          method: "PUT",
          headers: headersObj,
          body: JSON.stringify(values),
        }
      )

      console.log(response)

      if (response.ok) {
        toast({
          title: "Berhasil mengubah konten",
          description: "Konten berhasil diubah",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
      }
    } catch (error) {}
  }
}
