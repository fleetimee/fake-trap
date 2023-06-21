"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { KnowledgeData } from "@/types/knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { Button } from "@/components/ui/button"

import { toast } from "./ui/use-toast"

/**
 * Defines a zod schema for the form data used in the CreateKnowledgeButton component.
 * The schema defines the shape and validation rules for the form data.
 */
const formSchema = z.object({
  knowledge_title: z.string().min(2).max(40).nonempty(),
  description: z.string().min(2).max(4000).nonempty(),
  status: z.number().int(),
  image: z.string().optional(),
  id_category: z.number().int(),
})

export function EditKnowledgeButton(props: { item: KnowledgeData }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knowledge_title: props.item.knowledge_title,
      description: props.item.description,
      status: props.item.status,
      image: props.item.image,
      id_category: props.item.id_category,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/secure/knowledge/${props.item.id_knowledge}`,
        {
          method: "PUT",
          headers: headersObj,
          body: JSON.stringify(values),
        }
      )

      console.log(response)

      if (response.ok) {
        toast({
          title: "Pengetahuan berhasil diubah",
          description: "Pengetahuan berhasil diubah",
          duration: 5000,
        })

        router.refresh()
        setOpen(false)
        form.reset()
      } else {
        toast({
          title: "Pengetahuan gagal diubah",
          description: "Pengetahuan gagal diubah",
          duration: 5000,
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" className="mr-2">
      Edit
    </Button>
  )
}
