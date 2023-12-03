import { z } from "zod"





export const courseSchema = z.object({
  CourseName: z.string().min(1, {
    message: "Nama pelatihan harus diisi",
  }),
  CourseDesc: z.string().min(1, {
    message: "Deskripsi pelatihan harus diisi",
  }),
  DateStart: z.date(),
  DateEnd: z.date(),
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
  IdKnowledge: z.number({
    required_error: "Materi harus dipilih",
  }),
  TutorUUID: z.string().min(1, {
    message: "Tutor harus dipilih",
  }),
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
  IdKnowledge: z.number().optional(),
  TutorUUID: z.string().optional(),
  CreatedBy: z.string().optional(),
})
