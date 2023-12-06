import Link from "next/link"

interface SectionBannerProps {
  title: string
  description: string
  urlLink: string
}

export default function SectionBanner({ ...props }: SectionBannerProps) {
  return (
    <section className="hidden rounded-md bg-gray-800 py-14 md:block">
      <div className="mx-auto max-w-screen-xl justify-between  gap-x-12 px-4 md:flex md:px-8">
        <div className="max-w-xl">
          <h3 className="text-3xl font-semibold text-white sm:text-4xl">
            {props.title}
          </h3>
          <p className="mt-3 text-gray-300">{props.description}</p>
        </div>
        <div className="mt-4 flex-none md:mt-0">
          <Link
            href={props.urlLink}
            className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-gray-800 shadow-md duration-150 hover:bg-gray-100 hover:shadow-none active:bg-gray-200"
          >
            <span className="ml-2">Tambah Section</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
