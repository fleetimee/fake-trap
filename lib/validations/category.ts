import { z } from "zod"

export const categorySchema = z.object({
  category_name: z.string().min(1, {
    message: "Nama kategori harus diisi",
  }),
  image: z.string().optional(),
  created_by: z.string().min(1, {
    message: "Pembuat harus diisi",
  }),
})
