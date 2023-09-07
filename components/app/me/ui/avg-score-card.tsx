import { Card } from "@/components/ui/card"

interface AvgScoreCardProps {
  avgScore: number
}

export function AvgScoreCard({ avgScore }: AvgScoreCardProps) {
  return (
    <Card className="col-span-5 flex h-auto min-h-[350px] flex-col gap-6 p-4 lg:col-span-2">
      <h1 className="font-heading text-2xl font-light">Rata Rata Score</h1>

      <div className="mx-auto my-auto flex  flex-col">
        <p className="items-center justify-center font-heading text-6xl">
          {avgScore}
        </p>
      </div>
    </Card>
  )
}
