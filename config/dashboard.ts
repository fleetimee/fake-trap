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
    },
    {
      title: "User",
      href: "/dashboard/user",
      icon: "user",
    },
    {
      title: "Kategori",
      href: "/dashboard/category",
      icon: "category",
    },
    {
      title: "Quiz",
      href: "/dashboard/quiz",
      icon: "quiz",
    },
    {
      title: "Pengetahuan",
      href: "/dashboard/knowledge",
      icon: "knowledge",
    },
    {
      title: "Kursus",
      href: "/dashboard/course",
      icon: "course",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
