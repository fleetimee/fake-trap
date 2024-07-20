export interface SettingOneRes {
  code: number
  message: string
  data: SettingOneResData
}

export interface SettingOneResData {
  key: string
  value: Date
}
