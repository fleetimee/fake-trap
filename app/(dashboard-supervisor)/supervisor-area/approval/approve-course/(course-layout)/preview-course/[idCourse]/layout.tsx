import React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import {
  ApprovalCheckOne,
  ApprovalCourseLookupOneRes,
} from "@/types/approval/res"
import { CourseOneRes } from "@/types/course/res"
import { ThreadListRes } from "@/types/threads/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { PreviewCourseDetailSidebar } from "./_components/sidebar"

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

interface GetIdApproval {
  token: string | undefined
  id: string
}

async function getIdApproval({
  token,
  id,
}: GetIdApproval): Promise<ApprovalCourseLookupOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/lookup/${id}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

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

interface GetCheckCourseProps {
  token: string | undefined
  id: string
}

async function getCheckCourse({
  token,
  id,
}: GetCheckCourseProps): Promise<ApprovalCheckOne> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/0051/${id}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface CoursePreviewProps {
  children: React.ReactNode
  params: {
    idCourse: string
  }
}

export async function generateMetadata({ params }: CoursePreviewProps) {
  const user = await getCurrentUser()

  const coursePreview = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  return {
    title: coursePreview?.data?.course_name,
    description: coursePreview?.data?.course_desc,
  }
}

export default async function CoursePreview({
  children,
  params,
}: CoursePreviewProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const getCourse = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  if (getCourse.code === 404) {
    return notFound()
  }

  const [lookupApproval] = await Promise.all([
    getIdApproval({
      token: user?.token,
      id: params.idCourse,
    }),
  ])

  console.log(lookupApproval)

  const checkCoursePending = await getCheckCourse({
    id: lookupApproval.data.id_approval_course.toString(),
    token: user?.token,
  })

  console.log(checkCoursePending)

  const threadsResp = await getThreadList({
    idCourse: params.idCourse,
    token: user?.token,
    limit: 1000,
    page: 1,
  })

  console.log(threadsResp)

  if (getCourse.code === 404 || checkCoursePending.code === 404) {
    return notFound()
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-area",
            title: "Supervisor Area",
          },
          {
            href: "/supervisor-area/approval",
            title: "Approval",
          },
          {
            href: "/supervisor-area/approval/approve-course",
            title: "Approve Course",
          },
          {
            href: `/supervisor-area/approval/approve-course/${params.idCourse}`,
            title: `Approve Course - ${getCourse?.data?.course_name}`,
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
          <AlertTitle>Preview Pelatihan</AlertTitle>
          <div className="flex w-full flex-col items-end justify-between gap-4 lg:flex-row lg:items-center">
            <AlertDescription>
              Ini adalah Preview untuk pelatihan{" "}
              <span className="font-bold">{params.idCourse}</span>.
              <span className="block">
                {" "}
                Silahkan periksa kembali sebelum menyetujui pengetahuan ini.
              </span>
            </AlertDescription>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      disabled={!checkCoursePending.data.is_exist}
                    >
                      <Button
                        variant="default"
                        size="lg"
                        disabled={!checkCoursePending.data.is_exist}
                      >
                        Approve / Tolak
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="min-w-[10rem]">
                        <Link
                          href={`/supervisor-area/approval/approve-course/pending/approve/${lookupApproval.data.id_approval_course}`}
                        >
                          <p className="text-green-500">Approve</p>
                        </Link>
                        <DropdownMenuShortcut>⌘+Shift+A</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="min-w-[10rem]">
                        <Link
                          href={`/supervisor-area/approval/approve-course/pending/rejected/${lookupApproval.data.id_approval_course}`}
                        >
                          <p className="text-red-500">Tolak</p>
                        </Link>
                        <DropdownMenuShortcut>⌘+Shift+B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  Tolak atau Approve Pengetahuan ini
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Alert>
      </MotionDiv>

      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <Card className="flex w-full basis-3/4 items-start justify-normal">
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="grow break-all font-heading text-3xl">
                {getCourse?.data?.course_name}
              </p>
              <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
            </div>

            <div className="h-full max-h-max w-full rounded-md border border-primary p-4">
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
                      Deskripsi tentang pengetahuan ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <p>{getCourse?.data?.course_desc}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="time">
                <Card>
                  <CardHeader>
                    <CardTitle>Waktu</CardTitle>
                    <CardDescription>
                      Tanggal berjalannya dan berakhirnya kursus ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <ul className="list-outside list-decimal ">
                        <li>
                          <p>
                            <span className="font-bold">Tanggal mulai:</span>{" "}
                            {convertDatetoString(
                              getCourse.data.date_start.toString()
                            )}
                          </p>
                        </li>
                        <li>
                          <p>
                            <span className="font-bold">Tanggal berakhir:</span>{" "}
                            {convertDatetoString(
                              getCourse.data.date_end.toString()
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
                      Berikut adalah daftar peserta pada pelatihan ini.
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
                        {getCourse.data.users.map((user) => (
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
                          Forum untuk {getCourse.data.course_name}
                        </CardTitle>
                        <CardDescription>
                          Berinteraksilah dengan sesama murid kursus ini
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {threadsResp.data ? (
                      <ScrollArea className="h-[300px] w-full">
                        <div className="flex flex-col gap-4">
                          {threadsResp.data.map((thread, index) => (
                            <Card key={index}>
                              <CardHeader>
                                <Link
                                  href={{
                                    pathname: `/member-area/course/${params.idCourse}/forum/${thread.id_threads}`,
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

        <PreviewCourseDetailSidebar coursePreview={getCourse} />
      </div>
    </DashboardShell>
  )
}
