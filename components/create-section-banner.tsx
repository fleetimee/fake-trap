interface SectionBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  urlLink: string
  image?: string
}

export function SectionBanner({ className, ...props }: SectionBannerProps) {
  return (
    <div className="px-2">
      <section
        className="relative aspect-[21/9] max-h-[400px] min-h-[300px] w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
        style={{
          background: props.image
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${process.env.NEXT_PUBLIC_BASE_URL}${props.image})`
            : "linear-gradient(to right, var(--background), var(--muted))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />

        <div className="relative flex h-full w-full items-center justify-between gap-x-12 px-6 py-16 md:px-8">
          <div className="max-w-xl rounded-lg border border-blue-200/20 bg-blue-50/95 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-blue-100/95 supports-[backdrop-filter]:bg-blue-50/80">
            <h3 className="text-3xl font-semibold leading-tight tracking-normal text-blue-900 sm:text-4xl md:tracking-tight lg:text-[2.75rem]">
              {props.title}
            </h3>
            <p className="mt-6 text-base font-normal leading-7 text-blue-700/90 [text-wrap:pretty] md:text-lg">
              {props.description}
            </p>
          </div>

          <div className="mt-4 hidden flex-none md:mt-0 md:block">
            {/* Add button here if needed */}
          </div>
        </div>
      </section>
    </div>
  )
}
