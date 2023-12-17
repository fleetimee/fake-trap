import { z } from "zod"





export const changePasswordSchema = z.object({
  old_password: z.string().min(4).max(255),
  password: z
    .string()
    .min(8)
    .max(255)
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        ),
      {
        message:
          "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol",
      }
    ),
})
