import { z } from "zod"

export const sectionSchema = z.object({
  section_title: z
    .string({
      required_error: "Judul section harus diisi",
    })
    .min(1, {
      message: "Judul section tidak boleh kosong",
    })
    .max(18, {
      message: "Judul section tidak boleh lebih dari 18 karakter",
    }),
  knowledge: z.array(
    z.object({
      id_knowledge: z.number().min(1).int(),
    })
  ),
})

export const updateSectionSchema = z.object({
  section_title: z
    .string({
      required_error: "Judul section harus diisi",
    })
    .min(1, {
      message: "Judul section tidak boleh kosong",
    })
    .max(18, {
      message: "Judul section tidak boleh lebih dari 18 karakter",
    })
    .optional(),
})
