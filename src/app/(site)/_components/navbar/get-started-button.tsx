"use client"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"

const GetStartedButton = () => {
  const { user, isSignedIn } = useUser()

  return (
    <Link
      href="/user"
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[2.5px] dark:p-[1.5px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#cfc4f9_0%,#a291f6_50%,#cfc4f9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#8886ff_0%,#322d80_50%,#8886ff_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#e7e3ff] dark:bg-slate-950 px-4 py-2 text-sm font-medium backdrop-blur-3xl text-black dark:text-white hover:text-gray-800 dark:hover:text-white/80">
        {user && isSignedIn ? "Dashboard" : "Get Started"}
      </span>
    </Link>
  )
}

export default GetStartedButton
