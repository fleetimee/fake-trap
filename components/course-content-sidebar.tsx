"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { CreateContentDropdownButton } from "@/components/create-content-dropdown-button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { EmptyContent } from "./app/knowledge/detail/ui"
import { CreateQuizDropdownButton } from "./create-quiz-dropwdown"
import { DeleteSection } from "./delete-section"

interface CourseContentSidebarProps {
  course: CourseOneRes
  baseUrl: string
}

export function CourseContentSidebar({
  course,
  baseUrl,
}: CourseContentSidebarProps) {
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
                      <ContextMenu>
                        <ContextMenuTrigger>
                          {/* Trigger for Context Menu */}
                          {`Konten ${section.section_title}`}
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          <ContextMenuItem inset disabled>
                            Section
                            <ContextMenuShortcut>Ctrl + S</ContextMenuShortcut>
                          </ContextMenuItem>

                          <ContextMenuSeparator />

                          {/* Update Section */}
                          <ContextMenuItem inset>
                            <Link
                              href={`${baseUrl}/section/update/${section.id_section}`}
                              className="flex w-full cursor-pointer items-center justify-between"
                            >
                              Update
                              <ContextMenuShortcut>
                                Ctrl + U
                              </ContextMenuShortcut>
                            </Link>
                          </ContextMenuItem>

                          {/* Delete Section */}
                          <DeleteSection
                            idSection={section.id_section.toString()}
                          />

                          {/* Section Name */}
                          <ContextMenuItem inset disabled>
                            {section.section_title}
                            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
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
                                  href={`${baseUrl}/section/${section.id_section}/content/${content.id_content}`}
                                >
                                  <Button className="flex h-16 w-full justify-start overflow-visible whitespace-normal rounded-md py-2 text-left font-heading transition-all hover:bg-secondary-foreground hover:text-background">
                                    {content.content_title}
                                  </Button>
                                </Link>
                              </AccordionContent>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                              <ContextMenuLabel inset>Options</ContextMenuLabel>
                              <ContextMenuSeparator />
                            </ContextMenuContent>
                          </ContextMenu>
                        ))}
                        <AccordionContent className="py-1">
                          {/* Create content button */}
                          <CreateContentDropdownButton
                            videoCreationUrl={`${baseUrl}/section/${section.id_section}/content/video/new`}
                            fileCreationUrl={`${baseUrl}/section/${section.id_section}/content/file/new`}
                            articleCreationUrl={`${baseUrl}/section/${section.id_section}/content/article/new`}
                          />
                        </AccordionContent>
                      </>
                    ) : (
                      <AccordionContent className="py-4">
                        <div className="flex flex-col gap-4">
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
                          {/* Create content button */}
                          <CreateContentDropdownButton
                            videoCreationUrl={`${baseUrl}/section/${section.id_section}/content/video/new`}
                            fileCreationUrl={`${baseUrl}/section/${section.id_section}/content/file/new`}
                            articleCreationUrl={`${baseUrl}/section/${section.id_section}/content/article/new`}
                          />
                        </div>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <EmptyContent className="flex h-[50px] items-center justify-center">
                <EmptyContent.Icon name="empty" />
                <EmptyContent.Title>Belum ada section</EmptyContent.Title>
                <EmptyContent.Description>
                  Silahkan tambahkan section pada tombol diatas
                </EmptyContent.Description>
              </EmptyContent>
            )}
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
                      <ContextMenu>
                        <ContextMenuTrigger>{` Test ${section.section_title}`}</ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          <ContextMenuItem inset disabled>
                            Section
                            <ContextMenuShortcut>Ctrl + S</ContextMenuShortcut>
                          </ContextMenuItem>

                          <ContextMenuSeparator />

                          {/* Update Section */}
                          <ContextMenuItem inset>
                            <Link
                              href={`${baseUrl}/section/update/${section.id_section}`}
                              className="flex w-full cursor-pointer items-center justify-between"
                            >
                              Update
                              <ContextMenuShortcut>
                                Ctrl + U
                              </ContextMenuShortcut>
                            </Link>
                          </ContextMenuItem>

                          {/* Delete Section */}
                          <DeleteSection
                            idSection={section.id_section.toString()}
                          />

                          {/* Section Name */}
                          <ContextMenuItem inset disabled>
                            {section.section_title}
                            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    </AccordionTrigger>

                    {section?.quiz ? (
                      <>
                        {section.quiz.map((quiz) => (
                          <AccordionContent
                            key={quiz.id_quiz.toString()}
                            className="py-1"
                          >
                            <Link
                              // href={`${pathname}/section/${section.id_section}/quiz/${quiz.id_quiz}`}
                              href={`${baseUrl}/section/${section.id_section}/quiz/${quiz.id_quiz}`}
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
                            // quizCreationUrl={`${pathname}/section/${section.id_section}/quiz/multiple-choice/new`}

                            quizCreationUrl={`${baseUrl}/section/${section.id_section}/quiz/multiple-choice/new`}
                          />
                        </AccordionContent>
                      </>
                    ) : (
                      <AccordionContent className="py-4">
                        <div className="flex flex-col gap-4">
                          <AccordionContent className="py-4">
                            <EmptyContent className="h-[50px]">
                              <EmptyContent.Icon name="empty" />
                              <EmptyContent.Title>
                                Tidak ada kuis
                              </EmptyContent.Title>
                              <EmptyContent.Description>
                                Belum ada kuis untuk bagian ini
                              </EmptyContent.Description>
                            </EmptyContent>
                          </AccordionContent>
                          {/* Create content button */}
                          <CreateQuizDropdownButton
                            // quizCreationUrl={`${pathname}/section/${section.id_section}/quiz/multiple-choice/new`}
                            quizCreationUrl={`${baseUrl}/section/${section.id_section}/quiz/multiple-choice/new`}
                          />
                        </div>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <EmptyContent className="h-[50px]">
                <EmptyContent.Icon name="empty" />
                <EmptyContent.Title>Belum ada section</EmptyContent.Title>
                <EmptyContent.Description>
                  Silahkan tambahkan section pada tombol diatas
                </EmptyContent.Description>
              </EmptyContent>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
