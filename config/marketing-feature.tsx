import Image from "next/image"
import {
  IconBook,
  IconBrandDatabricks,
  IconBubble,
  IconPokerChip,
} from "@tabler/icons-react"
import { Globe } from "lucide-react"

import { Icons } from "@/components/icons"

interface MarketingFeaturesProps {
  icon: JSX.Element
  title: string
  description: string
  link: string
  header: JSX.Element
  className: string
}

const Skeleton = () => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1   rounded-xl border border-transparent  bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"></div>
)

export const marketingFeatures: MarketingFeaturesProps[] = [
  {
    icon: <IconBook className="size-4" />,
    title: "Modul",
    description:
      "Modul merupakan kumpulan materi yang terstruktur dalam satu topik.",
    link: "#categories",
    header: (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/category.jpg`}
        width={0}
        height={0}
        sizes="100vw"
        alt={""}
        className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1   rounded-xl border border-transparent  bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"
      />
    ),
    className: "md:col-span-2",
  },
  {
    icon: <IconPokerChip className="size-4" />,
    title: "Materi",
    description:
      "Materi merupakan informasi yang disajikan dalam bentuk teks, gambar, video, dan audio.",
    link: "#featured-knowledge",
    header: (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/knowledge.jpg`}
        width={0}
        height={0}
        sizes="100vw"
        alt={""}
        className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1   rounded-xl border border-transparent  bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"
      />
    ),
    className: "md:col-span-1",
  },
  {
    icon: <IconBrandDatabricks className="size-4" />,
    title: "Pembelajaran",
    description:
      "Pembelajaran merupakan serangkaian kegiatan yang bertujuan untuk meningkatkan pengetahuan dan keterampilan seseorang.",
    link: "#featured-courses",
    header: (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/course.jpg`}
        width={0}
        height={0}
        sizes="100vw"
        alt={""}
        className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1   rounded-xl border border-transparent  bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"
      />
    ),
    className: "md:col-span-1",
  },

  {
    icon: <IconBubble className="size-4" />,
    title: "Forum",
    description:
      "Forum merupakan tempat diskusi dan tanya jawab antar pengguna.",
    link: "#forum",
    header: (
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/forum.jpg`}
        width={0}
        height={0}
        sizes="100vw"
        objectFit="contain"
        alt={""}
        className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-[6rem] flex-1   rounded-xl border border-transparent  bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"
      />
    ),
    className: "md:col-span-2",
  },
]
