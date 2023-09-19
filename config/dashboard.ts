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
    {
      title: "Profile",
      href: "/dashboard/me",
      icon: "pizza",
      items: [],
    },
  ],
}

export const userAreaDashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "User Area",
      href: "/member-area",
      icon: "dashboard",
      items: [],
    },
  ],
}

export const userAreaRole = {
  roleName: "User",
  roleDescription:
    "Anda adalah user biasa, silahkan belajar dan berlatih sebanyak mungkin",
  features: [
    {
      title: "Materi",
      description: "Anda dapat belajar materi yang tersedia",
      icon: "book",
    },
    {
      title: "Latihan",
      description: "Anda dapat berlatih dengan latihan yang tersedia",
      icon: "quiz",
    },
    {
      title: "Kursus",
      description: "Anda dapat mengikuti kursus yang tersedia",
      icon: "course",
    },
  ],
}
