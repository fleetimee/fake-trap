import Image from "next/image"
import Link from "next/link"

interface CtaSectionProps {}

export function CtaSection({}: CtaSectionProps) {
  return (
    <section
      className="relative   p-4 md:px-8"
      style={{
        background:
          "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
      }}
    >
      <div className="mx-auto max-w-screen-xl py-4">
        <div className="relative z-10 items-center gap-5 lg:flex">
          <div className="max-w-lg flex-1 py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
            <h3 className="text-3xl font-semibold text-gray-800 md:text-4xl">
              Level Up Your Skills:{" "}
              <span className="text-indigo-600">Game On!</span>
            </h3>
            <p className="mt-3 leading-relaxed text-gray-500">
              adalah platform e-learning online yang bikin belajar jadi seru,
              menantang, dan nggak ngebosenin! Kayak main game aja, eh tapi yang
              ngehasilin ilmu yang berguna loh!
            </p>
            <Link
              className="mt-5 inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 font-medium text-indigo-600"
              href="javascript:void()"
            >
              Try it out
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 size-6 duration-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
          <div className="mx-auto mt-5 flex-1 sm:w-9/12 lg:mt-0 lg:w-auto">
            <Image
              src={"/images/promo.png"}
              alt="Promo Image"
              className="rounded-lg shadow-lg"
              width={1200}
              height={1200}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
