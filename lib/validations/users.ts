import { z } from "zod"

export const usersSchema = z.object({
  name: z.string().min(1, {
    message: "Nama tidak boleh kosong",
  }),
  username: z.string().min(1, {
    message: "Username tidak boleh kosong",
  }),
  email: z.string().min(1, {
    message: "Email tidak boleh kosong",
  }),
  created_by: z.string().min(1, {
    message: "Created by tidak boleh kosong",
  }),
})
