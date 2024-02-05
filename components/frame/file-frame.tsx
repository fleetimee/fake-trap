"use client"

import { JSX, SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { ClockIcon } from "lucide-react"
import { useMediaQuery } from "react-responsive"

import { ContentOneRes } from "@/types/content/res"
import { convertDatetoString } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface FileFrameProps {
  content: ContentOneRes
  params: {
    detail: string
    idSection: string
    idContent: string
  }
}

export function FileFrame({ content, params }: FileFrameProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" })

  return (
    <div className={`flex flex-col items-start justify-center gap-3 `}>
      {!isMobile && (
        <>
          <h1 className="text-4xl font-bold  ">{content.data.content_title}</h1>

          <span className="inline-flex">
            <ClockIcon className="mr-2 size-6 text-gray-500" />
            <p>{convertDatetoString(content.data.created_at.toString())}</p>
          </span>

          <Separator />

          <p className="text-xl italic ">
            Terdapat {content.data.files?.length} file yang dapat diunduh untuk
            di baca
          </p>

          <div className="grid grid-cols-1 items-center justify-center gap-8  xl:grid-cols-2">
            {content.data.files &&
              content.data.files.map((file) => (
                <Card
                  key={file.id_content_file}
                  className="mx-auto w-80 overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <Image
                    alt="Profile picture"
                    className="w-full object-cover"
                    height="320"
                    src="/images/placeholder.svg"
                    style={{
                      aspectRatio: "320/320",
                      objectFit: "cover",
                    }}
                    width="320"
                  />
                  <CardContent className="p-4">
                    <h2 className="text-2xl font-bold transition-all duration-200 hover:text-gray-700">
                      {file.file_type}
                    </h2>
                    <h3 className="text-gray-500 transition-all duration-200 hover:text-gray-600">
                      {Number(file.file_size)
                        ? (Number(file.file_size) / 1024 / 1024).toFixed(2)
                        : "N/A"}{" "}
                      MB
                    </h3>
                    <p className="mt-2 text-gray-600 transition-all duration-200 hover:text-gray-700">
                      {file.file_path.split("/").pop()}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/${file.file_path}`}
                        target="_blank"
                        className={buttonVariants({
                          size: "sm",
                          className:
                            "w-full transition-all duration-200 hover:bg-gray-700 hover:text-white",
                        })}
                      >
                        Download
                      </Link>
                      <Button
                        className="w-full transition-all duration-200 hover:border-gray-700 hover:text-gray-700"
                        size="sm"
                        variant="outline"
                      >
                        <Link
                          href={`/intro/knowledge/${params.detail}/section/${
                            params.idSection
                          }/content/${params.idContent}/render/${file.file_path
                            .split("/")
                            .pop()}`}
                        >
                          Preview
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </>
      )}

      {isMobile && (
        <Card className="w-full rounded-none p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <FileIcon className="size-6" />
                <h3 className="text-lg font-semibold">Document 1</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Description of Document 1
              </p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Download
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
