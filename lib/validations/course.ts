import { z } from "zod"

export const courseSchema = z.object({
  CourseName: z.string().min(1, {
    message: "Nama pembelajaran harus diisi",
  }),
  CourseDesc: z.string().min(1, {
    message: "Deskripsi pembelajaran harus diisi",
  }),
  DateStart: z.date(),
  DateEnd: z.date(),
  image: z.union([z.instanceof(File), z.null()]).optional(),
  CreatedBy: z.string().min(1, {
    message: "Pembuat harus dipilih",
  }),
})

export const updateCourseSchema = z.object({
  CourseName: z.string().optional(),
  CourseDesc: z.string().optional(),
  DateStart: z.date().optional(),
  DateEnd: z.date().optional(),
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
    )
    .optional(),
  CreatedBy: z.string().optional(),
})

export const addCourseUserSchema = z.object({
  users: z
    .array(
      z.object({
        uuid: z.string().min(1, {
          message: "User harus dipilih",
        }),
      })
    )
    .min(1, {
      message: "User harus dipilih",
    }),
})

export const addCourseKnowledgeSchema = z.object({
  knowledge: z
    .array(
      z.object({
        id_knowledge: z.number().min(1, {
          message: "Knowledge harus dipilih",
        }),
      })
    )
    .min(1, {
      message: "Knowledge harus dipilih",
    }),
})
