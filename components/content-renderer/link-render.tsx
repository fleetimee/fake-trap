import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"





interface LinkRenderProps {
  link: string
  image: string
  alt: string
}

export function LinkRender({ link, image, alt }: LinkRenderProps) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-4"
    >
      <Image
        src={image}
        alt={alt}
        className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
        width={1280}
        height={720}
      />
      <Button className="w-full text-left">
        <Icons.link className="h-4 w-4" />
        <span className="ml-2">Buka Link</span>
      </Button>
    </Link>
  )
}
