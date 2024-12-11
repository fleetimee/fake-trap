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
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-white px-4 py-12 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800">
      <div className="bg-grid-black/[0.02] dark:bg-grid-white/[0.02] absolute inset-0" />

      <div className="animate-fade-in container relative space-y-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text font-heading text-3xl font-bold leading-tight text-transparent transition-all dark:from-white dark:to-gray-200 sm:text-4xl md:text-6xl">
            <Balancer ratio={0.5}>
              Halo,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-300 dark:to-blue-200">
                {tokenExtracted.name}
              </span>
              <span className="animate-wave ml-1 inline-block align-middle sm:ml-2">
                <LottieClient
                  animationData={Confetti}
                  className="inline-block size-8 sm:size-10"
                />
              </span>
            </Balancer>
          </h2>

          <p className="max-w-[90%] text-base text-muted-foreground sm:text-lg">
            Silahkan masuk ke panel yang anda inginkan sesuai dengan hak akses
          </p>
        </div>

        <div className="mx-auto grid auto-rows-[1fr] gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {isPemateriDivisi && (
            <div className="animate-fade-in-up">
              <ButtonSelector
                title="Pemateri Divisi"
                description="Pemateri divisi dapat mengelola materi yang ada di divisi masing-masing."
                link="/pemateri-divisi"
                disabled={!isPemateriDivisi}
                isTextMuted
                animationData={PemateriLottie}
              />
            </div>
          )}

          {isSpvPematerDivisi && (
            <div className="animate-fade-in-up">
              <ButtonSelector
                title="Approval Pemateri"
                description="Approval Pemateri dapat menapprove materi yang ada di divisi masing-masing."
                link="/supervisor-pemateri-divisi"
                disabled={!isSpvPematerDivisi}
                animationData={SupervisorLottie}
              />
            </div>
          )}

          {isOperatorLMS && (
            <div className="animate-fade-in-up">
              <ButtonSelector
                title="Operator LMS"
                description="Operator LMS dapat mengelola semua yang ada di LMS."
                link="/operator-lms"
                disabled={!isOperatorLMS}
                isTextMuted
                animationData={OperatorLottie}
              />
            </div>
          )}

          {isSpvOperatorLMS && (
            <div className="animate-fade-in-up">
              <ButtonSelector
                title="Approval LMS"
                description="Approval LMS dapat menapprove pembelajaran yang ada di LMS."
                link="/supervisor-lms"
                disabled={!isSpvOperatorLMS}
                isTextMuted
                animationData={SupervisorLottie}
              />
            </div>
          )}

          {isPeserta && (
            <div className="animate-fade-in-up">
              <ButtonSelector
                title="Peserta"
                description="Peserta dapat mengikuti pembelajaran yang ada di LMS."
                link="/peserta"
                disabled={!isPeserta}
                animationData={PesertaLottie}
              />
            </div>
          )}

          {isExecutive && (
            <div className="animate-fade-in-up">
              <ButtonSelector
                title="Administrator"
                description="Memonitor BLIVE, berupa monitor user, struktur organisasi, dan audit trail"
                link="/administrator"
                disabled={!isExecutive}
                isTextMuted
                animationData={ExecutiveLottie}
              />
            </div>
          )}
        </div>

        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="mx-auto max-w-[95%] text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
            Panel yang tidak dapat diakses menandakan bahwa Anda belum memiliki
            hak akses yang sesuai. Apabila Anda yakin seharusnya memiliki akses
            ke panel tersebut, silakan menghubungi Operator LMS untuk verifikasi
            lebih lanjut.
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
      </div>
    </section>
  )
}
