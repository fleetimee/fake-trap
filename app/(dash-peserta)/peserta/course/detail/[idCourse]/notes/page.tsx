import Link from "next/link"
import Blocks from "editorjs-blocks-react-renderer"
import { FileText, Plus } from "lucide-react"
import Balancer from "react-wrap-balancer"

import { getUserNotes } from "@/lib/fetcher/note-fetcher"
import { getCurrentUser } from "@/lib/session"
import FileAttachment from "@/components/cards/forum-posts-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { DeleteNotesButton } from "./_components/delete-note-button"

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
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 dark:from-blue-950/50 dark:to-blue-900/50">
        <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
          Catatan Pembelajaran
        </h3>
        <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
          Buat catatan untuk membantu pembelajaran Anda dalam kelas ini.
        </p>
      </div>
      <Separator className="bg-blue-100 dark:bg-blue-900/50" />

      {noteIsDataNull ? (
        <div className="flex h-full w-full items-center justify-center p-4">
          <Card className="flex h-full min-h-[400px] w-full items-center justify-center border-dashed border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/50 sm:min-h-[500px]">
            <CardContent className="w-full max-w-md text-center">
              <div className="space-y-6">
                <FileText className="mx-auto h-16 w-16 text-blue-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300">
                    Belum ada catatan
                  </h2>
                  <p className="text-blue-600/80 dark:text-blue-400/80">
                    Anda belum membuat catatan apapun. Mulai catat pemikiran dan
                    ide Anda sekarang!
                  </p>
                </div>
                <Button
                  className="mx-auto flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                  size="lg"
                  asChild
                >
                  <Link href={`/editor/notes/${params.idCourse}`}>
                    <Plus className="mr-2 h-5 w-5" />
                    Buat Catatan Pertama
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="mb-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-900"
                asChild
              >
                <Link href={`/editor/notes/${params.idCourse}?isUpdate=true`}>
                  Update
                </Link>
              </Button>
              <DeleteNotesButton idCourse={parseInt(params.idCourse)} />
            </div>
            <div className="flex w-full justify-center">
              <div className="cst-wrap-text prose prose-blue dark:prose-invert whatever-you-want">
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
