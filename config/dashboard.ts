import { DashboardConfig } from "types"

/**
 * Configuration object for the dashboard.
 */
export const dashboardConfig: DashboardConfig = {
  /**
   * Main navigation items.
   */
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  /**
   * Sidebar navigation items.
   */
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      items: [],
    },
    {
      title: "User",
      href: "/dashboard/user",
      icon: "user",
      items: [],
    },
    {
      title: "Kategori",
      href: "/dashboard/category",
      icon: "category",
      items: [],
    },
    {
      title: "Quiz",
      href: "/dashboard/quiz",
      icon: "quiz",
      items: [],
    },
    {
      title: "Pengetahuan",
      href: "/dashboard/knowledge",
      icon: "knowledge",
      items: [],
    },
    {
      title: "Kursus",
      href: "/dashboard/course",
      icon: "course",
      items: [],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      items: [],
    },
  ],
}
