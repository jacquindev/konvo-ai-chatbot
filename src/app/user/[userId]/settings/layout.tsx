import AppHeader from "@/components/global/app-header"
import { TabsNavigation } from "@/components/global/tabs"
import { queryClient } from "@/lib/react-query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import React from "react"

type Props = {
  children: React.ReactNode
  params: Promise<{
    userId: string
  }>
}

const Layout = async ({ children, params }: Props) => {
  const { userId } = await params

  const base = `/user/${userId}/settings`
  const links = [
    { href: `${base}/account`, label: "Account", value: "account" },
    { href: `${base}/billing`, label: "Billing", value: "billing" },
    { href: `${base}/interface`, label: "Interface", value: "interface" },
  ]

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-8">
        <AppHeader
          title="Settings"
          description="Manage your account settings, integrations, and preferences."
        />
        <TabsNavigation links={links} />
        <div className="p-4">{children}</div>
      </div>
    </HydrationBoundary>
  )
}

export default Layout
