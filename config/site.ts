export type SiteConfig = typeof siteConfig

/**
 * Configuration object for the site.
 */
export const siteConfig = {
  name: "BPD Elearning",
  url: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}`,
  description:
    "E-learning BPD DIY memberikan anda akses ke ribuan pelatihan online. Pelajari apa saja, kapan saja, di mana saja",
  mainNav: [
    {
      title: "Explore",
      items: [
        {
          title: "Kategori",
          href: "/#categories",
          description: "Jelajahi kategori pengetahuan yang tersedia",
          items: [],
        },
        {
          title: "Pengetahuan",
          href: "/#featured-knowledge",
          description: "Baca dan pahami pengetahuan yang tersedia",
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
