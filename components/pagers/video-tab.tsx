"use client"

import { useRouter, useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VideoTabProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  videoId: string
  initialRoute?: string
}

interface VideoTabItemProps {
  title: string
  href: string
  isActive: boolean
}

export function VideoTab({ videoId, initialRoute }: VideoTabProps) {
  const router = useRouter()

  const segment = useSelectedLayoutSegment()

  const tabs: VideoTabItemProps[] = [
    {
      title: "URL Upload",
      href: initialRoute
        ? `${initialRoute}/new`
        : `/dashboard/video/${videoId}`,
      isActive: segment === null,
    },
    {
      title: "File Upload",
      href: initialRoute
        ? `${initialRoute}/new/file-upload`
        : `/dashboard/video/${videoId}/file-upload`,
      isActive: segment === "file-upload",
    },
  ]

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.href}
            className={cn(
              "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              tab.isActive && "text-foreground"
            )}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
