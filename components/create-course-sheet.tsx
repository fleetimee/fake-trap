import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"

import { toast } from "./ui/use-toast"

const formSchema = z.object({
  course_name: z.string().min(2).max(36).nonempty(),
  course_desc: z.string().min(2).max(1000).nonempty(),
  date_start: z.string().nonempty(),
  date_end: z.string().nonempty(),
  image: z.string().optional(),
  id_category: z.number(),
})

export function CreateCourseButton() {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_name: "",
      course_desc: "",
      date_start: "",
      date_end: "",
      image: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/courses`,
        {
          method: "POST",
          headers: headersObj,
          body: JSON.stringify(values),
        }
      )

      console.log(response)

      if (response.ok) {
        toast({
          title: "Kursus berhasil dibuat",
          description: "Kursus berhasil dibuat",
        })
      }
    } catch (error) {}
  }
}
