import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"

export const useBreadcrumbs = () => {
  const pathname = usePathname()
  const segments = useMemo(() => pathname.split("/").filter(Boolean), [pathname])
  const relevantSegments = useMemo(() => segments.slice(2), [segments])

  const currentDomainId = useMemo(() => {
    if (relevantSegments[0] === "domains") {
      return relevantSegments[1] ?? undefined
    }
    return undefined
  }, [relevantSegments])

  const formatLabel = (segment: string) =>
    segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

  const page = useMemo(() => {
    // e.g. /user/:userId/dashboard → page = "dashboard"
    // e.g. /user/:userId/domains/:domainId/domain-settings → page = "domain-settings"
    if (relevantSegments[0] === "domains") {
      return relevantSegments[2] ?? undefined
    }
    return relevantSegments[0] ?? "dashboard"
  }, [relevantSegments])

  const buildHref = (userId: string, index: number) =>
    `/user/${userId}/${relevantSegments.slice(0, index + 1).join("/")}`

  const activeDomainRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    if (activeDomainRef.current) {
      activeDomainRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [pathname])

  return {
    page,
    pathname,
    segments,
    relevantSegments,
    buildHref,
    currentDomainId,
    formatLabel,
    activeDomainRef,
  }
}
