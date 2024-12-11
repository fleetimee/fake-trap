import { DocumentType } from "@/lib/enums/status"
import { cn } from "@/lib/utils"

interface FileTypeIconProps {
  fileType: string
  className?: string
}

export function FileTypeIcon({ fileType, className }: FileTypeIconProps) {
  const getIconByType = () => {
    if (DocumentType.PDF.split(" | ").includes(fileType)) {
      return (
        <svg
          className={cn("size-6 text-blue-600 dark:text-blue-400", className)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"
          />
        </svg>
      )
    }
    // Add other file type icons similarly
    return null
  }

  return getIconByType()
}
