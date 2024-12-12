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
        className="relative aspect-[21/9] max-h-[400px] min-h-[300px] w-full overflow-hidden rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        style={{
          background: props.image
            ? `url(${process.env.NEXT_PUBLIC_BASE_URL}${props.image})`
            : "#ffffff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex h-full w-full items-center justify-between gap-x-12 px-6 py-16 md:px-8">
          <div className="max-w-xl rotate-[-1deg] rounded-none border-4 border-black bg-blue-100 p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:rotate-0">
            <h3 className="font-mono text-3xl font-black leading-tight tracking-normal text-black sm:text-4xl md:tracking-tight lg:text-[2.75rem]">
              {props.title}
            </h3>
            <p className="mt-6 font-mono text-base font-medium leading-7 text-black/80 [text-wrap:pretty] md:text-lg">
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
