import { Icons } from "@/components/icons"

/**
 * Defines the NavItem type, which represents a navigation item with a title and a href.
 */
export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}
/**
 * Defines the MainNavItem type, which is an alias for the NavItem type.
 */
export type MainNavItem = NavItem

/**
 * Defines the SidebarNavItem type, which represents a navigation item in the sidebar with a title, an optional href, and optional child items.
 * Child items can be either a list of NavLink items or undefined.
 * If the href is not defined, the item is considered a dropdown and the child items are displayed.
 * If the href is defined, the item is considered a link and the child items are ignored.
 * The item can also be disabled or have an external link.
 * If the item has an icon, it must be a valid key of the Icons object.
 */
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

/**
 * Defines the DashboardConfig type, which represents the configuration for the dashboard.
 * It contains a mainNav array of NavItem objects and a sidebarNav array of SidebarNavItem objects.
 */
export type DashboardConfig = {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}
