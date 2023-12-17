import { z } from "zod"

export const knowledgeSectionSchema = z.object({
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

export const updateKnowledgeSectionSchema = z.object({
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

export const courseSectionSchema = z.object({
  section: z
    .array(
      z.object({
        section_title: z
          .string()
          .min(1, {
            message: "Judul section tidak boleh kosong",
          })
          .max(18, {
            message: "Judul section tidak boleh lebih dari 18 karakter",
          }),
      })
    )
    .nonempty(),
})
