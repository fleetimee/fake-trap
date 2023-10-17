"use client"

import path from "path"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AccordionItem } from "@radix-ui/react-accordion"
import { is } from "date-fns/locale"

import { CourseOneRes } from "@/types/course/res"
import { cn } from "@/lib/utils"
import { EmptyContent } from "@/components/app/knowledge/detail/ui"
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PreviewCourseDetailSidebarProps {
  coursePreview: CourseOneRes
}

export function PreviewCourseDetailSidebar({
  coursePreview,
}: PreviewCourseDetailSidebarProps) {
  const pathname = usePathname()

  const isContent = pathname.includes("/content")
  const isQuiz = pathname.includes("/quiz")

  return (
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

        <TabsContent value="knowledge">
          <ScrollArea className="h-[700px] w-full">
            {coursePreview.data.section ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={coursePreview.data.section[0].id_section.toString()}
                defaultValue={coursePreview.data.section[0].id_section.toString()}
              >
                {coursePreview.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section.toString()}
                    value={section.id_section.toString()}
                    className="text-sm"
                  >
                    <AccordionTrigger className="font-heading text-base font-bold">
                      {`Konten ${section.section_title}`}
                    </AccordionTrigger>

                    {section.content ? (
                      section.content.map((content) => (
                        <AccordionContent
                          key={content.id_content.toString()}
                          className="py-1"
                        >
                          <Link
                            href={
                              isContent
                                ? `/supervisor-area/approval/approve-course/preview-course/${coursePreview.data.id_course}/content/${content.id_content}`
                                : `${pathname}/content/${content.id_content}`
                            }
                          >
                            <Button
                              className={cn(
                                "flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading transition-all hover:bg-secondary-foreground hover:text-background",
                                {
                                  "bg-secondary-foreground":
                                    isContent &&
                                    pathname.includes(
                                      `/content/${content.id_content}`
                                    ),
                                }
                              )}
                            >
                              {content.content_title}
                            </Button>
                          </Link>
                        </AccordionContent>
                      ))
                    ) : (
                      <AccordionContent className="py-4">
                        <EmptyContent className="h-[50px]">
                          <EmptyContent.Icon name="empty" />
                          <EmptyContent.Title>
                            Tidak ada konten
                          </EmptyContent.Title>
                          <EmptyContent.Description>
                            Belum ada konten untuk bagian ini
                          </EmptyContent.Description>
                        </EmptyContent>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : null}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="course">
          <ScrollArea className="h-[700px] w-full">
            {coursePreview.data.section ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={coursePreview.data.section[0].id_section.toString()}
                defaultValue={coursePreview.data.section[0].id_section.toString()}
              >
                {coursePreview.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section.toString()}
                    value={section.id_section.toString()}
                    className="text-sm"
                  >
                    <AccordionTrigger className="font-heading text-base font-bold">
                      {`Pelatihan ${section.section_title}`}
                    </AccordionTrigger>

                    {section.quiz ? (
                      section.quiz.map((quiz) => (
                        <AccordionContent
                          key={quiz.id_quiz.toString()}
                          className="py-1"
                        >
                          <Button
                            className={cn(
                              "flex h-[65px] w-full justify-start rounded-md py-2 text-left font-heading transition-all hover:bg-secondary-foreground hover:text-background"
                            )}
                          >
                            {quiz.quiz_title}
                          </Button>
                        </AccordionContent>
                      ))
                    ) : (
                      <AccordionContent className="py-4">
                        <EmptyContent className="h-[50px]">
                          <EmptyContent.Icon name="empty" />
                          <EmptyContent.Title>
                            Tidak ada konten
                          </EmptyContent.Title>
                          <EmptyContent.Description>
                            Belum ada konten untuk bagian ini
                          </EmptyContent.Description>
                        </EmptyContent>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : null}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
