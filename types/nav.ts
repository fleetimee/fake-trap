/**
 * Represents a navigation item.
 */
export interface NavItem {
  /**
   * The title of the navigation item.
   */
  title: string
  /**
   * The URL of the navigation item. Optional.
   */
  href?: string
  /**
   * Whether the navigation item is disabled. Optional.
   */
  disabled?: boolean
  /**
   * Whether the navigation item is an external link. Optional.
   */
  external?: boolean
}
