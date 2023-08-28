export type ReferenceListRes = {
  code: number
  message: string
  data: ReferenceListResData[]
}

export type ReferenceListResData = {
  id_ref: number
  code_ref1: string
  value_ref1: string
  code_ref2: string
}
