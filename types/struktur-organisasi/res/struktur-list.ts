export type StrukturListRes = {
  code: number
  message: string
  data: StrukturListResData[]
  count: number
  page: number
  totalPage: number
}

export type StrukturListResData = {
  email: string
  kd_kantor: string
  soid: number
  mastersoid: number
  jabatan: string
  sts_jabatan: number
  unitkerja: string
  nama: string
}
