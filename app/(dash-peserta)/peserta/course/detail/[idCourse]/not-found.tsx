import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shell/lobby-shell"

export default function ProductNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Pelatihan sudah berakhir"
        description="
          Pelatihan yang anda pilih sudah berakhir, dan sudah tidak dapat diakses 
        "
        retryLink="/peserta/course"
        retryLinkText="Kembali ke Daftar Pelatihan"
      />
    </Shell>
  )
}
