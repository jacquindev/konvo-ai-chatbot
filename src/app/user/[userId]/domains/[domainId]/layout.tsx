import { onGetAllFilterQuestions, onGetAllHelpDeskQuestions } from "@/actions/chatbot"
import { onGetAllDomainProducts, onGetCurrentDomainInfo } from "@/actions/domain"
import AppHeader from "@/components/global/app-header"
import { TabsNavigation } from "@/components/global/tabs"
import { queryClient } from "@/lib/react-query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import React from "react"

type Props = {
  children: React.ReactNode
  params: Promise<{
    userId: string
    domainId: string
  }>
}

const Layout = async ({ children, params }: Props) => {
  const { userId, domainId } = await params

  const domainData = await onGetCurrentDomainInfo(domainId)
  const domainName = domainData.data?.domain?.name

  const base = `/user/${userId}/domains/${domainId}`
  const links = [
    { href: `${base}/domain-settings`, label: "Domain Settings", value: "domain-settings" },
    { href: `${base}/chatbot-settings`, label: "Chatbot Settings", value: "chatbot-settings" },
    { href: `${base}/bot-training`, label: "Bot Training", value: "bot-training" },
    { href: `${base}/products`, label: "Products", value: "products" },
  ]

  await queryClient.prefetchQuery({
    queryKey: ["user-domain"],
    queryFn: () => onGetCurrentDomainInfo(domainId),
  })

  await queryClient.prefetchQuery({
    queryKey: ["domain-helpdesk"],
    queryFn: () => onGetAllHelpDeskQuestions(domainId),
  })

  await queryClient.prefetchQuery({
    queryKey: ["domain-filter-questions"],
    queryFn: () => onGetAllFilterQuestions(domainId),
  })

  await queryClient.prefetchQuery({
    queryKey: ["domain-products"],
    queryFn: () => onGetAllDomainProducts(domainId)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppHeader
        title={domainName?.split(".")[0] ?? "Unknown Domain"}
        description="Modify domain settings, change chatbot options, enter sales questions, and more."
      />
      <TabsNavigation links={links} />
      <div className="p-4">{children}</div>
    </HydrationBoundary>
  )
}

export default Layout
