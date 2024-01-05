"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronsUpDown } from "lucide-react"

import {
  CourseKnowledgeListResData,
  CourseKnowledgeSectionListResData,
  CourseOneRes,
} from "@/types/course/res"
import { cn } from "@/lib/utils"
import { CreateContentDropdownButton } from "@/components/create-content-dropdown-button"
import { CreateQuizDropdownButton } from "@/components/create-quiz-dropwdown"
import { DeleteSection } from "@/components/delete-section"
import { EmptyContent } from "@/components/empty"
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

import { Icons } from "./icons"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"

interface CourseContentSidebarProps {
  course: CourseOneRes
  knowledgeSection: CourseKnowledgeSectionListResData[]
  baseUrl: string
  canCreateContent?: boolean
  canCreateSection?: boolean
}

export function CourseContentSidebar({
  knowledgeSection,
  course,
  baseUrl,
  canCreateContent = true,
  canCreateSection = false,
}: CourseContentSidebarProps) {
  const pathname = usePathname()

  return (
    <Card className="flex h-full basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="knowledge" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="knowledge" className="w-full font-semibold">
            Materi
          </TabsTrigger>
          <TabsTrigger value="course" className="w-full font-semibold">
            Pelatihan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge">
          <ScrollArea className="h-[700px] w-full">
            {knowledgeSection.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={knowledgeSection[0].id_knowledge.toString()}
                defaultValue={knowledgeSection[0].id_knowledge.toString()}
              >
                {knowledgeSection.map((section) => (
                  <AccordionItem
                    key={section.id_knowledge.toString()}
                    value={section.id_knowledge.toString()}
                  >
                    <AccordionTrigger className=" text-base font-semibold">
                      <ContextMenu>
                        <ContextMenuTrigger className="text-left">{`${section.knowledge_title}`}</ContextMenuTrigger>
                        {canCreateContent ? (
                          <ContextMenuContent className="w-64">
                            <ContextMenuItem inset disabled>
                              Section
                              <ContextMenuShortcut>
                                Ctrl + S
                              </ContextMenuShortcut>
                            </ContextMenuItem>

                            <ContextMenuSeparator />

                            {/* Update Section */}
                            <ContextMenuItem inset>
                              <Link
                                href={`${baseUrl}/section/update/${section.id_knowledge}`}
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
                              idSection={section.id_knowledge.toString()}
                            />

                            {/* Section Name */}
                            <ContextMenuItem inset disabled>
                              {section.knowledge_title}
                              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                            </ContextMenuItem>
                          </ContextMenuContent>
                        ) : null}
                      </ContextMenu>
                    </AccordionTrigger>

                    <AccordionContent>
                      {section?.section ? (
                        section.section.map((section) => (
                          <Collapsible className="space-y-6 py-2">
                            <div className="flex items-center justify-between space-x-4 px-4">
                              <h4 className="text-sm font-semibold">
                                {section.section_title}
                              </h4>

                              <CollapsibleTrigger className="" asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-9 p-0"
                                >
                                  <ChevronsUpDown className="h-4 w-4" />
                                  <span className="sr-only">Toggle</span>
                                </Button>
                              </CollapsibleTrigger>
                            </div>

                            <CollapsibleContent className="space-y-6">
                              {section?.content ? (
                                section.content.map((content) => (
                                  <Link
                                    href={`${baseUrl}/section/${section.id_section}/content/${content.id_content}`}
                                    className="flex w-full cursor-pointer items-center justify-between"
                                  >
                                    <Button
                                      className={cn(
                                        "flex h-16 w-full justify-start overflow-visible whitespace-normal rounded-md py-2 text-left font-heading transition-all hover:bg-primary hover:text-background",
                                        {
                                          "border border-primary bg-primary-foreground text-primary":
                                            pathname !==
                                            `${baseUrl}/section/${section.id_section}/content/${content.id_content}`,
                                        }
                                      )}
                                    >
                                      {content.content_title}
                                    </Button>
                                  </Link>
                                ))
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  Belum ada content
                                </p>
                              )}
                            </CollapsibleContent>
                          </Collapsible>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Belum ada section
                        </p>
                      )}
                    </AccordionContent>
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

        {/* Course Test Section */}
        <TabsContent value="course">
          <div className="flex justify-end px-3 py-6">
            {canCreateSection && (
              <Link href={`${baseUrl}/section/new`}>
                <Button size="sm" variant="outline">
                  <Icons.add className="h-4 w-4" />
                  <span className="ml-2">Tambah Section</span>
                </Button>
              </Link>
            )}
          </div>

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
                        <ContextMenuTrigger>{`${section.section_title}`}</ContextMenuTrigger>
                        {canCreateContent ? (
                          <ContextMenuContent className="w-64">
                            <ContextMenuItem inset disabled>
                              Section
                              <ContextMenuShortcut>
                                Ctrl + S
                              </ContextMenuShortcut>
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
                        ) : null}
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
                              <Button
                                className={cn(
                                  "flex h-16 w-full justify-start overflow-visible whitespace-normal rounded-md py-2 text-left font-heading transition-all hover:bg-primary hover:text-background",
                                  {
                                    "border border-primary bg-primary-foreground text-primary":
                                      pathname !==
                                      `${baseUrl}/section/${section.id_section}/quiz/${quiz.id_quiz}`,
                                  }
                                )}
                              >
                                {quiz.quiz_title}
                              </Button>
                            </Link>
                          </AccordionContent>
                        ))}
                        {canCreateContent ? (
                          <AccordionContent className="py-1">
                            {/* Create quiz button */}
                            <CreateQuizDropdownButton
                              quizCreationUrl={`${baseUrl}/section/${section.id_section}/quiz/multiple-choice/new`}
                            />
                          </AccordionContent>
                        ) : null}
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
                          {canCreateContent ? (
                            <CreateQuizDropdownButton
                              // quizCreationUrl={`${pathname}/section/${section.id_section}/quiz/multiple-choice/new`}
                              quizCreationUrl={`${baseUrl}/section/${section.id_section}/quiz/multiple-choice/new`}
                            />
                          ) : null}
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
