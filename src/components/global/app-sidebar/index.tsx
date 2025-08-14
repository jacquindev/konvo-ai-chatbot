import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import React from "react"
import NavDomain from "./nav-domain"
import NavLogo from "./nav-logo"
import NavMain from "./nav-main"
import NavUpgrade from "./nav-upgrade"
import NavUser from "./nav-user"

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  userId: string
}

const AppSidebar = ({ userId, ...props }: SidebarProps) => {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <NavLogo />
        <SidebarSeparator className="mx-auto" />
      </SidebarHeader>

      <SidebarContent>
        <NavMain userId={userId} />
        <NavDomain userId={userId} />
      </SidebarContent>

      <SidebarFooter>
        <NavUpgrade userId={userId} />
        <SidebarSeparator className="mx-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
