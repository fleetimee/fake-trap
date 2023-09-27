import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shell/lobby-shell"
import { Card } from "@/components/ui/card"

export default function ProductNotFound() {
  return (
    <Card>
      <Shell variant="default" className="max-w-md">
        <ErrorCard
          title="Pengetahuan tidak ditemukan"
          description="
                  Pengetahuan yang anda cari tidak ditemukan. Silahkan coba kembali dengan kata kunci yang berbeda.
                "
          retryLink={`/supervisor-area/approval/approve-knowledge/pending`}
          retryLinkText="Kembali ke halaman sebelumnya"
        />
      </Shell>
    </Card>
  )
}
