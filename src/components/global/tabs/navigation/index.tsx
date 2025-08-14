"use client"

import { Separator } from "@/components/ui/separator"
import { useTabs } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

type Props = {
  links: {
    href: string
    label: string
    value: string
  }[]
}

const TabsNavigation = ({ links }: Props) => {
  const { activeTab } = useTabs()

  return (
    <>
      <nav className="flex space-x-6 px-4 py-2 text-sm font-medium">
        {links.map(({ href, label, value }) => {
          const isActive = activeTab === value
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "pb-2 border-b-2 transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary hover:border-primary"
              )}
            >
              {label}
            </Link>
          )
        })}
      </nav>
      <Separator className="mx-auto mt-2" />
    </>
  )
}

export default TabsNavigation
