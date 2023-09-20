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
    {
      title: "Pengetahuan",
      href: "/member-area/knowledge",
      icon: "knowledge",
      items: [],
    },
  ],
}

interface UserAreaRole {
  roleName: string
  roleDescription: string
  features: UserAreaFeature[]
}

type UserAreaFeature = {
  title: string
  description: string
  icon: string
}

export const userAreaRole: UserAreaRole = {
  roleName: "User",
  roleDescription:
    "Sebagai user, anda dapat mengakses berbagai fitur dibawah ini",
  features: [
    {
      title: "Pengetahuan",
      description:
        "Baca dan pelajari pengetahuan yang sudah disediakan oleh pemberi materi",
      icon: "book",
    },
    {
      title: "Kategori",
      description:
        "Jelajahi Pengetahuan berdasarkan kategori yang tersedia untuk memudahkan anda mencari pengetahuan yang anda inginkan",
      icon: "category",
    },
    {
      title: "Latihan",
      description: "Anda dapat berlatih dengan latihan yang tersedia",
      icon: "quiz",
    },
    {
      title: "Kursus atau Pelatihan",
      description: "Anda dapat mengikuti kursus yang tersedia",
      icon: "course",
    },
    {
      title: "Forum",
      description:
        "Anda dapat berdiskusi dengan user lainnya pada forum yang ada di setiap pelatihan atau kursus yang anda ikuti",
      icon: "forum",
    },
  ],
}
