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
      title: "Pelatihan",
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
      title: "Kategori",
      href: "/member-area/category",
      icon: "category",
      items: [],
    },
    {
      title: "Pengetahuan",
      href: "/member-area/knowledge",
      icon: "knowledge",
      items: [],
    },
    {
      title: "Pelatihan",
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
      title: "Pelatihan atau Pelatihan",
      description: "Anda dapat mengikuti pelatihan yang tersedia",
      icon: "course",
    },
    {
      title: "Forum",
      description:
        "Anda dapat berdiskusi dengan user lainnya pada forum yang ada di setiap pelatihan atau pelatihan yang anda ikuti",
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
      title: "Approval Pengetahuan",
      description:
        "Anda dapat menyetujui atau menolak pengetahuan yang diajukan oleh pemateri",
      icon: "laptop",
    },
    {
      title: "Approval Pelatihan",
      description:
        "Anda dapat menyetujui atau menolak Pelatihan yang diajukan oleh pemateri",
      icon: "laptop",
    },
    {
      title: "Cek Pengetahuan",
      description:
        "Anda dapat melihat pengetahuan yang sudah disetujui oleh anda",
      icon: "book",
    },
    {
      title: "Cek Pelatihan",
      description:
        "Anda dapat melihat pelatihan yang sudah disetujui oleh anda",
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
      title: "Pengetahuan",
      description: "Anda dapat mengelola pengetahuan yang anda buat",
    },
    {
      icon: "laptop",
      title: "Pelatihan",
      description: "Anda dapat mengelola pelatihan yang anda buat",
    },
    {
      icon: "laptop",
      title: "Kategori",
      description: "Anda dapat mengelola kategori yang anda buat",
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
        "Anda dapat mengelola konten pengetahuan dan pelatihan yang anda buat",
    },
  ],
}
