import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
  showName?: boolean
  showImage?: boolean
  asLink?: boolean
  className?: string
  type?: "default" | "letter-only"
}

const LogoLinkWrapper = ({ children }: { children: React.ReactNode }) => (
  <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}/`}>{children}</Link>
)

const AppLogo = ({
  showImage = true,
  showName = true,
  asLink = true,
  className,
  type = "default",
}: Props) => {
  const LogoDefault = () => (
    <div className={cn("flex items-center gap-1 place-items-center", className)}>
      {showImage && (
        <div className="relative w-12 h-12">
          <Image
            src="/assets/logo.png"
            alt="Konvo Logo"
            fill
            priority
            className="object-cover aspect-square"
          />
        </div>
      )}

      {showName && (
        <span className="font-bold text-3xl">
          Konvo
          <span className="text-primary">.</span>
        </span>
      )}
    </div>
  )

  const LogoLetterOnly = () => (
    <div className="inline-block px-4 py-2 bg-transparent shadow-none border-none rounded-md">
      <p
        className={cn(
          `font-semibold leading-none tracking-[0] bg-gradient-to-br
          from-[#3b82f6] via-[#a855f7] to-[#ec4899]
          bg-clip-text text-transparent drop-shadow-sm
          dark:drop-shadow-[0_2px_6px_rgba(168,85,247,0.4)]`,
          className
        )}
        style={{ fontSize: `28px` }}
      >
        Konvo.
      </p>
    </div>
  )

  switch (type) {
    case "default":
      return asLink ? (
        <LogoLinkWrapper>
          <LogoDefault />
        </LogoLinkWrapper>
      ) : (
        <LogoDefault />
      )
    case "letter-only":
      return asLink ? (
        <LogoLinkWrapper>
          <LogoLetterOnly />
        </LogoLinkWrapper>
      ) : (
        <LogoLetterOnly />
      )
    default:
      return <></>
  }
}

export default AppLogo
