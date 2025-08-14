import { onGetAllUserCampaigns, onGetAllUserCustomers } from "@/actions/marketing"
import AppHeader from "@/components/global/app-header"
import { AddCampaign } from "@/components/global/campaign"
import { PlanCredits } from "@/components/global/plan"
import { TabsNavigation } from "@/components/global/tabs"
import { queryClient } from "@/lib/react-query"
import React from "react"

type Props = {
  children: React.ReactNode
  params: Promise<{
    userId: string
  }>
}

const Layout = async ({ children, params }: Props) => {
  const { userId } = await params

  const base = `/user/${userId}/email-marketing`
  const links = [
    { href: `${base}/campaigns`, label: "Campaigns", value: "campaigns" },
    { href: `${base}/customers`, label: "Customers", value: "customers" },
  ]

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user-campaigns"],
      queryFn: () => onGetAllUserCampaigns(userId),
    }),

    queryClient.prefetchQuery({
      queryKey: ["user-customers"],
      queryFn: () => onGetAllUserCustomers(userId),
    }),
  ])

  return (
    <div className="px-4 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between">
          <AppHeader
            title="Email Marketing"
            description="Design, manage, and deliver targeted email marketing campaigns to your audience at scale."
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <AddCampaign userId={userId} animated />
          <PlanCredits type="email" userId={userId} animated />
        </div>
      </div>
      <TabsNavigation links={links} />
      <div className="p-4">{children}</div>
    </div>
  )
}

export default Layout
