import { AddThreadForm } from "@/components/forms/add-thread-form"
import { Separator } from "@/components/ui/separator"

interface AddThreadsPageNewProps {
  params: {
    idCourse: string
  }
}

export default function AddThreadsPageNew({ params }: AddThreadsPageNewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Buat Thread Baru</h3>
        <p className="text-sm text-muted-foreground">
          Buat Diskusi Thread baru untuk pelatihan ini.
        </p>
      </div>
      <Separator />
      <AddThreadForm idCourse={Number(params.idCourse)} />
    </div>
  )
}
