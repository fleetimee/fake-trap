export type SiteConfig = typeof siteConfig

/**
 * Configuration object for the site.
 */
export const siteConfig = {
  name: "BPD Elearning",
  url: "http://localhost:3000",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Explore",
      items: [
        {
          title: "Pengetahuan",
          href: "/products",
          description: "Semua pengetahuan yang ada di elearning",
          items: [],
        },
        {
          title: "Kategori",
          href: "/build-a-board",
          description: "Semua kategori yang ada di elearning",
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
