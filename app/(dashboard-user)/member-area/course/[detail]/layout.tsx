import React from "react"
import { redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { CourseOneRes } from "@/types/course/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface CourseDetailLayoutProps {
  children: React.ReactNode
  params: {
    detail: string
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
            Kursus ini berdasarkan pada pengetahuan{" "}
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

            <div className="h-full max-h-max min-h-[30rem] rounded-md border border-primary p-4">
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
                      Deskripsi tentang kursus ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <p>{dataCourse.data.course_desc}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
          <Tabs defaultValue="quiz" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="quiz" className="w-full font-semibold">
                Latihan
              </TabsTrigger>
              <TabsTrigger value="content" className="w-full font-semibold">
                Materi
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>
      </div>
    </DashboardShell>
  )
}
