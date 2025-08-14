"use client"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { UserButton, useUser } from "@clerk/nextjs"

const NavUser = () => {
  const { user } = useUser()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="flex items-center gap-3">
          <div className="ml-1 mt-2">
            <UserButton />
          </div>
          <div className="flex flex-col w-full leading-tight">
            <span className="truncate font-semibold">{user?.fullName}</span>
            <span className="truncate text-muted-foreground tracking-tighter">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavUser
