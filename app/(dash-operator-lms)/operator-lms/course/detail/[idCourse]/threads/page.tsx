import { Separator } from "@/components/ui/separator"

interface CourseThreadPageProps {
  params: {
    idCourse: string
  }
}

export default async function CourseThreadPage({
  params,
}: CourseThreadPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Threads</h3>
        <p className="text-sm text-muted-foreground">
          Buat thread baru atau lihat thread yang sudah ada. dan berkomunikasi
          dengan peserta lainnya.
        </p>
      </div>
      <Separator />
    </div>
  )
}
