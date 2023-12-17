import { Metadata } from "next"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { ButtonSelector } from "./_components/button_selector"


export const metadata: Metadata = {
  title: "Choose your path",
  description: "Choose your path",
}

export default async function PanelSelector() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const role = tokenExtracted?.role

  const isPemateriDivisi = role.some((item) => item.id_role === 1)
  const isSpvPematerDivisi = role.some((item) => item.id_role === 2)
  const isOperatorLMS = role.some((item) => item.id_role === 3)
  const isSpvOperatorLMS = role.some((item) => item.id_role === 4)
  const isPeserta = role.some((item) => item.id_role === 5)
  const isExecutive = role.some((item) => item.id_role === 6)

  console.log(isPemateriDivisi)

  console.log(role)

  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <Balancer>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Halo, {tokenExtracted.name} 👋
          </h2>
        </Balancer>

        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Silahkan masuk ke panel yang anda inginkan sesuai dengan hak akses
          yang anda miliki.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <ButtonSelector
          title="Pemateri Divisi"
          description="Pemateri divisi dapat mengelola materi yang ada di divisi masing-masing."
          link="/pemateri-divisi"
          disabled={!isPemateriDivisi}
          isTextMuted
        />

        <ButtonSelector
          title="Spv Divisi"
          description="Spv divisi dapat menapprove materi yang ada di divisi masing-masing."
          link="/supervisor-pemateri-divisi"
          disabled={!isSpvPematerDivisi}
        />

        <ButtonSelector
          title="Operator LMS"
          description="Operator LMS dapat mengelola semua yang ada di LMS."
          link="/operator-lms"
          disabled={!isOperatorLMS}
          isTextMuted
        />

        <ButtonSelector
          title="Spv Operator LMS"
          description="Spv Operator LMS dapat menapprove pelatihan yang ada di LMS."
          link="/supervisor-lms"
          disabled={!isSpvOperatorLMS}
          isTextMuted
        />

        <ButtonSelector
          title="Peserta"
          description="Peserta dapat mengikuti pelatihan yang ada di LMS."
          link="/peserta"
          disabled={!isPeserta}
        />

        <ButtonSelector
          title="Executive"
          description="Executive dapat melihat laporan yang ada di LMS."
          link="/executive"
          disabled={!isExecutive}
          isTextMuted
        />
      </div>
      <div className="mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Panel yang tidak bisa diakses berarti anda tidak memiliki hak akses
          untuk panel tersebut. Jika anda merasa memiliki hak akses untuk panel
          tersebut, silahkan hubungi Operator LMS.
        </p>
      </div>

      <div className="mx-auto flex max-w-[25rem] items-center justify-center text-center">
        <Link href={"/"}>
          <Button size="default" className="mr-4 w-full" variant="destructive">
            Keluar
          </Button>
        </Link>
      </div>
    </section>
  )
}
