import { Button } from "@/components/ui/button"
import { QuestionForm } from "@/components/add-question"

export default function HasilPage() {
  const QuizFormInner = () => {
    return (
      <div className="flex flex-col gap-8 p-5">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-heading font-semibold">Test Layouting</h1>

          <Button>Push Pertanyaan</Button>
        </div>

        <p>This should be on bottom</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <QuestionForm />
    </div>
  )
}
