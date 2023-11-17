export type RuleOneRes = {
  code: number
  message: string
  data: RuleOneResData
}

export type RuleOneResData = {
  role_name: string
  id_role_rules: number
  id_role: number
  can_write_knowledge: boolean
  can_write_course: boolean
  can_write_quiz: boolean
  can_write_content: boolean
  can_approve_knowledge: boolean
  can_approve_course: boolean
  can_write_threads: boolean
  can_assign_users: boolean
  can_access_reporting: boolean
  can_write_user: boolean
  can_access_user_report: boolean
}
