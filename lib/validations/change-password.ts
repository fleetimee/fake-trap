import { z } from "zod"

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Password Lama harus diisi"),
    password: z.string().min(1, "Password Baru harus diisi"),
    password_confirmation: z
      .string()
      .min(1, "Konfirmasi Password Baru harus diisi"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password Baru dan Konfirmasi Password Baru harus sama",
    path: ["password_confirmation"], // This will attach the error to the field "password_confirmation"
  })
