import { z } from "zod"





export const articleSchema = z.object({
  content_title: z.string(),
  content_type: z.string().optional(),
  image: z.string().optional().nullable(),
  link: z.string().optional().nullable(),
  id_section: z.number().optional(),
  body: z.any().optional(),
  author_id: z.string().uuid().optional(),
})
