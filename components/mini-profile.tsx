/* eslint-disable tailwindcss/enforces-shorthand */
import Image from "next/image"
import { generateFromString } from "generate-avatar"

import { Separator } from "@/components/ui/separator"

import { BorderBeam } from "./border-beam"
import { Zoom } from "./zoom-image"

interface MiniProfileProps {
  name?: string
  unitKerja?: string
  jabatan?: string
  kdKantor?: string
  profilePicture?: string
}

export default function MiniProfile({ ...props }: MiniProfileProps) {
  const profilePictureLink = `${process.env.NEXT_PUBLIC_BASE_URL}${props.profilePicture}`

  return (
    <>
      <aside className="h-full w-full rounded-lg border-4 border-blue-300 bg-primary p-6 transition-all dark:border-white">
        <div className="flex flex-col items-center justify-center">
          <Zoom>
            <div className="relative size-24 overflow-hidden rounded-full bg-white">
              <Image
                src={
                  props.profilePicture
                    ? profilePictureLink
                    : `data:image/svg+xml;utf8,${generateFromString(
                        props.name ? props.name : "Default"
                      )}`
                }
                alt={props.name ? props.name : "Default"}
                width={1000}
                height={1000}
              />
            </div>
          </Zoom>

          <h2 className="mx-auto  my-3 text-center font-heading text-sm font-semibold text-primary-foreground">
            {props.name ? props.name : "Nama"}
          </h2>

          <Separator />

          <div className="flex items-center justify-center">
            <p className="mt-2 text-center font-sans text-sm uppercase text-primary-foreground">
              {props.kdKantor ? props.kdKantor : "Kode Kantor"}
            </p>
          </div>

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
