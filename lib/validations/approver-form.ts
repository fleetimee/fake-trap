import { z } from "zod"

export const approveFormSchema = z.object({
  status: z.string().min(1),
  comment: z.string().min(1),
  approved_at: z.date().optional(),
  user_uuid_approver: z.string().min(1),
})

export const revisionFormSchema = z.object({
  status: z.string().min(1),
  comment: z.string().min(1),
  user_uuid_request: z.string().min(1),
})
