export interface StatusCountListRes {
  code: number
  message: string
  data: StatusCountListResData[]
}

export interface StatusCountListResData {
  status: string
  status_code: string
  count: number
}
