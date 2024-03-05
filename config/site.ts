export type SiteConfig = typeof siteConfig

/**
 * Configuration object for the site.
 */
export const siteConfig = {
  name: "BPD DIY Elearning",
  url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}`,
  description:
    "E-learning BPD DIY memberikan anda akses ke ribuan pelatihan online. Pelajari apa saja, kapan saja, di mana saja",
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
          title: "Pelatihan",
          href: "#",
          description:
            "Memungkinkan pengguna untuk mengeksplorasi pelatihan yang tersedia dan mengikuti pelatihan yang diinginkan.",
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
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
