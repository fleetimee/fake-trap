import {Icons} from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren


export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type DashboardConfig = {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}
