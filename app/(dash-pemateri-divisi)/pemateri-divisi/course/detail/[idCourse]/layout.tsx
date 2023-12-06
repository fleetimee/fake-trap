import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getOneCourse, getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Content } from "@/components/content"
import { CreateContentDropdownButton } from "@/components/create-content-dropdown-button"
import { CreateQuizDropdownButton } from "@/components/create-quiz-dropwdown"
import SectionBanner from "@/components/create-section-banner"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VercelToolbar } from "@/components/vercel-toolbar"

interface CourseDetailLayoutProps {
  children: React.ReactNode
  params: {
    idCourse: string
  }
}

export async function generateMetadata({
  params,
}: CourseDetailLayoutProps): Promise<Metadata> {
  const user = await getCurrentUser()

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  return {
    title: course?.data?.course_name,
    description: course?.data?.course_desc,
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

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  const knowledge = await getOneKnowledge({
    token: user?.token,
    idKnowledge: course?.data?.id_knowledge.toString(),
  })

  if (course.code === 400) {
    return notFound()
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/course",
            title: "Pelatihan",
          },
          {
            href: `/pemateri-divisi/course/detail/${params.idCourse}`,
            title: course?.data?.course_name,
          },
        ]}
      />

      <SectionBanner
        description={course?.data?.course_desc}
        title={course?.data?.course_name}
        urlLink={`/pemateri-divisi/course/detail/${params.idCourse}/section/new`}
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
            <span className="font-bold">{knowledge.data.knowledge_title}</span>
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <div className="flex items-center justify-end">
        <VercelToolbar
          homeButton={`/pemateri-divisi/course/detail/${params.idCourse}`}
          forumButton={`/pemateri-divisi/course/detail/${params.idCourse}/threads`}
          userButton={`/pemateri-divisi/course/detail/${params.idCourse}/people`}
        />
      </div>

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        {/* Content Section */}
        <Content title={course?.data?.course_name}>{children}</Content>
      </div>
    </DashboardShell>
  )
}
