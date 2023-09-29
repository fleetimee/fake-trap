export type ContentGetOneRes = {
  code: number
  message: string
  data: ContentGetOneResData
}

export type ContentGetOneResData = {
  id_content: number
  content_title: string
  content_type: string
  image: string
  link: string
  id_section: number
  created_at: Date
  updated_at: Date
}
