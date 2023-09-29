import React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { ApprovalLookupOneRes } from "@/types/approval/res"
import { ApprovalCheckOne } from "@/types/approval/res/approval-check-get-one"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
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
import { PreviewKnowledgeDetailSidebar } from "@/app/(dashboard-supervisor)/supervisor-area/approval/approve-knowledge/(knowledge-layout)/preview-knowledge/[idKnowledge]/_components/sidebar"

interface GetIdApproval {
  token: string | undefined
  id: string
}

async function getIdApproval({
  token,
  id,
}: GetIdApproval): Promise<ApprovalLookupOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/lookup/${id}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

interface GetCheckKnowledgeProps {
  token: string | undefined
  id: string
}

async function getCheckKnowledge({
  token,
  id,
}: GetCheckKnowledgeProps): Promise<ApprovalCheckOne> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/0051/${id}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

interface GetOneKnowledgeProps {
  token: string | undefined
  idKnowledge: string
}

async function getOneKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

interface KnowledgePreviewProps {
  children: React.ReactNode
  params: {
    idKnowledge: string
  }
}

export async function generateMetadata({ params }: KnowledgePreviewProps) {
  const user = await getCurrentUser()

  const knowledgePreview = await getOneKnowledge({
    token: user?.token,
    idKnowledge: params.idKnowledge,
  })

  return {
    title: knowledgePreview?.data?.knowledge_title,
    description: knowledgePreview?.data?.description,
  }
}

export default async function KnowledgePreview({
  children,
  params,
}: KnowledgePreviewProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledgePreview = await getOneKnowledge({
    token: user?.token,
    idKnowledge: params.idKnowledge,
  })

  console.log("knowledgePreview", knowledgePreview)

  if (knowledgePreview.code === 400) {
    return notFound()
  }

  const [lookUpApproval] = await Promise.all([
    getIdApproval({
      id: params.idKnowledge,
      token: user?.token,
    }),
  ])

  const checkKnowledgePending = await getCheckKnowledge({
    id: lookUpApproval.data.id_approval_knowledge.toString(),
    token: user?.token,
  })

  if (knowledgePreview.code === 400 || checkKnowledgePending.code === 404) {
    return notFound()
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-area",
            title: "Supervisor Area",
          },
          {
            href: "/supervisor-area/approval",
            title: "Approval",
          },
          {
            href: "/supervisor-area/approval/approve-knowledge",
            title: "Approve Pengetahuan",
          },
          {
            href: `/supervisor-area/approval/approve-knowledge/${knowledgePreview.data.id_knowledge}`,
            title: `Approve Pengetahuan - ${knowledgePreview.data.knowledge_title}`,
          },
        ]}
      />

      <MotionDiv
        className="flex flex-row gap-4 px-2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Alert className="basis-full">
          <PartyPopper className="h-5 w-5" />
          <AlertTitle>Preview Pengetahuan</AlertTitle>
          <div className="flex w-full flex-col items-end justify-between gap-4 lg:flex-row lg:items-center">
            <AlertDescription>
              Ini adalah Preview untuk pengetahuan{" "}
              <span className="font-bold">
                {knowledgePreview.data.knowledge_title}
              </span>
              .
              <span className="block">
                {" "}
                Silahkan periksa kembali sebelum menyetujui pengetahuan ini.
              </span>
            </AlertDescription>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      disabled={!checkKnowledgePending.data.is_exist}
                    >
                      <Button
                        variant="default"
                        size="lg"
                        disabled={!checkKnowledgePending.data.is_exist}
                      >
                        Approve / Tolak
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="min-w-[10rem]">
                        <Link
                          href={`/supervisor-area/approval/approve-knowledge/pending/approve/${lookUpApproval.data.id_approval_knowledge}`}
                        >
                          <p className="text-green-500">Approve</p>
                        </Link>
                        <DropdownMenuShortcut>⌘+Shift+A</DropdownMenuShortcut>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="min-w-[10rem]">
                        <Link
                          href={`/supervisor-area/approval/approve-knowledge/pending/rejected/${lookUpApproval.data.id_approval_knowledge}`}
                        >
                          <p className="text-red-500">Tolak</p>
                        </Link>
                        <DropdownMenuShortcut>⌘+Shift+B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  Tolak atau Approve Pengetahuan ini
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Alert>
      </MotionDiv>

      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <Card className="flex w-full basis-3/4 items-start justify-normal">
          <div className="flex w-full flex-col gap-6 p-4">
            <div className="flex flex-row items-center justify-between">
              <p className="grow break-all font-heading text-3xl">
                {knowledgePreview.data.knowledge_title}
              </p>
              <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
            </div>

            <div className="h-full max-h-max w-full rounded-md border border-primary p-4">
              {children}
            </div>

            <Tabs
              defaultValue="description"
              className="relative mr-auto w-full"
            >
              <div className="flex items-center justify-between pb-3">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="description"
                    className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Deskripsi
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="description">
                <Card>
                  <CardHeader>
                    <CardTitle>Deskripsi</CardTitle>
                    <CardDescription>
                      Deskripsi tentang pengetahuan ini
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ScrollArea className="h-[300px] w-full">
                      <p>{knowledgePreview.data.description}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <PreviewKnowledgeDetailSidebar knowledgePreview={knowledgePreview} />
      </div>
    </DashboardShell>
  )
}
