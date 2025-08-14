import AppHeader from "@/components/global/app-header"
import React from "react"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="px-4 lg:px-8">
      <AppHeader
        title="integrations"
        description="Connect your third-party applications into your Konvo account."
      />
      <div className="p-4">{children}</div>
    </div>
  )
}

export default Layout
