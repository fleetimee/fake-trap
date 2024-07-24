export type SiteConfig = typeof siteConfig

/**
 * Configuration object for the site.
 */
export const siteConfig = {
  name: "B-LIVE",
  url: `${process.env.NEXT_PUBLIC_IMAGE_URL ?? "http://localhost:3000"}`,
  description:
    "B-LIVE BPD DIY memberikan anda akses ke ribuan pembelajaran online. Pelajari apa saja, kapan saja, di mana saja",
  mainNav: [
    {
      title: "Menu",
      items: [
        {
          title: "Modul",
          href: "/#categories",
          description:
            "    Memungkinkan pengguna untuk dengan mudah menavigasi ke modul yang diinginkan.",
          items: [],
        },
        {
          title: "Materi",
          href: "/#featured-knowledge",
          description:
            " Memungkinkan pengguna untuk mencari dan mengeksplorasi informasi yang relevan.",
          items: [],
        },

        {
          title: "Pembelajaran",
          href: "#",
          description:
            "Memungkinkan pengguna untuk mengeksplorasi pembelajaran yang tersedia dan mengikuti pembelajaran yang diinginkan.",
          items: [],
        },
        {
          title: "Forum",
          href: "#",
          description:
            "Menyediakan forum diskusi atau komunitas online di mana pengguna dapat berinteraksi",
          items: [],
        },
      ],
    },
  ],
}
