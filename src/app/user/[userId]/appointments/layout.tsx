import { onGetAllUserAppointments } from "@/actions/appointment"
import AppHeader from "@/components/global/app-header"
import { queryClient } from "@/lib/react-query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import React from "react"

type Props = {
  children: React.ReactNode
  params: Promise<{ userId: string }>
}

const Layout = async ({ children, params }: Props) => {
  const { userId } = await params

  await queryClient.prefetchQuery({
    queryKey: ["user-appointments"],
    queryFn: () => onGetAllUserAppointments(userId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-8">
        <AppHeader
          title="Appointments"
          description="View and manage your appointments in one place."
        />
        <div className="p-4">{children}</div>
      </div>
    </HydrationBoundary>
  )
}

export default Layout
