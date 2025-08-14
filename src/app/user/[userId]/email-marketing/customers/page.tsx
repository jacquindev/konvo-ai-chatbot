"use client"

import { CustomerTable } from "@/components/global/campaign"
import { TabsSection } from "@/components/global/tabs"
import { useQueryUserCustomers } from "@/hooks/queries"
import { useParams } from "next/navigation"

const Page = () => {
  const { userId } = useParams()

  const { data } = useQueryUserCustomers(userId as string)

  const domains = data?.data?.domains ?? []

  return (
    <TabsSection
      title="Customers"
      description="Manage your email marketing customers and track their responses."
    >
      <CustomerTable domains={domains}/>
    </TabsSection>
  )
}

export default Page
