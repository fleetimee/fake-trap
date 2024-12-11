"use client"

import { JSX, SVGProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DownloadIcon, EyeIcon } from "lucide-react"
import { useMediaQuery } from "react-responsive"

import { ContentOneRes } from "@/types/content/res"
import { DocumentType } from "@/lib/enums/status"
import { cn, convertDatetoString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FileFrameProps {
  content: ContentOneRes
  params: {
    detail: string
    idSection: string
    idContent: string
  }
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
      className="text-gray-500"
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

function PdfIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-red-500"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <text x="6" y="18" fontSize="8" fill="currentColor">
        PDF
      </text>
    </svg>
  )
}

function DocIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-blue-500"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <text x="6" y="18" fontSize="8" fill="currentColor">
        DOC
      </text>
    </svg>
  )
}

function XlsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-green-500"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <text x="6" y="18" fontSize="8" fill="currentColor">
        XLS
      </text>
    </svg>
  )
}

function PptIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-orange-500"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <text x="6" y="18" fontSize="8" fill="currentColor">
        PPT
      </text>
    </svg>
  )
}

function FileTypeIcon({
  fileType,
  ...props
}: {
  fileType: string
  [key: string]: any
}) {
  switch (fileType) {
    case DocumentType.PDF:
      return <PdfIcon {...props} />
    case DocumentType.DOC:
      return <DocIcon {...props} />
    case DocumentType.XLS:
      return <XlsIcon {...props} />
    case DocumentType.PPT:
      return <PptIcon {...props} />
    default:
      return <FileIcon {...props} />
  }
}

export function FileFrame({ content, params }: FileFrameProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" })

  const pathname = usePathname()

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  return (
    <div className="w-full space-y-4 rounded-lg bg-gradient-to-b from-blue-50 to-white px-4 py-4 shadow-sm dark:from-blue-950 dark:to-gray-900 sm:space-y-6 sm:px-6 sm:py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-base font-semibold text-blue-950 dark:text-blue-100 sm:text-xl md:text-2xl">
            Berkas yang Tersedia
          </h1>
          <p className="text-xs text-blue-600/70 dark:text-blue-300/70 sm:text-sm">
            Terakhir diperbarui{" "}
            {convertDatetoString(content?.data.created_at.toString() || "")}
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {content?.data.files?.map((file, index) => {
          const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${file.file_path}`
          const previewUrl = `${pathname}/render/${file.file_path.split("/").pop()}?fullPath=${file.file_path}`
          const showPreview = file.ext === DocumentType.PDF

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border bg-white p-3 shadow-sm transition-all hover:shadow-md dark:border-blue-900/50 dark:bg-gray-900 sm:p-5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative flex items-center gap-2 sm:gap-4">
                <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950 sm:p-3">
                  <FileTypeIcon
                    fileType={file.ext}
                    className="size-6 sm:size-8"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="text-sm font-medium text-blue-950 dark:text-blue-100 sm:text-base">
                        {file.original_filename}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{file.original_filename}</p>
                    </TooltipContent>
                  </Tooltip>
                  <p className="mt-0.5 text-xs text-blue-600/70 dark:text-blue-300/70 sm:mt-1 sm:text-sm">
                    {file.file_type} • {formatFileSize(Number(file.file_size))}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {showPreview ? (
                    <>
                      <Link href={previewUrl} className="shrink-0">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 transition-all hover:scale-105 hover:shadow-md dark:from-blue-950 dark:to-blue-900 dark:text-blue-300 sm:size-auto sm:px-4"
                        >
                          <span className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/20 opacity-0 transition-opacity group-hover:opacity-100" />
                          <EyeIcon className="size-4 sm:mr-2" />
                          <span className="hidden sm:inline">Pratinjau</span>
                        </Button>
                      </Link>
                      <Link
                        href={downloadUrl}
                        target="_blank"
                        className="shrink-0"
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 transition-all hover:scale-105 hover:shadow-md dark:from-blue-950 dark:to-blue-900 dark:text-blue-300 sm:size-auto sm:px-4"
                        >
                          <span className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/20 opacity-0 transition-opacity group-hover:opacity-100" />
                          <DownloadIcon className="size-4 sm:mr-2" />
                          <span className="hidden sm:inline">Unduh</span>
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={downloadUrl}
                      target="_blank"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 transition-all hover:scale-105 hover:shadow-md dark:from-blue-950 dark:to-blue-900 dark:text-blue-300 sm:size-auto sm:px-4"
                      >
                        <span className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/20 opacity-0 transition-opacity group-hover:opacity-100" />
                        <DownloadIcon className="size-4 sm:mr-2" />
                        <span className="hidden sm:inline">Unduh</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
