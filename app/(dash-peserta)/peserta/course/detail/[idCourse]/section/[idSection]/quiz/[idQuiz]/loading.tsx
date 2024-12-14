import { Activity, Info } from "lucide-react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CourseQuizLoadingPage() {
  return (
    <Card className="w-full rounded-none border-none border-background shadow-none">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-64" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-96" />
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-8 py-6">
        <Tabs defaultValue="announcement" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3 gap-4 rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
            <TabsTrigger value="announcement">
              <div className="flex items-center space-x-2">
                <Info className="size-4" />
                <span>Informasi</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="nilai">
              <div className="flex items-center space-x-2">
                <Activity className="size-4" />
                <span>Riwayat Nilai</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="placement">
              <div className="flex items-center space-x-2">
                <Icons.crown className="size-4" />
                <span>Peringkat</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="announcement"
            className="rounded-lg border border-blue-100 bg-white p-6 shadow-lg dark:border-blue-800 dark:bg-background"
          >
            <div className="space-y-6">
              <div className="text-center">
                <Skeleton className="mx-auto h-8 w-48" />
                <div className="my-12">
                  <Skeleton className="mx-auto h-72 w-72 rounded-full" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Skeleton className="mb-4 h-6 w-40" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-950/50"
                      >
                        <Skeleton className="mb-2 h-5 w-32" />
                        <div className="space-y-2">
                          {[1, 2, 3, 4].map((j) => (
                            <Skeleton key={j} className="h-4 w-full" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Skeleton className="mx-auto mb-4 h-12 w-64 rounded-lg" />
                  <Button className="w-full max-w-md" size="lg" disabled>
                    Mulai Ujian
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="nilai"
            className="rounded-lg border border-blue-100 bg-white p-6 shadow-lg dark:border-blue-800 dark:bg-background"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="mt-2 h-4 w-64" />
                </div>
              </div>

              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="size-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="placement"
            className="space-y-6 rounded-lg border border-blue-100 bg-white p-6 shadow-lg dark:border-blue-800 dark:bg-background"
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background"></div>
              <CardHeader className="relative">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-2 h-4 w-64" />
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="space-y-4 text-center">
                  <Skeleton className="mx-auto h-6 w-48" />
                  <Skeleton className="mx-auto h-16 w-32" />
                  <Skeleton className="mx-auto h-4 w-96" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          {[1, 2, 3, 4].map((i) => (
                            <th key={i} className="p-3">
                              <Skeleton className="h-4 w-full" />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i}>
                            {[1, 2, 3, 4].map((j) => (
                              <td key={j} className="p-3">
                                <Skeleton className="h-4 w-full" />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
