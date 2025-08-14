"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarGroupLabelStyle } from "@/constants/sidebar"
import { useBreadcrumbs } from "@/hooks/navigation"
import { useQueryDomains } from "@/hooks/queries"
import { useCollapsedSidebar, useIsMobile } from "@/hooks/ui"
import { uploadImageString } from "@/lib/upload"
import { cn } from "@/lib/utils"
import { Domain } from "@prisma/client"
import { Bot, ChevronRight, MessageCircleCode, Settings, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AddDomain, DeleteDomain } from "../domain"

type Props = {
  userId: string
}

const NavDomain = ({ userId }: Props) => {
  const { currentDomainId, activeDomainRef } = useBreadcrumbs()

  const { data } = useQueryDomains()
  const domains = data?.data?.domains ?? []

  const isCollapsed = useCollapsedSidebar()
  const isMobile = useIsMobile()

  return (
    <SidebarGroup>
      <div className="flex justify-between items-center mb-1">
        <SidebarGroupLabel className={sidebarGroupLabelStyle()}>Domains</SidebarGroupLabel>
        <Link
          href={`/user/${userId}/domains`}
          className="group-data-[collapsible=icon]:hidden font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <SidebarGroupContent>
        <AddDomain />

        <SidebarMenu className="pt-2 max-h-[400px] overflow-y-auto">
          {domains.length > 0 &&
            domains.map(domain => {
              const isActive = currentDomainId === domain.id
              const ref = isActive ? activeDomainRef : undefined

              return (
                <SidebarMenuItem key={domain.id} ref={ref}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        tooltip={domain.name}
                        isActive={isActive}
                        className={cn(
                          "opacity-70 hover:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:cursor-pointer",
                          isActive && "opacity-100 bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        <div className="flex items-center gap-1">
                          <Image
                            src={uploadImageString(domain.icon!, { crop: true })}
                            alt={`${domain.name} children`}
                            width={40}
                            height={40}
                            className={cn(
                              "object-cover w-10 h-10 aspect-square rounded-lg ml-[-6]",
                              isCollapsed && "ml-[-12]"
                            )}
                          />
                          {(!isCollapsed || isMobile) && (
                            <span className="truncate">{domain.name}</span>
                          )}
                        </div>
                        <ChevronRight className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                      className="min-w-56 dark:bg-card/70 bg-sidebar/90 backdrop-blur-lg rounded-lg"
                    >
                      <DropdownMenuLabel className="text-muted-foreground uppercase truncate">
                        {domain.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DomainDropdownItems domain={domain} userId={userId} />
                      <DropdownMenuSeparator />
                      <DomainDropdownDelete domain={domain} userId={userId} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              )
            })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const DomainDropdownItems = ({ domain, userId }: { domain: Partial<Domain>; userId: string }) => {
  const DOMAIN_DROPDOWN_ITEMS = [
    {
      label: "Domain Settings",
      icon: <Settings />,
      href: `/user/${userId}/domains/${domain.id}/domain-settings`,
    },
    {
      label: "Chatbot Settings",
      icon: <MessageCircleCode />,
      href: `/user/${userId}/domains/${domain.id}/chatbot-settings`,
    },
    {
      label: "Bot Training",
      icon: <Bot />,
      href: `/user/${userId}/domains/${domain.id}/bot-training`,
    },
    {
      label: "Products",
      icon: <ShoppingCart />,
      href: `/user/${userId}/domains/${domain.id}/products`,
    },
  ]

  return DOMAIN_DROPDOWN_ITEMS.map((item, index) => (
    <DropdownMenuItem asChild key={index}>
      <Link href={item.href}>
        {item.icon}
        {item.label}
      </Link>
    </DropdownMenuItem>
  ))
}

const DomainDropdownDelete = ({ domain, userId }: { domain: Partial<Domain>; userId: string }) => {
  return (
    <DropdownMenuItem asChild variant="destructive">
      {/* TODO: Delete domain */}
      <DeleteDomain
        userId={userId}
        domainId={domain.id!}
        trigger={
          <SidebarMenuButton className="cursor-pointer text-destructive hover:text-destructive-foreground hover:bg-destructive/30">
            <Trash2 />
            Delete
          </SidebarMenuButton>
        }
      />
    </DropdownMenuItem>
  )
}

export default NavDomain
