import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRightIcon, PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getGlobalCount } from "@/lib/fetcher/menu-fetcher"
import { getPesertaEnrolledCourses } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { dateNow, extractToken, getDayWithText } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Dashboard",
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default async function PesertaPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const loggedOnUser = await getLoggedOnUser({
    token: user?.token,
    uuid: tokenExtracted?.id,
  })

  const globalCount = await getGlobalCount({
    token: user?.token,
  })

  const course = await getPesertaEnrolledCourses({
    token: user?.token,
    uuid: tokenExtracted?.id,
    limit: 5,
    page: 1,
    orderBy: "created_at",
    sortBy: "desc",
  })

  console.log(course)

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
        ]}
      />

      <DashboardHeader heading="Peserta" description={dateNow} />

      <Alert>
        <PartyPopper className="h-5 w-5" />
        <AlertTitle>
          Halo,{" "}
          <span className="font-heading uppercase text-primary">
            {loggedOnUser.data?.name}
          </span>
        </AlertTitle>
        <AlertDescription>
          Have a Nice{" "}
          <span className="font-heading uppercase">{getDayWithText}</span> !
        </AlertDescription>
      </Alert>

      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        style={{ marginTop: "1rem" }}
      >
        <Widget
          icon={<Icons.knowledge className="text-green-500" />}
          title="Pengetahuan"
          subtitle={globalCount.data?.knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.category className="text-blue-500" />}
          title="Kategori"
          subtitle={globalCount.data?.category_count.toString()}
        />

        <Widget
          icon={<Icons.quiz className="text-yellow-500" />}
          title="Test dan Latihan"
          subtitle={globalCount.data?.quiz_count.toString()}
        />

        <Widget
          icon={<Icons.course className="text-red-500" />}
          title="Pelatihan"
          subtitle={globalCount.data?.course_count.toString()}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="h-fit lg:col-span-3">
          <CardHeader>
            <CardTitle>Pelatihan</CardTitle>
            <CardDescription>
              Berikut adalah pelatihan yang kamu ikuti
            </CardDescription>
          </CardHeader>

          <CardContent className="flex  flex-col gap-4">
            {course.data.length > 0 ? (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Pelatihan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.data.map((invoice) => (
                      <TableRow key={invoice.id_course}>
                        <TableCell className="font-medium">
                          {invoice.course_name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Link href="/peserta/course">
                  <Button variant="outline" className="w-full">
                    Lihat Semua
                    <ArrowRightIcon
                      className="size-4 ml-2"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mx-auto flex flex-col items-center justify-center py-6">
                <Icons.course className="h-20 w-20 text-gray-400" />
                <p className="text-gray-400">
                  Belum ada pelatihan yang diikuti
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-fit lg:col-span-4">
          <CardHeader>
            <CardTitle>Threads Activity</CardTitle>
            <CardDescription>
              Here is a list of recent threads activity
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
