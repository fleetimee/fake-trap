import Image from "next/image"
import { generateFromString } from "generate-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

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
      <aside className="h-full w-full rounded-lg border border-primary bg-primary p-6 transition-all">
        <div className="flex flex-col items-center">
          {/* <Avatar className="h-24 w-24 bg-cover bg-top">
            <AvatarImage
              className="aspect-video"
              alt="User name"
              src={
                props.profilePicture
                  ? profilePictureLink
                  : `data:image/svg+xml;utf8,${generateFromString(
                      props.name ? props.name : "Nama"
                    )}`
              }
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar> */}
          <Zoom>
            <div className="relative size-24 overflow-hidden rounded-full bg-white">
              <Image
                src={
                  props.profilePicture
                    ? profilePictureLink
                    : `data:image/svg+xml;utf8,${generateFromString(
                        props.name ? props.name : "Nama"
                      )}`
                }
                alt="User name"
                layout="fill"
                objectFit="cover"
                objectPosition="center top"
              />
            </div>
          </Zoom>

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
