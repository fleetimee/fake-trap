import { FileText, Plus } from "lucide-react"

import { getUserNotes } from "@/lib/fetcher/note-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
                <Button className="mx-auto flex items-center" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Create your first note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>test</div>
      )}
    </div>
  )
}

export default PesertaNotePage
