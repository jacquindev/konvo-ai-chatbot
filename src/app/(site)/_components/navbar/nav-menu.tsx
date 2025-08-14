"use client"

import GlassSheet from "@/components/global/glass-sheet"
import { AlignRight } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LANDING_NAV_MENU } from "@/constants/landing"
import { useActiveSection } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  type?: "desktop" | "mobile"
  className?: string
}

const NavMenu = ({ type = "desktop", className }: Props) => {
  const { section, onSetSection } = useActiveSection()

  switch (type) {
    case "mobile":
      return (
        <GlassSheet
          trigger={
            <Button variant="outline" className="size-8 lg:hidden" size="trigger">
              <AlignRight />
            </Button>
          }
          className="z-999 p-4"
          onOpenChange={() => onSetSection(LANDING_NAV_MENU[0].path)}
        >
          {LANDING_NAV_MENU.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={cn(
                "flex items-center gap-2 py-2 px-4 rounded-full hover:bg-primary/30 dark:hover:bg-violet-900/60 text-muted-foreground hover:text-foreground",
                section === item.path ? "bg-primary/20 dark:bg-violet-900/40 text-foreground" : ""
              )}
              {...(item.section && {
                onClick: () => onSetSection(item.path),
              })}
            >
              <span>
                <item.icon style={{ width: 24, height: 24 }} />
              </span>
              {item.label}
            </Link>
          ))}
        </GlassSheet>
      )

    case "desktop":
    default:
      return (
        <NavigationMenu className={cn(className)}>
          {LANDING_NAV_MENU.map((item, index) => (
            <NavigationMenuLink
              key={index}
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "rounded-full bg-transparent hover:bg-primary/30 dark:hover:bg-violet-900/60",
                section === item.path ? "bg-primary/20 dark:bg-violet-900/40" : ""
              )}
              {...(item.section && {
                onClick: () => onSetSection(item.path),
              })}
            >
              <Link href={item.path} className="flex flex-row items-center gap-2">
                {section === item.path && (
                  <span>
                    <item.icon style={{ width: 24, height: 24 }} />
                  </span>
                )}
                <span>{item.label}</span>
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenu>
      )
  }
}

export default NavMenu
