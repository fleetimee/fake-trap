import { generateFromString } from "generate-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface MiniProfileProps {
  name?: string
  unitKerja?: string
  jabatan?: string
  kdKantor?: string
}

export default function MiniProfile({ ...props }: MiniProfileProps) {
  return (
    <>
      <aside className="h-full w-full rounded-lg border border-primary bg-primary p-6 transition-all">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage
              alt="User name"
              src={`data:image/svg+xml;utf8,${generateFromString(
                props.name ? props.name : "Nama"
              )}`}
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <h2 className="mx-auto  my-3 text-center font-heading text-sm font-semibold text-primary-foreground">
            {props.name ? props.name : "Nama"}
          </h2>

          <Separator />

          <p className="mt-2 font-heading text-lg uppercase  text-primary-foreground">
            {props.kdKantor ? props.kdKantor : "Kode Kantor"}
          </p>

          <p className="mt-2 text-center text-sm font-semibold uppercase  text-primary-foreground">
            {props.jabatan ? props.jabatan : "Jabatan"}
          </p>

          <Separator className="my-2" />

          <p className="mt-2  text-center text-xs   text-primary-foreground">
            {props.unitKerja ? props.unitKerja : "Unit Kerja"}
          </p>
        </div>
      </aside>
    </>
  )
}
