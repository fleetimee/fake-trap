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
    <aside className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="relative h-full w-full p-6">
        <div className="flex flex-col items-center justify-center">
          <Zoom>
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/25 to-white/5" />
              <div className="relative size-24 overflow-hidden rounded-full border-[3px] border-white/30 shadow-inner">
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
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </Zoom>

          <h2 className="mx-auto my-3 text-center font-heading text-sm font-semibold text-white">
            {props.name ? props.name : "Nama"}
          </h2>

          <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="flex items-center justify-center">
            <span className="rounded-full bg-white/10 px-3 py-0.5 text-center font-sans text-sm text-white backdrop-blur-sm">
              {props.kdKantor ? props.kdKantor : "Kode Kantor"}
            </span>
          </div>

          <p className="mt-2 text-center text-sm font-semibold uppercase text-white/90">
            {props.jabatan ? props.jabatan : "Jabatan"}
          </p>

          <div className="my-2 h-px w-3/4 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="mt-2 text-center text-xs text-white/80">
            {props.unitKerja ? props.unitKerja : "Unit Kerja"}
          </p>
        </div>
      </div>
    </aside>
  )
}
