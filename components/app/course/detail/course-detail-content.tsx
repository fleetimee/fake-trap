import { CourseByIdResponse } from "@/types/course-res"
import { UserResponse } from "@/types/user-res"
import { convertDatetoString } from "@/lib/utils"
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
import { YoutubePlayer } from "@/components/youtube-player"

import { columnUserCourse } from "./user-columns"
import { UserDataTable } from "./user-data-table"

export function CourseDetailContent(props: {
  data: CourseByIdResponse
  user: UserResponse
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
        {/* <Image
          src={dataContentKnowledge.data.image}
          alt={dataContentKnowledge.data.knowledge_title}
          className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
          width={1280}
          height={720}
        /> */}
        <YoutubePlayer videoId="fqQ1Xum8uNI" />
        <Tabs defaultValue="description" className="hidden md:block">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Deskripsi</TabsTrigger>
            <TabsTrigger value="time">Waktu</TabsTrigger>
            <TabsTrigger value="users">Murid</TabsTrigger>
          </TabsList>
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
