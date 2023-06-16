import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Icons } from "./icons"

interface CardProps {
  title: string
  name: string
  image: string
  icon?: keyof typeof Icons
}

/**
 * Renders a card component that displays a new course with its name, description, and image.
 * @param {string} courseName - The name of the course.
 * @param {string} courseDescription - The description of the course.
 * @param {string} courseImage - The URL of the course image.
 * @returns {JSX.Element} - The JSX element that displays the new course card.
 */
export function CardDashboard({ title, name, image, icon }: CardProps) {
  const Icon = Icons[icon || "arrowRight"]

  return (
    <Card className="space-y-2 shadow-md">
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
      <CardContent className="grid">
        <Image
          src={image}
          alt={`Pic ${name}`}
          width={500}
          height={500}
          className="rounded-md object-contain grayscale hover:grayscale-0"
        />
      </CardContent>
      <CardFooter className="text-center">
        <Button className="w-full">Lihat Kursus</Button>
      </CardFooter>
    </Card>
  )
}
