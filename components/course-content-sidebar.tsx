"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Empty from "@/public/lottie/empty.json"
import Empty2 from "@/public/lottie/empty2.json"
import {
  BookOpen,
  ChevronsUpDown,
  ClipboardCheck,
  GraduationCap,
  Medal,
  Menu,
  PenTool,
} from "lucide-react"
import { useMediaQuery } from "react-responsive"

import {
  CourseKnowledgeSectionListResData,
  CourseOneRes,
} from "@/types/course/res"
import { ContentType, QuizType } from "@/lib/enums/status"
import { cn } from "@/lib/utils"
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
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Icons } from "./icons"
import { LottieClient } from "./lottie-anim"
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
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const [open, setOpen] = React.useState(false)

  // Wrap link elements with click handler to close sheet
  const handleLinkClick = () => {
    setOpen(false)
  }

  const sidebarContent = (
    <Tabs defaultValue="knowledge" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-4 rounded-none border-b p-0">
        <TabsTrigger
          value="knowledge"
          className="relative rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="size-4" />
            <span className="text-xs" style={{ textTransform: "capitalize" }}>
              Materi
            </span>
          </div>
        </TabsTrigger>
        <TabsTrigger
          value="course"
          className="relative rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4" />
            <span className="text-xs" style={{ textTransform: "capitalize" }}>
              Pembelajaran
            </span>
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="knowledge">
        <ScrollArea className="h-[700px] w-full">
          {knowledgeSection.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className=""
              key={knowledgeSection[0].id_knowledge.toString()}
              defaultValue={knowledgeSection[0].id_knowledge.toString()}
            >
              {knowledgeSection.map((section) => (
                <AccordionItem
                  key={section.id_knowledge.toString()}
                  value={section.id_knowledge.toString()}
                >
                  <AccordionTrigger className="bg-primary px-2.5 font-heading text-[15px] font-medium tracking-wide text-primary-foreground">
                    <ContextMenu>
                      <ContextMenuTrigger className="text-left">{`${section.knowledge_title}`}</ContextMenuTrigger>
                      {canCreateContent ? (
                        <ContextMenuContent className="w-64">
                          {/* Delete Section */}
                          <DeleteSection
                            idSection={section.id_knowledge.toString()}
                            isCourseKnowledge={true}
                            idCourse={course.data.id_course}
                            idKnowledge={section.id_knowledge}
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

                  <AccordionContent className="py-0 md:p-1 ">
                    {section?.section ? (
                      section.section.map((section) => (
                        <Collapsible className="" defaultOpen>
                          <div className="flex items-center justify-between space-x-4 border-b bg-card  p-4">
                            <CollapsibleTrigger className="" asChild>
                              <div className="flex w-full items-center justify-between">
                                <h4 className="font-semibold text-black hover:cursor-pointer hover:text-blue-600 hover:underline dark:text-white">
                                  {section.section_title}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-9 p-0"
                                >
                                  <ChevronsUpDown className="size-4" />
                                  <span className="sr-only">Toggle</span>
                                </Button>
                              </div>
                            </CollapsibleTrigger>
                          </div>

                          <CollapsibleContent className="md:space-y-4 md:py-4">
                            {section?.content ? (
                              section.content.map((content) => (
                                <Link
                                  href={`${baseUrl}/section/${section.id_section}/content/${content.id_content}`}
                                  className="flex w-full cursor-pointer items-center justify-between"
                                  onClick={handleLinkClick}
                                >
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        className={cn(
                                          "grid h-14 w-full grid-cols-[auto,1fr] items-center justify-start gap-4 overflow-visible whitespace-normal rounded-lg border-2 text-left font-heading transition-all",
                                          pathname ===
                                            `${baseUrl}/section/${section.id_section}/content/${content.id_content}`
                                            ? "border-primary/70 bg-primary/10 text-primary shadow-sm hover:bg-primary/15"
                                            : "border-border bg-background hover:border-primary/30 hover:bg-accent/20"
                                        )}
                                      >
                                        {content.content_type ===
                                        ContentType.LOCAL_FILE ? (
                                          <Icons.video className="size-5 text-orange-500" />
                                        ) : content.content_type ===
                                          ContentType.VIDEO ? (
                                          <Icons.youtube className="size-5 text-red-500" />
                                        ) : content.content_type ===
                                          ContentType.ARTICLE ? (
                                          <Icons.post className="size-5 text-green-500" />
                                        ) : (
                                          <Icons.paperClip className="size-5 text-blue-500" />
                                        )}

                                        <p className="line-clamp-1 text-[15px] font-medium text-foreground dark:text-white">
                                          {content.content_title}
                                        </p>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="right"
                                      className="max-w-[300px]"
                                    >
                                      <span className="text-sm">
                                        {content.content_title}
                                      </span>
                                    </TooltipContent>
                                  </Tooltip>
                                </Link>
                              ))
                            ) : (
                              <div className="flex min-h-[200px] items-center justify-center text-sm text-muted-foreground">
                                <div className="flex items-center justify-between md:flex-col">
                                  <LottieClient animationData={Empty} />
                                  <p>Belum ada content</p>
                                </div>
                              </div>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      ))
                    ) : (
                      <div className="flex min-h-[250] items-center justify-center text-sm text-muted-foreground md:min-h-[300px]">
                        <div className="flex flex-col items-center justify-between py-4 md:py-0">
                          <LottieClient animationData={Empty2} />
                          <p>Belum ada section</p>
                        </div>
                      </div>
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
        {canCreateSection && (
          <div className="flex justify-end px-3 py-6">
            <Link href={`${baseUrl}/section/new`} onClick={handleLinkClick}>
              <Button size="sm" variant="outline">
                <Icons.add className="size-4" />
                <span className="ml-2">Tambah Section</span>
              </Button>
            </Link>
          </div>
        )}

        <ScrollArea className="h-[700px] w-full">
          {course?.data?.section ? (
            <Accordion
              type="single"
              collapsible
              className=""
              key={course.data.section[0].id_section.toString()}
              defaultValue={course.data.section[0].id_section.toString()}
            >
              {course.data.section.map((section) => (
                <AccordionItem
                  key={section.id_section.toString()}
                  value={section.id_section.toString()}
                >
                  <AccordionTrigger className="line-clamp-2 bg-primary px-2.5 font-heading text-[15px] font-medium tracking-wide text-primary-foreground">
                    <ContextMenu>
                      <ContextMenuTrigger>
                        {`${section.section_title}`}
                      </ContextMenuTrigger>

                      {canCreateContent ? (
                        <ContextMenuContent className="w-64">
                          <ContextMenuSeparator />

                          {/* Update Section */}
                          <ContextMenuItem inset>
                            <Link
                              href={`${baseUrl}/section/update/${section.id_section}`}
                              className="flex w-full cursor-pointer items-center justify-between"
                              onClick={handleLinkClick}
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
                          className="py-0 md:p-1"
                        >
                          <Link
                            href={`${baseUrl}/section/${section.id_section}/quiz/${quiz.id_quiz}`}
                            onClick={handleLinkClick}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  className={cn(
                                    "grid h-14 w-full grid-cols-[auto,1fr] items-center justify-start gap-4 overflow-visible whitespace-normal rounded-lg border-2 text-left font-heading transition-all",
                                    pathname ===
                                      `${baseUrl}/section/${section.id_section}/quiz/${quiz.id_quiz}`
                                      ? "border-primary/70 bg-primary/10 text-primary shadow-sm hover:bg-primary/15"
                                      : "border-border bg-background hover:border-primary/30 hover:bg-accent/20"
                                  )}
                                >
                                  {quiz.quiz_type === QuizType.PRETEST ? (
                                    <ClipboardCheck className="size-5 text-blue-500" />
                                  ) : quiz.quiz_type === QuizType.POSTTEST ? (
                                    <Medal className="size-5 text-yellow-500" />
                                  ) : (
                                    <PenTool className="size-5 text-green-500" />
                                  )}

                                  <div className="flex flex-col gap-0.5">
                                    <p className="line-clamp-1 text-[15px] font-medium text-foreground dark:text-white">
                                      {quiz.quiz_title}
                                    </p>
                                    <p className="text-[13px] font-normal text-muted-foreground">
                                      {quiz.quiz_type === QuizType.PRETEST
                                        ? "PRE-TEST"
                                        : quiz.quiz_type === QuizType.POSTTEST
                                          ? "POST-TEST"
                                          : "Ujian"}
                                    </p>
                                  </div>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="max-w-[300px]"
                              >
                                <span className="text-sm">
                                  {quiz.quiz_title}
                                </span>
                              </TooltipContent>
                            </Tooltip>
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
                              Tidak ada ujian
                            </EmptyContent.Title>
                            <EmptyContent.Description>
                              Belum ada ujian untuk bagian ini
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
  )

  const mobileContent = (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-4">
        <h2 className="font-heading text-lg font-semibold">Course Content</h2>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <Icons.close className="size-5" />
          </Button>
        </SheetTrigger>
      </div>
      <div className="flex-1 overflow-hidden px-4">{sidebarContent}</div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-6 left-6 z-[100] size-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:bg-primary/90"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full border-0 p-0 sm:w-[400px]">
            {mobileContent}
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <Card className="flex h-full basis-1/4 flex-col items-center justify-start">
      {sidebarContent}
    </Card>
  )
}
