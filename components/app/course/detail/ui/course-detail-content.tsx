"use client"

import React from "react"
import Link from "next/link"
import { Variants } from "framer-motion"

import {
  CourseOneRes,
  CourseOneResQuiz,
  CourseVacantUserListRes,
} from "@/types/course/res"
import { KnowledgeOneResContent } from "@/types/knowledge/res"
import { QuestionListRes } from "@/types/question/res"
import { ThreadListResData } from "@/types/threads/res"
import { UserListRes } from "@/types/user/res"
import { convertDatetoString } from "@/lib/utils"
import { CreateThreadButton } from "@/components/app/course/detail/forum/operations"
import { CourseQuizForm } from "@/components/app/course/detail/quiz/ui"
import { QuizFormTemp } from "@/components/app/course/detail/quiz/ui/quiz-form-temp"
import {
  columnUserCourse,
  UserDataTable,
} from "@/components/app/course/detail/students/ui"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { renderContentCourse, renderQuiz } from "@/components/render-content"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseDetailContentProps {
  quizIdInitial: string
  courseDataResp: CourseOneRes
  userDataDropdown: CourseVacantUserListRes
  userDataResp: UserListRes
  questionResp: QuestionListRes
  contentData: KnowledgeOneResContent
  contentQuiz: CourseOneResQuiz
  setContentQuiz: React.Dispatch<React.SetStateAction<CourseOneResQuiz>>
  setContentData: React.Dispatch<React.SetStateAction<KnowledgeOneResContent>>
  activeIndex: string
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
  threadRespData: ThreadListResData[]
}

const parentVariant: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0, transition: { staggerChildren: 0.4 } },
}

const childVariant: Variants = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
}

export function CourseDetailContent({ ...props }: CourseDetailContentProps) {
  return (
    <Card className="flex w-full basis-3/4 items-start justify-normal">
      <MotionDiv
        className="flex w-full flex-col gap-6 p-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.4 } }}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="grow break-all font-heading text-3xl">
            {props.courseDataResp.data.course_name}
          </p>
          <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
        </div>
        {props.contentQuiz.id_quiz == 0
          ? renderContentCourse({
              contentQuiz: props.contentQuiz,
              contentType: props.contentData.content_type,
              courseDataResp: props.courseDataResp,
              userDataResp: props.userDataResp,
              contentData: props.contentData,
              setContentQuiz: props.setContentQuiz,
              setContentData: props.setContentData,
              activeIndex: props.activeIndex,
              setActiveIndex: props.setActiveIndex,
            })
          : props.contentQuiz
          ? // <Card className="flex flex-col items-start justify-between gap-12 p-6">
            //   {props.questionResp.data.map((question, index) => (
            //     <CourseQuizForm
            //       question={question}
            //       key={question.id_question}
            //       index={index}
            //     />
            //   ))}
            //   <Button type="submit" className="col-span-1 font-heading">
            //     Submit
            //   </Button>
            // </Card>
            // <QuizFormTemp
            //   quizIdInitial={props.quizIdInitial}
            //   questionResp={props.questionResp}
            //   contentQuiz={props.contentQuiz}
            // />
            renderQuiz({
              questionResp: props.questionResp,
              contentQuiz: props.contentQuiz,
              quizIdInitial: props.quizIdInitial,
              idQUiz: props.contentQuiz.id_quiz.toString(),
            })
          : null}
        <Tabs defaultValue="description" className="relative mr-auto w-full">
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
                <CardDescription>Deskripsi tentang kursus ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-[300px] w-full">
                  <p>{props.courseDataResp.data.course_desc}</p>
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
                          props.courseDataResp.data.date_start.toString()
                        )}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="font-bold">Tanggal berakhir:</span>{" "}
                        {convertDatetoString(
                          props.courseDataResp.data.date_end.toString()
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
                <CardTitle>Murid</CardTitle>
                <CardDescription>
                  Murid yang mengikuti kursus ini
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-[300px] w-full">
                  <div>
                    <UserDataTable
                      columns={columnUserCourse}
                      data={
                        props.courseDataResp.data.users
                          ? props.courseDataResp.data.users
                          : []
                      }
                      userList={props.userDataDropdown}
                      courseData={props.courseDataResp}
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="forum">
            <Card>
              <CardHeader>
                <div className="grid grid-cols-5 items-center justify-between gap-4">
                  <div className="col-span-4">
                    <CardTitle>
                      Forum untuk {props.courseDataResp.data.course_name}
                    </CardTitle>
                    <CardDescription>
                      Berinteraksilah dengan sesama murid kursus ini
                    </CardDescription>
                  </div>
                  <CreateThreadButton courseDataResp={props.courseDataResp} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {props.threadRespData ? (
                  <ScrollArea className="h-[300px] w-full">
                    <div className="flex flex-col gap-4">
                      {props.threadRespData.map((thread, index) => (
                        <Link
                          href={{
                            pathname: `/dashboard/course/${props.courseDataResp.data.id_course}/forum/${thread.id_threads}`,
                            query: {
                              thread_title: thread.threads_title,
                            },
                          }}
                          key={index}
                        >
                          <Card>
                            <CardHeader>
                              <CardTitle className="font-heading text-lg font-bold">
                                {thread.threads_title}
                              </CardTitle>
                              <CardDescription className="inline-flex font-heading text-sm text-muted-foreground">
                                <Icons.close className="mr-2 h-4 w-4" />
                                {convertDatetoString(
                                  new Date(thread.created_at).toString()
                                )}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                ) : null}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </MotionDiv>
    </Card>
  )
}
