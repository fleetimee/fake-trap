export type AuditTrailListRes = {
  code: number
  message: string
  data: AuditTrailListResData[]
  count: number
  page: number
  totalPage: number
}

export type AuditTrailListResData = {
  nama: string
  profile_picture: string
  id: string
  user_uuid: string
  action: string
  date: Date
  timestamp: string
  ip_address: string
  user_agent: string
  additional_info: string
  method: string
  module: string
}
