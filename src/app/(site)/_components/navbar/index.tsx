"use client"

import AppLogo from "@/components/global/app-logo"
import GetStartedButton from "./get-started-button"
import NavMenu from "./nav-menu"

const Navbar = () => {
  return (
    <header className="z-[100] fixed top-0 left-0 right-0 flex justify-between items-center bg-background/60 backdrop-blur-xl shadow-lg px-8 py-5 mx-auto">
      <aside className="flex items-center">
        <AppLogo />
      </aside>

      <NavMenu className="gap-4 hidden lg:flex items-center relative" />

      <aside className="items-center flex gap-4">
        <GetStartedButton />
        <NavMenu type="mobile" />
      </aside>
    </header>
  )
}

export default Navbar
