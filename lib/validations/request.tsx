import { z } from "zod"

export const requestKnowledgeSchema = z.object({
  id_knowledge: z.string().min(1),
  status: z.string().min(1),
  comment: z.string().min(1),
  user_uuid_request: z.string().min(1),
  user_uuid_approver: z.string().min(1),
})

export const requestCourseSchema = z.object({
  id_course: z.string().min(1),
  status: z.string().min(1),
  comment: z.string().min(1),
  user_uuid_request: z.string().min(1),
  user_uuid_approver: z.string().min(1),
})
