export type UjianPesertaListRes = {
  code: number
  message: string
  data: UjianPesertaListResData[]
  count: number
  page: number
  totalPage: number
}

export type UjianPesertaListResData = {
  name: string
  username: string
  user_uuid: string
  attemps: number
  profile_picture: string
}
