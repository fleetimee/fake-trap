import React from "react"

import { marketingFeatures } from "@/config/marketing-feature"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

export function BentoGridDemo() {
  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      {marketingFeatures.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          link={item.link}
        />
      ))}
    </BentoGrid>
  )
}
const Skeleton = () => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full   flex-1 rounded-xl border  border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"></div>
)
