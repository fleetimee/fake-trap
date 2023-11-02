import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { CourseOneRes } from "@/types/course/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { ThreadListRes } from "@/types/threads/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PreviewCourseDetailSidebar } from "@/app/(dashboard-supervisor)/supervisor-area/approval/approve-course/(course-layout)/preview-course/[idCourse]/_components/sidebar"

import { PreviewUserCourseDetailSidebar } from "./_components/sidebar"

interface GetOneCourseProps {
  token: string | undefined
  idCourse: string
}

async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneKnowledgeProps {
  token: string | undefined
  knowledgeId: string
}

async function getOneKnowledge({
  token,
  knowledgeId,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${knowledgeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetThreadsListProps {
  idCourse: string
  token: string | undefined
  limit: number
  page: number
}

async function getThreadList({
  idCourse,
  token,
  limit,
  page,
}: GetThreadsListProps): Promise<ThreadListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/threads?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

interface CourseDetailLayoutProps {
  children: React.ReactNode
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: CourseDetailLayoutProps) {
  const user = await getCurrentUser()

  const dataCourse = await getOneCourse({
    token: user?.token,
    idCourse: params.detail,
  })

  return {
    title: dataCourse.data.course_name,
    description: dataCourse.data.course_desc,
  }
}

export default async function CourseDetailLayout({
  children,
  params,
}: CourseDetailLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [dataCourse] = await Promise.all([
    getOneCourse({
      token: user?.token,
      idCourse: params.detail,
    }),
  ])

  const courseKnowledgeResp = await getOneKnowledge({
    token: user?.token,
    knowledgeId: dataCourse.data.id_knowledge.toString(),
  })

  const threadsResp = await getThreadList({
    idCourse: params.detail,
    token: user?.token,
    limit: 1000,
    page: 1,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/member-area",
            title: "Member Area",
          },
          {
            href: "/member-area/course",
            title: "Pelatihan",
          },
          {
            href: `/member-area/course/${params.detail}`,
            title: dataCourse.data.course_name,
          },
        ]}
      />

      <MotionDiv
        className="flex flex-row gap-4 px-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Alert className="basis-full">
          <PartyPopper className="h-5 w-5" />
          <AlertTitle>Informasi!</AlertTitle>
          <AlertDescription>
            Pelatihan ini berdasarkan pada pengetahuan{" "}
            <span className="font-bold">
              {courseKnowledgeResp.data.knowledge_title}
            </span>
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <Card className="flex w-full basis-3/4 items-start justify-normal">
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="grow break-all font-heading text-3xl">
                {dataCourse.data.course_name}
              </p>
              <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
            </div>

            <div className="h-full max-h-max  rounded-md border border-primary p-4">
              {children}
            </div>

            <Tabs
              defaultValue="description"
              className="relative mr-auto w-full"
            >
              <div className="flex items-center justify-between pb-3">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="description"
                    className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Deskripsi
                  </TabsTrigger>
                  <TabsTrigger
                    value="time"
                    className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Waktu
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Murid
                  </TabsTrigger>
                  <TabsTrigger
                    value="forum"
                    className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Forum
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="description">
                <Card>
                  <CardHeader>
                    <CardTitle>Deskripsi</CardTitle>
                    <CardDescription>
                      Deskripsi tentang pelatihan ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <p>{dataCourse.data.course_desc}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="time">
                <Card>
                  <CardHeader>
                    <CardTitle>Waktu</CardTitle>
                    <CardDescription>
                      Tanggal berjalannya dan berakhirnya pelatihan ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <ul className="list-outside list-decimal ">
                        <li>
                          <p>
                            <span className="font-bold">Tanggal mulai:</span>{" "}
                            {convertDatetoString(
                              dataCourse.data.date_start.toString()
                            )}
                          </p>
                        </li>
                        <li>
                          <p>
                            <span className="font-bold">Tanggal berakhir:</span>{" "}
                            {convertDatetoString(
                              dataCourse.data.date_end.toString()
                            )}
                          </p>
                        </li>
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Peserta</CardTitle>
                    <CardDescription>
                      Berikut adalah daftar peserta pada pelatihan ini, yang
                      mungkin saja anda akan berinteraksi dengan mereka
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Table>
                      <TableCaption>
                        Daftar peserta pada pelatihan ini
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Last Online</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dataCourse.data.users.map((user) => (
                          <TableRow key={user.uuid}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>
                              {user.last_login ? (
                                convertDatetoString(user.last_login.toString())
                              ) : (
                                <span className="text-muted-foreground">
                                  Belum pernah login
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="forum">
                <Card>
                  <CardHeader>
                    <div className="grid grid-cols-5 items-center justify-between gap-4">
                      <div className="col-span-4">
                        <CardTitle>
                          Forum untuk {dataCourse.data.course_name}
                        </CardTitle>
                        <CardDescription>
                          Berinteraksilah dengan sesama murid pelatihan ini
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {threadsResp.data.length > 0 ? (
                      <ScrollArea className="h-[300px] w-full">
                        <div className="flex flex-col gap-4">
                          {threadsResp.data.map((thread, index) => (
                            <Card key={index}>
                              <CardHeader>
                                <Link
                                  href={{
                                    pathname: `/member-area/course/${params.detail}/forum/${thread.id_threads}`,
                                  }}
                                  key={index}
                                >
                                  <CardTitle className="font-heading text-lg font-bold hover:text-blue-600 hover:underline">
                                    {thread.threads_title}
                                  </CardTitle>
                                </Link>
                                <CardDescription className="grid grid-cols-2 justify-between text-sm text-muted-foreground">
                                  <div className="inline-flex items-center text-primary">
                                    <Icons.clock className="mr-2 h-4 w-4" />
                                    {convertDatetoString(
                                      new Date(thread.created_at).toString()
                                    )}
                                  </div>

                                  <div className="flex items-center justify-end">
                                    <div className="grid grid-cols-2 justify-between">
                                      <div className="mr-2 inline-flex text-green-500">
                                        <Icons.user className="mr-2 h-4 w-4" />
                                        {thread.number_of_users}
                                      </div>

                                      <div className="inline-flex text-red-600">
                                        <Icons.comment className="mr-2 h-4 w-4" />
                                        {thread.number_of_posts}
                                      </div>
                                    </div>
                                  </div>
                                </CardDescription>
                              </CardHeader>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : null}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <PreviewUserCourseDetailSidebar coursePreview={dataCourse} />
      </div>
    </DashboardShell>
  )
}
