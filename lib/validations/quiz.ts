import { z } from "zod"

export const multipleChoiceQuizSchema = z.object({
  quiz: z.array(
    z.object({
      id_quiz: z.number().min(1, {
        message: "ID Quiz tidak boleh kosong",
      }),
    })
  ),
})
