"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type InfiniteMovingCardsProps = {
  items: { href: string }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return

    // Duplicate items once for seamless scroll
    if (scrollerRef.current.children.length === items.length) {
      const clones = Array.from(scrollerRef.current.children).map(child => child.cloneNode(true))
      clones.forEach(clone => scrollerRef.current?.appendChild(clone))
    }

    // Set animation direction
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    )

    // Set animation speed
    const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
    containerRef.current.style.setProperty("--animation-duration", duration)

    setStart(true)
  }, [direction, speed, items.length])

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden items-center [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] bg-primary/70 dark:bg-primary/5",
        "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex flex-nowrap gap-10 py-6 min-w-full w-max shrink-0 items-center",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, index) => (
          <li key={`${item.href}-${index}`} className="shrink-0">
            <Image
              src={item.href}
              alt={`Brand logo ${index + 1}`}
              width={160}
              height={60}
              className="object-contain rounded-xl opacity-60 hover:opacity-90 transition-opacity duration-300"
              loading="lazy"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
