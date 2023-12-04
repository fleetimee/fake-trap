import { z } from "zod"

export const addThreadSchema = z.object({
  id_course: z.number().min(1),
  threads_title: z.string().min(1),
})
