import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface NewCourseProps {
  courseName: string
  courseDescription: string
  courseImage: string
}

/**
 * Renders a card component that displays a new course with its name, description, and image.
 * @param {string} courseName - The name of the course.
 * @param {string} courseDescription - The description of the course.
 * @param {string} courseImage - The URL of the course image.
 * @returns {JSX.Element} - The JSX element that displays the new course card.
 */
export default function NewCourseCard({
  courseName,
  courseDescription,
  courseImage,
}: NewCourseProps) {
  return (
    <Card className="space-y-2">
      <CardHeader className="text-2xl">
        <CardTitle className="text-base">Kursus Terbaru</CardTitle>
        <CardDescription className="text-2xl">{courseName}</CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <Image
          src={courseImage}
          alt={`Pic ${courseDescription}`}
          width={500}
          height={500}
          className="rounded-md object-contain grayscale hover:grayscale-0"
        />
      </CardContent>
    </Card>
  )
}
