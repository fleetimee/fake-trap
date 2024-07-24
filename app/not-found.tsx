import Image from "next/image"
import Link from "next/link"
import NotFoundModel from "@/public/images/not-found-model.png"

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center bg-gray-50">
      <div className="container flex flex-col items-center justify-between px-5 text-gray-700 md:flex-row">
        <div className="mx-8 w-full lg:w-1/2">
          <div className="font-dark mb-8 text-7xl font-extrabold text-primary">
            {" "}
            404
          </div>
          <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
            Sorry we couldn't find the page you're looking for
          </p>

          <Link
            href="/"
            className="duration-400 inline rounded-lg border border-transparent bg-primary px-5 py-3 text-sm font-medium leading-5 text-white shadow-2xl transition-all  focus:outline-none "
          >
            Returning to your world
          </Link>
        </div>
        <div className="mx-5 my-12 hidden w-full md:block lg:flex lg:w-1/2 lg:justify-end">
          <Image
            src={NotFoundModel}
            alt="Page not found"
            width={1200} // replace with actual width of the image
            height={1200} // replace with actual height of the image
          />
        </div>
      </div>
    </div>
  )
}
