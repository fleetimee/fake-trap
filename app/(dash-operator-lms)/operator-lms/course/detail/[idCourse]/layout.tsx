import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getOneCourse, getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { CreateContentDropdownButton } from "@/components/create-content-dropdown-button"
import { CreateQuizDropdownButton } from "@/components/create-quiz-dropwdown"
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
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/course",
            title: "Pelatihan",
          },
          {
            href: `/operator-lms/course/detail/${params.idCourse}`,
            title: course?.data?.course_name,
          },
        ]}
      />

      <section className="hidden rounded-md bg-gray-800 py-14 md:block">
        <div className="mx-auto max-w-screen-xl justify-between  gap-x-12 px-4 md:flex md:px-8">
          <div className="max-w-xl">
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">
              {course.data?.course_name}
            </h3>
            <p className="mt-3 text-gray-300">{course?.data?.course_desc}</p>
          </div>
          <div className="mt-4 flex-none md:mt-0">
            <Link
              href={`/operator-lms/course/detail/${params.idCourse}/section/new`}
              className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-gray-800 shadow-md duration-150 hover:bg-gray-100 hover:shadow-none active:bg-gray-200"
            >
              Tambah Section
            </Link>
          </div>
        </div>
      </section>

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
          homeButton={`/operator-lms/course/detail/${params.idCourse}`}
          forumButton={`/operator-lms/course/detail/${params.idCourse}/threads`}
          userButton={`/operator-lms/course/detail/${params.idCourse}/people`}
        />
      </div>

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        {/* Content Section */}
        <Card className="flex w-full basis-3/4 items-start justify-normal">
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="grow break-all font-heading text-3xl">
                {knowledge.data?.knowledge_title}
              </p>
              <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
            </div>

            <div className="h-full max-h-max  rounded-md border border-primary p-4">
              {children}
            </div>
          </div>
        </Card>

        {/* Sidebar Section */}
        <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
          <Tabs defaultValue="knowledge" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="knowledge" className="w-full font-semibold">
                Konten
              </TabsTrigger>
              <TabsTrigger value="course" className="w-full font-semibold">
                Pelatihan
              </TabsTrigger>
            </TabsList>

            {/* Course Content Section */}
            <TabsContent value="knowledge">
              <ScrollArea className="h-700px w-full">
                {course?.data?.section ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="px-4"
                    key={course.data.section[0].id_section.toString()}
                    defaultValue={course.data.section[0].id_section.toString()}
                  >
                    {course.data.section.map((section) => (
                      <AccordionItem
                        key={section.id_section.toString()}
                        value={section.id_section.toString()}
                      >
                        <AccordionTrigger className="font-heading text-base font-bold">
                          {`Konten ${section.section_title}`}
                        </AccordionTrigger>

                        {section?.content ? (
                          <>
                            {section.content.map((content) => (
                              <ContextMenu key={content.id_content.toString()}>
                                <ContextMenuTrigger>
                                  <AccordionContent
                                    key={content.id_content.toString()}
                                    className="py-1"
                                  >
                                    <Link
                                      href={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/content/${content.id_content}`}
                                    >
                                      <Button className="flex h-16 w-full justify-start overflow-visible whitespace-normal rounded-md py-2 text-left font-heading transition-all hover:bg-secondary-foreground hover:text-background">
                                        {content.content_title}
                                      </Button>
                                    </Link>
                                  </AccordionContent>
                                </ContextMenuTrigger>
                                <ContextMenuContent className="w-64">
                                  <ContextMenuLabel inset>
                                    Options
                                  </ContextMenuLabel>
                                  <ContextMenuSeparator />
                                </ContextMenuContent>
                              </ContextMenu>
                            ))}
                            <AccordionContent className="py-1">
                              {/* Create content button */}
                              <CreateContentDropdownButton
                                videoCreationUrl={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/content/video/new`}
                                fileCreationUrl={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/content/file/new`}
                                articleCreationUrl={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/content/article/new`}
                              />
                            </AccordionContent>
                          </>
                        ) : (
                          <AccordionContent className="py-4">
                            <div className="flex flex-col gap-4">
                              <p className="text-sm text-muted-foreground">
                                Tidak ada konten
                              </p>
                              {/* Create content button */}
                              <CreateContentDropdownButton
                                videoCreationUrl={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/content/video/new`}
                                fileCreationUrl={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/content/file/new`}
                                articleCreationUrl={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/content/article/new`}
                              />
                            </div>
                          </AccordionContent>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : null}
              </ScrollArea>
            </TabsContent>

            {/* Course Test Section */}
            <TabsContent value="course">
              <ScrollArea className="h-[700px] w-full">
                {course?.data?.section ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="px-4"
                    key={course.data.section[0].id_section.toString()}
                    defaultValue={course.data.section[0].id_section.toString()}
                  >
                    {course.data.section.map((section) => (
                      <AccordionItem
                        key={section.id_section.toString()}
                        value={section.id_section.toString()}
                      >
                        <AccordionTrigger className="font-heading text-base font-bold">
                          {` Test ${section.section_title}`}
                        </AccordionTrigger>

                        {section?.quiz ? (
                          <>
                            {section.quiz.map((quiz) => (
                              <AccordionContent
                                key={quiz.id_quiz.toString()}
                                className="py-1"
                              >
                                <Link
                                  href={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/quiz/${quiz.id_quiz}`}
                                >
                                  <Button className="flex h-16 w-full justify-start overflow-visible whitespace-normal rounded-md py-2 text-left font-heading transition-all hover:bg-secondary-foreground hover:text-background">
                                    {quiz.quiz_title}
                                  </Button>
                                </Link>
                              </AccordionContent>
                            ))}
                            <AccordionContent className="py-1">
                              {/* Create quiz button */}
                              <CreateQuizDropdownButton
                                quizCreationUrl={`/operator-lms/course/detail/${params.idCourse}/section/${section.id_section}/quiz/multiple-choice/new`}
                              />
                            </AccordionContent>
                          </>
                        ) : null}
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : null}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardShell>
  )
}
