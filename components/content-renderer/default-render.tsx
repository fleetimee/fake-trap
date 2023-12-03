import React from "react"
import Image from "next/image"





interface DefaultRenderProps {
  image: string
  alt: string
}

export function DefaultRender({ image, alt }: DefaultRenderProps) {
  return (
    <Image
      src={image}
      alt={alt}
      className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
      width={1280}
      height={720}
    />
  )
}
