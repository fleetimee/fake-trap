import Balance from "react-wrap-balancer"

import { Shell } from "@/components/shell/lobby-shell"

export default function IntroductionPage() {
  return (
    <Shell as="div" className="gap-12">
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 md:pt-10 lg:pt-32"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Kategori Pengetahuan
          </h2>
          <Balance className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Jelajahi kategori pengetahuan yang tersedia di dalam e-learning ini.
          </Balance>
        </div>
      </section>
    </Shell>
  )
}
