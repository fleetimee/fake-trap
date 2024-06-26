import { z } from "zod"

export const knowledgeSchema = z.object({
  KnowledgeTitle: z
    .string()
    .min(1, {
      message: "Judul materi tidak boleh kosong",
    })
    .max(60, {
      message: "Judul materi tidak boleh lebih dari 60 karakter",
    }),
  Description: z.string().min(1, {
    message: "Deskripsi materi tidak boleh kosong",
  }),
  Status: z.string().min(1, {
    message: "Status tidak boleh kosong",
  }),
  image: z.union([z.instanceof(File), z.null()]).optional(),
  IdCategory: z.number().min(1, {
    message: "Modul tidak boleh kosong",
  }),
  CreatedBy: z.string().min(1, {
    message: "Created by tidak boleh kosong",
  }),
  UpdatedBy: z.string().optional(),
})

export const updateKnowledgeSchema = z.object({
  KnowledgeTitle: z.string().optional(),
  Description: z.string().optional(),
  Status: z.string().optional(),
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
    )
    .optional(),
  IdCategory: z.number().optional(),
  UpdatedBy: z.string().optional(),
})
