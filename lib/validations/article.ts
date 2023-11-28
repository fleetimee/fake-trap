import { z } from "zod"

export const articleSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.any(),
  created_at: z.date().refine((data) => data < new Date(), {
    message: "created_at must be before now",
  }),
  published_at: z.date().refine((data) => data < new Date(), {
    message: "published_at must be before now",
  }),
  updated_at: z.date().refine((data) => data < new Date(), {
    message: "updated_at must be before now",
  }),
  author_id: z.number().int().positive(),
})
