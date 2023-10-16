import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { ApprovalListRes, ApprovalListResData } from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoStringShort } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { SupervisorApprovalCountCard } from "@/components/supervisor/card"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      bounce: 0.25,
      duration: 0.5,
      type: "spring",
      stiffness: 500,
    },
  },
}

interface GetApprovalCount {
  token: string | undefined
}

async function getApprovalCount({ token }: GetApprovalCount) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/count`,
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

interface GetAllApproval {
  token: string | undefined
  limit: number
  page: number
}

async function getAllAproval({
  token,
  limit,
  page,
}: GetAllApproval): Promise<ApprovalListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval?limit=${limit}&page=${page}&sortBy=created_at&orderBy=desc`,
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

interface BadgeSwitchProps {
  approval: ApprovalListResData
}

function badgeSwitch({ approval }: BadgeSwitchProps) {
  switch (approval.status) {
    case "0052":
      return <Badge className="bg-green-400">{approval.status_text}</Badge>
    case "0051":
      return <Badge className="bg-yellow-400">{approval.status_text}</Badge>
    case "0053":
      return <Badge className="bg-red-400">{approval.status_text}</Badge>
    default:
      return <Badge className="bg-orange-400">{approval.status_text}</Badge>
  }
}

export default async function SupervisorApproveCoursePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [approvalCountRes, approvalRes] = await Promise.all([
    getApprovalCount({ token: user?.token }),
    getAllAproval({ token: user?.token, limit: 5, page: 1 }),
  ])

  const data = Object.entries(approvalCountRes?.data).map(([key, value]) => ({
    key,
    value,
  }))

  return (
    <MotionDiv
      className="space-y-4"
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      <div className="child grid min-h-[200px] gap-6 md:grid-cols-1 lg:grid-cols-3">
        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountRes?.data?.approved}
            title="Pelatihan Di Setujui"
            icon={<Icons.check className="h-6 w-6 text-green-500" />}
            description="Pelatihan yang telah di setujui"
          />
        </MotionDiv>

        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountRes?.data?.pending}
            title="Pelatihan Pending"
            icon={<Icons.pending className="h-6 w-6 text-yellow-500" />}
            description="Pelatihan yang masih menunggu persetujuan"
          />
        </MotionDiv>

        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountRes?.data?.rejected}
            title="Pelatihan Di Tolak"
            icon={<Icons.close className="h-6 w-6 text-red-500" />}
            description="Pelatihan yang telah di tolak"
          />
        </MotionDiv>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            bounce: 0.25,
            damping: 10,
            bounceDamping: 10,
            stiffness: 100,
            type: "spring",
          },
        }}
      >
        <Card className="flex h-full flex-col justify-between hover:border-primary">
          <CardHeader className="pb-8">
            <CardTitle className="inline-flex items-center text-lg">
              Aksi Terbaru
            </CardTitle>
            <CardDescription>
              Daftar pelatihan yang telah di buat dan di approve atau di tolak
              oleh supervisor diurutkan berdasarkan tanggal dibuat terbaru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Pelatihan</TableHead>
                  <TableHead>Pembuat Materi</TableHead>
                  <TableHead>Approver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Buat</TableHead>
                  <TableHead>Tanggal Approve</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {approvalRes?.data?.map((approval) => (
                  <TableRow key={approval.id_approval_course}>
                    <TableCell>{approval.course_name}</TableCell>
                    <TableCell>{approval.user_request}</TableCell>
                    <TableCell>
                      {approval.user_approver ? approval.user_approver : "-"}
                    </TableCell>
                    <TableCell>
                      {badgeSwitch({
                        approval: approval,
                      })}
                    </TableCell>
                    <TableCell>
                      {convertDatetoStringShort(
                        new Date(approval.created_at).toString()
                      )}
                    </TableCell>
                    <TableCell>
                      {approval.approved_at.toString() ===
                      "0001-01-01T00:00:00Z"
                        ? "-"
                        : convertDatetoStringShort(
                            new Date(approval.approved_at).toString()
                          )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </MotionDiv>
    </MotionDiv>
  )
}
