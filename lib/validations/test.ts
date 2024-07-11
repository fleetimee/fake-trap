import { z } from "zod"

export const createTestSchema = z.object({
  quiz_title: z
    .string()
    .min(1, {
      message: "Judul ujian tidak boleh kosong",
    })
    .max(255),
  quiz_desc: z.string().min(1, {
    message: "Deskripsi ujian tidak boleh kosong",
  }),
  quiz_type: z.string().min(1, {
    message: "Tipe ujian tidak boleh kosong",
  }),
  time_limit: z.number().min(1, {
    message: "Waktu ujian tidak boleh kosong",
  }),
  created_by: z.string().optional(),
  updated_by: z.string().optional(),
  jam_buka: z.date(),
  jam_tutup: z.date(),
})

export const updateTestSchema = z.object({
  quiz_title: z
    .string()
    .min(1, {
      message: "Judul ujian tidak boleh kosong",
    })
    .max(255),
  quiz_desc: z.string().min(1, {
    message: "Deskripsi ujian tidak boleh kosong",
  }),
  quiz_type: z.string().min(1, {
    message: "Tipe ujian tidak boleh kosong",
  }),
  time_limit: z.number().min(1, {
    message: "Waktu ujian tidak boleh kosong",
  }),
  updated_by: z.string().optional(),
  jam_buka: z.date(),
  jam_tutup: z.date(),
})
