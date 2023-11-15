export type GroupOneRes = {
  code: number
  message: string
  data: GroupOneResData
}

export type GroupOneResData = {
  id_group: number
  group_name: string
  can_write_knowledge: boolean
  can_write_course: boolean
  can_write_content: boolean
  can_approve_knowledge: boolean
  can_approve_course: boolean
  can_write_threads: boolean
  can_assign_users: boolean
}
