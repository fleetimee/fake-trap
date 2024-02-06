"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { ContentType } from "@/lib/enums/status"
import { cn } from "@/lib/utils"
import { CreateContentDropdownButton } from "@/components/create-content-dropdown-button"
import { KnowledgeDeleteContent } from "@/components/delete-content"
import { DeleteSection } from "@/components/delete-section"
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
    <Card className="flex  h-full basis-1/4 flex-col items-center justify-start rounded-none sm:rounded-lg ">
      <Tabs defaultValue="knowledge" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value="knowledge"
            className="font-lg w-full  rounded-none font-semibold sm:rounded-sm"
          >
            <div className="inline-flex items-center">
              <span className="ml-2">Materi</span>
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
            {/* Iterate Section Title */}
            {knowledge.data?.section ? (
              <Accordion
                type="single"
                collapsible
                className="px-4"
                key={knowledge.data?.section[0].id_section}
                defaultValue={knowledge.data?.section[0].id_section.toString()}
              >
                {/* Iterate Item */}
                {knowledge.data.section.map((section) => (
                  <AccordionItem
                    key={section.id_section.toString()}
                    value={section.id_section.toString()}
                    className="text-sm"
                  >
                    <AccordionTrigger className="line-clamp-2 font-heading text-base font-bold">
                      <ContextMenu key={section.id_section}>
                        <ContextMenuTrigger>
                          {/* The Trigger is the Accordion Title */}
                          {section.section_title}
                        </ContextMenuTrigger>
                        {
                          // This is the Context Menu Content
                          canCreateContent ? (
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem inset disabled>
                                Section
                                <ContextMenuShortcut>⌘1</ContextMenuShortcut>
                              </ContextMenuItem>

                              <ContextMenuSeparator />
                              {/* Update Section */}
                              <ContextMenuItem inset>
                                <Link
                                  href={`${baseUrl}/section/update/${section.id_section}`}
                                  className="flex w-full items-center justify-between"
                                >
                                  Update
                                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                </Link>
                              </ContextMenuItem>

                              {/* Delete Section */}
                              <DeleteSection
                                idSection={section.id_section.toString()}
                              />

                              <ContextMenuItem inset disabled>
                                {section.section_title}
                                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                              </ContextMenuItem>
                            </ContextMenuContent>
                          ) : null
                        }
                      </ContextMenu>
                    </AccordionTrigger>

                    {section.content ? (
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
                                  <Button
                                    className={cn(
                                      "grid h-16 w-full grid-cols-[auto,1fr] items-center justify-start overflow-visible whitespace-normal rounded-md py-2 text-left font-heading transition-all hover:bg-primary hover:text-background",
                                      {
                                        "border border-primary bg-primary-foreground text-primary":
                                          pathname !==
                                          `${baseUrl}/section/${section.id_section}/content/${content.id_content}`,
                                      }
                                    )}
                                  >
                                    {content.content_type ===
                                    ContentType.LOCAL_FILE ? (
                                      <Icons.video className="mr-2 size-4 text-orange-500" />
                                    ) : content.content_type ===
                                      ContentType.VIDEO ? (
                                      <Icons.youtube className="mr-2 size-4 text-red-500" />
                                    ) : content.content_type ===
                                      ContentType.ARTICLE ? (
                                      <Icons.post className="mr-2 size-4 text-green-500" />
                                    ) : (
                                      <Icons.paperClip className="mr-2 size-4 text-blue-500" />
                                    )}

                                    <p className="line-clamp-2 ">
                                      {content.content_title}
                                    </p>
                                  </Button>
                                </Link>
                              </AccordionContent>
                            </ContextMenuTrigger>
                            {canCreateContent ? (
                              <ContextMenuContent className="w-64">
                                <ContextMenuLabel inset>
                                  Options
                                </ContextMenuLabel>
                                <ContextMenuSeparator />
                                {/* This is custom component to delete content */}
                                <KnowledgeDeleteContent
                                  idContent={content.id_content.toString()}
                                />
                              </ContextMenuContent>
                            ) : null}
                          </ContextMenu>
                        ))}
                        {canCreateContent ? (
                          <AccordionContent className="py-1">
                            {/* Create content button */}
                            <CreateContentDropdownButton
                              videoCreationUrl={`${baseUrl}/section/${section.id_section}/content/video/new`}
                              fileCreationUrl={`${baseUrl}/section/${section.id_section}/content/file/new`}
                              articleCreationUrl={`${baseUrl}/section/${section.id_section}/content/article/new`}
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
                                Tidak ada konten
                              </EmptyContent.Title>
                              <EmptyContent.Description>
                                Belum ada konten untuk bagian ini
                              </EmptyContent.Description>
                            </EmptyContent>
                          </AccordionContent>
                          {/* Create content button */}
                          {canCreateContent ? (
                            <CreateContentDropdownButton
                              videoCreationUrl={`${baseUrl}/section/${section.id_section}/content/video/new`}
                              fileCreationUrl={`${baseUrl}/section/${section.id_section}/content/file/new`}
                              articleCreationUrl={`${baseUrl}/section/${section.id_section}/content/article/new`}
                            />
                          ) : null}
                        </div>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="flex items-center justify-center">
                <EmptyContent className="flex h-full flex-col items-center justify-center">
                  <EmptyContent.Icon name="empty" />
                  <EmptyContent.Title className="text-center">
                    Belum ada section
                  </EmptyContent.Title>
                  <EmptyContent.Description className="text-center">
                    Silahkan tambahkan section pada tombol diatas
                  </EmptyContent.Description>
                </EmptyContent>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
