import AppHeader from "@/components/global/app-header"
import { AddDomain } from "@/components/global/domain"
import { PlanCredits } from "@/components/global/plan"
import React from "react"

type Props = {
  children: React.ReactNode
  params: Promise<{
    userId: string
  }>
}

const Layout = async ({ children, params }: Props) => {
  const { userId } = await params

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between">
          <AppHeader
            title="Domains"
            description="Access, organize, and control your domains from one place."
          />
        </div>
        <div className="flex flex-row items-center gap-x-4 px-4">
          <AddDomain isPage size="lg" className="w-fit rounded-lg" animated />
          <PlanCredits type="domain" userId={userId} animated />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </>
  )
}

export default Layout
