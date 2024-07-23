export type SyncStrukturRes = {
  code: number
  message: string
  data: SyncStrukturResData
}

export type SyncStrukturResData = {
  elapsed_Time: string
  rows_deleted: number
  rows_inserted: number
}
