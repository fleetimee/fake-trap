import { z } from "zod"

export const userSubmittedAnswerSchema = z
  .object({
    uuid: z.string(),
    id_quiz: z.number(),
    selected_answers: z.record(z.string(), z.number()).optional(),
  })
  .refine(
    (data) => {
      // Check if selected_answers is not empty
      return Object.keys(data.selected_answers || {}).length > 0
    },
    {
      // Custom error message
      message: "All questions must be answered",
    }
  )
