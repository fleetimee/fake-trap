import { MessageCircleIcon } from "lucide-react"

import { AddThreadForm } from "@/components/forms/add-thread-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

interface AddThreadsPageNewProps {
  params: {
    idCourse: string
  }
}

export default function AddThreadsPageNew({ params }: AddThreadsPageNewProps) {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight text-blue-950">
            Buat Thread Baru
          </h3>
          <p className="text-sm text-muted-foreground">
            Buat Diskusi Thread baru untuk pembelajaran ini.
          </p>
        </div>
        <Separator className="bg-blue-100" />
      </div>

      <Alert variant="modern" className="border-l-4 border-l-blue-500">
        <MessageCircleIcon className="h-5 w-5 text-blue-500" />
        <AlertTitle className="mb-1 font-medium text-blue-700">
          Panduan Diskusi
        </AlertTitle>
        <AlertDescription className="space-y-2 text-blue-600/80">
          <p>Tips membuat diskusi yang bermanfaat:</p>
          <ul className="ml-1 list-inside list-disc space-y-1 text-sm">
            <li>Pilih topik yang relevan dengan materi pembelajaran</li>
            <li>Jelaskan konteks dan latar belakang dengan jelas</li>
            <li>Sampaikan pendapat atau pengalaman Anda</li>
            <li>Gunakan bahasa yang sopan dan mudah dipahami</li>
            <li>Hormati pendapat dan perspektif peserta lain</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
        <AddThreadForm idCourse={Number(params.idCourse)} />
      </div>
    </div>
  )
}
