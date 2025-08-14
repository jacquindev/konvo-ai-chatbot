export const dynamic = "force-dynamic"

import { onGetCurrentUserInfo } from "@/actions/auth"
import { onGetSubscriptionPlan } from "@/actions/subscription"
import AppInfoBar from "@/components/global/app-infobar"
import AppSidebar from "@/components/global/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
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

  const user = await onGetCurrentUserInfo(userId)
  const plan = user?.subscription?.subscriptionPlan?.plan ?? "STANDARD"

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user-info"],
      queryFn: () => Promise.resolve(user), // already fetch above
    }),

    queryClient.prefetchQuery({
      queryKey: ["user-subscription"],
      queryFn: () => onGetSubscriptionPlan(plan),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <AppSidebar userId={userId} />
        <SidebarInset>
          <AppInfoBar userId={userId} />
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  )
}

export default Layout
