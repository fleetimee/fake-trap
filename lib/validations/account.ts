import { z } from "zod"





export const accountSchema = z.object({
  name: z.string().min(3).max(255),
})
