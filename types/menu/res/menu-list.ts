import { Icons } from "@/components/icons"

export type MenuListRes = {
  code: number
  message: string
  data: MenuListResData[]
  count: number
  page: number
  totalPage: number
}

export type MenuListResData = {
  id_menu: number
  menu_name: string
  menu_url: string
  menu_icon: keyof typeof Icons
  menu_parent: number
  menu_order: number
  created_at: Date
  updated_at: Date
}
