import { Icons } from "@/components/icons"

export type MenuListResNew = {
  code: number
  message: string
  data: MenuListResNewData[]
}

export type MenuListResNewData = {
  id_menu: number
  menu_name: string
  menu_url: string
  menu_icon: keyof typeof Icons
  menu_parent: number
  menu_order: number
  created_at: Date
  updated_at: Date
  menu_role: string
}
