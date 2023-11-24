import { z } from "zod"

export const categorySchema = z.object({
  category_name: z.string().min(1, {
    message: "Nama kategori harus diisi",
  }),
  image: z
    .instanceof(File, {
      message: "Gambar tidak boleh kosong",
    })
    .refine(
      (file) => {
        if (file) {
          const validFileTypes = [
            "image/jpeg",
            "image/png",
            "image/bmp",
            "image/jpg",
          ]
          return file.size < 1000000 && validFileTypes.includes(file.type)
        }
        return true
      },
      {
        message:
          "Ukuran file tidak boleh lebih dari 1MB dan harus berformat jpg, png, bmp, atau jpeg",
      }
    ),
  created_by: z.string().min(1, {
    message: "Pembuat harus diisi",
  }),
})
