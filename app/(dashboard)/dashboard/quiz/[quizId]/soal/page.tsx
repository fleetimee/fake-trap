import { Card } from "@/components/ui/card"
import { QuestionForm } from "@/components/add-question"
import { SoalShell } from "@/components/add-question-shell"

export default function HasilPage() {
  return (
    <div className="grid grid-cols-2  gap-4 lg:grid-cols-2">
      <SoalShell />
    </div>
  )
}
