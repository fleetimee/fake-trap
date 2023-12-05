import { z } from "zod"

export const ruleSchema = z.object({
  role_name: z.string(),
  id_role_rules: z.number(),
  id_role: z.number(),
  can_write_knowledge: z.boolean(),
  can_write_course: z.boolean(),
  can_write_quiz: z.boolean(),
  can_write_content: z.boolean(),
  can_approve_knowledge: z.boolean(),
  can_approve_course: z.boolean(),
  can_write_threads: z.boolean(),
  can_assign_users: z.boolean(),
  can_access_reporting: z.boolean(),
  can_write_user: z.boolean(),
  can_access_user_report: z.boolean(),
})
