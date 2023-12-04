import { z } from "zod"

export const userSubmittedAnswerSchema = z.object({
  uuid: z.string(),
  id_quiz: z.number(),
  selected_answers: z.record(z.string(), z.number()).optional(),
})
