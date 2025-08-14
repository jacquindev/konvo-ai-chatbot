"use client"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useCollapsedSidebar } from "@/hooks/ui"
import AppLogo from "../app-logo"

const NavLogo = () => {
  const isCollapsed = useCollapsedSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size="lg">
          {isCollapsed ? <AppLogo showName={false} /> : <AppLogo className="pl-[32px]" />}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavLogo
