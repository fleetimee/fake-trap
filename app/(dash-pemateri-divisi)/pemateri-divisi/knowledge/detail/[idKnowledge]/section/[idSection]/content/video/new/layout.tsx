import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { VideoTab } from "@/components/pagers/video-tab"
import { Separator } from "@/components/ui/separator"

interface UploadVideoLayoutProps {
  children: React.ReactNode
  params: {
    idKnowledge: string
    idSection: string
  }
}

export default async function UploadVideoLayout({
  children,
  params,
}: UploadVideoLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Konten Video</h3>
          <p className="text-sm text-muted-foreground">
            Tambahkan konten video untuk section
          </p>
        </div>
        <Separator />
        <VideoTab
          videoId={params.idKnowledge}
          initialRoute={`/pemateri-divisi/knowledge/detail/${params.idKnowledge}/section/${params.idSection}/content/video`}
        />
        {children}
      </div>
    </div>
  )
}
