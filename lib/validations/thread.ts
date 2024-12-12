import { z } from "zod"

export const addThreadSchema = z.object({
  id_course: z.number().min(1),
  threads_title: z
    .string()
    .min(10, {
      message:
        "Diskusi harus memiliki minimal 10 karakter untuk kejelasan topik",
    })
    .max(2000, {
      message: "Diskusi terlalu panjang, mohon dipersingkat",
    }),
})
