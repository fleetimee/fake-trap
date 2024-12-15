"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ClipboardCheck,
  GraduationCap,
  Medal,
  Menu,
  PenTool,
} from "lucide-react"
import { useMediaQuery } from "react-responsive"

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

interface CourseContentSidebarPretestProps {
  filteredSections: CourseOneResSection[]
  baseUrl: string
}

export function CourseContentSidebarPretest({
  filteredSections,
  baseUrl,
}: CourseContentSidebarPretestProps) {
  const pathname = usePathname()
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const [open, setOpen] = React.useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  const sidebarContent = (
    <Tabs defaultValue="course" className="w-full">
      <TabsList className="grid w-full grid-cols-1 gap-4 rounded-none border-b p-0">
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

      <TabsContent value="course">
        <ScrollArea className="h-[700px] w-full">
          {filteredSections && filteredSections.length > 0 ? (
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
                  <AccordionTrigger className="bg-primary px-2.5 font-heading text-[15px] font-medium tracking-wide text-primary-foreground">
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
