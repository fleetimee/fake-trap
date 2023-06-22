import Image from "next/image"

import { getCourse } from "@/lib/fetcher/course/course-fetcher"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreateButton } from "@/components/create-button"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Kursus",
  description: "Kursus yang tersedia di e-learning",
}

export default async function CoursePage() {
  const dataCourse = await getCourse(1000)

  console.log(dataCourse)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Kursus"
        description="Kursus yang tersedia di e-learning"
      >
        <CreateButton
          className=" transition duration-300 delay-150 ease-in-out hover:-translate-y-1 hover:scale-110"
          name="Tambah"
        />
      </DashboardHeader>
      <div className="grid grid-cols-1 grid-rows-3 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dataCourse.data.map((item) => (
          <Card
            className="flex flex-col items-start justify-center hover:bg-accent hover:text-accent-foreground"
            key={item.id_course}
          >
            <CardHeader className="h-22 w-full flex-none">
              <p className="line-clamp-2 font-heading text-lg lg:text-xl">
                {item.course_name}
              </p>
            </CardHeader>
            <CardContent className="flex-none">
              <Image
                src={item.image}
                alt="Picture of the author"
                width={1200}
                height={1200}
                className="aspect-video flex-none rounded-lg object-cover"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
