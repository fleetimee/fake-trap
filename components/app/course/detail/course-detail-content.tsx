import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Content } from "@/types/content-res"
import { CourseByIdResponse } from "@/types/course-res"
import { QuizData } from "@/types/quiz-res"
import { UserResponse } from "@/types/user-res"
import { convertDatetoString, getYoutubeLastId } from "@/lib/utils"
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
import { Icons } from "@/components/icons"
import { PdfViewer } from "@/components/pdf-viewer"
import { YoutubePlayer } from "@/components/youtube-player"

import { columnUserCourse } from "./user-columns"
import { UserDataTable } from "./user-data-table"

export function renderContentCourse(
  contentType: number,
  props: {
    data: CourseByIdResponse
    user: UserResponse
    contentData: Content
    setContentData: React.Dispatch<React.SetStateAction<Content>>
    activeIndex: string
    setActiveIndex: React.Dispatch<React.SetStateAction<string>>
  }
) {
  switch (contentType) {
    case 0:
      return (
        <Image
          src={props.data.data.image}
          alt={props.data.data.course_name}
          className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
          width={1280}
          height={720}
        />
      )

    case 1:
      return (
        <YoutubePlayer videoId={getYoutubeLastId(props.contentData.link)} />
      )

    case 2:
      return <PdfViewer />

    case 3:
      return (
        <Link
          href={props.contentData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-4"
        >
          <Image
            src={props.data.data.image}
            alt={props.data.data.course_name}
            className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
            width={1280}
            height={720}
          />
          <Button className="w-full text-left">
            <Icons.link className="h-4 w-4" />
            <span className="ml-2">Buka Link</span>
          </Button>
        </Link>
      )

    default:
      return null
  }
}

export function CourseDetailContent(props: {
  data: CourseByIdResponse
  user: UserResponse
  contentData: Content
  contentQuiz: QuizData
  setContentQuiz: React.Dispatch<React.SetStateAction<QuizData>>
  setContentData: React.Dispatch<React.SetStateAction<Content>>
  activeIndex: string
  setActiveIndex: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <Card className="flex w-full basis-3/4 items-start justify-normal">
      <div className="flex w-full flex-col gap-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="grow break-all font-heading text-3xl">
            {props.data.data.course_name}
          </p>
          <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
        </div>

        {props.contentQuiz.id_quiz == 0 ? (
          renderContentCourse(props.contentData.content_type, props)
        ) : props.contentQuiz ? (
          <p>Penis</p>
        ) : null}

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
                  <p>{props.data.data.course_desc}</p>
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
                          props.data.data.date_start.toString()
                        )}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="font-bold">Tanggal berakhir:</span>{" "}
                        {convertDatetoString(
                          props.data.data.date_end.toString()
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
                      data={props.data.data.users ? props.data.data.users : []}
                      userList={props.user}
                      courseData={props.data}
                    />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
