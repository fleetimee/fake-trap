import { Globe } from "lucide-react"

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
    image: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/category.jpg`,
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
    image: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/knowledge.jpg`,
  },
  {
    icon: <Icons.course className="h-10 w-10" />,
    title: "Pelatihan",
    body: (
      <>
        Memungkinkan pengguna untuk mengeksplorasi pelatihan yang tersedia dan
        mengikuti pelatihan yang diinginkan.
      </>
    ),
    link: "/intro/#featured-courses",
    image: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/course.jpg`,
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
    image: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/forum.jpg`,
  },
]
