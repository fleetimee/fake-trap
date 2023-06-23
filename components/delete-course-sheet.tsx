import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

/**
 * Defines the validation schema for the form data used to edit a course
 */
const formSchema = z.object({
  course_name: z.string().min(2).max(36).nonempty(),
  course_desc: z.string().min(2).max(1000).nonempty(),
  date_start: z.date(),
  date_end: z.date(),
  image: z.string().optional(),
  id_knowledge: z.number(),
})

export function DeleteCourseButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return <Button variant="destructive">Delete</Button>
}
