"use client"

import { searchBarStyle, searchIconStyle, searchInputStyle } from "@/components/global/search"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useThemeMode } from "@/hooks/ui"
import { uploadImageString } from "@/lib/upload"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { motion } from "motion/react"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import IntegrationCard, { ComingSoonCard } from "./_components/card"

import integrations from "@/data/integrations.json"

type CategoryType = "all" | "payments" | "schedule"

const IntegrationsPage = () => {
  const { theme } = useThemeMode()
  const { userId } = useParams()

  const INTEGRATION_CARDS = integrations.map(card => ({
    ...card,
    logo:
      theme === "dark" ? uploadImageString(card.logoId.dark) : uploadImageString(card.logoId.light),
    connectCTA: {
      ...card.connectCTA,
      logo:
        theme === "dark"
          ? uploadImageString(card.connectCTA.logoId.dark)
          : uploadImageString(card.connectCTA.logoId.light),
    },
  }))

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("payments")
  const [query, setQuery] = useState("")

  const categories = useMemo(() => {
    const base = Array.from(new Set(INTEGRATION_CARDS.map(card => card.category)))
    return [...base, "all"]
  }, [INTEGRATION_CARDS])

  const filtered = useMemo(() => {
    const active = INTEGRATION_CARDS.filter(
      card =>
        !card.comingSoon &&
        (selectedCategory === "all" || card.category === selectedCategory) &&
        card.title.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => a.title.localeCompare(b.title))

    const comingSoon = INTEGRATION_CARDS.filter(
      card =>
        card.comingSoon &&
        (selectedCategory === "all" || card.category === selectedCategory) &&
        card.title.toLowerCase().includes(query.toLowerCase())
    ).sort((a, b) => a.title.localeCompare(b.title))

    return [...active, ...comingSoon]
  }, [selectedCategory, query, INTEGRATION_CARDS])

  return (
    <section className="mx-auto space-y-10">
      <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center">
        <div className="order-2 flex flex-wrap gap-2 lg:order-1">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category as CategoryType)}
              aria-pressed={selectedCategory === category}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium capitalize transition",
                selectedCategory === category
                  ? "bg-primary text-white dark:text-black"
                  : "bg-primary/20 dark:bg-muted text-muted-foreground hover:dark:bg-muted/70 hover:bg-primary/30"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className={cn(searchBarStyle(), "order-1 w-full lg:order-2 lg:w-72")}>
          <SearchIcon className={searchIconStyle()} />
          <Input
            placeholder="Search for integrations..."
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={searchInputStyle()}
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((integration, index) => (
            <motion.div
              key={integration.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              {integration.comingSoon ? (
                <ComingSoonCard {...integration} />
              ) : (
                <IntegrationCard {...integration} />
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground flex items-center justify-center text-center text-lg">
          No integrations found.
        </p>
      )}
    </section>
  )
}

export default IntegrationsPage
