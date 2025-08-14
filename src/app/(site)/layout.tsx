import { ScrollProgress } from "@/components/registry/scroll-progress"
import React from "react"
import Navbar from "./_components/navbar"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main>
      <Navbar />
      <ScrollProgress className="fixed z-999 top-[88px] p-px rounded-full" />
      <section className="h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        {children}
      </section>
    </main>
  )
}

export default Layout
