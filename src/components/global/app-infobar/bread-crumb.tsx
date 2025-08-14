"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useBreadcrumbs } from "@/hooks/navigation"
import { useQueryDomains } from "@/hooks/queries"
import React from "react"

type Props = {
  userId: string
}

const BreadCrumb = ({ userId }: Props) => {
  const { data } = useQueryDomains()
  const domains = data?.data?.domains ?? []

  const { relevantSegments, buildHref, formatLabel } = useBreadcrumbs()

  // Get domain base name from full domain (e.g. konvo.dev → Konvo)
  const getDomainName = (id: string) => {
    const full = domains?.find(d => d.id === id)?.name
    if (!full) return id
    const base = full.split(".")[0]
    return base.charAt(0).toUpperCase() + base.slice(1)
  }

  // Special case: domain-related route
  const isDomainPage = relevantSegments[0] === "domains" && relevantSegments.length >= 3 // /domains/:domainId/section
  const domainId = isDomainPage ? relevantSegments[1] : undefined
  const section = isDomainPage ? relevantSegments[2] : undefined

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isDomainPage ? (
          <>
            {/* Domains link */}
            <BreadcrumbItem>
              <BreadcrumbLink href={`/user/${userId}/domains`} className="capitalize">
                Domains
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="stroke-muted-foreground" />

            {/* Domain section (e.g. Bot Training, Settings) */}
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/user/${userId}/domains/${domainId}/${section}`}
                className="capitalize"
              >
                {formatLabel(section!)}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="stroke-muted-foreground" />

            {/* Final item: Domain name */}
            <BreadcrumbItem>
              <BreadcrumbPage
                className="capitalize"
                title={domains?.find(d => d.id === domainId)?.name}
              >
                {getDomainName(domainId!)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          // For all other non-domain routes
          relevantSegments.map((segment, index) => {
            const isLast = index === relevantSegments.length - 1
            const label = formatLabel(segment)

            return (
              <React.Fragment key={index}>
                {index > 0 && <BreadcrumbSeparator className="stroke-muted-foreground" />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="capitalize items-center gap-2 flex flex-row">
                      {label}

                      {/* {label.toLowerCase() === 'conversations' &&
                        chatRoom &&
                        (loading ? (
                          <Loader2 className="animate-spin text-primary" />
                        ) : (
                          <Switch
                            defaultChecked={realtime}
                            onCheckedChange={activateRealtime}
                            title="Turn on/off realtime mode"
                          />
                        ))} */}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={buildHref(userId, index)} className="capitalize">
                      {label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb
