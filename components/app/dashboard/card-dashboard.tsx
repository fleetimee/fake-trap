import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface CardProps {
  title: string
  name: string
  image: string
  icon?: keyof typeof Icons
}

export function CardDashboard({ title, name, image, icon }: CardProps) {
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
        <Image
          src={image}
          alt={`Pic ${name}`}
          width={500}
          height={500}
          className="aspect-video flex-none rounded-md object-cover grayscale transition-all hover:scale-105 hover:grayscale-0"
        />
      </CardContent>
      <CardFooter className="text-center">
        <Button className="w-full">Lihat Kursus</Button>
      </CardFooter>
    </Card>
  )
}
