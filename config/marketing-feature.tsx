import { Component, CreditCard, Globe } from "lucide-react"

import { Icons } from "@/components/icons"

export const marketingFeatures = [
  {
    icon: <Icons.category className="h-10 w-10" />,
    title: "Kategori",
    body: (
      <>
        Memungkinkan pengguna untuk dengan mudah menavigasi ke kategori yang
        diinginkan.
      </>
    ),
    link: "/intro/#categories",
  },
  {
    icon: <Icons.knowledge className="h-10 w-10" />,
    title: "Pengetahuan",
    body: (
      <>
        Memungkinkan pengguna untuk mencari dan mengeksplorasi informasi yang
        relevan.
      </>
    ),
    link: "/intro/#featured-knowledge",
  },
  {
    icon: <Icons.course className="h-10 w-10" />,
    title: "Kursus",
    body: (
      <>
        Memungkinkan pengguna untuk mengeksplorasi kursus yang tersedia dan
        mengikuti kursus yang diinginkan.
      </>
    ),
    link: "/intro/#featured-courses",
  },

  {
    icon: <Globe className="h-10 w-10" />,
    title: "Forum",
    body: (
      <>
        Menyediakan forum diskusi atau komunitas online di mana pengguna dapat
        berinteraksi
      </>
    ),
    link: "/intro/#forum",
  },
]