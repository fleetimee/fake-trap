export type ContentOneRes = {
  code: number
  message: string
  data: ContentOneResData
}

export type ContentOneResData = {
  id_content: number
  content_title: string
  content_type: string
  image: string
  link: string
  id_section: number
  created_at: Date
  updated_at: Date
  files: ContentOneFile[] | null
  article: ContentOneArticle | null
  video: ContentOneVideo | null
  video_upload: ContentOneVideoUpload | null
}

export type ContentOneArticle = {
  id_content_article: number
  body: string
  author_id: string
}

export type ContentOneVideo = {
  id_content: number
  video_url: string
  flavor_text: string
}

export type ContentOneFile = {
  id_content_file: number
  id_content: number
  file_path: string
  file_type: string
  file_size: string
}

export type ContentOneVideoUpload = {
  id: number
  id_content: number
  video_name: string
  video_path: string
  video_ext: string
  video_duration: number
  video_original_name: string
  flavor_text: string
}
