import { Separator } from "@/components/ui/separator"

interface CoursePeoplePageProps {
  params: {
    idCourse: string
  }
}

export default function CoursePeoplePage({ params }: CoursePeoplePageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tambahkan Peserta</h3>
        <p className="text-sm text-muted-foreground">
          Tambahkan peserta ke dalam pelatihan ini. Peserta akan mendapatkan
          akses ke semua materi yang ada di pelatihan ini.
        </p>
      </div>
      <Separator />
    </div>
  )
}
