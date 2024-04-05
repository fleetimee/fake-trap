import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { MoreHorizontal, Printer } from "lucide-react"

import { authOptions } from "@/lib/auth"
import {
  getUserPastCourseKnowledge,
  getUserPastResult,
} from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Library",
  description: "Library page",
}

export default async function LibraryPage() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const pastResults = await getUserPastResult({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  const pastCourseKnowledge = await getUserPastCourseKnowledge({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/peserta",
            title: "Dashboard",
          },
          {
            href: "/peserta/library",
            title: "Library",
          },
        ]}
      />

      <DashboardHeader
        heading="Library"
        description="Catch up dan refresh materi yang sudah kamu pelajari disini."
      />

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Content for the first column */}
        <Card>
          <CardHeader>
            <CardTitle>Materi</CardTitle>
            <CardDescription>
              Ini merupakan materi yang sudah di pelajari dalam pelatihan
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Materi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastCourseKnowledge?.data.map((knowledge) => (
                  <TableRow key={knowledge.id_knowledge}>
                    <TableCell className="hidden w-[100px] sm:table-cell">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.image}`}
                        alt={knowledge.knowledge_title}
                        width={100}
                        height={100}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <div>
                          <Link
                            href={`/peserta/knowledge/detail/${knowledge.id_knowledge}`}
                          >
                            <h3
                              className="cursor-pointer text-lg font-semibold
                              text-blue-500 hover:text-blue-700 hover:underline
                            "
                            >
                              {knowledge.knowledge_title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">
                            {knowledge.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Content for the second column */}
        <Card>
          <CardHeader>
            <CardTitle>Hasil Ujian</CardTitle>
            <CardDescription>
              Disini merupakan hasil ujian dari pelatihan yang sudah kamu
              lakukan, bisa kamu lihat kembali dan di review kembali.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {pastResults?.data.map((result, index) => (
              <div className="flex flex-col space-y-4" key={result.id_course}>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {index + 1}. {result.course_name}
                </p>

                <Accordion type="single" collapsible className="w-full px-5">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Pre Test</AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Judul</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Cetak</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result?.pretest_result?.map((test) => (
                            <TableRow key={test.id_user_quiz}>
                              <TableCell>{test.quiz_title}</TableCell>
                              <TableCell>
                                <Badge color="green">{test.score}</Badge>
                              </TableCell>
                              <TableCell>
                                <Link
                                  href={`
                  ${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${tokenExtracted.id}/${test.id_user_quiz}
                `}
                                  passHref
                                  target="_blank"
                                >
                                  <Button className="!p-2 !text-sm">
                                    <Printer size={16} />
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Post Test</AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Judul</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Cetak</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result?.posttest_result?.map((test) => (
                            <TableRow key={test.id_user_quiz}>
                              <TableCell>{test.quiz_title}</TableCell>
                              <TableCell>
                                <Badge color="green">{test.score}</Badge>
                              </TableCell>
                              <TableCell>
                                <Link
                                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${tokenExtracted.id}/${test.id_user_quiz}`}
                                  passHref
                                  target="_blank"
                                >
                                  <Button className="!p-2 !text-sm">
                                    <Printer size={16} />
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
