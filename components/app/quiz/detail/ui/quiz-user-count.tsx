"use client"

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

interface QuizUserCountCardProps {
  userCount: number
}

export function QuizUserCountCard({ userCount }: QuizUserCountCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader className="grid grid-cols-1 xl:grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg">Total Murid</CardTitle>
          <CardDescription>
            Berikut adalah total murid yang mengikuti kuis ini. Klik tombol Star
            untuk menandai kuis ini sebagai favorit.
          </CardDescription>
        </div>
        <div className="flex items-center justify-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <Icons.billing className="mr-2 h-4 w-4" />
            Check
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex text-sm space-x-4 items-start text-muted-foreground">
          <div className="flex items-center">
            <Icons.copy className="mr-1 h-3 w-3" />
            Murid
          </div>
          <div className="flex items-center">
            <Icons.gitHub className="mr-1 h-3 w-3" />
            {userCount} pax
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  )
}
