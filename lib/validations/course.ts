import { z } from "zod"

export const courseSchema = z.object({
  course_name: z.string().min(1, {
    message: "Nama pelatihan harus diisi",
  }),
  course_desc: z.string().min(1, {
    message: "Deskripsi pelatihan harus diisi",
  }),
  date_start: z.date(),
  date_end: z.date(),
  image: z.string().optional(),
  id_knowledge: z.number({
    required_error: "Materi harus dipilih",
  }),
  tutor_uuid: z.string().min(1, {
    message: "Tutor harus dipilih",
  }),
})
