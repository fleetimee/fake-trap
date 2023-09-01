export type ThreadListRes = {
  code: number
  message: string
  data: ThreadListResData[]
  count: number
  page: number
  totalPage: number
}

export type ThreadListResData = {
  id_threads: number
  id_course: number
  threads_title: string
  created_at: Date
  updated_at: Date
}
