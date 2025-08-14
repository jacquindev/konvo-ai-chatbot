"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  SIDEBAR_NAV_OPTIONS,
  sidebarGroupLabelStyle,
  sidebarMenuButtonStyle,
} from "@/constants/sidebar"
import { useBreadcrumbs } from "@/hooks/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = { userId: string }

type ContextMenuItemType = "email-marketing" | "settings"

const CONTEXT_MENU_ITEMS_CONFIG: Record<ContextMenuItemType, string[]> = {
  "email-marketing": ["campaigns", "customers"],
  settings: ["domain-settings", "chatbot-settings", "bot-training", "products"],
}

const NavMain = ({ userId }: Props) => {
  const { page, formatLabel } = useBreadcrumbs()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={sidebarGroupLabelStyle()}>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {SIDEBAR_NAV_OPTIONS.map(item => {
            const isActive = page === item.name
            const formattedLabel = formatLabel(item.name.replace(/-/g, " "))
            const hasContextMenu = item.name in CONTEXT_MENU_ITEMS_CONFIG

            const menuButton = (
              <SidebarMenuButton asChild tooltip={formattedLabel} isActive={isActive}>
                <Link
                  href={`/user/${userId}/${item.name}`}
                  className={cn(sidebarMenuButtonStyle(), isActive && "opacity-100")}
                >
                  <item.icon style={{ width: 24, height: 24 }} className="-ml-1 aspect-square" />
                  <div className="flex flex-1 items-center justify-between capitalize">
                    <span>{formattedLabel}</span>
                    {hasContextMenu && <MoreHorizontal className="h-4 w-4" />}
                  </div>
                </Link>
              </SidebarMenuButton>
            )

            return (
              <SidebarMenuItem key={item.name}>
                {hasContextMenu ? (
                  <ContextMenu>
                    <ContextMenuTrigger asChild>{menuButton}</ContextMenuTrigger>
                    <ContextMenuContent className="bg-sidebar/70 w-52 backdrop-blur-lg">
                      {CONTEXT_MENU_ITEMS_CONFIG[item.name as ContextMenuItemType].map(path => (
                        <ContextMenuNavItem
                          key={path}
                          userId={userId}
                          basePath={item.name as ContextMenuItemType}
                          path={path}
                        />
                      ))}
                    </ContextMenuContent>
                  </ContextMenu>
                ) : (
                  menuButton
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const ContextMenuNavItem = ({
  userId,
  basePath,
  path,
}: {
  userId: string
  basePath: ContextMenuItemType
  path: string
}) => {
  const router = useRouter()

  return (
    <ContextMenuItem
      inset
      className="hover:bg-accent flex justify-between hover:cursor-pointer"
      onClick={() => router.push(`/user/${userId}/${basePath}/${path}`)}
    >
      <span className="capitalize">{path.replace(/-/g, " ")}</span>
      <ChevronRight className="h-4 w-4" />
    </ContextMenuItem>
  )
}

export default NavMain
