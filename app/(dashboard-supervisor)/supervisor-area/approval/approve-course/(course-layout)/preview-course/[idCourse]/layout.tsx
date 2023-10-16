import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PartyPopper } from "lucide-react"

import { CourseOneRes } from "@/types/course/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GetOneCourseProps {
  token: string | undefined
  idCourse: string
}

async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface CoursePreviewProps {
  children: React.ReactNode
  params: {
    idCourse: string
  }
}

export default async function CoursePreview({
  children,
  params,
}: CoursePreviewProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const getCourse = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

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
            href: "/supervisor-area/approval/approve-course",
            title: "Approve Course",
          },
          {
            href: `/supervisor-area/approval/approve-course/${params.idCourse}`,
            title: `Approve Course - ${getCourse?.data?.course_name}`,
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
          <AlertTitle>Preview Pelatihan</AlertTitle>
          <div className="flex w-full flex-col items-end justify-between gap-4 lg:flex-row lg:items-center">
            <AlertDescription>
              Ini adalah Preview untuk pelatihan{" "}
              <span className="font-bold">{params.idCourse}</span>.
              <span className="block">
                {" "}
                Silahkan periksa kembali sebelum menyetujui pengetahuan ini.
              </span>
            </AlertDescription>

            {/*<TooltipProvider>*/}
            {/*  <Tooltip>*/}
            {/*    <TooltipTrigger>*/}
            {/*      <DropdownMenu>*/}
            {/*        <DropdownMenuTrigger*/}
            {/*          disabled={!checkKnowledgePending.data.is_exist}*/}
            {/*        >*/}
            {/*          <Button*/}
            {/*            variant="default"*/}
            {/*            size="lg"*/}
            {/*            disabled={!checkKnowledgePending.data.is_exist}*/}
            {/*          >*/}
            {/*            Approve / Tolak*/}
            {/*          </Button>*/}
            {/*        </DropdownMenuTrigger>*/}
            {/*        <DropdownMenuContent>*/}
            {/*          <DropdownMenuItem className="min-w-[10rem]">*/}
            {/*            <Link*/}
            {/*              href={`/supervisor-area/approval/approve-knowledge/pending/approve/${lookUpApproval.data.id_approval_knowledge}`}*/}
            {/*            >*/}
            {/*              <p className="text-green-500">Approve</p>*/}
            {/*            </Link>*/}
            {/*            <DropdownMenuShortcut>⌘+Shift+A</DropdownMenuShortcut>*/}
            {/*          </DropdownMenuItem>*/}

            {/*          <DropdownMenuItem className="min-w-[10rem]">*/}
            {/*            <Link*/}
            {/*              href={`/supervisor-area/approval/approve-knowledge/pending/rejected/${lookUpApproval.data.id_approval_knowledge}`}*/}
            {/*            >*/}
            {/*              <p className="text-red-500">Tolak</p>*/}
            {/*            </Link>*/}
            {/*            <DropdownMenuShortcut>⌘+Shift+B</DropdownMenuShortcut>*/}
            {/*          </DropdownMenuItem>*/}
            {/*        </DropdownMenuContent>*/}
            {/*      </DropdownMenu>*/}
            {/*    </TooltipTrigger>*/}
            {/*    <TooltipContent>*/}
            {/*      Tolak atau Approve Pengetahuan ini*/}
            {/*    </TooltipContent>*/}
            {/*  </Tooltip>*/}
            {/*</TooltipProvider>*/}
          </div>
        </Alert>
      </MotionDiv>
    </DashboardShell>
  )
}
