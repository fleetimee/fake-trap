import { z } from "zod"

export const contentFileSchema = z.object({
  ContentTitle: z.string().min(3).max(50),
  ContentType: z.string().min(3).max(50),
  IdSection: z.number().min(1),
  files: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.length === 0) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File and contain at least one file")

    .nullable()
    .default(null),
})
