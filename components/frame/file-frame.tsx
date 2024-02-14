"use client"

import { JSX, SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClockIcon, DownloadIcon, EyeIcon, FileType } from "lucide-react"
import { useMediaQuery } from "react-responsive"

import { ContentOneRes } from "@/types/content/res"
import { DocumentType } from "@/lib/enums/status"
import { cn, convertDatetoString } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

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

  const pathname = usePathname()

  console.log(pathname)

  return (
    <div
      className={`flex max-w-sm flex-col items-start space-y-4 overflow-auto sm:max-w-lg md:max-w-full`}
    >
      <div>
        <h1 className="font-heading  md:text-lg">
          Berikut adalah file yang dapat diunduh
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Terakhir diupdate{" "}
          {convertDatetoString(content?.data.created_at.toString() || "")}
        </p>
      </div>

      <Separator />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[700px]">Nama File</TableHead>
            <TableHead>Preview</TableHead>
            <TableHead>Download</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* <TableRow>
            <TableCell>
              <div className="flex items-center gap-2 text-sm">
                <FileIcon className="size-4 text-red-500 dark:text-red-400" />
                <div>
                  <span className="truncate">Report.pdf</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    (2.5MB)
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    application/pdf
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <EyeIcon className="size-4" />
                Preview
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <DownloadIcon className="size-4" />
                Download
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2 text-sm">
                <FileIcon className="size-4 text-blue-500 dark:text-blue-400" />
                <div>
                  <span className="truncate">Proposal.docx</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    (1.8MB)
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    application/vnd.openxmlformats-officedocument.wordprocessingml.document
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <EyeIcon className="size-4" />
                Preview
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <DownloadIcon className="size-4" />
                Download
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2 text-sm">
                <FileIcon className="size-4 text-green-500 dark:text-green-400" />
                <div>
                  <span className="truncate">Expenses.xlsx</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    (4.2MB)
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <EyeIcon className="size-4" />
                Preview
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <DownloadIcon className="size-4" />
                Download
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2 text-sm">
                <FileIcon className="size-4 text-yellow-500 dark:text-yellow-400" />
                <div>
                  <span className="truncate">Slides.ppt</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    (3.1MB)
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    application/vnd.ms-powerpoint
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <EyeIcon className="size-4" />
                Preview
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className="flex items-center gap-2"
                size="sm"
                variant="ghost"
              >
                <DownloadIcon className="size-4" />
                Download
              </Button>
            </TableCell>
          </TableRow> */}

          {content?.data.files &&
            content?.data.files.map((file, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-4 text-sm">
                      <FileIcon
                        className={cn({
                          "size-6": true,
                          "text-red-500 dark:text-red-400":
                            DocumentType.PDF.split(" | ").includes(file.ext),
                          "text-blue-500 dark:text-blue-400":
                            DocumentType.DOC.split(" | ").includes(file.ext),
                          "text-green-500 dark:text-green-400":
                            DocumentType.XLS.split(" | ").includes(file.ext),
                          "text-orange-500 dark:text-orange-400":
                            DocumentType.PPT.split(" | ").includes(file.ext),
                        })}
                      />
                      <div>
                        <span className="line-clamp-1 truncate">
                          {file.original_filename}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {" "}
                          ({file.file_type})
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {Number(file.file_size)
                            ? (Number(file.file_size) / 1024 / 1024).toFixed(2)
                            : "N/A"}{" "}
                          MB
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {file.ext !== DocumentType.PDF ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="flex items-center gap-2 text-gray-400"
                              size="sm"
                              variant="ghost"
                            >
                              <EyeIcon className="size-4" />
                              Preview
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preview tidak tersedia</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Link
                        href={`${pathname}/render/${file.file_path
                          .split("/")
                          .pop()}?fullPath=${file.file_path}`}
                        passHref
                      >
                        <Button
                          className="flex items-center gap-2"
                          size="sm"
                          variant="ghost"
                        >
                          <EyeIcon className="size-4" />
                          Preview
                        </Button>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}${file.file_path}`}
                      passHref
                    >
                      <Button
                        className="flex items-center gap-2"
                        size="sm"
                        variant="ghost"
                      >
                        <DownloadIcon className="size-4" />
                        Download
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
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
