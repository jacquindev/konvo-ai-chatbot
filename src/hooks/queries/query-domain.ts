import { onGetAllFilterQuestions, onGetAllHelpDeskQuestions } from "@/actions/chatbot"
import { onGetAllDomainProducts, onGetCurrentDomainInfo } from "@/actions/domain"
import { useQuery } from "@tanstack/react-query"

export const useQueryCurrentDomain = (domainId: string) => {
  return useQuery({
    queryKey: ["user-domain"],
    queryFn: () => onGetCurrentDomainInfo(domainId),
  })
}

export const useQueryDomainHelpDesk = (domainId: string) => {
  return useQuery({
    queryKey: ["domain-helpdesk"],
    queryFn: () => onGetAllHelpDeskQuestions(domainId),
  })
}

export const useQueryDomainFilterQuestion = (domainId: string) => {
  return useQuery({
    queryKey: ["domain-filter-questions"],
    queryFn: () => onGetAllFilterQuestions(domainId),
  })
}

export const useQueryDomainProducts = (domainId: string) => {
  return useQuery({
    queryKey: ["domain-products"],
    queryFn: () => onGetAllDomainProducts(domainId),
  })
}
