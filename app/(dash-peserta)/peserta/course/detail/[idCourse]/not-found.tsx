import { Metadata } from "next"

import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shell/lobby-shell"

export const metadata: Metadata = {
  title: "What are you looking for?",
  description: "404",
}

export default async function CourseNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Oops"
        description="
          Pelatihan yang anda pilih sudah berakhir, atau belum dimulai
        "
        retryLink="/peserta/course"
        retryLinkText="Kembali ke Daftar Pelatihan"
      />
    </Shell>
  )
}
