import { z } from "zod"

const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/

export const contentVideoSchema = z.object({
  content_title: z.string().min(1).max(255),
  content_type: z.string().min(1).max(255),
  id_section: z.number().min(1),
  video_url: z
    .string()
    .min(1)
    .max(255)
    .refine((url) => youtubeUrlRegex.test(url), {
      message: "Invalid YouTube URL",
    }),
  flavor_text: z.string().min(1).max(255),
})

export const contentVideoUploadSchema = z.object({
  ContentTitle: z.string().min(1).max(255),
  ContentType: z.string().min(1).max(255),
  IdSection: z.number().min(1),
  FlavorText: z.string().min(1).max(255),
  video_path: z
    .instanceof(File, {
      message: "Video tidak boleh kosong",
    })
    .refine(
      (file) => {
        if (file) {
          const validFileTypes = ["video/mp4", "video/mkv", "video/avi"]
          return file.size < 1610612736 && validFileTypes.includes(file.type)
        }
        return true
      },
      {
        message:
          "Ukuran file tidak boleh lebih dari 1.5GB dan harus berformat mp4, mkv, atau avi",
      }
    ),
})
