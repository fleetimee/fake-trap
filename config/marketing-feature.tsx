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
  },
  {
    icon: <Icons.user className="h-10 w-10" />,
    title: "Authentikasi",
    body: (
      <>
        Memungkinkan pengguna untuk masuk ke dalam sistem dan mengakses fitur
        yang tersedia.
      </>
    ),
  },

  {
    icon: <Icons.pizza className="h-10 w-10" />,
    title: "Explore",
    body: (
      <>
        Menyediakan fitur penjelajahan yang memungkinkan pengguna untuk
        menemukan konten yang relevan
      </>
    ),
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
  },
]
