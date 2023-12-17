import { z } from "zod"





export const profileSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({})
    .min(1, {
      message: "Please select an email to display.",
    })
    .email(),
})
