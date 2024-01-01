export interface UserOrgOneRes {
  code: number
  message: string
  data: UserOrgOneResData
}

export interface UserOrgOneResData {
  nama: string
  email: string
  atasan1: string
  nama_atasan1: string
  atasan2: string
  nama_atasan2: string
  uuid: string
  uuid_atasan1: string
  uuid_atasan2: string
  unit_kerja: string
  jabatan: string
}
