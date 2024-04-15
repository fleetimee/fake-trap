import React from "react"

import { marketingFeatures } from "@/config/marketing-feature"

import { ScrollIntoViewButton } from "./scroll-into-view"
import { BentoGrid, BentoGridItem } from "./ui/bento-grid"

export function BentoGridSecondDemo() {
  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      {marketingFeatures.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={item.className}
          link={item.link}
        />
      ))}
    </BentoGrid>
  )
}
