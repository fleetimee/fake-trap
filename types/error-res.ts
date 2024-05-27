export interface ErrorResponse {
  code: number
  error: string
}

export interface ErrorResponseJson {
  code: number
  data: any
  message: string
}

export interface SuccessResponse {
  code: number
  data: any
  message: string
}
