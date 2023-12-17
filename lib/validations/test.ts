import { z } from "zod"

export const testSchema = z.object({
  quiz_title: z
    .string()
    .min(1, {
      message: "Judul test tidak boleh kosong",
    })
    .max(255),
  quiz_desc: z.string().min(1, {
    message: "Deskripsi test tidak boleh kosong",
  }),
  quiz_type: z.string().min(1, {
    message: "Tipe test tidak boleh kosong",
  }),
  created_by: z.string().min(1, {
    message: "Created by tidak boleh kosong",
  }),
  updated_by: z.string().optional(),
})
