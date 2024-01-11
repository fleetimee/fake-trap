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
  content_title: z.string().min(1).max(255),
  content_type: z.string().min(1).max(255),
  id_section: z.number().min(1),
  video_path: z.string().min(1).max(255),
  flavor_text: z.string().min(1).max(255),
})
