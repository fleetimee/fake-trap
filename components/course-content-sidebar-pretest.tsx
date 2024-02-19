"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { CourseOneResSection } from "@/types/course/res"
import { QuizType } from "@/lib/enums/status"
import { cn } from "@/lib/utils"
import { EmptyContent } from "@/components/empty"
import { Icons } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseContentSidebarPretestProps {
  filteredSections: CourseOneResSection[]
  baseUrl: string
}

export function CourseContentSidebarPretest({
  filteredSections,
  baseUrl,
}: CourseContentSidebarPretestProps) {
  const pathname = usePathname()

  return (
    <Card className="flex h-full basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="course" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="course" className="w-full font-semibold">
            Pelatihan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="course">
          <ScrollArea className="h-[700px] w-full">
            {filteredSections ? (
              <Accordion
                type="single"
                collapsible
                className=""
                key={filteredSections[0].id_section.toString()}
                defaultValue={filteredSections[0].id_section.toString()}
              >
                {filteredSections.map((section) => (
                  <AccordionItem
                    key={section.id_section.toString()}
                    value={section.id_section.toString()}
                  >
                    <AccordionTrigger className="line-clamp-2 bg-primary px-2 font-heading text-base font-bold text-primary-foreground">
                      <ContextMenu>
                        <ContextMenuTrigger>
                          {`${section.section_title}`}
                        </ContextMenuTrigger>
                      </ContextMenu>
                    </AccordionTrigger>

                    {section?.quiz ? (
                      <>
                        {section.quiz.map((quiz) => (
                          <AccordionContent
                            key={quiz.id_quiz.toString()}
                            className="py-0 md:p-1 "
                          >
                            <Link
                              // href={`${pathname}/section/${section.id_section}/quiz/${quiz.id_quiz}`}
                              href={`${baseUrl}/section/${section.id_section}/quiz/${quiz.id_quiz}`}
                              //   href={`/peserta/course/detail/${params.idCourse}/section/${section.id_section}/quiz/${quiz.id_quiz}`}
                            >
                              <Button
                                className={cn(
                                  "grid h-16 w-full grid-cols-[auto,1fr] items-center justify-start overflow-visible whitespace-normal rounded-none text-left font-heading transition-all hover:bg-primary hover:text-background md:rounded-md md:py-2",
                                  {
                                    "bg-background text-primary md:border md:border-primary":
                                      pathname !==
                                      `${baseUrl}/section/${section.id_section}/quiz/${quiz.id_quiz}`,
                                  }
                                )}
                              >
                                {quiz.quiz_type === QuizType.PRETEST ? (
                                  <Icons.postTest className="mr-2 size-4 text-purple-600" />
                                ) : quiz.quiz_type === QuizType.POSTTEST ? (
                                  <Icons.preTest className="mr-2 size-4 text-green-500" />
                                ) : (
                                  <Icons.quiz className="mr-2 size-4 text-green-500" />
                                )}

                                <div>
                                  <p className="line-clamp-1">
                                    {quiz.quiz_title}
                                  </p>

                                  <p className="text-xs">
                                    {quiz.quiz_type === QuizType.PRETEST
                                      ? "PRE-TEST"
                                      : quiz.quiz_type === QuizType.POSTTEST
                                        ? "POST-TEST"
                                        : "Quiz"}
                                  </p>
                                </div>
                              </Button>
                            </Link>
                          </AccordionContent>
                        ))}
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
                        </div>
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
