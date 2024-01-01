import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MiniProfileProps {
  name?: string
  unitKerja?: string
  jabatan?: string
  kdKantor?: string
}

export default function MiniProfile({ ...props }: MiniProfileProps) {
  return (
    <>
      <aside className="h-full w-fit rounded-lg border border-primary bg-gray-100 p-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage
              alt="User name"
              src="/placeholder.svg?height=96&width=96"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-center font-heading text-lg font-semibold">
            {props.name ? props.name : "User Name"}
          </h2>
          <p className="mt-2  uppercase italic text-gray-600">
            {props.unitKerja ? props.unitKerja : "Unit Kerja"}
          </p>
        </div>
      </aside>
    </>
  )
}
