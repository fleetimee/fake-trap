import React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

const formSchema = z.object({
  course_name: z
    .string()
    .min(2)
    .max(36)
    .nonempty({ message: "Nama kursus tidak boleh kosong" }),
  course_desc: z
    .string()
    .min(2)
    .max(1000)
    .nonempty({ message: "Deskripsi kursus tidak boleh kosong" }),
  date_start: z
    .string()
    .nonempty({ message: "Tanggal mulai kursus tidak boleh kosong" }),
  date_end: z
    .string()
    .nonempty({ message: "Tanggal berakhir kursus tidak boleh kosong" }),
  image: z.string().optional(),
  id_category: z.number(),
})

export function CreateCourseSheet() {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)
}
