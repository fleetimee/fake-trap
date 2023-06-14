import { getKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default async function DashboardPage() {
  const data = await getKnowledge(6)

  console.log(data)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Welcome back, Jane"
        description={data.count.toString()}
      />
      <div className="flex flex-wrap">
        {data.data.map((item) => {
          return (
            <Card key={item.id_knowledge} className="mx-auto w-1/3">
              <CardContent>
                <CardHeader>
                  <CardTitle>{item.knowledge_title}</CardTitle>
                </CardHeader>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </DashboardShell>
  )
}
