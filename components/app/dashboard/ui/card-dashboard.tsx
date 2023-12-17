import Image from "next/image"
import Link from "next/link"

import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"





interface CardProps {
  title: string
  name: string
  image: string
  url?: string
  buttonText?: string
  icon?: keyof typeof Icons
}

export function CardDashboard({
  title,
  name,
  image,
  url,
  buttonText,
  icon,
}: CardProps) {
  const Icon = Icons[icon || "arrowRight"]

  return (
    <Card className="space-y-2 shadow-md hover:bg-accent hover:text-accent-foreground">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="text-2xl font-bold">{name}</div>
        </div>
        <div>
          <CardTitle className="text-base">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Link href={url || "#"}>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Image
              src={image}
              alt={`Pic ${name}`}
              width={500}
              height={500}
              className="aspect-video flex-none rounded-md object-cover grayscale transition-all hover:scale-105 hover:grayscale-0"
            />
          </MotionDiv>
        </Link>
      </CardContent>
      <CardFooter className="text-center">
        <Link href={url || "#"} className="w-full">
          <Button className="w-full">{buttonText || "Wtf is this?"}</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
