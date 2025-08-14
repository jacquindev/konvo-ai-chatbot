"use client"

import { CampaignCard } from "@/components/global/campaign"
import { TabsSection } from "@/components/global/tabs"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { useQueryUserCampaigns } from "@/hooks/queries"
import { useParams } from "next/navigation"

const Page = () => {
  const { userId } = useParams()

  const { data } = useQueryUserCampaigns(userId as string)

  const campaigns = data?.data?.campaigns ?? []

  return (
    <TabsSection
      title="Campaigns"
      description="Manage your email marketing campaigns and track their performance."
    >
      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              userId={userId as string}
              campaign={campaign}
              name={campaign.name}
              customers={campaign.customers.length}
              createdAt={campaign.createdAt}
              updatedAt={campaign.updatedAt}
              description={campaign.description ?? "No description"}
              template={campaign.message ?? "No message / template"}
            />
          ))}
        </div>
      ) : (
        <Card className="p-0">
          <CardHeader className="p-8 flex items-center justify-center">
            <CardDescription>You don't have any campaigns yet. Create one?</CardDescription>
          </CardHeader>
        </Card>
      )}
    </TabsSection>
  )
}

export default Page
