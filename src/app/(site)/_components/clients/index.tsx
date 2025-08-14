"use client"

import { InfiniteMovingCards } from "@/components/registry/infinite-moving-cards"
import { CLIENTS } from "@/constants/landing"

const Clients = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center md:text-left">
        Trusted by companies <br className="hidden sm:block" /> around the world.
      </h2>

      <div className="w-full md:max-w-2xl flex flex-col gap-4">
        <InfiniteMovingCards items={CLIENTS} speed="slow" direction="right" />
        <InfiniteMovingCards items={CLIENTS} speed="slow" direction="left" />
      </div>
    </div>
  )
}

export default Clients
