import AppHeader from "@/components/global/app-header"
import { useQueryDashboardData } from "@/hooks/queries"
import { queryClient } from "@/lib/react-query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import React from "react"

type Props = {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  await queryClient.prefetchQuery({
    queryKey: ["dashboard-data"],
    queryFn: useQueryDashboardData,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-8">
        <AppHeader
          title="Dashboard"
          description="Get a detailed overview of your metrics, usage, customers, and more..."
        />
        <div className="p-4">{children}</div>
      </div>
    </HydrationBoundary>
  )
}

export default Layout
