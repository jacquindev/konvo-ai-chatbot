import React from "react"
import AuthLayout from "./_components/layout"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
