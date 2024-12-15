"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Empty from "@/public/lottie/empty.json"
import Empty2 from "@/public/lottie/empty2.json"
import { BookOpen, ChevronsUpDown } from "lucide-react"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { ContentType } from "@/lib/enums/status"
import { cn } from "@/lib/utils"
import { CreateContentDropdownButton } from "@/components/create-content-dropdown-button"
import { KnowledgeDeleteContent } from "@/components/delete-content"
import { DeleteSection } from "@/components/delete-section"
import { EmptyContent } from "@/components/empty"
import { Icons } from "@/components/icons"
import { LottieClient } from "@/components/lottie-anim"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface KnowledgeContentSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  knowledge: KnowledgeOneRes
  baseUrl: string
  canCreateContent?: boolean
  newSection?: boolean
}

export function KnowledgeContentSidebar({
  knowledge,
  baseUrl,
  canCreateContent = true,
  newSection = false,
  className,
  ...props
}: KnowledgeContentSidebarProps) {
  const pathname = usePathname()

  return (
    <Card className="flex h-full basis-1/4 flex-col items-center justify-start">
      <Tabs defaultValue="knowledge" className="w-full">
        <TabsList className="grid w-full grid-cols-1 gap-4 rounded-none border-b p-0">
          <TabsTrigger
            value="knowledge"
            className="relative rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <span>Materi</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {newSection && (
          <div className="flex justify-end px-3 py-6">
            <Link href={`${baseUrl}/section/new`}>
              <Button size="sm" variant="outline">
                <Icons.add className="size-4" />
                <span className="ml-2">Tambah Section</span>
              </Button>
            </Link>
          </div>
        )}

        <TabsContent value="knowledge">
          <ScrollArea className="h-[700px] w-full">
            {knowledge.data?.section ? (
              <Accordion
                type="single"
                collapsible
                className=""
                key={knowledge.data?.section[0].id_section}
                defaultValue={knowledge.data?.section[0].id_section.toString()}
              >
                {knowledge.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section.toString()}
                    value={section.id_section.toString()}
                  >
                    <AccordionTrigger className="bg-primary px-2.5 font-heading text-[15px] font-medium tracking-wide text-primary-foreground">
                      <ContextMenu>
                        <ContextMenuTrigger className="text-left">
                          {section.section_title}
                        </ContextMenuTrigger>
                        {canCreateContent ? (
                          <ContextMenuContent className="w-64">
                            <ContextMenuSeparator />
                            <ContextMenuItem inset>
                              <Link
                                href={`${baseUrl}/section/update/${section.id_section}`}
                                className="flex w-full items-center justify-between"
                              >
                                Update
                                <ContextMenuShortcut>
                                  Ctrl + U
                                </ContextMenuShortcut>
                              </Link>
                            </ContextMenuItem>
                            <DeleteSection
                              idSection={section.id_section.toString()}
                            />
                            <ContextMenuItem inset disabled>
                              {section.section_title}
                              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                            </ContextMenuItem>
                          </ContextMenuContent>
                        ) : null}
                      </ContextMenu>
                    </AccordionTrigger>

                    <AccordionContent className="py-0 md:p-1">
                      <Collapsible className="" defaultOpen>
                        <CollapsibleContent className="md:space-y-4 md:py-4">
                          {section.content ? (
                            section.content.map((content) => (
                              <Link
                                key={content.id_content.toString()}
                                href={`${baseUrl}/section/${section.id_section}/content/${content.id_content}`}
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
                          {canCreateContent && (
                            <CreateContentDropdownButton
                              videoCreationUrl={`${baseUrl}/section/${section.id_section}/content/video/new`}
                              fileCreationUrl={`${baseUrl}/section/${section.id_section}/content/file/new`}
                              articleCreationUrl={`${baseUrl}/section/${section.id_section}/content/article/new`}
                            />
                          )}
                        </CollapsibleContent>
                      </Collapsible>
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
      </Tabs>
    </Card>
  )
}
