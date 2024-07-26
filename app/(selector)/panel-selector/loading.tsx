import { Skeleton } from "@/components/ui/skeleton"

export default function PanelSelectorLoading() {
  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <Skeleton className="h-12 w-48 sm:w-60 md:w-96" />
        <Skeleton className="h-6 w-60 sm:w-72 md:w-80" />
      </div>

      <div className="mx-auto grid items-center justify-items-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>
        ))}
      </div>

      <div className="mx-auto text-center md:max-w-[58rem]">
        <Skeleton className="h-6 w-72 sm:w-80 md:w-96" />
      </div>

      <div className="mx-auto flex max-w-[25rem] items-center justify-center text-center">
        <Skeleton className="h-12 w-full" />
      </div>
    </section>
  )
}
