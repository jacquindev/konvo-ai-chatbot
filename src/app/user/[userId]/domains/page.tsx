"use client"

import { DomainCard } from "@/components/global/domain"
import { useQueryDomains } from "@/hooks/queries"

const DomainsPage = () => {
  const { data } = useQueryDomains()

  const domains = data?.data?.domains ?? []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {domains.length > 0 && domains.map(domain => <DomainCard key={domain.id} domain={domain} />)}
    </div>
  )
}

export default DomainsPage
