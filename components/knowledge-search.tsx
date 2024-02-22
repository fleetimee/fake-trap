"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Search from "@/public/lottie/search.json"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"

import { KnowledgeListResData } from "@/types/knowledge/res"
import { getKnowledgeUser } from "@/lib/fetcher/knowledge-fetcher"
import { catchError, cn, isMacOs } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"

import { LottieClient } from "./lottie-anim"

interface KnowledgeGroup {
  category: KnowledgeListResData["id_category"]
  knowledge: Pick<
    KnowledgeListResData,
    "id_knowledge" | "knowledge_title" | "image"
  >[]
}

export function KnowledgeSearch() {
  const { data: session } = useSession()

  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  const [data, setData] = React.useState<KnowledgeGroup[] | null>(null)

  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setData(null)
      return
    }

    async function fetchData() {
      try {
        const data = await getKnowledgeUser({
          page: 1,
          limit: 999,
          searchQuery: debouncedQuery,
          token: session?.user?.token || "",
        })

        //   Process the data so it map into the knowledge group
        const knowledgeGroup: KnowledgeGroup[] = []

        data.data.forEach((item) => {
          const category = item.id_category
          const knowledge = item.knowledge_title
          const knowledgeId = item.id_knowledge
          const image = item.image

          const group = knowledgeGroup.find(
            (group) => group.category === category
          )

          if (group) {
            group.knowledge.push({
              id_knowledge: knowledgeId,
              knowledge_title: knowledge,
              image,
            })
          } else {
            knowledgeGroup.push({
              category,
              knowledge: [
                {
                  id_knowledge: knowledgeId,
                  knowledge_title: knowledge,
                  image,
                },
              ],
            })
          }
        })

        setData(knowledgeGroup)
      } catch (err) {
        catchError(err)
      }
    }

    startTransition(fetchData)

    return () => setData(null)
  }, [debouncedQuery, session?.user?.token])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = React.useCallback((callback: () => unknown) => {
    setOpen(false)
    callback()
  }, [])

  React.useEffect(() => {
    if (!open) {
      setQuery("")
    }
  }, [open])

  return (
    <>
      <Button
        variant="outline"
        className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon className="size-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search materi...</span>
        <span className="sr-only">Search materi</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <abbr
            title={isMacOs() ? "Command" : "Control"}
            className="no-underline"
          >
            {isMacOs() ? "⌘" : "Ctrl"}
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog position="top" open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Cari materi favoritmu disini..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            <LottieClient
              animationData={Search}
              className="mx-auto size-32"
              loop
              autoplay
            />
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup key={group.category} className="capitalize">
                {group.knowledge.map((item) => {
                  return (
                    <CommandItem
                      key={item.id_knowledge}
                      value={item.knowledge_title}
                      onSelect={() =>
                        handleSelect(() =>
                          router.push(`/intro/knowledge/${item.id_knowledge}`)
                        )
                      }
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`}
                        alt="knowledge"
                        width={150}
                        height={150}
                        className="mr-2.5 rounded-xl"
                      />

                      <span className="truncate">{item.knowledge_title}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
