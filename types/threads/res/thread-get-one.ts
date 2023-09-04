export type ThreadOneRes = {
  code: number
  message: string
  data: ThreadOneResData
}

export type ThreadOneResData = {
  id_threads: number
  id_course: number
  threads_title: string
  created_at: Date
  updated_at: Date
}
