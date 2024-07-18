import { Metadata } from "next"
import Link from "next/link"
import Confetti from "@/public/lottie/confetti.json"
import ExecutiveLottie from "@/public/lottie/role_executive.json"
import OperatorLottie from "@/public/lottie/role_operator.json"
import PemateriLottie from "@/public/lottie/role_pemateri_divisi.json"
import PesertaLottie from "@/public/lottie/role_peserta.json"
import SupervisorLottie from "@/public/lottie/role_supervisor.json"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Balancer from "react-wrap-balancer"

import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { LottieClient } from "@/components/lottie-anim"
import { Button } from "@/components/ui/button"

import { ButtonSelector } from "./_components/button_selector"

export const metadata: Metadata = {
  title: "Kewenangan",
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

  return (
    <section
      id="features"
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          <Balancer>
            Halo, {tokenExtracted.name}
            <span
              className="ml-4 inline-block"
              style={{ transform: "translateY(-0.1em)" }}
            >
              <LottieClient
                animationData={Confetti}
                className="inline-block size-14"
              />
            </span>
          </Balancer>
        </h2>

        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Silahkan masuk ke panel yang anda inginkan sesuai dengan hak akses
          yang anda miliki.
        </p>
      </div>

      <div className="mx-auto grid items-center justify-items-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {isPemateriDivisi && (
          <ButtonSelector
            title="Pemateri Divisi"
            description="Pemateri divisi dapat mengelola materi yang ada di divisi masing-masing."
            link="/pemateri-divisi"
            disabled={!isPemateriDivisi}
            isTextMuted
            animationData={PemateriLottie}
          />
        )}

        {isSpvPematerDivisi && (
          <ButtonSelector
            title="Approval Pemateri"
            description="Approval Pemateri dapat menapprove materi yang ada di divisi masing-masing."
            link="/supervisor-pemateri-divisi"
            disabled={!isSpvPematerDivisi}
            animationData={SupervisorLottie}
          />
        )}

        {isOperatorLMS && (
          <ButtonSelector
            title="Operator LMS"
            description="Operator LMS dapat mengelola semua yang ada di LMS."
            link="/operator-lms"
            disabled={!isOperatorLMS}
            isTextMuted
            animationData={OperatorLottie}
          />
        )}

        {isSpvOperatorLMS && (
          <ButtonSelector
            title="Approval LMS"
            description="Approval LMS dapat menapprove pembelajaran yang ada di LMS."
            link="/supervisor-lms"
            disabled={!isSpvOperatorLMS}
            isTextMuted
            animationData={SupervisorLottie}
          />
        )}

        {isPeserta && (
          <ButtonSelector
            title="Peserta"
            description="Peserta dapat mengikuti pembelajaran yang ada di LMS."
            link="/peserta"
            disabled={!isPeserta}
            animationData={PesertaLottie}
          />
        )}

        {isExecutive && (
          <ButtonSelector
            title="Administrator"
            description="Memonitor BLIVE, berupa monitor user, struktur organisasi, dan audit trail"
            link="/administrator"
            disabled={!isExecutive}
            isTextMuted
            animationData={ExecutiveLottie}
          />
        )}
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
          <Button size="default" className="mr-4 w-full" variant="outline">
            <ArrowLeftIcon className="mr-2 size-5" />
            Kembali ke Home
          </Button>
        </Link>
      </div>
    </section>
  )
}
