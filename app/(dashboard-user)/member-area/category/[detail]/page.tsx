import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { CategoryOneRes } from "@/types/category/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { toTitleCase } from "@/lib/utils"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface MemberCategoryDetailPageProps {
  params: {
    detail: string
  }
}

export async function generateMetadata({
  params,
}: MemberCategoryDetailPageProps) {
  const user = await getCurrentUser()

  const categoryOne = await getOneCategory({
    token: user?.token,
    idCategory: parseInt(params.detail),
  })

  console.log(categoryOne)

  return {
    title: `Kategori / ${categoryOne.data.category_name}`,
  }
}

interface GetOneCategoryProps {
  token: string | undefined
  idCategory: number
}

async function getOneCategory({
  idCategory,
  token,
}: GetOneCategoryProps): Promise<CategoryOneRes> {
  const categoryOnePublic = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${idCategory}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await categoryOnePublic.json()
}

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.4,
    },
  },
}

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

export default async function MemberCategoryDetailPage({
  params,
}: MemberCategoryDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const categoryOne = await getOneCategory({
    token: user?.token,
    idCategory: parseInt(params.detail),
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            title: "Member Area",
            href: "/member-area",
          },
          {
            title: "Kategori",
            href: "/member-area/category",
          },
          {
            title: `${categoryOne.data.category_name}`,
            href: `/member-area/category/${params.detail}`,
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeaderIntro
          title={toTitleCase(categoryOne.data.category_name)}
          description={`Jelajahi pengetahuan ${categoryOne.data.category_name} yang ada di E-learning`}
          size="sm"
        />
      </MotionDiv>

      <Card className="h-full max-h-fit min-h-[40rem]">
        <CardHeader>
          <CardTitle>{`Kategori ${categoryOne.data.category_name}`}</CardTitle>
          <CardDescription>
            Berikut adalah pengetahuan yang ada di kategori ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MotionDiv
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            animate="animate"
            initial="initial"
            variants={parentVariant}
          >
            {!categoryOne.data.knowledge
              ? null
              : categoryOne.data.knowledge.map((knowledge) => (
                  <MotionDiv
                    className="child"
                    key={knowledge.id_knowledge}
                    variants={childrenVariant}
                  >
                    <KnowledgeCard
                      key={knowledge.id_knowledge}
                      knowledge={knowledge}
                      link={`/member-area/knowledge/${knowledge.id_knowledge}`}
                    />
                  </MotionDiv>
                ))}
          </MotionDiv>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
