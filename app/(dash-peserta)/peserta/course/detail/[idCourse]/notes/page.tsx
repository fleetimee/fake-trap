import Link from "next/link"
import Blocks from "editorjs-blocks-react-renderer"
import { FileText, Plus } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { getUserNotes } from "@/lib/fetcher/note-fetcher"
import { getCurrentUser } from "@/lib/session"
import FileAttachment from "@/components/cards/forum-posts-card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PesertaNotePageProps {
  params: {
    idCourse: string
  }
}

async function PesertaNotePage({ params }: PesertaNotePageProps) {
  const user = await getCurrentUser()

  const useNote = await getUserNotes({
    token: user?.token,
    idCourse: params.idCourse,
  })

  const noteIsDataNull = useNote?.data === null

  let contentParsed

  try {
    contentParsed = JSON.parse(useNote?.data?.content)
  } catch (e) {
    contentParsed = null
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Note</h3>
        <p className="text-sm text-muted-foreground">
          Buat catatan untuk pembelajaran ini.
        </p>
      </div>

      <Separator />

      {noteIsDataNull ? (
        <div className="flex h-full w-full items-center justify-center p-4">
          <Card className="flex h-full min-h-[400px] w-full items-center justify-center sm:min-h-[500px]">
            <CardContent className="w-full max-w-md text-center">
              <div className="space-y-6">
                <FileText className="mx-auto h-16 w-16 text-gray-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold">No notes yet</h2>
                  <p className="text-muted-foreground">
                    You haven't created any notes. Start writing your thoughts
                    and ideas now!
                  </p>
                </div>
                <Button className="mx-auto flex items-center" size="lg" asChild>
                  <Link href={`/editor/notes/${params.idCourse}`}>
                    <Plus className="mr-2 h-5 w-5" />
                    Create your first note
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="">
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                Update
              </Button>
              <Button variant="outline" size="sm" className="text-red-500">
                Delete
              </Button>
              <Button variant="outline" size="sm">
                Print
              </Button>
            </div>
            <div className="flex w-full justify-center">
              <div className="cst-wrap-text whatever-you-want">
                {contentParsed ? (
                  <Balancer>
                    <Blocks
                      data={contentParsed}
                      renderers={{
                        attaches: FileAttachment,
                      }}
                    />
                  </Balancer>
                ) : (
                  <p>{useNote?.data?.content}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PesertaNotePage
