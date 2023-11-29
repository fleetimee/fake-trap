import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  CursorTextIcon,
  FileIcon,
  FileTextIcon,
  VideoIcon,
} from "@radix-ui/react-icons"

import { authOptions } from "@/lib/auth"
import { getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { EmptyContent } from "@/components/app/knowledge/detail/ui"
import { Icons } from "@/components/icons"
import CreateContentDropdownButton from "@/components/knowledge/create-content-dropdown-button"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { KnowledgeDeleteContent } from "./_components/delete-content"
import { KnowledgeDeleteSection } from "./_components/delete-section"

interface KnowledgeDetailLayoutProps {
  children: React.ReactNode
  params: {
    idKnowledge: string
  }
}

export async function generateMetadata({ params }: KnowledgeDetailLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    idKnowledge: params.idKnowledge,
    token: user?.token,
  })

  return {
    title: knowledge.data?.knowledge_title,
    description: knowledge.data?.description,
  }
}

export default async function KnowledgeDetailLayout({
  params,
  children,
}: KnowledgeDetailLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    idKnowledge: params.idKnowledge,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/knowledge",
            title: "Pengetahuan",
          },
          {
            href: `/operator-lms/knowledge/detail/${params.idKnowledge}`,
            title: knowledge.data?.knowledge_title,
          },
        ]}
      />

      <section className="hidden rounded-md bg-gray-800 py-14 md:block">
        <div className="mx-auto max-w-screen-xl justify-between  gap-x-12 px-4 md:flex md:px-8">
          <div className="max-w-xl">
            <h3 className="text-3xl font-semibold text-white sm:text-4xl">
              {knowledge.data?.knowledge_title}
            </h3>
            <p className="mt-3 text-gray-300">{knowledge.data?.description}</p>
          </div>
          <div className="mt-4 flex-none md:mt-0">
            <Link
              href={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/new`}
              className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-gray-800 shadow-md duration-150 hover:bg-gray-100 hover:shadow-none active:bg-gray-200"
            >
              <span className="ml-2">Tambah Section</span>
            </Link>
          </div>
        </div>
      </section>

      <div
        className="flex h-auto flex-col gap-4 px-2 lg:flex-row"
        id="scrollTarget"
      >
        {/* Content Section */}
        <Card className="flex w-full basis-3/4 items-start justify-normal">
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="grow break-all font-heading text-3xl">
                {knowledge.data?.knowledge_title}
              </p>
              <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
            </div>

            <div className="h-full max-h-max  rounded-md border border-primary p-4">
              {children}
            </div>
          </div>
        </Card>

        {/* Sidebar Section */}
        <Card className="flex h-[750px] basis-1/4 flex-col items-center justify-start">
          <Tabs defaultValue="knowledge" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="knowledge" className="w-full font-semibold">
                Pengetahuan
              </TabsTrigger>
            </TabsList>

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
                        <AccordionTrigger className="font-heading text-base font-bold">
                          <ContextMenu key={section.id_section}>
                            <ContextMenuTrigger>
                              {section.section_title}
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-64">
                              <ContextMenuItem inset disabled>
                                Section
                                <ContextMenuShortcut>⌘1</ContextMenuShortcut>
                              </ContextMenuItem>

                              <ContextMenuSeparator />

                              <ContextMenuItem inset>
                                <Link
                                  href={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/update/${section.id_section}`}
                                  className="flex w-full items-center justify-between"
                                >
                                  Update
                                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                </Link>
                              </ContextMenuItem>

                              <KnowledgeDeleteSection
                                idSection={section.id_section.toString()}
                              />

                              <ContextMenuItem inset disabled>
                                {section.section_title}
                                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                              </ContextMenuItem>
                            </ContextMenuContent>
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
                                      href={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/${section.id_section}/content/${content.id_content}`}
                                    >
                                      <Button className="flex h-16 w-full justify-start overflow-visible whitespace-normal rounded-md py-2 text-left font-heading transition-all hover:bg-secondary-foreground hover:text-background">
                                        {content.content_title}
                                      </Button>
                                    </Link>
                                  </AccordionContent>
                                </ContextMenuTrigger>
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
                              </ContextMenu>
                            ))}
                            <AccordionContent className="py-1">
                              {/* Create content button */}
                              <CreateContentDropdownButton
                                videoCreationUrl={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/${section.id_section}/content/video/new`}
                                fileCreationUrl={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/${section.id_section}/content/file/new`}
                                articleCreationUrl={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/${section.id_section}/content/article/new`}
                              />
                            </AccordionContent>
                          </>
                        ) : (
                          <AccordionContent className="py-4">
                            <div className="flex flex-col gap-4">
                              <p className="text-sm text-muted-foreground">
                                Tidak ada konten
                              </p>
                              {/* Create content button */}
                              <CreateContentDropdownButton
                                videoCreationUrl={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/${section.id_section}/content/video/new`}
                                fileCreationUrl={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/${section.id_section}/content/file/new`}
                                articleCreationUrl={`/operator-lms/knowledge/detail/${params.idKnowledge}/section/${section.id_section}/content/article/new`}
                              />
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
      </div>
    </DashboardShell>
  )
}
