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
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className=" relative min-h-[300px] rounded-md   py-14 md:block"
        style={
          props.image
            ? {
                backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}${props.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(10px)",
              }
            : {}
        }
      >
        <div className="mx-auto max-w-screen-xl justify-between  gap-x-12 px-4 md:flex md:px-8">
          <div className="max-w-xl rounded-md border-b border-white bg-background/95 p-4 text-black backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:text-white">
            <h3 className="text-3xl font-semibold  sm:text-4xl">
              {props.title}
            </h3>
            <p className="mt-3 ">{props.description}</p>
          </div>
          <div className="mt-4 flex-none md:mt-0">
            {/* {canCreateSection ? (
              <Link
                href={props.urlLink}
                className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-gray-800 shadow-md duration-150 hover:bg-gray-100 hover:shadow-none active:bg-gray-200"
              >
                <span className="ml-2">Tambah Section</span>
              </Link>
            ) : null} */}
          </div>
        </div>
      </section>
    </div>
  )
}
