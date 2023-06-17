import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DetailKnowledge({
  params,
}: {
  params: { detail: string }
}) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading={params.detail}
        description="This is a test page"
      />
      <div className="flex h-screen flex-col gap-4  px-2 md:flex-row">
        <div className="flex basis-3/4 items-start justify-normal rounded-lg border-2 border-black  p-8 dark:border-white">
          <div className="flex flex-col">
            <h1>Lets go</h1>
            <h2>B</h2>
          </div>
        </div>
        <div className="basis-1/4 bg-red-400">Tes</div>
      </div>
    </DashboardShell>
  )
}
