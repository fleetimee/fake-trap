import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
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
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
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
