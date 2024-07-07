import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { CourseAvailability } from "@/lib/enums/status"
import { getOneCourse } from "@/lib/fetcher/course-fetcher"
import { getUserPretestCheck } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken, getCourseStatus } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-vanilla"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface CourseDetailPageProps {
  params: {
    idCourse: string
  }
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  const courseStatus = getCourseStatus({
    dateEnd: course.data.date_end,
    dateStart: course.data.date_start,
  })

  if (courseStatus !== CourseAvailability.ACTIVE) {
    return notFound()
  }

  const checkUserPretest = await getUserPretestCheck({
    idCourse: params.idCourse,
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  return checkUserPretest.data ? (
    <div className="flex flex-col space-y-4">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}${course?.data?.image}`}
        alt={course?.data?.course_name}
        className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
        width={1280}
        height={720}
      />

      <Separator />

      <div className="flex flex-col space-y-2 rounded-md border border-primary p-3">
        <Label className="font-heading text-2xl italic text-primary">FAQ</Label>
        <p className="italic">
          Pertanyaan yang sering diajukan di seputar pembelajaran.
        </p>
        <Accordion type="single" collapsible className="w-full py-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Cara membuka materi pembelajaran ?
            </AccordionTrigger>
            <AccordionContent>
              Pastikan Anda telah menyelesaikan Pretest terlebih dahulu, untuk
              membuka materi pembelajaran.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Flow mengerjakan pembelajaran ?</AccordionTrigger>
            <AccordionContent>
              Lakukan pretest, kemudian baca materinya, dan kerjakan post test
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Bagaimana cara menyelesaikan test ?
            </AccordionTrigger>
            <AccordionContent>
              Jawab semua pertanyaan dengan benar, dan submit jawaban Anda
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Jika ada masalah, hubungi siapa ?
            </AccordionTrigger>
            <AccordionContent>Pemberdayaan SDM</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Bagaimana proses perhitungan leaderboard ?
            </AccordionTrigger>
            <AccordionContent>
              Leaderboard dihitung berdasarkan nilai tertinggi yang didapat dan
              waktu tercepat jika nilai sama maka akan ada tiebreaker yang akan
              dihitung dari waktu awal pengerjaan tes tersebut
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Apakah ada hadiahnya ?</AccordionTrigger>
            <AccordionContent>Tergantung</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ) : (
    <div className="relative">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}${course?.data?.image}`}
        alt={course?.data?.course_name}
        className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
        width={1280}
        height={720}
      />

      <div className="absolute inset-0 flex  flex-col items-center justify-center bg-black/50 grayscale">
        <Icons.lock className="size-16 text-white" />
        <p className="mt-4 max-w-md text-center text-white">
          Silahkan kerjakan Pretest terlebih dahulu, untuk membuka materi
          pembelajaran.
        </p>
      </div>
    </div>
  )
}
