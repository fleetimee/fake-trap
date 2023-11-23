import { z } from "zod"

export const knowledgeSchema = z.object({
  knowledge_title: z
    .string()
    .min(1, {
      message: "Judul pengetahuan tidak boleh kosong",
    })
    .max(60, {
      message: "Judul pengetahuan tidak boleh lebih dari 60 karakter",
    }),
  description: z.string().min(1, {
    message: "Deskripsi pengetahuan tidak boleh kosong",
  }),
  status: z.string().min(1, {
    message: "Status tidak boleh kosong",
  }),
  image: z
    .instanceof(File, {
      message: "Gambar tidak boleh kosong",
    })
    .refine(
      (file) => {
        if (file) {
          const validFileTypes = [
            "image/jpeg",
            "image/png",
            "image/bmp",
            "image/jpg",
          ]
          return file.size < 1000000 && validFileTypes.includes(file.type)
        }
        return true
      },
      {
        message:
          "Ukuran file tidak boleh lebih dari 1MB dan harus berformat jpg, png, bmp, atau jpeg",
      }
    ),
  id_category: z.number().min(1, {
    message: "Kategori tidak boleh kosong",
  }),
  created_by: z.string().min(1, {
    message: "Created by tidak boleh kosong",
  }),
  updated_by: z.string().optional(),
})
