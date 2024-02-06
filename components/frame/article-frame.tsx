import Blocks from "editorjs-blocks-react-renderer"

import { ContentOneRes } from "@/types/content/res"
import { convertDatetoString } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ArticleFrameProps {
  content: ContentOneRes
  contentParsed: any
}

export function ArticleFrame({ content, contentParsed }: ArticleFrameProps) {
  return (
    <div className="whatever-you-want mx-auto flex w-full flex-col items-start justify-center  ">
      <Card className="rounded-none border-none sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">
            {content.data.content_title}
          </CardTitle>
          <CardDescription>
            {convertDatetoString(content.data.created_at.toString())}
          </CardDescription>
        </CardHeader>

        <Separator />
        <CardContent className="text-black dark:text-white">
          <Blocks data={contentParsed} />
        </CardContent>
      </Card>
    </div>
  )
}
