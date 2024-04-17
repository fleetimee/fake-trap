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
      title: "Modul",
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
      title: "Materi",
      href: "/dashboard/knowledge",
      icon: "knowledge",
      items: [],
    },
    {
      title: "Pembelajaran",
      href: "/dashboard/course",
      icon: "course",
      items: [],
    },
    // {
    //   title: "Settings",
    //   href: "/dashboard/settings",
    //   icon: "settings",
    //   items: [],
    // },
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
      title: "Modul",
      href: "/member-area/category",
      icon: "category",
      items: [],
    },
    {
      title: "Materi",
      href: "/member-area/knowledge",
      icon: "knowledge",
      items: [],
    },
    {
      title: "Pembelajaran",
      href: "/member-area/course",
      icon: "course",
      items: [],
    },
    {
      title: "Profile",
      href: "/member-area/me",
      icon: "pizza",
      items: [],
    },
  ],
}

export const pemateriAreaDashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Admin Area",
      href: "/pemateri-area",
      icon: "dashboard",
      items: [],
    },
    {
      title: "User Management",
      href: "/pemateri-area/user-management",
      icon: "user",
      items: [],
    },
  ],
}

export const supervisorAreaDashboardConfig: DashboardConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Supervisor Area",
      href: "/supervisor-area",
      icon: "dashboard",
      items: [],
    },
    {
      title: "Approval",
      href: "/supervisor-area/approval",
      icon: "laptop",
      items: [],
    },
    {
      title: "Profile",
      href: "/supervisor-area/me",
      icon: "pizza",
      items: [],
    },
  ],
}

interface UserAreaRole {
  roleName: string
  roleDescription: string
  features: UserAreaFeature[]
}

export type UserAreaFeature = {
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
      title: "Materi",
      description:
        "Baca dan pelajari materi yang sudah disediakan oleh pemberi materi",
      icon: "book",
    },
    {
      title: "Modul",
      description:
        "Jelajahi materi berdasarkan modul yang tersedia untuk memudahkan anda mencari materi yang anda inginkan",
      icon: "category",
    },
    {
      title: "Latihan",
      description: "Anda dapat berlatih dengan latihan yang tersedia",
      icon: "quiz",
    },
    {
      title: "Pembelajaran atau Pembelajaran",
      description: "Anda dapat mengikuti pembelajaran yang tersedia",
      icon: "course",
    },
    {
      title: "Forum",
      description:
        "Anda dapat berdiskusi dengan user lainnya pada forum yang ada di setiap pembelajaran atau pembelajaran yang anda ikuti",
      icon: "forum",
    },
  ],
}

export const supervisorAreaRole: UserAreaRole = {
  roleName: "Supervisor",
  roleDescription:
    "Sebagai supervisor, anda dapat mengakses berbagai fitur dibawah ini",
  features: [
    {
      title: "Approval Materi",
      description:
        "Anda dapat menyetujui atau menolak materi yang diajukan oleh pemateri",
      icon: "laptop",
    },
    {
      title: "Approval Pembelajaran",
      description:
        "Anda dapat menyetujui atau menolak Pembelajaran yang diajukan oleh pemateri",
      icon: "laptop",
    },
    {
      title: "Cek Materi",
      description: "Anda dapat melihat materi yang sudah disetujui oleh anda",
      icon: "book",
    },
    {
      title: "Cek Pembelajaran",
      description:
        "Anda dapat melihat pembelajaran yang sudah disetujui oleh anda",
      icon: "course",
    },
  ],
}

export const pemateriAreaRole: UserAreaRole = {
  roleName: "Admin",
  roleDescription:
    "Sebagai admin, anda dapat mengakses berbagai fitur dibawah ini",
  features: [
    {
      icon: "course",
      title: "Management User",
      description: "Anda dapat mengelola user yang terdaftar pada sistem",
    },
    {
      icon: "laptop",
      title: "Maanagemen Kewenanangan",
      description: "Anda dapat mengelola kewenangan user",
    },
  ],
}

export const adminAreaRole: UserAreaRole = {
  roleName: "Pemateri",
  roleDescription:
    "Sebagai pemateri, anda dapat mengakses berbagai fitur dibawah ini",
  features: [
    {
      icon: "laptop",
      title: "Materi",
      description: "Anda dapat mengelola materi yang anda buat",
    },
    {
      icon: "laptop",
      title: "Pembelajaran",
      description: "Anda dapat mengelola pembelajaran yang anda buat",
    },
    {
      icon: "laptop",
      title: "Modul",
      description: "Anda dapat mengelola modul yang anda buat",
    },
    {
      icon: "laptop",
      title: "Quiz",
      description: "Anda dapat mengelola quiz yang anda buat",
    },
    {
      icon: "laptop",
      title: "Forum",
      description: "Anda dapat mengelola forum yang anda buat",
    },
    {
      icon: "laptop",
      title: "Konten",
      description:
        "Anda dapat mengelola konten materi dan pembelajaran yang anda buat",
    },
  ],
}
